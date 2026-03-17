import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Zap, Wrench, Car, Paintbrush, Droplets,
  Sparkles, Users, Star, Clock, CheckCircle, Search, CalendarCheck,
  ThumbsUp, ChevronRight, Phone, Briefcase, MapPin, Award
} from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) =>
    v >= 1000 ? (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'K' : Math.round(v).toString()
  );
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const ctrl = animate(count, to, { duration: 2, ease: 'easeOut' });
    const unsub = rounded.on('change', setDisplay);
    return () => { ctrl.stop(); unsub(); };
  }, [isInView]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

const SERVICES = [
  { icon: Wrench, label: 'Plumbing', color: 'bg-sky-100 text-sky-600', count: '1,240 pros' },
  { icon: Zap, label: 'Electrical', color: 'bg-amber-100 text-amber-600', count: '980 pros' },
  { icon: Sparkles, label: 'Cleaning', color: 'bg-emerald-100 text-emerald-600', count: '2,100 pros' },
  { icon: Paintbrush, label: 'Painting', color: 'bg-rose-100 text-rose-600', count: '760 pros' },
  { icon: Car, label: 'Driving', color: 'bg-violet-100 text-violet-600', count: '1,500 pros' },
  { icon: Droplets, label: 'Car Wash', color: 'bg-cyan-100 text-cyan-600', count: '430 pros' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    role: 'Homeowner',
    rating: 5,
    text: 'Found an amazing plumber within 10 minutes. The service was quick, professional, and very fairly priced. Will definitely use again!',
    avatar: 'SK',
    location: 'New York, NY',
  },
  {
    name: 'James T.',
    role: 'Apartment Renter',
    rating: 5,
    text: 'The electrician Carlos installed my entire smart home setup perfectly. The app made it so easy to track the order and communicate.',
    avatar: 'JT',
    location: 'Austin, TX',
  },
  {
    name: 'Amina R.',
    role: 'Business Owner',
    rating: 5,
    text: "We use ServiceMarket for our office cleaning weekly. The consistency and quality from Sara's team is outstanding every single time.",
    avatar: 'AR',
    location: 'Chicago, IL',
  },
];

const HOW_IT_WORKS = [
  { icon: Search, step: '01', title: 'Browse & Search', desc: 'Explore hundreds of verified service providers across every category — filtered by your location and budget.' },
  { icon: CalendarCheck, step: '02', title: 'Book Instantly', desc: 'Select your service, confirm the details, and place your order in under 60 seconds. No calls needed.' },
  { icon: ThumbsUp, step: '03', title: 'Relax & Review', desc: 'Your pro arrives on time. Once done, rate your experience to help others in the community.' },
];

const MARQUEE_ITEMS = ['Plumbing', 'Electrical', 'House Cleaning', 'Car Wash', 'Painting', 'Driving', 'AC Repair', 'Carpentry', 'Gardening', 'Moving Help', 'Pest Control', 'CCTV Install'];

