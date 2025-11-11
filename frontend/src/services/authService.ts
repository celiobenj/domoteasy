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
}

export const authService = {
  async signUp(data: SignUpData): Promise<AuthResponse> {
    const response = await fetch('http://localhost:3000/usuario/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch('http://localhost:3000/usuario/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result;
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
