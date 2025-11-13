import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  userName: string | null;
  isLoading: boolean;
  setUserName: (name: string) => void;
  clearUserName: () => void;
  loadUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carrega dados do usuário ao iniciar o app
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearUserName = () => {
    setUserName(null);
    AsyncStorage.removeItem('userName');
  };

  const value: AuthContextType = {
    userName,
    isLoading,
    setUserName,
    clearUserName,
    loadUserData,
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