function MarqueeTrack() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="overflow-hidden w-full py-4 select-none">
      <motion.div
        className="flex gap-4 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-stone-200 bg-white text-stone-600 text-sm font-medium whitespace-nowrap shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex flex-col flex-1 bg-white">

      {/* ── HERO ── */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808009_1px,transparent_1px),linear-gradient(to_bottom,#80808009_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-800 bg-amber-50 border border-amber-200 mb-6 uppercase"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Trusted by 50,000+ customers
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.08] mb-6">
                Find the right
                <br />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                    pro for any job
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-1 bg-amber-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.8, duration: 0.7 }}
                  />
                </span>
              </h1>

              <p className="text-lg text-stone-500 leading-relaxed max-w-lg mb-8 font-light">
                ServiceMarket connects you with vetted, background-checked professionals for plumbing, electrical, cleaning, painting and more — booked in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  to="/auth/user?tab=register"
                  className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 duration-200"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/auth/vendor?tab=register"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-stone-800 bg-white border-2 border-stone-200 hover:border-stone-900 rounded-xl transition-all hover:-translate-y-0.5 duration-200"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Join as a Vendor
                </Link>
              </div>

              <div className="flex items-center gap-6 text-sm text-stone-500">
                {['No credit card required', 'Free cancellation', 'Insured pros'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — floating service cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[440px]">
                {/* Main card */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-0 left-0 right-8 bg-white rounded-3xl border border-stone-200 shadow-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Available Now</p>
                      <h3 className="text-lg font-semibold text-stone-900">Emergency Pipe Repair</h3>
                      <p className="text-sm text-stone-500 mt-1">by Ahmed Al-Rashid · Plumber</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-stone-900">$120</p>
                      <p className="text-xs text-stone-400">starting at</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-400">
                      <MapPin className="w-3.5 h-3.5" /> 1.2 miles away
                    </div>
                    <div className="flex items-center gap-1 text-xs text-stone-400">
                      <Clock className="w-3.5 h-3.5" /> Arrives in ~25 min
                    </div>
                  </div>
                  <Link to="/auth/user?tab=register" className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-stone-900 rounded-xl hover:bg-stone-800 transition-colors">
                    Book Now
                  </Link>
                </motion.div>

                {/* Floating badge - rating */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute top-44 -right-4 bg-white rounded-2xl border border-stone-200 shadow-xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Satisfaction</p>
                    <p className="text-sm font-bold text-stone-900">98.7% Positive</p>
                  </div>
                </motion.div>

                {/* Floating badge - new order */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-16 left-4 bg-white rounded-2xl border border-stone-200 shadow-xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Just completed</p>
                    <p className="text-sm font-bold text-stone-900">Deep Home Cleaning</p>
                  </div>
                </motion.div>

                {/* Floating badge - vendors online */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                  className="absolute bottom-0 right-0 bg-stone-900 rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="flex -space-x-2">
                    {['A', 'S', 'C'].map((l, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-amber-400 border-2 border-stone-900 flex items-center justify-center text-xs font-bold text-stone-900">{l}</div>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-stone-400">Pros online</p>
                    <p className="text-sm font-bold text-white">142 available</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="py-6 border-y border-stone-100 bg-stone-50">
        <MarqueeTrack />
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 50, suffix: 'K+', prefix: '', label: 'Happy Customers', icon: Users, color: 'text-amber-600' },
              { value: 5, suffix: 'K+', prefix: '', label: 'Verified Vendors', icon: CheckCircle, color: 'text-emerald-600' },
              { value: 200, suffix: 'K+', prefix: '', label: 'Jobs Completed', icon: ThumbsUp, color: 'text-sky-600' },
              { value: 4.9, suffix: '', prefix: '', label: 'Average Rating', icon: Star, color: 'text-rose-500' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-stone-50 mb-4 mx-auto`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <p className="text-4xl font-extrabold text-stone-900 mb-1">
                  <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
                </p>
                <p className="text-sm text-stone-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE CATEGORIES ── */}
      <section className="py-24 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">What we offer</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 leading-tight">
              Every service, one platform
            </h2>
            <p className="text-lg text-stone-500 font-light max-w-xl mx-auto">
              From emergency repairs to weekly home care — our vetted professionals handle it all.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
              >
                <Link to="/auth/user?tab=register" className="group flex items-center gap-4 bg-white p-5 rounded-2xl border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all duration-200 cursor-pointer">
                  <div className={`flex-shrink-0 w-12 h-12 ${svc.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <svc.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">{svc.label}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{svc.count}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">Simple process</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">How it works</h2>
            <p className="text-lg text-stone-500 font-light">Book a professional in under 2 minutes.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.7%+2rem)] right-[calc(16.7%+2rem)] h-px bg-gradient-to-r from-stone-200 via-amber-300 to-stone-200" />
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="text-center relative"
              >
                <div className="inline-flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-stone-900 flex items-center justify-center mb-6 shadow-lg relative">
                    <step.icon className="w-9 h-9 text-white" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400 text-stone-900 text-xs font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">{step.title}</h3>
                  <p className="text-stone-500 leading-relaxed text-sm max-w-xs">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-amber-600 mb-3">What customers say</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4">Loved by thousands</h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
              <span className="ml-2 text-sm font-semibold text-stone-700">4.9 / 5 from 12,400+ reviews</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                className="bg-white rounded-3xl border border-stone-200 p-7 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-stone-700 leading-relaxed text-sm mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 text-sm">{t.name}</p>
                    <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {t.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST PILLARS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Fully Insured Pros', desc: 'Every professional on the platform carries liability insurance, so you are always protected.', badge: 'Verified', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
              { icon: Clock, title: '24/7 Live Support', desc: 'Our support team is available around the clock to help you before, during, and after every booking.', badge: 'Always On', badgeColor: 'bg-sky-50 text-sky-700 border-sky-200' },
              { icon: Phone, title: 'Satisfaction Guarantee', desc: 'Not happy with the result? We offer a full money-back guarantee — no questions, no hassle.', badge: 'Risk Free', badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-sm transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-stone-900">{item.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>{item.badge}</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 bg-stone-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:56px_56px]" />
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"
          animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto px-4 text-center"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-amber-400 mb-4">Ready to start?</p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Your next great hire
            <br />
            is one click away
          </h2>
          <p className="text-lg text-stone-400 mb-10 font-light">
            Join 50,000+ customers who trust ServiceMarket every day. Sign up free — no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/user?tab=register"
              className="group inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg hover:shadow-amber-400/30 hover:-translate-y-0.5 duration-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth/vendor?tab=register"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white bg-white/10 border border-white/20 hover:bg-white/20 rounded-xl transition-all hover:-translate-y-0.5 duration-200"
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Offer Your Services
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-stone-950 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg">ServiceMarket</p>
              <p className="text-sm text-stone-500 mt-1">Connecting people with trusted professionals.</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/portal" className="hover:text-white transition-colors">Log In</Link>
              <Link to="/auth/user?tab=register" className="hover:text-white transition-colors">Sign Up</Link>
              <Link to="/auth/vendor?tab=register" className="hover:text-white transition-colors">Become a Vendor</Link>
            </div>
            <p className="text-xs text-stone-600">© {new Date().getFullYear()} ServiceMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
