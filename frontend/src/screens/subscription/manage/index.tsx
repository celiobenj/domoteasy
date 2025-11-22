import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '../styles';
import { useSubscription } from '../useSubscription';
import { theme } from '@/theme/theme';

const ManageSubscriptionScreen = () => {
    const { loading, handleCancelSubscription } = useSubscription();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Gerenciar Assinatura</Text>
            </View>

            <View style={styles.statusContainer}>
                <MaterialCommunityIcons name="check-decagram" size={80} color={theme.colors.success} />
                <Text style={styles.statusText}>Você é Premium!</Text>
                <Text style={styles.subtitle}>Sua assinatura está ativa.</Text>
            </View>

            <TouchableOpacity
                style={[styles.cancelButton, loading && { opacity: 0.7 }]}
                onPress={handleCancelSubscription}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color={theme.colors.onPrimary} />
                ) : (
                    <Text style={styles.buttonText}>Cancelar Assinatura</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default ManageSubscriptionScreen;
