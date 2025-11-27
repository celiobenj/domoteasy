import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useDeviceForm } from './useDeviceForm';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { InputTitle } from '@/components/inputTitle';
import { Button } from '@/components/button';

export default function DeviceFormScreen() {
    const {
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
    } = useDeviceForm();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {isEditMode ? 'Editar Dispositivo' : 'Novo Dispositivo'}
                </Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.formSection}>
                    <InputTitle
                        title="Nome *"
                        placeholder="Ex: Lâmpada Inteligente"
                        value={name}
                        onChangeText={setName}
                        icon="lightbulb-outline"
                    />

                    <InputTitle
                        title="Marca *"
                        placeholder="Ex: Philips Hue"
                        value={brand}
                        onChangeText={setBrand}
                        icon="tag"
                    />

                    <InputTitle
                        title="Preço (R$) *"
                        placeholder="Ex: 150.00"
                        value={price}
                        onChangeText={setPrice}
                        keyboardType="numeric"
                        icon="currency-usd"
                    />

                    <InputTitle
                        title="URL da Imagem"
                        placeholder="https://example.com/image.jpg"
                        value={image}
                        onChangeText={setImage}
                        icon="image"
                    />

                    <InputTitle
                        title="Link de Compra"
                        placeholder="https://example.com/produto"
                        value={purchaseLink}
                        onChangeText={setPurchaseLink}
                        icon="cart"
                    />

                    <InputTitle
                        title="Manual (URL Video/PDF)"
                        placeholder="https://youtube.com/..."
                        value={manualUrl}
                        onChangeText={setManualUrl}
                        icon="file-document"
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            title={saving ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Criar Dispositivo'}
                            onPress={handleSubmit}
                            disabled={saving}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
