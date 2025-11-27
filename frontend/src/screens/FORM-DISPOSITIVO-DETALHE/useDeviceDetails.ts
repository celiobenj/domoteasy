import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { DeviceService, DeviceDetail } from '@/services/DeviceService';

export const useDeviceDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { subscriptionStatus } = useAuth();
    const [device, setDevice] = useState<DeviceDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDevice();
    }, [id]);

    const loadDevice = async () => {
        try {
            setLoading(true);
            if (id) {
                const data = await DeviceService.getDeviceById(id);
                setDevice(data);
            }
        } catch (error) {
            console.error('Error loading device:', error);
            Alert.alert('Erro', 'Não foi possível carregar os detalhes do dispositivo.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewManual = () => {
        if (subscriptionStatus === 'premium') {
            // Premium user: navigate to manual
            router.push(`/FORM-MANUAIS?id=${id}`);
        } else {
            // Free user: show upgrade alert
            Alert.alert(
                'Conteúdo Premium',
                'Os manuais de instalação são exclusivos para assinantes Premium. Faça upgrade para ter acesso!',
                [
                    { text: 'Agora não', style: 'cancel' },
                    {
                        text: 'Fazer Upgrade',
                        onPress: () => router.push('/FORM-ASSINATURA/PLANOS')
                    }
                ]
            );
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    return {
        device,
        loading,
        subscriptionStatus,
        handleViewManual,
        handleGoBack,
    };
};
