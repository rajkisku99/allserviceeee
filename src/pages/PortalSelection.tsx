import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, Shield, ArrowRight } from 'lucide-react';

export default function PortalSelection() {
  return (
    <div className="flex-1 flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-12">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-stone-900">Welcome back</h2>
          <p className="mt-3 text-stone-500 text-lg font-light">Select your portal to continue</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/auth/user" className="group bg-white p-8 rounded-2xl border border-stone-200 hover:border-amber-600 hover:shadow-lg transition-all flex flex-col relative overflow-hidden">
            <div className="h-12 w-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-700 group-hover:text-white transition-colors shadow-sm">
              <User className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-2">Client Portal</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed mb-8">Browse services, book professionals, and manage your orders.</p>
            <div className="mt-auto flex items-center text-sm font-medium text-amber-700">
              Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link to="/auth/vendor" className="group bg-white p-8 rounded-2xl border border-stone-200 hover:border-amber-600 hover:shadow-lg transition-all flex flex-col relative overflow-hidden">
            <div className="h-12 w-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-700 group-hover:text-white transition-colors shadow-sm">
              <Briefcase className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-2">Vendor Portal</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed mb-8">Manage your service listings, pricing, and fulfill client orders.</p>
            <div className="mt-auto flex items-center text-sm font-medium text-amber-700">
              Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
          
          <Link to="/auth/admin" className="group bg-white p-8 rounded-2xl border border-stone-200 hover:border-stone-900 hover:shadow-lg transition-all flex flex-col relative overflow-hidden">
            <div className="h-12 w-12 bg-stone-100 text-stone-900 rounded-xl flex items-center justify-center mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors shadow-sm">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-medium text-stone-900 mb-2">Admin Portal</h3>
            <p className="text-stone-500 text-sm font-light leading-relaxed mb-8">Platform management, analytics, and user administration.</p>
            <div className="mt-auto flex items-center text-sm font-medium text-stone-900">
              Continue <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
