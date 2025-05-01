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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (userData: User) => {
    return new Promise<void>(resolve => {
      setUser(userData);
      // Force a React state update cycle to complete
      setTimeout(resolve, 0);
    });
  };
  const logout = async () => {
    console.log('Logging out'); // Debug
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      console.log('Logout response:', res.status); // Debug
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Checking session...'); // Debug
      try {
        const res = await fetch('http://localhost:5000/api/auth/me', {
          credentials: 'include',
        });
        console.log('Session check status:', res.status); // Debug

        if (res.ok) {
          const data = await res.json();
          console.log('User data:', data); // Debug
          setUser(data.user);
        } else {
          console.warn('Session check failed, status:', res.status);
          setUser(null);
        }
      } catch (err) {
        console.error('Session check error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Optional: Set up periodic session checks
    const interval = setInterval(fetchUser, 5 * 60 * 1000); // Check every 5 mins
    return () => clearInterval(interval);
  }, []);

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
