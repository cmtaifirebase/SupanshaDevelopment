import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/authContext';
import TopBar from './layout/top-bar';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading, user } = useAuth(); // Add user for debugging
  const [, navigate] = useLocation();

  console.log("PrivateRoute auth state:", { 
    isAuthenticated, 
    loading, 
    user 
  });

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    console.warn("Redirecting to login - not authenticated");
    navigate('/pages/admin/login');
    return null;
  }

  return <>
  <TopBar />
  {children}
  </>;
};

export default PrivateRoute;