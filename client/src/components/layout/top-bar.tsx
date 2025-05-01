'use client';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import Logout from '../auth/Logout';

const TopBar = () => {
  const [language, setLanguage] = useState<string>('en');
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 py-1 px-4 text-sm hidden md:block">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="https://facebook.com/supanshango" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://x.com/supanshango" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com/supanshango" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com/company/supanshango" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://youtube.com/@supanshango" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">Hi, {user.name.split(' ')[0]}</span>
              <span className="text-gray-400">|</span>
              <Logout />
            </>
          ) : (
            <>
              <a href="/pages/admin/login" className="text-gray-600 hover:text-primary transition-colors">Login</a>
              <span className="text-gray-400">|</span>
              <a href="/pages/admin/signup" className="text-gray-600 hover:text-primary transition-colors">Sign Up</a>
            </>
          )}

          <div className="relative ml-4">
            <select 
              className="text-gray-600 bg-transparent border-0 focus:ring-0 py-0 pl-0 pr-6 cursor-pointer"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
