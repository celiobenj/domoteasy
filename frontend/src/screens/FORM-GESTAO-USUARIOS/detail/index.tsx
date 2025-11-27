import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Switch } from 'react-native';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useUserDetail } from './useUserDetail';
import { styles } from './styles';
import { theme } from '@/theme/theme';

export default function UserDetailScreen() {
    const {
        user,
        loading,
        saving,
        status,
        subscriptionType,
        toggleStatus,
        changeSubscription,
        saveChanges,
    } = useUserDetail();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.errorText}>Usuário não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <MaterialIcons name="arrow-back" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do Usuário</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                            {user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                    <Text style={styles.role}>{user.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Status da Conta</Text>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>
                                {status === 'active' ? 'Conta Ativa' : 'Conta Inativa'}
                            </Text>
                            <Switch
                                value={status === 'active'}
                                onValueChange={toggleStatus}
                                trackColor={{ false: '#999', true: theme.colors.success }}
                                thumbColor={theme.colors.white}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Plano de Assinatura</Text>
                        <View style={styles.subscriptionButtons}>
                            <View style={styles.subscriptionButtonsRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.subscriptionButton,
                                        subscriptionType === 'common' && styles.subscriptionButtonActive
                                    ]}
                                    onPress={() => changeSubscription('common')}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.subscriptionButtonText,
                                            subscriptionType === 'common' && styles.subscriptionButtonTextActive
                                        ]}
                                    >
                                        Common
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.subscriptionButton,
                                        subscriptionType === 'premium' && styles.subscriptionButtonActive
                                    ]}
                                    onPress={() => changeSubscription('premium')}
                                    activeOpacity={0.7}
                                >
                                    <Text
                                        style={[
                                            styles.subscriptionButtonText,
                                            subscriptionType === 'premium' && styles.subscriptionButtonTextActive
                                        ]}
                                    >
                                        Premium
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                    onPress={saveChanges}
                    disabled={saving}
                    activeOpacity={0.7}
                >
                    {saving ? (
                        <>
                            <ActivityIndicator size="small" color={theme.colors.onPrimary} />
                            <Text style={[styles.saveButtonText, { marginLeft: theme.spacing.small }]}>
                                Salvando...
                            </Text>
                        </>
                    ) : (
                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}
