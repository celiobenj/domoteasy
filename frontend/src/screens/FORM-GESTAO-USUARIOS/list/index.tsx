import React from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUserList } from './useUserList';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { User } from '@/services/UserService';

export default function UserListScreen() {
    const {
        users,
        loading,
        searchQuery,
        handleSearch,
        handleUserPress
    } = useUserList();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const renderUserCard = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.userCard}
            onPress={() => handleUserPress(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.userCardContent}>
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                </View>
                <View
                    style={[
                        styles.statusBadge,
                        item.status === 'active'
                            ? styles.statusBadgeActive
                            : styles.statusBadgeInactive
                    ]}
                >
                    <Text style={styles.statusText}>
                        {item.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gerenciar Usuários</Text>
                <View style={styles.headerSpacer} />
            </View>

            <View style={styles.searchContainer}>
                <MaterialCommunityIcons
                    name="magnify"
                    size={24}
                    color={theme.colors.text}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por nome ou email"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <FlatList
                data={users}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={renderUserCard}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
                }
            />
        </View>
    );
}
