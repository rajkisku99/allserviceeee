import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { LogOut, LayoutDashboard, Briefcase } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return `/dashboard/${user.role}`;
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-stone-900 p-1.5 rounded-lg group-hover:bg-stone-800 transition-colors shadow-sm">
                <Briefcase className="h-5 w-5 text-amber-500" />
              </div>
              <span className="font-semibold text-xl tracking-tight text-stone-900">ServiceMarket</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link 
                  to={getDashboardLink()} 
                  className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-stone-200">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-medium text-sm shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-col hidden sm:flex">
                      <span className="text-sm font-medium text-stone-900 leading-none">{user.name}</span>
                      <span className="text-xs text-stone-500 capitalize mt-1">{user.role}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-stone-400 hover:text-amber-700 transition-colors rounded-full hover:bg-stone-100"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-medium text-stone-600 hover:text-amber-700 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/auth/user?tab=register" 
                  className="text-sm font-medium bg-stone-900 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
