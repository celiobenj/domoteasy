import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useBudget } from './useBudget';
import { styles } from './styles';
import { theme } from '@/theme/theme';

export default function BudgetScreen() {
    const { items, total, loading, handleSave, handleExit, handleOpenPurchaseLink } = useBudget();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Orçamento Estimado</Text>
                <View style={styles.headerSpacer} />
            </View>

            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={{ marginTop: 16, color: theme.colors.textSecondary }}>
                        Carregando itens do projeto...
                    </Text>
                </View>
            ) : items.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                    <MaterialCommunityIcons name="package-variant" size={64} color={theme.colors.textSecondary} />
                    <Text style={{ marginTop: 16, fontSize: 18, fontWeight: '600', color: theme.colors.text }}>
                        Nenhum item encontrado
                    </Text>
                    <Text style={{ marginTop: 8, textAlign: 'center', color: theme.colors.textSecondary }}>
                        Este projeto ainda não possui dispositivos adicionados.
                    </Text>
                    <TouchableOpacity
                        style={[styles.saveButton, { marginTop: 24 }]}
                        onPress={handleExit}
                    >
                        <Text style={styles.saveButtonText}>Voltar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView style={styles.content}>
                        <View style={styles.summaryCard}>
                            <Text style={styles.summaryTitle}>Itens Selecionados</Text>

                            {items.map((item, index) => (
                                <View key={`${item.id}-${index}`} style={styles.itemRow}>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <Text style={styles.itemPrice}>
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.purchaseLinkButton}
                                        onPress={() => handleOpenPurchaseLink(item.purchaseLink)}
                                    >
                                        <MaterialCommunityIcons name="open-in-new" size={20} color={theme.colors.primary} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSave}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={theme.colors.onPrimary} />
                            ) : (
                                <Text style={styles.saveButtonText}>Salvar Orçamento</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.exitButton}
                            onPress={handleExit}
                            disabled={loading}
                        >
                            <Text style={styles.exitButtonText}>Sair sem salvar</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}
