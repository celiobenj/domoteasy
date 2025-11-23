import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '../styles';
import { useSubscription } from '../useSubscription';
import { theme } from '@/theme/theme';
import { SuccessCard } from '@/components/successCard';

const PaymentScreen = () => {
    const {
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
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Número do Cartão</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChangeText={setCardNumber}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome no Cartão</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome como está no cartão"
                        value={cardName}
                        onChangeText={setCardName}
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
                    <ActivityIndicator color={theme.colors.onPrimary} />
                ) : (
                    <Text style={styles.buttonText}>Confirmar Pagamento</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default PaymentScreen;
