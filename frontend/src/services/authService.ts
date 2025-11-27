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
  role?: 'user' | 'admin' | 'technician';
  erro?: string;
}

export interface ApiError {
  status: number;
  message: string;
}

export const authService = {
  /**
   * Real signup against backend: POST /usuario/cadastro
   */
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await api.post('/usuario/cadastro', data);
      // backend returns { token, id }
      return response.data as AuthResponse;
    } catch (error: any) {
      const message = error?.response?.data?.erro || 'Erro ao realizar cadastro';
      throw { status: error?.response?.status ?? 500, message } as ApiError;
    }
  },

  /**
   * Real login against backend: POST /usuario/login
   */
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/usuario/login', data);
      const auth = response.data as AuthResponse;

      // Definição simples de admin: email específico
      if (!auth.role) {
        auth.role = data.email === 'admin@domoteasy.com' ? 'admin' : 'user';
      }

      return auth;
    } catch (error: any) {
      const message = error?.response?.data?.erro || 'Erro ao fazer login';
      throw { status: error?.response?.status ?? 500, message } as ApiError;
    }
  },

  /**
   * Update password via PATCH /usuario/atualizar
   */
  async updateProfile(data: UpdateProfileData): Promise<{ message: string }> {
    try {
      await api.patch('/usuario/atualizar', data);
      return { message: 'Perfil atualizado com sucesso' };
    } catch (error: any) {
      const message = error?.response?.data?.erro || 'Erro ao atualizar perfil';
      throw { status: error?.response?.status ?? 500, message } as ApiError;
    }
  },

  /**
   * Get current user name from backend via GET /usuario/nome
   */
  async getUserName(): Promise<string> {
    try {
      const response = await api.get('/usuario/nome');
      // backend e-usuario.obterNome returns { nome: string }
      return response.data?.nome ?? '';
    } catch (error: any) {
      const message = error?.response?.data?.erro || 'Erro ao buscar nome do usuário';
      throw { status: error?.response?.status ?? 500, message } as ApiError;
    }
  },

  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem('authToken', token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('authToken');
  },

  async saveUserName(userName: string): Promise<void> {
    await AsyncStorage.setItem('userName', userName);
  },

  async getUserNameFromStorage(): Promise<string | null> {
    return await AsyncStorage.getItem('userName');
  },

  async saveUserId(id: string): Promise<void> {
    await AsyncStorage.setItem('userId', id);
  },

  async getUserId(): Promise<string | null> {
    return await AsyncStorage.getItem('userId');
  },

  async saveUserRole(role: 'user' | 'admin' | 'technician'): Promise<void> {
    await AsyncStorage.setItem('userRole', role);
  },

  async getUserRole(): Promise<'user' | 'admin' | 'technician' | null> {
    const role = await AsyncStorage.getItem('userRole');
    return role as 'user' | 'admin' | 'technician' | null;
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('userId');
  },
};
