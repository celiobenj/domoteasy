import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRecommendations } from './useRecommendations';
import { styles } from './styles';
import Checkbox from 'expo-checkbox';
import { theme } from '@/theme/theme';

export default function RecommendationsScreen() {
    const { items, loading, toggleItemSelection, handleGenerateBudget } = useRecommendations();

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
                <Text style={styles.title}>Recomendações</Text>
                <Text style={styles.subtitle}>
                    Baseado no seu perfil, selecionamos estes itens para você.
                </Text>
            </View>

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

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleGenerateBudget}>
                    <Text style={styles.buttonText}>Gerar Orçamento</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
