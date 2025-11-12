import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './api';

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
  id?: string;
  erro?: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await api.post('/usuario/cadastro', data);
      return response.data as AuthResponse;
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        const result = err.response.data || {};
        if (status === 409) {
          throw {
            status: 409,
            message: 'Este email já está cadastrado'
          } as ApiError;
        }
        throw {
          status,
          message: result.erro || 'Erro ao fazer cadastro'
        } as ApiError;
      }
      throw { status: 0, message: 'Erro de conexão' } as ApiError;
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/usuario/login', data);
      return response.data as AuthResponse;
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        const result = err.response.data || {};
        if (status === 401) {
          throw { status: 401, message: 'Email ou senha inválidos' } as ApiError;
        }
        throw { status, message: result.erro || 'Erro ao fazer login' } as ApiError;
      }
      throw { status: 0, message: 'Erro de conexão' } as ApiError;
    }
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
