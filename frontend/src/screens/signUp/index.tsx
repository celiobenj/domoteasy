import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';

// Componentes
import LogoHor from '@/assets/Logo/Logo-hor';
import { Button } from '@/components/button';
import { ErrorMessage } from '@/components/errorMessage';
import { InputTitle } from '@/components/inputTitle';
import { SuccessCard } from '@/components/successCard';

// Hook e Estilos
import { useSignUp } from './useSignUp';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { isValidPassword } from '@/utils/validation';

const SignUpScreen = () => {
    const {
        name, setName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        stayConnected, setStayConnected,
        loading,
        errors,
        showSuccess,
        setShowSuccess,
        showPassword,
        setShowPassword,
        clearError,
        handleSignUp,
        handleNavigateToSignIn,
        handleNavigateBack
    } = useSignUp();

    // Validar critérios de senha em tempo real
    const passwordValidation = password ? isValidPassword(password) : null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
            style={styles.container}
        >
            <SuccessCard
                visible={showSuccess}
                message="Cadastro realizado com sucesso!"
                onHide={() => setShowSuccess(false)}
            />

            <ScrollView
                style={{ width: "100%" }}
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >

                {/* Cabeçalho */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <LogoHor onPress={handleNavigateBack} />
                    </View>
                    <Text style={styles.title}>Cadastro</Text>
                </View>

                {/* Formulário */}
                <View style={styles.body}>
                    <ErrorMessage
                        message={errors.submit}
                        visible={!!errors.submit}
                    />

                    {/* Nome */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Nome'
                            icon='account'
                            placeholder='Digite seu nome'
                            value={name}
                            onChangeText={(text) => {
                                setName(text);
                                clearError('nome');
                            }}
                        />
                        {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                    </View>

                    {/* Email */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='E-mail'
                            icon='email'
                            placeholder='exemplo@email.com'
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text);
                                clearError('email');
                            }}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Senha */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Senha'
                            icon='lock'
                            isPsw={true}
                            placeholder='Min. 8 caracteres, letra e número'
                            value={password}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onChangeText={(text) => {
                                setPassword(text);
                                clearError('senha');
                            }}
                        />
                        {passwordValidation && (
                            <Text style={styles.validationText}>
                                {passwordValidation.message}
                            </Text>
                        )}
                        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
                    </View>

                    {/* Confirmar Senha */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Confirme sua senha'
                            isPsw={true}
                            icon='lock'
                            placeholder='Digite sua senha novamente'
                            value={confirmPassword}
                            showPassword={showPassword}
                            onTogglePassword={() => setShowPassword(!showPassword)}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                clearError('confirmaSenha');
                            }}
                        />
                        {errors.confirmaSenha && <Text style={styles.errorText}>{errors.confirmaSenha}</Text>}
                    </View>

                    {/* Checkbox */}
                    <View style={styles.checkSection}>
                        <Checkbox
                            color={theme.colors.primary}
                            style={styles.checkbox}
                            value={stayConnected}
                            onValueChange={setStayConnected}
                        />
                        <Text style={styles.text}>Permanecer conectado?</Text>
                    </View>

                    <Button
                        title={loading ? 'Cadastrando...' : 'Fazer Cadastro'}
                        onPress={handleSignUp}
                        disabled={loading}
                    />
                </View>

                {/* Rodapé */}
                <View style={styles.footer}>
                    <Text style={styles.text}>
                        Já tem uma conta?{' '}
                        <Text style={styles.textBold} onPress={handleNavigateToSignIn}>
                            Entre
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignUpScreen;