import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthProviderProps, AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }

    setLoading(false);
  }, []);

  const setUserData = (user: User | null) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const removeUserData = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{ user, setUserData, removeUserData, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
