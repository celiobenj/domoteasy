import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useBudget } from './useBudget';
import { styles } from './styles';
import { theme } from '@/theme/theme';

export default function BudgetScreen() {
    const { items, total, loading, handleSave, handleExit } = useBudget();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Orçamento Estimado</Text>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryTitle}>Itens Selecionados</Text>

                    {items.map((item, index) => (
                        <View key={`${item.id}-${index}`} style={styles.itemRow}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>
                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                            </Text>
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
