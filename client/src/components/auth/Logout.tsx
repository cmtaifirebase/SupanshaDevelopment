'use client';
import { useAuth } from '../../context/authContext';
import { useLocation } from 'wouter';

const Logout = () => {
  const { logout } = useAuth();
  const [, navigate] = useLocation();

  const handleLogout = async () => {
    await logout(); // clears session from backend and context
    navigate('/pages/admin/login'); // redirect to login
  };

  return (
    <button
      onClick={handleLogout}
      className="text-gray-600 hover:text-primary transition-colors"
    >
      Logout
    </button>
  );
};

export default Logout;
