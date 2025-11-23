import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Linking, Alert } from 'react-native';
import { TechnicianService, Technician } from '@/services/TechnicianService';

export const useTechnicianDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [technician, setTechnician] = useState<Technician | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadTechnician(id);
        }
    }, [id]);

    const loadTechnician = async (technicianId: string) => {
        try {
            setLoading(true);
            const data = await TechnicianService.getById(technicianId);
            if (data) {
                setTechnician(data);
            } else {
                Alert.alert('Erro', 'Técnico não encontrado');
                router.back();
            }
        } catch (error) {
            console.error('Error loading technician details:', error);
            Alert.alert('Erro', 'Falha ao carregar detalhes');
        } finally {
            setLoading(false);
        }
    };

    const handleContact = () => {
        if (!technician) return;

        // Simulate opening WhatsApp
        const message = `Olá ${technician.name}, vi seu perfil no DomotEasy e gostaria de um orçamento.`;
        const url = `whatsapp://send?phone=${technician.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(message)}`;

        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                Alert.alert('Contato', `Ligue para: ${technician.phone}\nOu envie email para: ${technician.email}`);
            }
        });
    };

    return {
        technician,
        loading,
        handleContact,
    };
};
