import { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionService } from '@/services/SubscriptionService';

export const useSubscription = () => {
    const { updateSubscriptionStatus, loadUserData } = useAuth();
    const { planId, planName } = useLocalSearchParams<{ planId: string; planName: string }>();

    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubscribe = async () => {
        if (!planId) {
            Alert.alert('Erro', 'Plano não selecionado. Por favor, volte e selecione um plano.');
            return;
        }

        try {
            setLoading(true);

            // Simula delay de processamento (1-2 segundos)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Chama backend para criar assinatura + pagamento simulado
            await SubscriptionService.subscribe(planId, {
                cardNumber,
                cardName,
                cardExpiry,
                cardCvv,
            });

            // Atualiza status local para Premium
            await updateSubscriptionStatus('premium');

            // Recarrega dados do usuário para garantir sincronização
            await loadUserData();

            // Show success notification
            setShowSuccess(true);

            // Redirect to home after delay
            setTimeout(() => {
                router.replace('/FORM-HOME');
            }, 2000);
        } catch (error: any) {
            console.error('Erro no pagamento:', error);
            Alert.alert(
                'Erro no Pagamento',
                error.message || 'Falha ao processar pagamento. Tente novamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        planId,
        planName: planName ? decodeURIComponent(planName) : 'Plano',
        loading,
        cardNumber,
        setCardNumber,
        cardName,
        setCardName,
        cardExpiry,
        setCardExpiry,
        cardCvv,
        setCardCvv,
        showSuccess,
        setShowSuccess,
        handleSubscribe,
    };
};
