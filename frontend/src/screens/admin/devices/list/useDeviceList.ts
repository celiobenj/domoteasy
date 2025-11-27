import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { DeviceService, Device } from '@/services/DeviceService';

export const useDeviceList = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDevices();
    }, []);

    const loadDevices = async () => {
        try {
            setLoading(true);
            const data = await DeviceService.getAdminDevices();
            setDevices(data);
        } catch (error) {
            console.error('Error loading devices:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dispositivos.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddDevice = () => {
        router.push('/admin/devices/create');
    };

    const handleEditDevice = (id: string) => {
        router.push({ pathname: '/admin/devices/[id]', params: { id } });
    };

    const handleDeleteDevice = (id: string, name: string) => {
        Alert.alert(
            'Confirmar Exclusão',
            `Tem certeza que deseja excluir "${name}"?`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            const success = await DeviceService.deleteDevice(id);
                            if (success) {
                                Alert.alert('Sucesso', 'Dispositivo excluído com sucesso.');
                                loadDevices();
                            } else {
                                Alert.alert('Erro', 'Não foi possível excluir o dispositivo.');
                            }
                        } catch (error) {
                            console.error('Error deleting device:', error);
                            Alert.alert('Erro', 'Ocorreu um erro ao excluir o dispositivo.');
                        }
                    },
                },
            ]
        );
    };

    return {
        devices,
        loading,
        handleAddDevice,
        handleEditDevice,
        handleDeleteDevice,
    };
};
