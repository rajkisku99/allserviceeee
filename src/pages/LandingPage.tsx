import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap, Wrench, Car, Paintbrush, Droplets, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 bg-stone-50">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium text-amber-800 bg-amber-100/50 border border-amber-200 mb-8 shadow-sm">
            ✨ The new standard for professional services
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-stone-900 mb-8 leading-tight">
            All services <br className="hidden md:block" />
            in one place.
          </h1>
          <p className="mt-4 text-xl text-stone-500 max-w-2xl mx-auto mb-10 font-light">
            Connect with top-tier vendors for plumbing, electrical work, driving, painting, car washing, and house cleaning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/auth/user?tab=register" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link 
              to="/auth/vendor?tab=register" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-stone-700 bg-white border border-stone-200 hover:border-amber-600 hover:text-amber-700 rounded-xl transition-all shadow-sm"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white border-t border-stone-100 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900">Our Services</h2>
            <p className="mt-4 text-lg text-stone-500 font-light">Everything you need, handled by professionals.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">Plumbing</h3>
              <p className="text-stone-500 font-light leading-relaxed">Expert plumbers for repairs, installations, and maintenance of your water systems.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">Electrical & Repair</h3>
              <p className="text-stone-500 font-light leading-relaxed">Certified electricians for wiring, TV repair, AC maintenance, and washing machines.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Car className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">Driving</h3>
              <p className="text-stone-500 font-light leading-relaxed">Professional drivers for personal transport, deliveries, and special events.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Paintbrush className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">House Painting</h3>
              <p className="text-stone-500 font-light leading-relaxed">Transform your space with our skilled painters for interior and exterior projects.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Droplets className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">Car Wash</h3>
              <p className="text-stone-500 font-light leading-relaxed">Convenient, high-quality car washing and detailing services right at your doorstep.</p>
            </div>
            <div className="bg-stone-50 p-8 rounded-2xl border border-stone-100 hover:border-amber-200 hover:shadow-md transition-all group">
              <div className="h-12 w-12 bg-amber-50 border border-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-2">House Cleaning</h3>
              <p className="text-stone-500 font-light leading-relaxed">Thorough and reliable cleaning services to keep your home spotless and comfortable.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
