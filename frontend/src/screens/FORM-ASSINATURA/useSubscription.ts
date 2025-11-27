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
            router.push('/FORM-ASSINATURA/PAGAMENTO');
        } else {
            Alert.alert('Selecione um plano', 'Por favor, escolha um plano para continuar.');
        }
    };

    const handleSubscribe = async () => {
        if (!selectedPlan) {
            Alert.alert('Selecione um plano', 'Por favor, escolha um plano para continuar.');
            return;
        }

        try {
            setLoading(true);

            // Prepara dados de pagamento
            const paymentData = {
                cardNumber,
                cardName,
                cardExpiry,
                cardCvv,
            };

            // Chama backend para criar assinatura + pagamento
            await SubscriptionService.subscribe(selectedPlan.id, paymentData);

            // Atualiza status local para Premium
            await updateSubscriptionStatus('premium');

            // Show success notification
            setShowSuccess(true);

            // Redirect to home after delay
            setTimeout(() => {
                router.replace('/FORM-HOME');
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
