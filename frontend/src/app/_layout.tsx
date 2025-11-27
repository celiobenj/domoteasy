import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="FORM-LOGIN" />
        <Stack.Screen name="FORM-CADASTRO" />
        <Stack.Screen name="home" />
        <Stack.Screen name="FORM-GER.PERFIL" />
        <Stack.Screen name="project" />
        <Stack.Screen name="FORM-PERFIL" />
        <Stack.Screen name="technicians" />
        <Stack.Screen name="subscription" />
        <Stack.Screen name="devices" />
        <Stack.Screen name="FORM-GESTAO" />
        <Stack.Screen name="FORM-PROJETO" />
        <Stack.Screen name="FORM-ORCAMENTO" />
        <Stack.Screen name="FORM-CONTATO" />
        <Stack.Screen name="FORM-MANUAIS" />
        <Stack.Screen name="FORM-ASSINATURA" />
      </Stack>
    </AuthProvider>
  );
}
