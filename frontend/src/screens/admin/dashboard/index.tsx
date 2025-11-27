import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useDashboard } from './useDashboard';
import { theme } from '@/theme/theme';

const AdminDashboardScreen = () => {
    const {
        handleGoBack,
        handleNavigateToUsers,
        handleNavigateToDevices,
        handleNavigateToTechnicians,
    } = useDashboard();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Painel Admin</Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.cardsContainer}>
                    {/* Users Management Card */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={handleNavigateToUsers}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Gerenciar Usuários</Text>
                            <Text style={styles.cardDescription}>
                                Visualize e gerencie todos os usuários do sistema
                            </Text>
                        </View>
                        <View style={styles.cardIcon}>
                            <MaterialCommunityIcons
                                name="account-group"
                                size={28}
                                color={theme.colors.onPrimary}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Devices Management Card */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={handleNavigateToDevices}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Gerenciar Dispositivos</Text>
                            <Text style={styles.cardDescription}>
                                Controle o conteúdo e dispositivos disponíveis
                            </Text>
                        </View>
                        <View style={styles.cardIcon}>
                            <MaterialCommunityIcons
                                name="devices"
                                size={28}
                                color={theme.colors.onPrimary}
                            />
                        </View>
                    </TouchableOpacity>

                    {/* Technicians Approval Card */}
                    <TouchableOpacity
                        style={styles.card}
                        onPress={handleNavigateToTechnicians}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Aprovar Técnicos</Text>
                            <Text style={styles.cardDescription}>
                                Revise e aprove solicitações de técnicos
                            </Text>
                        </View>
                        <View style={styles.cardIcon}>
                            <MaterialCommunityIcons
                                name="account-check"
                                size={28}
                                color={theme.colors.onPrimary}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default AdminDashboardScreen;
