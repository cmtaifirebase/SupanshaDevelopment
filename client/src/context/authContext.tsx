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
  // Add other fields if needed
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
    console.log('Checking session...'); // Debug
    
    // Check localStorage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      console.log('Using stored user data'); // Debug
      setUser(JSON.parse(storedUser));
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: 'include',
      });
      console.log('Session check status:', res.status); // Debug

      if (res.ok) {
        const data = await res.json();
        console.log('User data:', data); // Debug
        const userData = data.user;
        setUser(userData);
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.warn('Session check failed, status:', res.status);
        setUser(null);
        localStorage.removeItem('user');
      }
    } catch (err) {
      console.error('Session check error:', err);
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
    console.log('Logging out'); // Debug
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      console.log('Logout response:', res.status); // Debug
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
      // Remove from localStorage
      localStorage.removeItem('user');
    }
  };

  const isAuthenticated = useMemo(() => !!user, [user]); // Memoize for stability
  console.log('Current auth state:', { user, isAuthenticated }); // Debug

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
