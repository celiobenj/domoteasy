import React from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTechnicianList } from './useTechnicianList';
import { styles } from './styles';
import { TechnicianCard } from '@/components/technicianCard';
import { theme } from '@/theme/theme';

export default function TechnicianListScreen() {
    const {
        technicians,
        loading,
        searchQuery,
        handleSearch,
        handleTechnicianPress
    } = useTechnicianList();

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
                <Text style={styles.title}>Técnicos Disponíveis</Text>

                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons
                        name="magnify"
                        size={24}
                        color={theme.colors.text}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar por nome ou especialidade"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            <FlatList
                data={technicians}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TechnicianCard
                        technician={item}
                        onPress={handleTechnicianPress}
                    />
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum técnico encontrado.</Text>
                }
            />
        </View>
    );
}
