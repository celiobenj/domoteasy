import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '../styles';
import { useSubscription } from '../useSubscription';
import { theme } from '@/theme/theme';

const PlansScreen = () => {
    const { plans, loadingPlans, handleSelectPlan, handleProceedToPayment } = useSubscription();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const onSelect = (plan: any) => {
        setSelectedId(plan.id);
        handleSelectPlan(plan);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Fazer Upgrade</Text>
                <View style={styles.headerSpacer} />
            </View>

            <Text style={styles.subtitle}>
                Escolha seu plano e desfrute de todas as vantagens do DomotEasy
            </Text>

            {loadingPlans ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Card Gratuito (Visual apenas) */}
                    <View style={[styles.planCard, { opacity: 0.7 }]}>
                        <View style={styles.planHeader}>
                            <Text style={styles.planName}>Comum</Text>
                            <View style={{ backgroundColor: '#E0E0E0', padding: 4, borderRadius: 4 }}>
                                <Text style={{ fontSize: 12 }}>Ativo</Text>
                            </View>
                        </View>
                        <Text style={styles.planPrice}>R$ 0,00 <Text style={styles.planPeriod}>para sempre</Text></Text>
                        <View style={styles.featureList}>
                            <Text style={styles.featureItem}>• Criar projeto de automação</Text>
                            <Text style={styles.featureItem}>• Receber recomendações de produtos</Text>
                        </View>
                    </View>

                    {plans.map((plan) => (
                        <TouchableOpacity
                            key={plan.id}
                            style={[
                                styles.planCard,
                                selectedId === plan.id && styles.selectedPlan
                            ]}
                            onPress={() => onSelect(plan)}
                            activeOpacity={0.8}
                        >
                            <View style={styles.planHeader}>
                                <Text style={styles.planName}>{plan.name}</Text>
                                {plan.recommended && (
                                    <View style={styles.recommendedBadge}>
                                        <Text style={styles.recommendedText}>Recomendado</Text>
                                    </View>
                                )}
                                {selectedId === plan.id && (
                                    <MaterialCommunityIcons name="check-circle" size={24} color={theme.colors.primary} />
                                )}
                                {selectedId !== plan.id && (
                                    <MaterialCommunityIcons name="checkbox-blank-outline" size={24} color={theme.colors.text} />
                                )}
                            </View>
                            <Text style={styles.planPrice}>
                                R$ {plan.price.toFixed(2).replace('.', ',')} <Text style={styles.planPeriod}>/{plan.period === 'monthly' ? 'mês' : 'mês'}</Text>
                            </Text>
                            <View style={styles.featureList}>
                                {plan.features.map((feature, index) => (
                                    <Text key={index} style={styles.featureItem}>• {feature}</Text>
                                ))}
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            )}

            <TouchableOpacity style={styles.button} onPress={handleProceedToPayment}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PlansScreen;
