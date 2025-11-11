import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SignUpData {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  id: string;
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await api.post('/usuario/cadastro', {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    });
    return response.data;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/usuario/login', {
      email: data.email,
      senha: data.senha,
    });
    return response.data;
  },

  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem('authToken', token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
  },
};
