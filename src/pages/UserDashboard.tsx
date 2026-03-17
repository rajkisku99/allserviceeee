import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { Search, Clock, CheckCircle, XCircle, Phone, MessageCircle } from 'lucide-react';

export default function UserDashboard() {
  const { token } = useAuthStore();
  const [services, setServices] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Plumber', 'Electrician', 'Driver', 'House Painting', 'Car Wash', 'House Cleaning', 'Other'];

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
      
      setServices(servicesData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (serviceId: number) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ serviceId })
      });
      
      if (res.ok) {
        fetchData(); // Refresh orders
      }
    } catch (error) {
      console.error('Failed to book service', error);
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
        <h1 className="text-2xl font-semibold text-stone-900">Client Dashboard</h1>
        <p className="text-stone-500 font-light mt-1">Manage your bookings and discover new services.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-lg font-medium text-stone-900">All Services in One Place</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 w-full sm:w-auto transition-shadow"
              />
            </div>
          </div>

          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-amber-700 text-white shadow-sm' 
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-600 hover:text-amber-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {services
              .filter(s => selectedCategory === 'All' || s.category === selectedCategory)
              .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(service => (
              <div key={service.id} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md hover:border-amber-200 transition-all flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 mb-2">
                      {service.category || 'Other'}
                    </span>
                    <h3 className="font-medium text-stone-900 leading-tight">{service.title}</h3>
                  </div>
                  <span className="font-semibold text-amber-700 text-lg">${service.price}</span>
                </div>
                <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-1 mt-1">{service.description}</p>
                <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-stone-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">By {service.vendor_name}</span>
                    <div className="flex gap-2">
                      {service.vendor_phone && (
                        <>
                          <a 
                            href={`tel:${service.vendor_phone}`}
                            className="p-2 text-stone-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                            title="Call Vendor"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a 
                            href={`https://wa.me/${service.vendor_phone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-stone-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="WhatsApp Vendor"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => handleBook(service.id)}
                    className="w-full py-2 bg-stone-900 text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-colors shadow-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
            {services.length === 0 && (
              <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500">No services available right now.</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-stone-900 mb-6">Your Orders</h2>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-stone-100">
              {orders.map(order => (
                <li key={order.id} className="p-4 hover:bg-stone-50 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-stone-900 text-sm">{order.service_title}</p>
                    <span className="font-semibold text-amber-700 text-sm">${order.price}</span>
                  </div>
                  
                  {order.vendor_phone && (
                    <div className="flex gap-3 mt-2 mb-2">
                      <a 
                        href={`tel:${order.vendor_phone}`}
                        className="flex items-center text-xs font-medium text-stone-600 hover:text-amber-700 transition-colors"
                      >
                        <Phone className="w-3 h-3 mr-1" /> Call
                      </a>
                      <a 
                        href={`https://wa.me/${order.vendor_phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-xs font-medium text-stone-600 hover:text-emerald-700 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp
                      </a>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-stone-500 font-medium">
                      {new Date(order.created_at || order.createdAt).toLocaleDateString()}
                    </p>
                    {getStatusBadge(order.status)}
                  </div>
                </li>
              ))}
              {orders.length === 0 && (
                <li className="p-8 text-center text-stone-500 text-sm">
                  You haven't booked any services yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
