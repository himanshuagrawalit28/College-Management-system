import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLES, ROUTES } from '../utils/constants';

export const RoleRoute = ({ allowedRoles, children }) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to their own dashboard based on role
    if (role === ROLES.ADMIN) return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    if (role === ROLES.FACULTY) return <Navigate to={ROUTES.FACULTY_DASHBOARD} replace />;
    if (role === ROLES.STUDENT) return <Navigate to={ROUTES.STUDENT_DASHBOARD} replace />;
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return children;
};

export default RoleRoute;
