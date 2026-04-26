'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      router.push('/login');
    } catch (err) {
      setError('Something went wrong');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#8d4d4a] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1a1a1a]">FEDPONAM</h1>
              <p className="text-[#8d4d4a] text-sm font-medium">School Management</p>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-xl border border-[#f5f0eb]">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2">Create Account</h2>
            <p className="text-[#64748b]">Join FEDPONAM today</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl mb-6 text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-[#faf8f5] border-2 border-[#f5f0eb] rounded-xl text-[#1a1a1a] placeholder-[#94a3b8] focus:outline-none focus:border-[#8d4d4a] focus:bg-white transition-all"
                  placeholder="First name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-[#faf8f5] border-2 border-[#f5f0eb] rounded-xl text-[#1a1a1a] placeholder-[#94a3b8] focus:outline-none focus:border-[#8d4d4a] focus:bg-white transition-all"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-[#faf8f5] border-2 border-[#f5f0eb] rounded-xl text-[#1a1a1a] placeholder-[#94a3b8] focus:outline-none focus:border-[#8d4d4a] focus:bg-white transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-[#faf8f5] border-2 border-[#f5f0eb] rounded-xl text-[#1a1a1a] focus:outline-none focus:border-[#8d4d4a] focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-[#faf8f5] border-2 border-[#f5f0eb] rounded-xl text-[#1a1a1a] placeholder-[#94a3b8] focus:outline-none focus:border-[#8d4d4a] focus:bg-white transition-all"
                placeholder="Create a strong password"
                required
                minLength={6}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3.5 bg-[#faf8f5] border-2 border-[#f5f0eb] rounded-xl text-[#1a1a1a] placeholder-[#94a3b8] focus:outline-none focus:border-[#8d4d4a] focus:bg-white transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#8d4d4a] hover:bg-[#a65d58] text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-6"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.657A8 8 0 0112 12v0c-3.314 0-6-2.686-6-6h4z" />
                  </svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[#64748b]">
              Already have an account?{' '}
              <Link href="/login" className="text-[#8d4d4a] hover:text-[#a65d58] font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}