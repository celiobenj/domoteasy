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
        </View>
    );
}
