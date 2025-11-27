import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { DeviceService, Device } from '@/services/DeviceService';

export const useDeviceForm = () => {
    const params = useLocalSearchParams();
    const deviceId = params.id as string | undefined;
    const isEditMode = Boolean(deviceId);

    const [loading, setLoading] = useState(isEditMode);
    const [saving, setSaving] = useState(false);

    // Form fields
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [purchaseLink, setPurchaseLink] = useState('');
    const [manualUrl, setManualUrl] = useState('');

    useEffect(() => {
        if (isEditMode) {
            loadDevice();
        }
    }, [deviceId]);

    const loadDevice = async () => {
        if (!deviceId) return;

        try {
            setLoading(true);
            const devices = await DeviceService.getAdminDevices();
            const device = devices.find(d => d.id === deviceId);

            if (device) {
                setName(device.name);
                setBrand(device.brand);
                setPrice(device.price.toString());
                setImage(device.image || '');
                setPurchaseLink(device.purchaseLink || '');
                setManualUrl(device.manualUrl || '');
            } else {
                Alert.alert('Erro', 'Dispositivo não encontrado.');
                router.back();
            }
        } catch (error) {
            console.error('Error loading device:', error);
            Alert.alert('Erro', 'Não foi possível carregar o dispositivo.');
            router.back();
        } finally {
            setLoading(false);
        }
    };

    const validateForm = (): boolean => {
        if (!name.trim()) {
            Alert.alert('Validação', 'Por favor, insira o nome do dispositivo.');
            return false;
        }

        if (!brand.trim()) {
            Alert.alert('Validação', 'Por favor, insira a marca do dispositivo.');
            return false;
        }

        if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
            Alert.alert('Validação', 'Por favor, insira um preço válido.');
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setSaving(true);

            const deviceData = {
                name: name.trim(),
                brand: brand.trim(),
                price: Number(price),
                image: image.trim() || undefined,
                purchaseLink: purchaseLink.trim() || undefined,
                manualUrl: manualUrl.trim() || undefined,
            };

            if (isEditMode && deviceId) {
                await DeviceService.updateDevice(deviceId, deviceData);
                Alert.alert(
                    'Sucesso',
                    'Dispositivo atualizado com sucesso!',
                    [{ text: 'OK', onPress: () => router.back() }]
                );
            } else {
                await DeviceService.createDevice(deviceData);
                Alert.alert(
                    'Sucesso',
                    'Dispositivo criado com sucesso!',
                    [{ text: 'OK', onPress: () => router.back() }]
                );
            }
        } catch (error) {
            console.error('Error saving device:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar o dispositivo.');
        } finally {
            setSaving(false);
        }
    };

    return {
        isEditMode,
        loading,
        saving,
        name,
        setName,
        brand,
        setBrand,
        price,
        setPrice,
        image,
        setImage,
        purchaseLink,
        setPurchaseLink,
        manualUrl,
        setManualUrl,
        handleSubmit,
    };
};
