import { useState } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import api from '../../services/api';

export const useEditProfile = () => {
    // Estados para os campos de senha
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Limpa erros ao digitar
    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleUpdateProfile = async () => {
        // 1. Validações Básicas
        if (!currentPassword) {
            setErrors((prev) => ({ ...prev, currentPassword: 'Senha atual é obrigatória' }));
            return;
        }
        if (!newPassword) {
            setErrors((prev) => ({ ...prev, newPassword: 'Nova senha é obrigatória' }));
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: 'As senhas não coincidem' }));
            return;
        }

        setLoading(true);

        try {
            // Fazer a chamada real à API
            await api.patch('/usuario/atualizar', {
                senhaAtual: currentPassword,
                novaSenha: newPassword
            });

            setShowSuccess(true);

            // Limpar os campos
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                // Volta para a Home após sucesso
                router.navigate('/home');
            }, 1500);

        } catch (error: any) {
            const errorMessage = error.response?.data?.erro || "Não foi possível atualizar o perfil.";
            Alert.alert("Erro", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        // Logout deve limpar a pilha e voltar para o Welcome/Login
        router.replace('/welcome');
    };

    const handleGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.navigate('/home');
        }
    };

    const handleNavigateHome = () => {
        router.navigate('/home');
    };

    return {
        // Values
        currentPassword, setCurrentPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        loading,
        showSuccess,
        errors,
        setShowSuccess,

        // Actions
        clearError,
        handleUpdateProfile,
        handleLogout,
        handleGoBack,
        handleNavigateHome
    };
};