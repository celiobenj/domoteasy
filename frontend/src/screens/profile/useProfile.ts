import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export const useProfile = () => {
    const { userName, clearUserName, subscriptionStatus } = useAuth();

    const handleGoBack = () => {
        router.back();
    };

    const handleEditProfile = () => {
        router.push('/editProfile');
    };

    const handleUpgrade = () => {
        if (subscriptionStatus === 'premium') {
            router.push('/subscription/manage');
        } else {
            router.push('/subscription/plans');
        }
    };

    const handleLogout = async () => {
        await authService.logout();
        clearUserName();
        router.replace('/');
    };

    return {
        userName,
        subscriptionStatus,
        handleGoBack,
        handleEditProfile,
        handleUpgrade,
        handleLogout,
    };
};
