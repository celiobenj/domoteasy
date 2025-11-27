import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useDeviceList } from './useDeviceList';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { Device } from '@/services/DeviceService';

export default function DeviceListScreen() {
    const {
        devices,
        loading,
        handleAddDevice,
        handleEditDevice,
        handleDeleteDevice,
    } = useDeviceList();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const renderDeviceCard = ({ item }: { item: Device }) => (
        <View style={styles.deviceCard}>
            <View style={styles.deviceCardContent}>
                <View style={styles.deviceThumbnail}>
                    <MaterialCommunityIcons
                        name="devices"
                        size={28}
                        color={theme.colors.onPrimary}
                    />
                </View>
                <View style={styles.deviceInfo}>
                    <Text style={styles.deviceName}>{item.name}</Text>
                    <Text style={styles.deviceBrand}>{item.brand}</Text>
                </View>
                <View style={styles.deviceActions}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => handleEditDevice(item.id)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="edit" size={20} color={theme.colors.onPrimary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={() => handleDeleteDevice(item.id, item.name)}
                        activeOpacity={0.7}
                    >
                        <MaterialIcons name="delete" size={20} color={theme.colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Gerenciar Dispositivos</Text>
                <View style={styles.headerSpacer} />
            </View>

            <FlatList
                data={devices}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={renderDeviceCard}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>Nenhum dispositivo cadastrado.</Text>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={handleAddDevice}
                activeOpacity={0.8}
            >
                <MaterialIcons name="add" size={28} color={theme.colors.onPrimary} />
            </TouchableOpacity>
        </View>
    );
}
