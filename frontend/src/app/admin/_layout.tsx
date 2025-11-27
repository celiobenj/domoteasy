import { Stack, router } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { theme } from '@/theme/theme';

export default function AdminLayout() {
    const { isAdmin, isLoading } = useAuth();

    useEffect(() => {
        // Redirect non-admin users to home
        if (!isLoading && !isAdmin()) {
            router.replace('/home');
        }
    }, [isLoading, isAdmin]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.background
            }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    // If not admin, show loading while redirecting
    if (!isAdmin()) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.background
            }}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    // Render admin stack navigation
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="users" options={{ headerShown: false }} />
            <Stack.Screen name="devices" options={{ headerShown: false }} />
            <Stack.Screen name="technicians" options={{ headerShown: false }} />
        </Stack>
    );
}
