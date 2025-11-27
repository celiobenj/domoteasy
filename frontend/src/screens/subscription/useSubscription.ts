import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionService, Plan } from '@/services/SubscriptionService';

export const useSubscription = () => {
    const { subscriptionStatus, updateSubscriptionStatus } = useAuth();
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loadingPlans, setLoadingPlans] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [loading, setLoading] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardExpiry, setCardExpiry] = useState('');
    const [cardCvv, setCardCvv] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            setLoadingPlans(true);
            const fetchedPlans = await SubscriptionService.getPlans();
            setPlans(fetchedPlans);
        } catch (error) {
            console.error('Failed to load plans:', error);
            Alert.alert('Erro', 'Não foi possível carregar os planos.');
        } finally {
            setLoadingPlans(false);
        }
    };

    const handleSelectPlan = (plan: Plan) => {
        setSelectedPlan(plan);
    };

    const handleProceedToPayment = () => {
        if (selectedPlan) {
            router.push('/subscription/payment');
        } else {
            Alert.alert('Selecione um plano', 'Por favor, escolha um plano para continuar.');
        }
    };

    const handleSubscribe = async () => {
        // TESTING MODE: Removed all validations for easy premium testing
        // No card validation, no Luhn algorithm, no field checks

        try {
            setLoading(true);

            // Simulate API delay for realism (very short)
            await new Promise(resolve => setTimeout(resolve, 500));

            // Immediately upgrade to premium status
            await updateSubscriptionStatus('premium');

            // Show success notification
            setShowSuccess(true);

            // Redirect to home after delay
            setTimeout(() => {
                router.replace('/home');
            }, 1500);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao processar pagamento. Tente novamente.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        try {
            setLoading(true);
            await SubscriptionService.cancelSubscription();
            await updateSubscriptionStatus('free');
            Alert.alert('Cancelado', 'Sua assinatura foi cancelada.', [
                { text: 'OK', onPress: () => router.back() }
            ]);
        } catch (error) {
            Alert.alert('Erro', 'Falha ao cancelar assinatura.');
        } finally {
            setLoading(false);
        }
    };

    return {
        plans,
        loadingPlans,
        selectedPlan,
        loading,
        subscriptionStatus,
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
        handleSelectPlan,
        handleProceedToPayment,
        handleSubscribe,
        handleCancelSubscription,
    };
};
