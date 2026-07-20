import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from './styles';
import { useSubscription } from './useSubscription';
import { theme } from '@/theme/theme';
import { SuccessCard } from '@/components/successCard';

const PaymentScreen = () => {
    const {
        planName,
        loading,
        cardNumber, setCardNumber,
        cardName, setCardName,
        cardExpiry, setCardExpiry,
        cardCvv, setCardCvv,
        showSuccess,
        setShowSuccess,
        handleSubscribe
    } = useSubscription();

    return (
        <View style={styles.container}>
            <SuccessCard
                visible={showSuccess}
                message="Você agora é Premium! 🎉"
                onHide={() => setShowSuccess(false)}
            />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pagamento</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Informação do Plano */}
                <View style={{ padding: 16, backgroundColor: theme.colors.primary, borderRadius: 12, marginBottom: 20 }}>
                    <Text style={{ color: theme.colors.onPrimary, fontSize: 14, fontWeight: '600', marginBottom: 4 }}>
                        Plano Selecionado
                    </Text>
                    <Text style={{ color: theme.colors.onPrimary, fontSize: 20, fontWeight: '700' }}>
                        {planName}
                    </Text>
                </View>

                {/* Aviso de Simulação */}
                <View style={{
                    padding: 12,
                    backgroundColor: '#FFF3CD',
                    borderRadius: 8,
                    marginBottom: 20,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <MaterialCommunityIcons name="information" size={20} color="#856404" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#856404', fontSize: 12, flex: 1 }}>
                        <Text style={{ fontWeight: '700' }}>MODO DEMO:</Text> Este é um pagamento simulado.
                        Clique em "Confirmar Pagamento" para ativar sua assinatura instantaneamente.
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Número do Cartão</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                        editable={!loading}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome no Cartão</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome como está no cartão"
                        value={cardName}
                        onChangeText={setCardName}
                        editable={!loading}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputContainer, styles.flex1]}>
                        <Text style={styles.label}>Validade</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM/AA"
                            value={cardExpiry}
                            onChangeText={setCardExpiry}
                            keyboardType="numeric"
                            maxLength={5}
                            editable={!loading}
                        />
                    </View>
                    <View style={[styles.inputContainer, styles.flex1]}>
                        <Text style={styles.label}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="123"
                            value={cardCvv}
                            onChangeText={setCardCvv}
                            keyboardType="numeric"
                            maxLength={3}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={[styles.button, loading && { opacity: 0.7 }]}
                onPress={handleSubscribe}
                disabled={loading}
            >
                {loading ? (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ActivityIndicator color={theme.colors.onPrimary} />
                        <Text style={[styles.buttonText, { marginLeft: 12 }]}>Processando...</Text>
                    </View>
                ) : (
                    <Text style={styles.buttonText}>Confirmar Pagamento</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default PaymentScreen;
