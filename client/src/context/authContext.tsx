import { API_BASE_URL } from '@/config';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  level?: number;
  geo?: {
    country?: string;
    state?: string;
    region?: string;
    district?: string;
    block?: string;
    area?: string;
  };
  permissions?: Record<string, {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  }>;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => Promise.resolve(),
  isAuthenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage if available
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    
    // Check localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    try {

      // only fetch user data if user is logged in
      if (user) {

      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        const userData = data.user;
        setUser(userData);
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('user');
      }
      }
    } catch (err) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (userData: User) => {
    return new Promise<void>((resolve) => {
      setUser(userData);
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      // Force a React state update cycle to complete
      setTimeout(resolve, 0);
    });
  };

  const logout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
    } finally {
      setUser(null);
      // Remove from localStorage
      localStorage.removeItem('user');
      // if users are in local storage, remove them
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        localStorage.removeItem('users');
      }
    }
  };

  const isAuthenticated = useMemo(() => !!user, [user]); // Memoize for stability

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
