import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);

      // Role-based redirect per SRS §8.1
      const redirectMap: Record<string, string> = {
        admin: '/admin',
        manager: '/manager',
        employee: '/employee',
      };
      navigate(redirectMap[user.role] || '/login', { replace: true });
    } catch (err: any) {
      const message =
        err.response?.data?.error?.message || err.message || 'Invalid credentials';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Ambient gradients */}
      <div className="absolute top-[-30%] left-[-20%] w-[800px] h-[800px] bg-violet-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[-30%] right-[-20%] w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-[150px]" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-500/6 rounded-full blur-[120px]" />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-12 h-12 bg-linear-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-violet-500/30">
            M
          </div>
          <span className="text-3xl font-bold tracking-tight bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            MODULUS
          </span>
        </div>

        <div className="bg-white/3 backdrop-blur-xl border border-white/6 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-white mb-2">Welcome back</h1>
            <p className="text-sm text-gray-500">Sign in to your enterprise account</p>
          </div>

          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <div className="w-2 h-2 bg-red-400 rounded-full shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-white/4 border border-white/8 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 text-center">Test Accounts</p>
            <div className="grid grid-cols-1 gap-2">
              {[
                { r: 'Admin', e: 'admin@modulus.com', p: 'Admin@123456' },
                { r: 'Manager', e: 'manager@modulus.com', p: 'Manager@123456' },
                { r: 'Employee', e: 'employee@modulus.com', p: 'Employee@123456' }
              ].map((acc) => (
                <button
                  key={acc.r}
                  onClick={() => { setEmail(acc.e); setPassword(acc.p); }}
                  className="flex items-center justify-between px-3 py-2 bg-white/3 hover:bg-white/6 rounded-lg group transition-all border border-white/4"
                >
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white font-mono uppercase">{acc.r}</span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{acc.e}</span>
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-600 mt-4 text-center">
              Closed registration system · Contact admin for access
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-700 mt-6">
          MODULUS ERP · Enterprise Resource Planning
        </p>
      </div>
    </div>
  );
}
