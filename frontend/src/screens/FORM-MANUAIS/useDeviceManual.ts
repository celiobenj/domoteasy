import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { DeviceService, DeviceManual } from '@/services/DeviceService';

export const useDeviceManual = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { subscriptionStatus } = useAuth();
    const [manual, setManual] = useState<DeviceManual | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Double-check premium access on mount
        if (subscriptionStatus !== 'premium') {
            Alert.alert(
                'Acesso Restrito',
                'Este conteúdo é exclusivo para assinantes Premium.',
                [
                    {
                        text: 'Fazer Upgrade',
                        onPress: () => router.replace('/FORM-ASSINATURA/PLANOS')
                    }
                ]
            );
            return;
        }

        loadManual();
    }, [id, subscriptionStatus]);

    const loadManual = async () => {
        try {
            setLoading(true);
            if (id) {
                const data = await DeviceService.getDeviceManual(id);
                if (!data) {
                    Alert.alert('Aviso', 'Manual não disponível para este dispositivo.');
                }
                setManual(data);
            }
        } catch (error) {
            console.error('Error loading manual:', error);
            Alert.alert('Erro', 'Não foi possível carregar o manual.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleOpenVideo = () => {
        if (manual?.videoUrl) {
            Alert.alert('Vídeo', `Abrindo: ${manual.videoUrl}`);
            // In a real app, this would open the video in a video player or browser
        }
    };

    const handleOpenPDF = () => {
        if (manual?.pdfUrl) {
            Alert.alert('PDF', `Abrindo: ${manual.pdfUrl}`);
            // In a real app, this would open the PDF viewer
        }
    };

    return {
        manual,
        loading,
        handleGoBack,
        handleOpenVideo,
        handleOpenPDF,
    };
};
