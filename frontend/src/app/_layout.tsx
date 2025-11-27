import { Stack } from 'expo-router';
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="welcome" />
        <Stack.Screen name="signIn" />
        <Stack.Screen name="signUp" />
        <Stack.Screen name="home" />
        <Stack.Screen name="editProfile" />
        <Stack.Screen name="project" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="technicians" />
        <Stack.Screen name="subscription" />
        <Stack.Screen name="devices" />
        <Stack.Screen name="admin" />
      </Stack>
    </AuthProvider>
  );
}
