import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import api from '../../services/api';
import { authService } from '../../services/authService';
import { TechnicianService } from '../../services/TechnicianService';
import { useAuth } from '@/contexts/AuthContext';

export const useEditProfile = () => {
    // Estados para os campos de senha
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Estados para Técnico
    const [isTechnician, setIsTechnician] = useState(false);
    const [specialty, setSpecialty] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) {
            // Se não houver ID, redireciona para o login ou welcome
            router.replace('/FORM-BEM-VINDO');
            return;
        }
        checkUserRole();
    }, [userId]);

    const checkUserRole = async () => {
        const role = await authService.getUserRole();
        if (role === 'technician') {
            setIsTechnician(true);
            loadTechnicianData();
        }
    };

    const loadTechnicianData = async () => {
        if (!userId) return;

        const tech = await TechnicianService.getById(userId);
        if (tech) {
            setSpecialty(tech.specialty);
            setPhone(tech.phone);
        }
    };

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
        if (!userId) {
            Alert.alert("Erro", "Usuário não identificado.");
            return;
        }

        setErrors({}); // Limpar erros anteriores

        // REMOVED: Client-side validation
        // The Frontend is now a "Dummy View" that sends raw data to the Backend.

        setLoading(true);

        try {
            // Atualizar Senha (se preenchida)
            if (newPassword) {
                await api.patch('/usuario/atualizar', {
                    senhaAtual: currentPassword,
                    novaSenha: newPassword
                });
            }

            // Atualizar Dados de Técnico
            if (isTechnician) {
                await TechnicianService.updateTechnicianData(userId, {
                    specialty,
                    phone
                });
            }

            setShowSuccess(true);

            // Limpar os campos de senha
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

            setTimeout(() => {
                // Volta para a Home após sucesso
                router.navigate('/FORM-HOME');
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
        router.replace('/FORM-BEM-VINDO');
    };

    const handleGoBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.navigate('/FORM-HOME');
        }
    };

    const handleNavigateHome = () => {
        router.navigate('/FORM-HOME');
    };

    return {
        // Values
        currentPassword, setCurrentPassword,
        newPassword, setNewPassword,
        confirmPassword, setConfirmPassword,
        isTechnician,
        specialty, setSpecialty,
        phone, setPhone,
        loading,
        showSuccess,
        errors,
        setShowSuccess,
        showPassword,
        setShowPassword,

        // Actions
        clearError,
        handleUpdateProfile,
        handleLogout,
        handleGoBack,
        handleNavigateHome
    };
};