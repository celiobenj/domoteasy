import { useState, useMemo, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Linking } from 'react-native';
import { ProjectService, Item } from '@/services/ProjectService';

export const useBudget = () => {
    const { items: itemsParam, projectId } = useLocalSearchParams<{ items: string, projectId: string }>();

    const items: Item[] = useMemo(() => {
        try {
            return itemsParam ? JSON.parse(itemsParam) : [];
        } catch (e) {
            console.error('Error parsing items:', e);
            return [];
        }
    }, [itemsParam]);

    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    // Fetch budget total from backend when items change
    useEffect(() => {
        const fetchBudgetTotal = async () => {
            if (items.length === 0) {
                setTotal(0);
                return;
            }

            try {
                const itemIds = items.map(item => item.id);
                const result = await ProjectService.generateBudget(itemIds);
                setTotal(result.valorTotal);
            } catch (error) {
                console.error('Error fetching budget total:', error);
                // Fallback to local calculation if backend fails
                const localTotal = items.reduce((sum, item) => sum + item.price, 0);
                setTotal(localTotal);
            }
        };

        fetchBudgetTotal();
    }, [items]);

    const handleSave = async () => {
        try {
            setLoading(true);
            if (projectId) {
                await ProjectService.saveBudget(projectId, items);
                // Gera orçamento oficial no backend
                await ProjectService.generateBudget(items.map(i => i.id));
            }
            router.dismissAll();
            router.replace('/FORM-HOME');
        } catch (error) {
            console.error('Error saving budget:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExit = () => {
        router.dismissAll();
        router.replace('/FORM-HOME');
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

    return {
        items,
        total,
        loading,
        handleSave,
        handleExit,
        handleOpenPurchaseLink,
    };
};
