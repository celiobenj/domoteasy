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
  id: string;
  nome?: string;
  email?: string;
  role?: 'user' | 'admin' | 'technician';
  tipoAssinatura?: string;
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
      const response = await api.post('/usuario/cadastro', {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      });

      // Backend sends result.desc as response body directly
      // result.desc = { token, id }
      const { token, id } = response.data;

      // Fetch user info to get nome, email, and tipoAssinatura
      const infoResponse = await api.get('/usuario/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userInfo = infoResponse.data;

      return {
        token,
        id: String(id),
        nome: userInfo.nome,
        email: userInfo.email,
        tipoAssinatura: userInfo.tipoAssinatura,
        role: userInfo.tipoAssinatura?.toLowerCase() === 'admin' ? 'admin' : 'user',
      };
    } catch (error: any) {
      console.error('SignUp error:', error);
      console.error('Response data:', error.response?.data);

      // Backend sends errors directly in response.data.desc.erro if following the new pattern
      // Or response.data.erro if following the old pattern.
      // The user requested: return status: 400 with JSON { desc: { erro: "Message..." } }.
      // So axios error.response.data will be { desc: { erro: "..." } }.

      const errorData = error.response?.data;
      const errorMessage = errorData?.desc?.erro || errorData?.erro;

      if (errorMessage) {
        throw new Error(errorMessage);
      } else if (error.response?.status === 409) {
        throw new Error('Este e-mail já está cadastrado.');
      } else if (error.message === 'Network Error') {
        throw new Error('Erro de conexão. Verifique sua internet.');
      } else {
        throw new Error('Erro ao realizar cadastro. Tente novamente.');
      }
    }
  },

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/usuario/login', {
        email: data.email,
        senha: data.senha,
      });

      // Backend sends result.desc as response body directly
      const { token, id } = response.data;

      // Fetch user info to get nome, email, and tipoAssinatura
      const infoResponse = await api.get('/usuario/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userInfo = infoResponse.data;

      return {
        token,
        id: String(id),
        nome: userInfo.nome,
        email: userInfo.email,
        tipoAssinatura: userInfo.tipoAssinatura,
        role: userInfo.tipoAssinatura?.toLowerCase() === 'admin' ? 'admin' : 'user',
      };
    } catch (error: any) {
      console.error('Login error:', error);
      console.error('Response data:', error.response?.data);

      const errorData = error.response?.data;
      const errorMessage = errorData?.desc?.erro || errorData?.erro;

      if (errorMessage) {
        throw new Error(errorMessage);
      } else if (error.response?.status === 401) {
        throw new Error('Email ou senha inválidos.');
      } else if (error.message === 'Network Error') {
        throw new Error('Erro de conexão. Verifique sua internet.');
      } else {
        throw new Error('Erro ao fazer login. Tente novamente.');
      }
    }
  },

  async updateProfile(data: UpdateProfileData): Promise<{ message: string }> {
    try {
      await api.patch('/usuario/atualizar', data);
      return { message: 'Perfil atualizado com sucesso' };
    } catch (error: any) {
      const errorData = error?.response?.data;
      const message = errorData?.desc?.erro || errorData?.erro || 'Erro ao atualizar perfil';
      throw { status: error?.response?.status ?? 500, message } as ApiError;
    }
  },

  /**
   * Get current user name from backend via GET /usuario/nome
   */
  async getUserName(): Promise<string> {
    try {
      const response = await api.get('/usuario/nome');
      // Backend sends result.desc as response body directly
      return response.data.nome;
    } catch (error: any) {
      if (error.message === 'Network Error') {
        throw new Error('Erro de conexão. Verifique sua internet.');
      }
      throw new Error('Erro ao buscar nome do usuário.');
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

  async saveSubscriptionStatus(status: 'free' | 'premium'): Promise<void> {
    await AsyncStorage.setItem('subscriptionStatus', status);
  },

  async getSubscriptionStatus(): Promise<'free' | 'premium'> {
    const status = await AsyncStorage.getItem('subscriptionStatus');
    return (status as 'free' | 'premium') || 'free';
  },

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userName');
    await AsyncStorage.removeItem('userRole');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('subscriptionStatus');
  },
};
