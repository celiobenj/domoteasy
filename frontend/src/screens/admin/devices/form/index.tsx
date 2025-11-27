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
        videoUrl,
        setVideoUrl,
        pdfUrl,
        setPdfUrl,
        handleSubmit,
        handleDelete,
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
                        title="URL do Vídeo (Manual)"
                        placeholder="https://youtube.com/..."
                        value={videoUrl}
                        onChangeText={setVideoUrl}
                        icon="play-circle-outline"
                    />

                    <InputTitle
                        title="URL do PDF (Manual)"
                        placeholder="/manuals/..."
                        value={pdfUrl}
                        onChangeText={setPdfUrl}
                        icon="file-pdf-box"
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            title={saving ? 'Salvando...' : isEditMode ? 'Salvar Alterações' : 'Criar Dispositivo'}
                            onPress={handleSubmit}
                            disabled={saving}
                        />

                        {isEditMode && (
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={handleDelete}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.deleteButtonText}>
                                    Excluir Dispositivo
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
