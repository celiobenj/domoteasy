import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecommendations } from './useRecommendations';
import { styles } from './styles';
import Checkbox from 'expo-checkbox';
import { theme } from '@/theme/theme';

export default function RecommendationsScreen() {
    const {
        items,
        loading,
        subtotal,
        selectedDevice,
        showDetailsModal,
        toggleItemSelection,
        handleShowDetails,
        handleCloseDetails,
        handleOpenPurchaseLink,
        handleGenerateBudget
    } = useRecommendations();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text style={{ marginTop: 10, ...theme.typography.styles.body }}>Buscando recomendações...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recomendações</Text>
                <View style={styles.headerSpacer} />
            </View>

            <Text style={styles.subtitle}>
                Baseado no seu perfil, selecionamos estes itens para você.
            </Text>

            <FlatList
                data={items}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.itemContainer}
                        onPress={() => toggleItemSelection(item.id)}
                    >
                        {/* Placeholder Image */}
                        <View style={styles.itemImage} />

                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemBrand}>{item.brand}</Text>
                            <Text style={styles.itemPrice}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                            </Text>

                            {/* Action Buttons */}
                            <View style={styles.itemActions}>
                                <TouchableOpacity
                                    style={styles.detailsButton}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        handleShowDetails(item);
                                    }}
                                >
                                    <Feather name="info" size={16} color={theme.colors.primary} />
                                    <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.purchaseLinkButton}
                                    onPress={(e) => {
                                        e.stopPropagation();
                                        handleOpenPurchaseLink(item.purchaseLink);
                                    }}
                                >
                                    <MaterialCommunityIcons name="open-in-new" size={16} color={theme.colors.primary} />
                                    <Text style={styles.purchaseLinkButtonText}>Link de Compra</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.checkboxContainer}>
                            <Checkbox
                                value={item.selected}
                                onValueChange={() => toggleItemSelection(item.id)}
                                color={item.selected ? theme.colors.primary : undefined}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Subtotal Footer */}
            <View style={styles.subtotalFooter}>
                <Text style={styles.subtotalLabel}>Subtotal:</Text>
                <Text style={styles.subtotalValue}>
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(subtotal)}
                </Text>
            </View>

            {/* Generate Budget Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleGenerateBudget}>
                    <Text style={styles.buttonText}>Gerar Orçamento</Text>
                </TouchableOpacity>
            </View>

            {/* Details Modal */}
            <Modal
                visible={showDetailsModal}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseDetails}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedDevice?.name}
                            </Text>
                            <TouchableOpacity onPress={handleCloseDetails}>
                                <Feather name="x" size={24} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalBody}>
                            <Text style={styles.modalBrand}>{selectedDevice?.brand}</Text>
                            <Text style={styles.modalPrice}>
                                {selectedDevice && new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(selectedDevice.price)}
                            </Text>

                            <Text style={styles.modalSectionTitle}>Descrição</Text>
                            <Text style={styles.modalDescription}>{selectedDevice?.description}</Text>

                            <Text style={styles.modalSectionTitle}>Especificações</Text>
                            {selectedDevice?.specs.map((spec, index) => (
                                <View key={index} style={styles.specRow}>
                                    <Text style={styles.specLabel}>{spec.label}:</Text>
                                    <Text style={styles.specValue}>{spec.value}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
