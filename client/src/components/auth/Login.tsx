import React, { useState, FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../../context/authContext';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config';


interface LoginData {
  email: string;
  password: string;
}

interface UserGeo {
  country: string | null;
  state: string | null;
  region: string | null;
  district: string | null;
  block: string | null;
  area: string | null;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  designation: string | null;
  level: number;
  geo: UserGeo;
}

interface LoginResponse {
  success: boolean;
  user: User;
}

async function loginUser(data: LoginData): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
}

function Login() {
  const { login, loading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState<LoginData>({ email: '', password: '' });

  const { mutate, isPending, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      try {
        // Ensure login completes before navigation
        await login(data.user as any);
        
        toast({
          title: 'Success',
          description: 'Logged in successfully',
        });
        
        // Add slight delay to ensure state propagation
        
        if(!loading) {
          navigate('/admin/profile');
        }
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to update authentication state',
          variant: 'destructive',
        });
      }
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
          <span className="text-orange-600 font-semibold text-lg">Empowering Local to Global Impact</span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Phone"
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
            {isPending ? 'Logging in...' : 'Login'}
          </button>

          {error && <p className="text-red-500 text-sm">{(error as Error).message}</p>}

          <div className="flex items-center justify-between space-x-2">
            <button type="button" className="flex-1 flex items-center justify-center py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5 mr-2" /> Google
            </button>
            <button type="button" className="flex-1 flex items-center justify-center py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <img src="/facebook-icon.svg" alt="Facebook" className="h-5 w-5 mr-2" /> Facebook
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center mt-6 space-y-2 text-sm">
          <a href="/forgot-password" className="text-orange-500 hover:underline">Forgot Password?</a>
          <span>Don&apos;t have an account? <a href="/pages/admin/signup" className="text-orange-500 font-semibold hover:underline">Sign up</a></span>
        </div>
      </div>
    </div>
  );
}

export default Login;