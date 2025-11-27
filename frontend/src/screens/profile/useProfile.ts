import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export const useProfile = () => {
    const { userName, clearUserName, subscriptionStatus, isAdmin } = useAuth();

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

    const handleNavigateToAdmin = () => {
        router.push('./admin');
    };

    const handleLogout = async () => {
        await authService.logout();
        clearUserName();
        router.replace('/');
    };

    return {
        userName,
        subscriptionStatus,
        isAdmin,
        handleGoBack,
        handleEditProfile,
        handleUpgrade,
        handleNavigateToAdmin,
        handleLogout,
    };
};
