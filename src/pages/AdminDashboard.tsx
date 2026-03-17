import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store';
import { Users, Briefcase, ShoppingCart, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const { token } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch('/api/stats', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/users', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      
      setStats(statsData);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-stone-500">Loading dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Admin Dashboard</h1>
        <p className="text-stone-500 font-light mt-1">Platform overview and user management.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-stone-500">Total Users</h3>
            <div className="bg-stone-50 p-2 rounded-lg text-stone-600"><Users className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-semibold text-stone-900">{stats?.users}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-stone-500">Total Vendors</h3>
            <div className="bg-amber-50 p-2 rounded-lg text-amber-600"><Briefcase className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-semibold text-stone-900">{stats?.vendors}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-stone-500">Total Orders</h3>
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600"><ShoppingCart className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-semibold text-stone-900">{stats?.orders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-stone-500">Total Revenue</h3>
            <div className="bg-amber-100 p-2 rounded-lg text-amber-700"><DollarSign className="w-5 h-5" /></div>
          </div>
          <p className="text-3xl font-semibold text-stone-900">${stats?.revenue?.toFixed(2) || '0.00'}</p>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-stone-200">
          <h2 className="text-lg font-medium text-stone-900">Recent Users</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-stone-200">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-stone-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-stone-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-stone-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-stone-500">{user.phone || '-'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                      ${user.role === 'admin' ? 'bg-stone-800 text-stone-100' : 
                        user.role === 'vendor' ? 'bg-amber-100 text-amber-800' : 
                        'bg-stone-100 text-stone-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500">
                    {new Date(user.created_at || user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
