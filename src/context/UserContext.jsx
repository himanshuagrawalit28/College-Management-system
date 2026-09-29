import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [currentSemester] = useState('Autumn Semester 2026');
  const [academicYear] = useState('2026-2027');

  const markAllNotificationsAsRead = () => {
    setUnreadNotifications(0);
  };

  const value = {
    unreadNotifications,
    currentSemester,
    academicYear,
    markAllNotificationsAsRead,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
