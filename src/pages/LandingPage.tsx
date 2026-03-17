import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck as CheckCircle2, Shield, Zap, Wrench, Car, Paintbrush, Droplets, Sparkles, TrendingUp, Users, Star, Clock } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 2.5,
      ease: 'easeOut'
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest.toLocaleString());
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
}

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white via-amber-50/20 to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-stone-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-amber-800 bg-white border border-amber-200/50 mb-8 shadow-sm backdrop-blur-sm"
            >
              <div className="flex items-center justify-center w-5 h-5 bg-emerald-500 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
              Trusted by 50,000+ customers worldwide
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-8xl font-bold tracking-tight text-stone-900 mb-6 leading-[1.1]"
            >
              All services
              <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent">in one place</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-xl md:text-2xl text-stone-600 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              The world's most trusted platform connecting you with verified professionals for every service imaginable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <Link
                to="/auth/user?tab=register"
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-2xl transition-all shadow-lg hover:shadow-2xl hover:scale-105 duration-300"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/auth/vendor?tab=register"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-stone-900 bg-white border-2 border-stone-900 hover:bg-stone-50 rounded-2xl transition-all shadow-sm hover:shadow-lg hover:scale-105 duration-300"
              >
                Become a Vendor
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto pt-12 border-t border-stone-200"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-stone-900 mb-2">
                  <Counter value={50000} suffix="+" />
                </div>
                <div className="text-sm text-stone-500 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-stone-900 mb-2">
                  <Counter value={5000} suffix="+" />
                </div>
                <div className="text-sm text-stone-500 font-medium">Verified Vendors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-stone-900 mb-2">
                  <Counter value={200000} suffix="+" />
                </div>
                <div className="text-sm text-stone-500 font-medium">Services Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-stone-900 mb-2 flex items-center justify-center gap-1">
                  <Counter value={4.9} />
                  <Star className="w-8 h-8 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-sm text-stone-500 font-medium">Average Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-amber-800 bg-amber-100/50 border border-amber-200 mb-6">
              <Sparkles className="w-4 h-4" />
              Premium Services
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
              Everything you need,
              <br />
              <span className="text-stone-600">handled by experts</span>
            </h2>
            <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto">
              Professional-grade services at your fingertips. Vetted experts. Instant booking.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: 'Plumbing', desc: 'Expert plumbers for repairs, installations, and maintenance of your water systems.', color: 'from-sky-500 to-blue-600' },
              { icon: Zap, title: 'Electrical & Repair', desc: 'Certified electricians for wiring, TV repair, AC maintenance, and washing machines.', color: 'from-amber-500 to-orange-600' },
              { icon: Car, title: 'Driving', desc: 'Professional drivers for personal transport, deliveries, and special events.', color: 'from-emerald-500 to-teal-600' },
              { icon: Paintbrush, title: 'House Painting', desc: 'Transform your space with our skilled painters for interior and exterior projects.', color: 'from-rose-500 to-pink-600' },
              { icon: Droplets, title: 'Car Wash', desc: 'Convenient, high-quality car washing and detailing services right at your doorstep.', color: 'from-cyan-500 to-blue-600' },
              { icon: Sparkles, title: 'House Cleaning', desc: 'Thorough and reliable cleaning services to keep your home spotless and comfortable.', color: 'from-violet-500 to-purple-600' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white p-8 rounded-3xl border border-stone-200 hover:border-amber-200 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/0 via-amber-50/0 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className={`h-14 w-14 bg-gradient-to-br ${service.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">{service.title}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6">{service.desc}</p>
                  <div className="flex items-center text-sm font-medium text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-12"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-3">100% Verified</h3>
              <p className="text-stone-600 leading-relaxed">Every vendor is thoroughly vetted, background-checked, and certified before joining our platform.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-3">Money-Back Guarantee</h3>
              <p className="text-stone-600 leading-relaxed">Not satisfied? Get a full refund, no questions asked. Your satisfaction is our priority.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-6">
                <Clock className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-2xl font-semibold text-stone-900 mb-3">24/7 Support</h3>
              <p className="text-stone-600 leading-relaxed">Round-the-clock customer support ready to help you whenever you need assistance.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to experience
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">seamless service?</span>
          </h2>
          <p className="text-xl text-stone-300 mb-10 font-light">
            Join thousands of satisfied customers today. No credit card required.
          </p>
          <Link
            to="/auth/user?tab=register"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-stone-900 bg-white hover:bg-stone-50 rounded-2xl transition-all shadow-2xl hover:shadow-amber-500/20 hover:scale-105 duration-300"
          >
            Start for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
