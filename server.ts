import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-jwt-key-for-dev";

// Initialize SQLite Database
const db = new Database("service_market.db");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('user', 'vendor', 'admin')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    vendor_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT DEFAULT 'Other',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(vendor_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    service_id INTEGER NOT NULL,
    vendor_id INTEGER NOT NULL,
    status TEXT NOT NULL CHECK(status IN ('pending', 'completed', 'cancelled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(service_id) REFERENCES services(id),
    FOREIGN KEY(vendor_id) REFERENCES users(id)
  );
`);

// Insert default admin if not exists
try {
  db.exec("ALTER TABLE services ADD COLUMN category TEXT DEFAULT 'Other'");
} catch (e) {
  // Column already exists
}

try {
  db.exec("ALTER TABLE users ADD COLUMN phone TEXT DEFAULT ''");
} catch (e) {
  // Column already exists
}

const adminExists = db.prepare("SELECT * FROM users WHERE email = ?").get("admin@admin.com");
if (!adminExists) {
  const hash = bcrypt.hashSync("admin123", 10);
  db.prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)").run("Admin", "admin@admin.com", hash, "admin");
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;

  app.use(express.json());

  // --- API Routes ---

  // Auth Middleware
  const authenticate = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  const requireRole = (roles: string[]) => (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };

  // Auth Routes
  app.post("/api/auth/register", (req, res) => {
    const { name, email, password, role, phone } = req.body;
    if (!['user', 'vendor'].includes(role)) return res.status(400).json({ error: "Invalid role" });
    
    try {
      const hash = bcrypt.hashSync(password, 10);
      const result = db.prepare("INSERT INTO users (name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)").run(name, email, hash, role, phone || '');
      res.json({ success: true, userId: result.lastInsertRowid });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });

  // Services Routes
  app.get("/api/services", (req, res) => {
    const services = db.prepare(`
      SELECT s.*, u.name as vendor_name, u.phone as vendor_phone
      FROM services s 
      JOIN users u ON s.vendor_id = u.id
    `).all();
    res.json(services);
  });

  app.post("/api/services", authenticate, requireRole(['vendor', 'admin']), (req: any, res) => {
    const { title, description, price, category } = req.body;
    const vendorId = req.user.role === 'admin' ? req.body.vendor_id : req.user.id;
    const result = db.prepare("INSERT INTO services (vendor_id, title, description, price, category) VALUES (?, ?, ?, ?, ?)").run(vendorId, title, description, price, category || 'Other');
    res.json({ success: true, serviceId: result.lastInsertRowid });
  });

  app.delete("/api/services/:id", authenticate, requireRole(['vendor', 'admin']), (req: any, res) => {
    if (req.user.role === 'admin') {
      db.prepare("DELETE FROM services WHERE id = ?").run(req.params.id);
    } else {
      db.prepare("DELETE FROM services WHERE id = ? AND vendor_id = ?").run(req.params.id, req.user.id);
    }
    res.json({ success: true });
  });

  // Orders Routes
  app.post("/api/orders", authenticate, requireRole(['user']), (req: any, res) => {
    const { service_id } = req.body;
    const service: any = db.prepare("SELECT vendor_id FROM services WHERE id = ?").get(service_id);
    if (!service) return res.status(404).json({ error: "Service not found" });
    
    const result = db.prepare("INSERT INTO orders (user_id, service_id, vendor_id, status) VALUES (?, ?, ?, 'pending')").run(req.user.id, service_id, service.vendor_id);
    res.json({ success: true, orderId: result.lastInsertRowid });
  });

  app.get("/api/orders", authenticate, (req: any, res) => {
    let orders;
    if (req.user.role === 'user') {
      orders = db.prepare(`
        SELECT o.*, s.title as service_title, s.price, u.name as vendor_name, u.phone as vendor_phone
        FROM orders o 
        JOIN services s ON o.service_id = s.id 
        JOIN users u ON o.vendor_id = u.id 
        WHERE o.user_id = ?
      `).all(req.user.id);
    } else if (req.user.role === 'vendor') {
      orders = db.prepare(`
        SELECT o.*, s.title as service_title, s.price, u.name as customer_name, u.phone as customer_phone
        FROM orders o 
        JOIN services s ON o.service_id = s.id 
        JOIN users u ON o.user_id = u.id 
        WHERE o.vendor_id = ?
      `).all(req.user.id);
    } else {
      orders = db.prepare(`
        SELECT o.*, s.title as service_title, s.price, u.name as customer_name, v.name as vendor_name, u.phone as customer_phone, v.phone as vendor_phone
        FROM orders o 
        JOIN services s ON o.service_id = s.id 
        JOIN users u ON o.user_id = u.id 
        JOIN users v ON o.vendor_id = v.id
      `).all();
    }
    res.json(orders);
  });

  app.put("/api/orders/:id/status", authenticate, requireRole(['vendor', 'admin']), (req: any, res) => {
    const { status } = req.body;
    if (!['pending', 'completed', 'cancelled'].includes(status)) return res.status(400).json({ error: "Invalid status" });
    
    if (req.user.role === 'admin') {
      db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, req.params.id);
    } else {
      db.prepare("UPDATE orders SET status = ? WHERE id = ? AND vendor_id = ?").run(status, req.params.id, req.user.id);
    }
    res.json({ success: true });
  });

  // Admin Routes
  app.get("/api/users", authenticate, requireRole(['admin']), (req, res) => {
    const users = db.prepare("SELECT id, name, email, phone, role, created_at FROM users").all();
    res.json(users);
  });

  app.get("/api/stats", authenticate, requireRole(['admin']), (req, res) => {
    const usersCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'user'").get() as any;
    const vendorsCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'vendor'").get() as any;
    const ordersCount = db.prepare("SELECT COUNT(*) as count FROM orders").get() as any;
    const revenue = db.prepare("SELECT SUM(s.price) as total FROM orders o JOIN services s ON o.service_id = s.id WHERE o.status = 'completed'").get() as any;
    
    res.json({
      users: usersCount.count,
      vendors: vendorsCount.count,
      orders: ordersCount.count,
      revenue: revenue.total || 0
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
