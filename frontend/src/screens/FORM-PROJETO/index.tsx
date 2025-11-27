import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useCreateProject } from './useCreateProject';
import { styles } from './styles';
import Checkbox from 'expo-checkbox'; // Or custom checkbox if preferred
import { theme } from '@/theme/theme';

const ROOM_OPTIONS = [
    'Sala de Estar', 'Cozinha', 'Quarto Principal',
    'Quarto de Hóspedes', 'Banheiro', 'Escritório',
    'Área Externa', 'Corredor'
];

export default function CreateProjectScreen() {
    const {
        step,
        totalSteps,
        formData,
        loading,
        handleNext,
        handleBack,
        updateFormData,
        toggleRoom,
        isStepValid
    } = useCreateProject();

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.label}>Qual o tipo do seu imóvel?</Text>

            <TouchableOpacity
                style={[styles.optionButton, formData.type === 'house' && styles.optionButtonSelected]}
                onPress={() => updateFormData('type', 'house')}
            >
                <Text style={[styles.optionText, formData.type === 'house' && styles.optionTextSelected]}>Casa</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.optionButton, formData.type === 'apartment' && styles.optionButtonSelected]}
                onPress={() => updateFormData('type', 'apartment')}
            >
                <Text style={[styles.optionText, formData.type === 'apartment' && styles.optionTextSelected]}>Apartamento</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.label}>Quais cômodos você quer automatizar?</Text>
            <ScrollView style={{ maxHeight: 400 }}>
                {ROOM_OPTIONS.map(room => (
                    <TouchableOpacity
                        key={room}
                        style={styles.roomItem}
                        onPress={() => toggleRoom(room)}
                    >
                        <Checkbox
                            value={formData.rooms.includes(room)}
                            onValueChange={() => toggleRoom(room)}
                            color={formData.rooms.includes(room) ? theme.colors.primary : undefined}
                        />
                        <Text style={{ marginLeft: 10, ...theme.typography.styles.body }}>{room}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.label}>Qual seu limite de orçamento?</Text>
            <TextInput
                style={styles.input}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                value={formData.budgetLimit ? formData.budgetLimit.toString() : ''}
                onChangeText={(text) => updateFormData('budgetLimit', Number(text.replace(/[^0-9]/g, '')))}
            />
            <Text style={styles.subtitle}>
                Isso nos ajuda a recomendar os melhores dispositivos para você.
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Novo Projeto</Text>
                <View style={styles.headerSpacer} />
            </View>

            <Text style={styles.subtitle}>Passo {step} de {totalSteps}</Text>

            <View style={styles.content}>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.button, (!isStepValid() || loading) && styles.buttonDisabled]}
                    onPress={handleNext}
                    disabled={!isStepValid() || loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Criando...' : step === totalSteps ? 'Finalizar' : 'Próximo'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={loading}>
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
