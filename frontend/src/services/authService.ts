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

// Helper function to map backend tipoAssinatura to frontend subscriptionStatus
const mapSubscriptionStatus = (tipoAssinatura?: string): 'free' | 'premium' => {
  if (!tipoAssinatura) return 'free';
  return tipoAssinatura.toLowerCase().includes('premium') ? 'premium' : 'free';
};


export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    try {
      const response = await api.post('/usuario/cadastro', {
        nome: data.nome,
        email: data.email,
        senha: data.senha,
      });

      // Backend returns: { status: 201, desc: { token: "...", id: number } }
      const { token, id } = response.data.desc;

      // Fetch user info to get nome, email, and tipoAssinatura
      const infoResponse = await api.get('/usuario/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userInfo = infoResponse.data.desc;

      return {
        token,
        id: String(id),
        nome: userInfo.nome,
        email: userInfo.email,
        tipoAssinatura: userInfo.tipoAssinatura,
        role: 'user', // Default role
      };
    } catch (error: any) {
      // Handle backend error responses
      if (error.response?.data?.erro) {
        throw new Error(error.response.data.erro);
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

      // Backend returns: { status: 200, desc: { token: "...", id: number } }
      const { token, id } = response.data.desc;

      // Fetch user info to get nome, email, and tipoAssinatura
      const infoResponse = await api.get('/usuario/info', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userInfo = infoResponse.data.desc;

      return {
        token,
        id: String(id),
        nome: userInfo.nome,
        email: userInfo.email,
        tipoAssinatura: userInfo.tipoAssinatura,
        role: 'user', // Default role - can be enhanced later
      };
    } catch (error: any) {
      // Handle backend error responses
      if (error.response?.data?.erro) {
        throw new Error(error.response.data.erro);
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { message: 'Perfil atualizado com sucesso' };
  },

  async getUserName(): Promise<string> {
    try {
      const response = await api.get('/usuario/nome');
      // Backend returns: { status: 200, desc: { nome: "..." } }
      return response.data.desc.nome;
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
