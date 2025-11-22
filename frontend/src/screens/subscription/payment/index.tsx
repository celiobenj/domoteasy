import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { styles } from '../styles';
import { useSubscription } from '../useSubscription';
import { theme } from '@/theme/theme';

const PaymentScreen = () => {
    const {
        loading,
        cardNumber, setCardNumber,
        cardName, setCardName,
        cardExpiry, setCardExpiry,
        cardCvv, setCardCvv,
        handleSubscribe
    } = useSubscription();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Pagamento</Text>
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
