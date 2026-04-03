import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({ children, allowedRoles }: RoleProtectedRouteProps) {
  const { role } = useAuth();

  if (!role || !allowedRoles.includes(role)) {
    // Redirect to their own dashboard
    const redirectMap: Record<string, string> = {
      admin: '/admin',
      manager: '/manager',
      employee: '/employee',
    };
    return <Navigate to={redirectMap[role || ''] || '/login'} replace />;
  }

  return <>{children}</>;
}
