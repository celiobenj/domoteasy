import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export const useProfile = () => {
    const { userName, clearUserName, subscriptionStatus, isAdmin } = useAuth();

    const handleGoBack = () => {
        router.back();
    };

    const handleEditProfile = () => {
        router.push('/FORM-GER.PERFIL');
    };

    const handleUpgrade = () => {
        if (subscriptionStatus === 'premium') {
            router.push('/FORM-ASSINATURA');
        } else {
            router.push('/subscription/plans');
        }
    };

    const handleNavigateToAdmin = () => {
        router.push('./FORM-GESTAO');
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
