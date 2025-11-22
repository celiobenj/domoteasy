import { useState, useMemo } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
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
        return items.reduce((sum, item) => sum + item.price, 0);
    }, [items]);

    const handleSave = async () => {
        try {
            setLoading(true);
            if (projectId) {
                await ProjectService.saveBudget(projectId, items);
            }
            // Navigate to home or success screen
            router.dismissAll();
            router.replace('/home');
        } catch (error) {
            console.error('Error saving budget:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleExit = () => {
        router.dismissAll();
        router.replace('/home');
    };

    return {
        items,
        total,
        loading,
        handleSave,
        handleExit,
    };
};
