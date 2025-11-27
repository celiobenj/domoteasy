import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAdminTechnicians } from './useAdminTechnicians';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { Technician } from '@/services/TechnicianService';

export default function TechnicianApprovalScreen() {
    const {
        technicians,
        loading,
        handleApprove,
        handleReject,
    } = useAdminTechnicians();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    const renderTechnicianCard = ({ item }: { item: Technician }) => (
        <View style={styles.technicianCard}>
            <View style={styles.cardHeader}>
                <View style={styles.technicianInfo}>
                    <Text style={styles.technicianName}>{item.name}</Text>
                    <Text style={styles.technicianSpecialty}>{item.specialty}</Text>
                </View>
                <View style={styles.pendingBadge}>
                    <Text style={styles.pendingBadgeText}>Pendente</Text>
                </View>
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    style={[styles.actionButton, styles.approveButton]}
                    onPress={() => handleApprove(item.id)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Aprovar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, styles.rejectButton]}
                    onPress={() => handleReject(item.id)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Rejeitar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Aprovação de Técnicos</Text>
                <View style={styles.headerSpacer} />
            </View>

            <FlatList
                data={technicians}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={renderTechnicianCard}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhum técnico pendente</Text>
                    </View>
                }
            />
        </View>
    );
}
