import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '../context/authContext';
import TopBar from './layout/top-bar';
import { getUserPermissions } from '../lib/api';
import { useQuery } from '@tanstack/react-query';

interface UserPermissions {
  [key: string]: {
    read: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
}

// Map routes to their corresponding modules
const routeToModuleMap: Record<string, string> = {
  '/admin/dashboard': 'dashboard',
  '/admin/profile': 'profile',
  '/admin/certificates': 'certificates',
  '/admin/users': 'users',
  '/admin/volunteers': 'volunteers',
  '/admin/reports': 'reports',
  '/admin/formats': 'formats',
  '/admin/events': 'events',
  '/admin/jobs': 'jobs',
  '/admin/blogs': 'blogs',
  '/admin/causes': 'causes',
  '/admin/crowd-funding': 'crowdFunding',
  '/admin/forum': 'forum',
  '/admin/shop': 'shop',
};

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const [location] = useLocation();

  // Get user permissions
  const { data: permissions } = useQuery({
    queryKey: ["userPermissions", user?._id],
    queryFn: () => user?._id ? getUserPermissions(user._id) : Promise.resolve({ success: true, permissions: {} as UserPermissions }),
    enabled: !!user?._id,
  });

  // Check if user has access to the current route's module
  const hasModuleAccess = (path: string) => {
    // Always allow access to profile route
    if (path === '/admin/profile') return true;
    
    if (!user || !permissions) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    const module = routeToModuleMap[path];
    if (!module) return false;
    
    // Check if the module exists in permissions and has read access
    const modulePermissions = permissions.permissions?.[module];
    if (!modulePermissions) return false;
    
    // Check if read permission is explicitly set to true
    return modulePermissions.read === true;
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.warn("Redirecting to login - not authenticated");
    window.location.href = '/pages/admin/login';
    return null;
  }

  // Check module access
  if (!hasModuleAccess(location)) {
    console.warn("Redirecting to profile - no module access");
    window.location.href = '/admin/profile';
    return null;
  }

  return (
    <>
      <TopBar />
      {children}
    </>
  );
};

export default PrivateRoute;