import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { Plus, Trash2, CheckCircle, XCircle, Clock, Phone, MessageCircle } from 'lucide-react';

export default function VendorDashboard() {
  const { token } = useAuthStore();
  const [services, setServices] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({ title: '', description: '', price: '', category: 'Plumber' });

  const categories = ['Plumber', 'Electrician', 'Driver', 'House Painting', 'Car Wash', 'House Cleaning', 'Other'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesRes, ordersRes] = await Promise.all([
        fetch('/api/services'),
        fetch('/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      
      const servicesData = await servicesRes.json();
      const ordersData = await ordersRes.json();
      
      // Filter services to only show the vendor's own services
      const myServices = servicesData.filter((s: any) => s.vendor_id === useAuthStore.getState().user?.id);
      
      setServices(myServices);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: newService.title,
          description: newService.description,
          price: parseFloat(newService.price),
          category: newService.category
        })
      });
      
      if (res.ok) {
        setIsAdding(false);
        setNewService({ title: '', description: '', price: '', category: 'Plumber' });
        fetchData();
      }
    } catch (error) {
      console.error('Failed to add service', error);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Failed to delete service', error);
    }
  };

  const handleUpdateOrderStatus = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchData();
    } catch (error) {
      console.error('Failed to update order', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle className="w-3 h-3 mr-1" /> Completed</span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Clock className="w-3 h-3 mr-1" /> Pending</span>;
    }
  };

  if (loading) return <div className="p-8 text-center text-stone-500">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Vendor Dashboard</h1>
        <p className="text-stone-500 font-light mt-1">Manage your service listings and fulfill client orders.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Services Management */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-stone-900">My Services</h2>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center text-sm font-medium text-white bg-stone-900 px-3 py-1.5 rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Service
            </button>
          </div>

          {isAdding && (
            <form onSubmit={handleAddService} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm mb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Service Title</label>
                <input 
                  type="text" required value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                  placeholder="e.g. AC Repair & Maintenance"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Category</label>
                <select 
                  value={newService.category} onChange={e => setNewService({...newService, category: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Description</label>
                <textarea 
                  required value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Price ($)</label>
                <input 
                  type="number" step="0.01" required value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors shadow-sm">Save Service</button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {services.map(service => (
              <div key={service.id} className="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md hover:border-amber-200 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                      {service.category || 'Other'}
                    </span>
                    <h3 className="font-medium text-stone-900">{service.title}</h3>
                  </div>
                  <p className="text-stone-500 text-sm mt-1 line-clamp-1">{service.description}</p>
                  <p className="font-medium text-stone-900 mt-2">${service.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDeleteService(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && !isAdding && (
              <div className="text-center py-12 bg-white rounded-xl border border-stone-200">
                <p className="text-stone-500">You haven't added any services yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Incoming Orders */}
        <div>
          <h2 className="text-lg font-medium text-stone-900 mb-6">Incoming Orders</h2>
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-stone-100">
              {orders.map(order => (
                <li key={order.id} className="p-5 hover:bg-stone-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-stone-900">{order.service_title}</p>
                      <p className="text-sm text-stone-500 mt-0.5">Client: {order.user_name}</p>
                    </div>
                    <span className="font-medium text-stone-900">${order.price}</span>
                  </div>
                  
                  {order.customer_phone && (
                    <div className="flex gap-3 mt-2 mb-2">
                      <a 
                        href={`tel:${order.customer_phone}`}
                        className="flex items-center text-xs font-medium text-stone-600 hover:text-amber-700 transition-colors"
                      >
                        <Phone className="w-3 h-3 mr-1" /> Call Client
                      </a>
                      <a 
                        href={`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs font-medium text-stone-600 hover:text-emerald-700 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp Client
                      </a>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <span className="text-xs text-stone-400 ml-2">{new Date(order.created_at || order.createdAt).toLocaleDateString()}</span>
                    </div>
                    
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, 'completed')}
                          className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 rounded-md transition-colors"
                        >
                          Complete
                        </button>
                        <button 
                          onClick={() => handleUpdateOrderStatus(order.id, 'cancelled')}
                          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 hover:bg-red-100 rounded-md transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </li>
              ))}
              {orders.length === 0 && (
                <li className="p-8 text-center text-stone-500 text-sm">
                  No orders yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
