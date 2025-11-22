import { useState, useEffect } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { ProjectService, Item } from '@/services/ProjectService';

export const useRecommendations = () => {
    const { projectId } = useLocalSearchParams<{ projectId: string }>();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

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

    const handleGenerateBudget = () => {
        // Pass selected items to the budget screen
        // We can pass complex objects via params if they are not too large, 
        // or store them in a context/store. For simplicity, we'll pass the stringified JSON here
        // or better, save to service/storage and pass ID. 
        // Let's stick to the plan: "passing the selected items".

        const selectedItems = items.filter(i => i.selected);

        // Warning: Passing large data in params can be problematic. 
        // A better approach for production is using a global store or saving to backend first.
        // For this demo, we will stringify.
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
        toggleItemSelection,
        handleGenerateBudget,
    };
};
