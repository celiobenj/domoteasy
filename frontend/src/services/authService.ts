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
  async signUp(data: SignUpData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock success response
    return {
      token: 'mock-jwt-token',
      id: '1', // Mock ID consistent with TechnicianService
      role: 'user',
    };
  },

  async login(data: LoginData): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock success response with admin role for testing
    return {
      token: 'mock-jwt-token',
      id: '1', // Mock ID consistent with TechnicianService
      role: 'admin',
    };
  },

  async updateProfile(data: UpdateProfileData): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { message: 'Perfil atualizado com sucesso' };
  },

  async getUserName(): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'Usuário Mock';
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
