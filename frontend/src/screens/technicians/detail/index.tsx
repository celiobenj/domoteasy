import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTechnicianDetail } from './useTechnicianDetail';
import { styles } from './styles';
import { theme } from '@/theme/theme';

export default function TechnicianDetailScreen() {
    const { technician, loading, handleContact } = useTechnicianDetail();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!technician) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Técnico não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do Técnico</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {technician.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </Text>
                    </View>
                    <Text style={styles.name}>{technician.name}</Text>
                    <Text style={styles.specialty}>{technician.specialty}</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Sobre</Text>
                        <Text style={styles.description}>{technician.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Avaliação</Text>
                        <View style={styles.ratingContainer}>
                            <MaterialCommunityIcons name="star" size={24} color="#FFD700" />
                            <Text style={styles.ratingText}>{technician.rating.toFixed(1)} / 5.0</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contato</Text>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="email" size={20} color={theme.colors.text} />
                            <Text style={styles.infoText}>{technician.email}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="phone" size={20} color={theme.colors.text} />
                            <Text style={styles.infoText}>{technician.phone}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.contactButton} onPress={handleContact}>
                    <MaterialCommunityIcons name="whatsapp" size={24} color={theme.colors.white} />
                    <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
