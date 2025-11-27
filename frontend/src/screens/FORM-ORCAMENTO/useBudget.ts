import { useState, useMemo } from 'react';
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

    const total = useMemo(() => {
        // REMOVED: Local calculation
        // return items.reduce((sum, item) => sum + item.price, 0);
        return 0; // Initial value, will be updated from backend
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
