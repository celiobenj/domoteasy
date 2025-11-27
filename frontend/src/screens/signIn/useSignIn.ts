import { useState } from 'react';
import { router } from 'expo-router';
import { authService, LoginData } from '@/services/authService';
import { validateLogin, ValidationError } from '@/utils/validation';
import { useAuth } from '@/contexts/AuthContext';

export const useSignIn = () => {
    // Estados (Renomeados para inglês)
    const [stayConnected, setStayConnected] = useState(false);
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        senha: '', // Mantive 'senha' pois a interface LoginData do seu serviço espera isso
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    // Acessa o contexto de autenticação
    const { setUserName, setUserRole, setUserId, updateSubscriptionStatus } = useAuth();

    // Handlers
    const handleInputChange = (field: keyof LoginData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));

        // Limpa o erro específico do campo ao digitar
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSignIn = async () => {
        // 1. Validação
        const validation = validateLogin(formData.email, formData.senha);

        if (!validation.isValid) {
            const errorMap: Record<string, string> = {};
            validation.errors.forEach((error: ValidationError) => {
                errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
            return;
        }

        // 2. Chamada de API
        setLoading(true);
        try {
            const response = await authService.login(formData);
            await authService.saveToken(response.token);

            // Salvar e definir o role do usuário
            if (response.role) {
                await authService.saveUserRole(response.role);
                setUserRole(response.role);
            }

            // Salvar e definir o ID do usuário
            await authService.saveUserId(response.id);
            setUserId(response.id);

            // Salvar nome do usuário (agora vem do response)
            if (response.nome) {
                await authService.saveUserName(response.nome);
                setUserName(response.nome);
            }

            // Salvar e atualizar subscription status
            if (response.tipoAssinatura) {
                const subscriptionStatus = response.tipoAssinatura.toLowerCase().includes('premium') ? 'premium' : 'free';
                await authService.saveSubscriptionStatus(subscriptionStatus);
                await updateSubscriptionStatus(subscriptionStatus);
            }

            // Lógica de "Permanecer conectado" poderia ser salva aqui também

            setShowSuccess(true);

            // Navegação após sucesso
            setTimeout(() => {
                // Replace para não permitir voltar ao login com o botão 'voltar'
                router.replace('./home');
            }, 1000);

        } catch (error: any) {
            setErrors({
                submit: error.message || 'Erro ao fazer login'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleNavigateToSignUp = () => {
        router.push('./signUp');
    };

    const handleNavigateBack = () => {
        // Volta para a tela anterior (Welcome)
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('./welcome');
        }
    };

    // Retorna tudo que a View precisa
    return {
        formData,
        loading,
        errors,
        showSuccess,
        stayConnected,
        setStayConnected,
        setShowSuccess,
        handleInputChange,
        handleSignIn,
        handleNavigateToSignUp,
        handleNavigateBack
    };
};