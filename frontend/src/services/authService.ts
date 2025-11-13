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

export interface UpdateProfileData {
  senhaAtual: string;
  novaSenha: string;
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

  async updateProfile(data: UpdateProfileData): Promise<any> {
    try {
      const response = await api.patch('/usuario/atualizar', data);
      return response.data;
    } catch (err: any) {
      if (err.response) {
        const status = err.response.status;
        const result = err.response.data || {};
        if (status === 401) {
          throw { status: 401, message: 'Senha atual inválida' } as ApiError;
        }
        if (status === 400) {
          throw { status: 400, message: result.erro || 'Dados inválidos' } as ApiError;
        }
        throw { status, message: result.erro || 'Erro ao atualizar perfil' } as ApiError;
      }
      throw { status: 0, message: 'Erro de conexão' } as ApiError;
    }
  },

  async getUserName(): Promise<string> {
    try {
      const response = await api.get('/usuario/nome');
      return response.data.nome;
    } catch (err: any) {
      throw { status: 0, message: 'Erro ao obter nome do usuário' } as ApiError;
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
