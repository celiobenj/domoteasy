import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { UserService, User } from '@/services/UserService';
import { Alert } from 'react-native';

export const useUserDetail = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Local state for editing
    const [status, setStatus] = useState<'active' | 'inactive'>('active');
    const [subscriptionType, setSubscriptionType] = useState<'common' | 'premium'>('common');

    useEffect(() => {
        if (id) {
            loadUser(id);
        }
    }, [id]);

    const loadUser = async (userId: string) => {
        try {
            setLoading(true);
            const data = await UserService.getUserById(userId);
            if (data) {
                setUser(data);
                setStatus(data.status);
                setSubscriptionType(data.subscriptionType);
            }
        } catch (error) {
            console.error('Error loading user:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleStatus = () => {
        setStatus(prev => prev === 'active' ? 'inactive' : 'active');
    };

    const changeSubscription = (type: 'common' | 'premium') => {
        setSubscriptionType(type);
    };

    const saveChanges = async () => {
        if (!user || !id) return;

        try {
            setSaving(true);
            const updatedUser = await UserService.updateUser(id, {
                status,
                subscriptionType,
            });

            if (updatedUser) {
                setUser(updatedUser);
                Alert.alert(
                    'Sucesso',
                    'As alterações foram salvas com sucesso!',
                    [
                        {
                            text: 'OK',
                            onPress: () => router.back(),
                        },
                    ]
                );
            }
        } catch (error) {
            console.error('Error updating user:', error);
            Alert.alert(
                'Erro',
                'Não foi possível salvar as alterações. Tente novamente.'
            );
        } finally {
            setSaving(false);
        }
    };

    return {
        user,
        loading,
        saving,
        status,
        subscriptionType,
        toggleStatus,
        changeSubscription,
        saveChanges,
    };
};
