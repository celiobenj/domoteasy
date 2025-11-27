import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="FORM-BEM-VINDO" />
        <Stack.Screen name="FORM-LOGIN" />
        <Stack.Screen name="FORM-CADASTRO" />
        <Stack.Screen name="FORM-HOME" />
        <Stack.Screen name="FORM-GER.PERFIL" />
        <Stack.Screen name="FORM-PERFIL" />
        <Stack.Screen name="FORM-CONTATO-DETALHE" />
        <Stack.Screen name="FORM-CONTATO" />
        <Stack.Screen name="FORM-ASSINATURA" />
        <Stack.Screen name="FORM-DISPOSITIVOS" />
        <Stack.Screen name="FORM-MANUAIS" />
        <Stack.Screen name="FORM-GESTAO" />
        <Stack.Screen name="FORM-PROJETO" />
        <Stack.Screen name="FORM-ORCAMENTO" />
        <Stack.Screen name="FORM-RECOMENDACOES" />
      </Stack>
    </AuthProvider>
  );
}
