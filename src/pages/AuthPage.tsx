import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { ArrowLeft, Briefcase } from 'lucide-react';

export default function AuthPage() {
  const { role } = useParams<{ role: string }>();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('tab') !== 'register');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      setIsLogin(true); // Admins can only log in
    } else {
      setIsLogin(searchParams.get('tab') !== 'register');
    }
  }, [searchParams, role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password, role, phone };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        if (data.user.role !== role) {
          throw new Error(`Invalid credentials for ${role} portal.`);
        }
        login(data.user, data.token);
        navigate(`/dashboard/${data.user.role}`);
      } else {
        // Auto login after register
        const loginRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          login(loginData.user, loginData.token);
          navigate(`/dashboard/${loginData.user.role}`);
        } else {
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleTitle = () => {
    if (role === 'admin') return 'Admin';
    if (role === 'vendor') return 'Vendor';
    return 'Client';
  };

  return (
    <div className="flex-1 flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 relative py-12">
        <Link to="/login" className="absolute top-8 left-8 text-stone-400 hover:text-stone-900 transition-colors flex items-center text-sm font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to portals
        </Link>
        
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="mt-2 text-sm text-stone-500 font-light">
              {getRoleTitle()} Portal
            </p>
          </div>

          <div className="mt-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                  {error}
                </div>
              )}
              
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Full Name</label>
                    <input
                      type="text" required value={name} onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Phone Number</label>
                    <input
                      type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="appearance-none block w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm transition-shadow"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Email address</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm transition-shadow"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
                <input
                  type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-600 focus:border-amber-600 sm:text-sm transition-shadow"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors disabled:opacity-70 mt-6 shadow-sm"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Create account')}
              </button>
            </form>

            {role !== 'admin' && (
              <div className="mt-6 text-center text-sm text-stone-500">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-amber-700 hover:text-amber-800 hover:underline transition-all"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-stone-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="relative z-10 max-w-md text-white">
          <div className="bg-amber-500/10 p-3 rounded-xl inline-block mb-6 backdrop-blur-md border border-amber-500/20">
            <Briefcase className="h-8 w-8 text-amber-500" />
          </div>
          <h2 className="text-4xl font-semibold tracking-tight mb-4 text-white">
            The professional standard.
          </h2>
          <p className="text-stone-400 text-lg font-light leading-relaxed">
            Join thousands of professionals and clients building the future of service delivery on ServiceMarket.
          </p>
        </div>
      </div>
    </div>
  );
}
