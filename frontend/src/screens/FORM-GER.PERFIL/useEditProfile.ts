import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import api from '../../services/api';
import { isValidPassword, isValidPhone } from '../../utils/validation';
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

        // 1. Validações Básicas (Senha)
        if (currentPassword || newPassword || confirmPassword) {
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

            // 2. Validar critérios da nova senha
            const validationError = isValidPassword(newPassword);
            if (validationError) {
                setErrors((prev) => ({ ...prev, newPassword: validationError.message }));
                return;
            }
        }

        // Validações de Técnico
        if (isTechnician) {
            if (!specialty.trim()) {
                setErrors((prev) => ({ ...prev, specialty: 'Especialidade é obrigatória' }));
                return;
            }
            if (!phone.trim()) {
                setErrors((prev) => ({ ...prev, phone: 'Telefone é obrigatório' }));
                return;
            }
            if (!isValidPhone(phone)) {
                setErrors((prev) => ({ ...prev, phone: 'Formato inválido: (XX) XXXXX-XXXX' }));
                return;
            }
        }

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