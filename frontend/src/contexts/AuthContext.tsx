import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userName: string | null;
  userRole: 'user' | 'admin' | null;
  subscriptionStatus: 'free' | 'premium';
  isLoading: boolean;
  setUserName: (name: string) => void;
  setUserRole: (role: 'user' | 'admin') => void;
  updateSubscriptionStatus: (status: 'free' | 'premium') => Promise<void>;
  clearUserName: () => void;
  loadUserData: () => Promise<void>;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<'free' | 'premium'>('free');
  const [isLoading, setIsLoading] = useState(true);

  // Carrega dados do usuário ao iniciar o app
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      const storedSubscription = await AsyncStorage.getItem('subscriptionStatus');
      const storedRole = await AsyncStorage.getItem('userRole');

      if (storedName) {
        setUserName(storedName);
      }
      if (storedSubscription) {
        setSubscriptionStatus(storedSubscription as 'free' | 'premium');
      }
      if (storedRole) {
        setUserRole(storedRole as 'user' | 'admin');
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateSubscriptionStatus = async (status: 'free' | 'premium') => {
    setSubscriptionStatus(status);
    await AsyncStorage.setItem('subscriptionStatus', status);
  };

  const clearUserName = () => {
    setUserName(null);
    setUserRole(null);
    setSubscriptionStatus('free');
    AsyncStorage.removeItem('userName');
    AsyncStorage.removeItem('userRole');
    AsyncStorage.removeItem('subscriptionStatus');
  };

  const isAdmin = (): boolean => {
    return userRole === 'admin';
  };

  const value: AuthContextType = {
    userName,
    userRole,
    subscriptionStatus,
    isLoading,
    setUserName,
    setUserRole,
    updateSubscriptionStatus,
    clearUserName,
    loadUserData,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
