# ServiceMarket

A multi-role service marketplace platform with users, vendors, and admins.

## Architecture

- **Frontend**: React 19 + Vite 6 + Tailwind CSS 4 + React Router v7
- **Backend**: Express.js API server with Vite middleware (dev mode)
- **Database**: SQLite via better-sqlite3 (file: `service_market.db`)
- **Auth**: JWT-based authentication (bcryptjs for hashing)
- **State**: Zustand for client-side state management
- **UI**: Framer Motion for animations, Lucide React for icons

## Project Structure

```
├── server.ts          # Express server + API routes + Vite middleware
├── vite.config.ts     # Vite config (host: 0.0.0.0, port: 5000, allowedHosts: true)
├── src/
│   ├── main.tsx       # React entry point
│   ├── App.tsx        # Root component with routing
│   ├── store.ts       # Zustand store
│   ├── pages/         # Page components
│   └── components/    # Shared components
├── index.html         # HTML entry
└── package.json       # Dependencies
```

## Running

```bash
npm install
npm run dev     # Starts Express + Vite on port 5000
```

## User Roles

- **user**: Can browse and book services
- **vendor**: Can create and manage their services; view/update orders
- **admin**: Full access - manage users, services, orders, view stats

Default admin: `admin@admin.com` / `admin123`

## API Routes

- `POST /api/auth/register` - Register (role: user or vendor)
- `POST /api/auth/login` - Login
- `GET /api/services` - List all services (public)
- `POST /api/services` - Create service (vendor/admin)
- `DELETE /api/services/:id` - Delete service (vendor/admin)
- `POST /api/orders` - Place order (user)
- `GET /api/orders` - Get orders (role-filtered)
- `PUT /api/orders/:id/status` - Update order status (vendor/admin)
- `GET /api/users` - List all users (admin)
- `GET /api/stats` - Dashboard stats (admin)

## Environment Variables

- `GEMINI_API_KEY` - Optional, for Gemini AI features
- `JWT_SECRET` - JWT signing secret (defaults to dev key)
- `PORT` - Server port (defaults to 5000)
