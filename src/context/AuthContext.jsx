import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { ROLES, INITIAL_USERS } from '../utils/constants';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activeUser = authService.getCurrentUser();
    if (activeUser) {
      setUser(activeUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: loggedInUser } = await authService.login(email, password);
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = async (role) => {
    setLoading(true);
    try {
      const demoUser = INITIAL_USERS.find((u) => u.role === role);
      if (demoUser) {
        return await login(demoUser.email, 'password123');
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const { user: registeredUser } = await authService.register(userData);
      setUser(registeredUser);
      return registeredUser;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    loading,
    login,
    demoLogin,
    register,
    logout,
    isAdmin: user?.role === ROLES.ADMIN,
    isFaculty: user?.role === ROLES.FACULTY,
    isStudent: user?.role === ROLES.STUDENT,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
