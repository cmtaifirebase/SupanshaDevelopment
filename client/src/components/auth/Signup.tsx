import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/authContext';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config';


interface SignupData {
  name: string;
  email: string;
  password: string;
  accountType: 'member' | 'organization';
}

interface SignupResponse {
  success: boolean;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    designation: string | null;
    level: number;
    geo: {
      country: string | null;
      state: string | null;
      region: string | null;
      district: string | null;
      block: string | null;
      area: string | null;
    };
  };
}

async function registerUser(data: SignupData): Promise<SignupResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Signup failed');
  }

  return res.json();
}

function Signup() {
  const { login } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    accountType: 'member',
  });

  const { mutate, isPending, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      login(data.user );
      toast({
        title: 'Success',
        description: 'Account created successfully',
      });
      navigate('/admin/dashboard');
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-100 to-cream-50">
      <div className="w-full max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl animate-fadeIn">
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.png" alt="NGO Logo" className="h-14 mb-2" />
          <span className="text-orange-600 font-semibold text-lg">Join the Movement — Sign Up</span>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          {['member', 'organization'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, accountType: type as 'member' | 'organization' }))
              }
              className={`px-4 py-2 rounded-full font-medium ${
                formData.accountType === type
                  ? 'bg-orange-500 text-white shadow'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {type === 'member' ? 'Member' : 'Organization'}
            </button>
          ))}
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-300 transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-300 transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-300 transition"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 rounded-lg bg-orange-500 text-white font-bold text-lg shadow hover:bg-orange-600 transition"
          >
            {isPending ? 'Signing up...' : 'Create Account'}
          </button>

          {error && <p className="text-red-500 text-sm">{(error as Error).message}</p>}
        </form>

        <div className="flex flex-col items-center mt-6 space-y-2 text-sm">
          <span>
            Already have an account?{' '}
            <a href="/pages/admin/login" className="text-orange-500 font-semibold hover:underline">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
