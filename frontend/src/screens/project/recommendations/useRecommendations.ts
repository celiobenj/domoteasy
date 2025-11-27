import { useState, useEffect, useMemo } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Linking } from 'react-native';
import { ProjectService, Item, Device } from '@/services/ProjectService';

export const useRecommendations = () => {
    const { projectId } = useLocalSearchParams<{ projectId: string }>();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    useEffect(() => {
        if (projectId) {
            loadRecommendations(projectId);
        }
    }, [projectId]);

    const loadRecommendations = async (id: string) => {
        try {
            setLoading(true);
            const devices = await ProjectService.getRecommendations(id);
            // Initialize all as selected by default
            const itemsWithSelection = devices.map(d => ({ ...d, selected: true }));
            setItems(itemsWithSelection);
        } catch (error) {
            console.error('Error loading recommendations:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleItemSelection = (id: string) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const subtotal = useMemo(() => {
        return items
            .filter(item => item.selected)
            .reduce((sum, item) => sum + item.price, 0);
    }, [items]);

    const handleShowDetails = (device: Device) => {
        setSelectedDevice(device);
        setShowDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedDevice(null);
    };

    const handleOpenPurchaseLink = async (url: string) => {
        try {
            const supported = await Linking.canOpenURL(url);
            if (supported) {
                await Linking.openURL(url);
            } else {
                console.error('Cannot open URL:', url);
            }
        } catch (error) {
            console.error('Error opening URL:', error);
        }
    };

    const handleGenerateBudget = async () => {
        const selectedItems = items.filter(i => i.selected);

        // Sincroniza itens selecionados com o backend para permitir geração de orçamento
        if (projectId) {
            try {
                await ProjectService.updateItems(projectId as string, selectedItems.map(i => i.id));
            } catch (error) {
                console.error('Erro ao atualizar itens do projeto:', error);
            }
        }

        router.push({
            pathname: '/project/budget',
            params: {
                items: JSON.stringify(selectedItems),
                projectId
            }
        });
    };

    return {
        items,
        loading,
        subtotal,
        selectedDevice,
        showDetailsModal,
        toggleItemSelection,
        handleShowDetails,
        handleCloseDetails,
        handleOpenPurchaseLink,
        handleGenerateBudget,
    };
};
