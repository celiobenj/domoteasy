import { useState } from 'react';
import { router } from 'expo-router';
import { authService } from '@/services/authService'; // Certifique-se que o path está certo
import { validateSignUp, ValidationError } from '@/utils/validation';

export const useSignUp = () => {
    // Estados em Inglês
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [stayConnected, setStayConnected] = useState(false);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Handler genérico para limpar erros ao digitar
    const clearError = (field: string) => {
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSignUp = async () => {
        // 1. Validação
        // Note que validateSignUp espera (nome, email, senha, confirmaSenha) ou a ordem correta dos argumentos.
        // Verifique seu arquivo utils/validation.ts. Assumindo a ordem: nome, email, senha, confirma
        const validation = validateSignUp(name, email, password, confirmPassword);

        if (!validation.isValid) {
            const errorMap: Record<string, string> = {};
            validation.errors.forEach((error: ValidationError) => {
                // Traduzindo campos de erro se necessário, ou usando o que vem do validador
                // Se o validador retorna 'nome', mapeamos para nossa key de erro
                errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
            return;
        }

        setLoading(true);
        try {
            // 2. Preparar objeto para API (Mapeando Inglês -> Português se o backend exige)
            const signUpPayload = {
                nome: name,
                email: email,
                senha: password
            };

            const response = await authService.signUp(signUpPayload);
            await authService.saveToken(response.token);

            // Lógica de 'Manter Conectado' pode ser implementada aqui futuramente

            setShowSuccess(true);

            setTimeout(() => {
                // Replace para não voltar ao cadastro
                router.replace('/home');
            }, 1000);

        } catch (error: any) {
            setErrors({
                submit: error.message || 'Erro ao realizar cadastro'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToSignIn = () => {
        // Se já tem conta, vai para login.
        // Se veio do login, talvez 'back' seja melhor, mas o replace garante fluxo limpo.
        router.navigate('/signIn');
    };

    const handleNavigateBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/welcome');
        }
    };

    return {
        // Values
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        stayConnected, setStayConnected,
        loading,
        errors,
        showSuccess,
        setShowSuccess,

        // Actions
        clearError,
        handleSignUp,
        handleNavigateToSignIn,
        handleNavigateBack
    };
};