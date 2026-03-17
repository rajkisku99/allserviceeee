import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleCheck as CheckCircle2, Shield, Zap, Wrench, Car, Paintbrush, Droplets, Sparkles, TrendingUp, Users, Star, Clock, CheckCheck, Flame } from 'lucide-react';
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

function AnimatedOrb() {
  return (
    <motion.div
      className="absolute w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-400/10 rounded-full blur-3xl"
      animate={{
        x: [0, 30, -30, 0],
        y: [0, -30, 30, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
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
        <AnimatedOrb />
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
              {[
                { icon: Users, label: 'Happy Customers', value: 50000, suffix: '+' },
                { icon: CheckCheck, label: 'Verified Vendors', value: 5000, suffix: '+' },
                { icon: TrendingUp, label: 'Services Completed', value: 200000, suffix: '+' },
                { icon: Star, label: 'Average Rating', value: 4.9, suffix: '', isStar: true },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    className="inline-block mb-2"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    <stat.icon className="w-6 h-6 text-amber-600 mx-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-bold text-stone-900 mb-2 flex items-center justify-center gap-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                    {stat.isStar && <Star className="w-8 h-8 fill-amber-400 text-amber-400" />}
                  </div>
                  <div className="text-sm text-stone-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/10 to-orange-200/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-200/10 to-cyan-200/5 rounded-full blur-3xl"></div>

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
              { icon: Sparkles, title: 'House Cleaning', desc: 'Thorough and reliable cleaning services to keep your home spotless and comfortable.', color: 'from-yellow-500 to-orange-600' }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group bg-white p-8 rounded-3xl border border-stone-200 hover:border-amber-300 hover:shadow-2xl transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white/50 to-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                />
                <div className="relative">
                  <div className={`h-14 w-14 bg-gradient-to-br ${service.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    />
                    <service.icon className="h-7 w-7 relative z-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 mb-3 group-hover:text-amber-700 transition-colors">{service.title}</h3>
                  <p className="text-stone-600 leading-relaxed mb-6">{service.desc}</p>
                  <div className="flex items-center text-sm font-medium text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-100/20 to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-100/20 to-transparent blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { icon: CheckCircle2, title: '100% Verified', desc: 'Every vendor is thoroughly vetted, background-checked, and certified before joining our platform.', color: 'emerald' },
              { icon: Shield, title: 'Money-Back Guarantee', desc: 'Not satisfied? Get a full refund, no questions asked. Your satisfaction is our priority.', color: 'amber' },
              { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock customer support ready to help you whenever you need assistance.', color: 'sky' },
            ].map((trust, idx) => (
              <motion.div
                key={trust.title}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group text-center relative"
              >
                <motion.div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-${trust.color}-100 rounded-2xl mb-6 relative`}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-${trust.color}-200 to-${trust.color}-100`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <trust.icon className={`w-8 h-8 text-${trust.color}-600 relative z-10`} />
                </motion.div>
                <h3 className="text-2xl font-semibold text-stone-900 mb-3">{trust.title}</h3>
                <p className="text-stone-600 leading-relaxed">{trust.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            x: [-20, 20, -20],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl"
          animate={{
            x: [20, -20, 20],
            y: [20, -20, 20],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to experience
            <br />
            <motion.span
              className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent block"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              seamless service?
            </motion.span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-stone-300 mb-10 font-light"
          >
            Join thousands of satisfied customers today. No credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link
              to="/auth/user?tab=register"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-stone-900 bg-white hover:bg-stone-50 rounded-2xl transition-all shadow-2xl hover:shadow-amber-500/20 duration-300 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="relative flex items-center">
                Start for Free
                <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1, repeat: Infinity }}>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </motion.div>
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
