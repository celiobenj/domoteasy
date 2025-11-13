import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';

// Componentes
import LogoHor from '@/assets/Logo/Logo-hor';
import { Button } from '@/components/button';
import { ErrorMessage } from '@/components/errorMessage';
import { InputTitle } from '@/components/inputTitle';
import { SuccessCard } from '@/components/successCard';

// Hook e Estilos (Arquivos Locais)
import { useSignIn } from './useSignIn';
import { styles } from './styles';
import { theme } from '@/theme/theme';
import { isValidPassword } from '@/utils/validation';

const SignInScreen = () => {
    // Destruturamos tudo do nosso hook customizado
    const {
        formData,
        loading,
        errors,
        showSuccess,
        stayConnected,
        setStayConnected,
        setShowSuccess,
        handleInputChange,
        handleSignIn,
        handleNavigateToSignUp,
        handleNavigateBack
    } = useSignIn();

    // Validar critérios de senha em tempo real
    const passwordValidation = formData.senha ? isValidPassword(formData.senha) : null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-150}
            style={styles.container}
        >
            <SuccessCard
                visible={showSuccess}
                message="Login realizado com sucesso!"
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
                    <Text style={styles.title}>Entrar</Text>
                </View>

                {/* Formulário */}
                <View style={styles.body}>
                    <ErrorMessage
                        message={errors.submit}
                        visible={!!errors.submit}
                    />

                    {/* Campo E-mail */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='E-mail'
                            icon='email'
                            placeholder='exemplo@email.com'
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />
                        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    </View>

                    {/* Campo Senha */}
                    <View style={{ width: '100%' }}>
                        <InputTitle
                            title='Senha'
                            icon='lock'
                            isPsw={true}
                            placeholder='Digite sua senha'
                            value={formData.senha}
                            onChangeText={(text) => handleInputChange('senha', text)}
                        />
                        {/* {passwordValidation && (
                            <Text style={styles.validationText}>
                                {passwordValidation.message}
                            </Text>
                        )} */}
                        {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
                    </View>

                    {/* Checkbox Permanecer Conectado */}
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
                        title={loading ? 'Entrando...' : 'Entrar'}
                        onPress={handleSignIn}
                        disabled={loading}
                    />
                </View>

                {/* Rodapé */}
                <View style={styles.footer}>
                    <Text style={styles.text}>
                        Não tem uma conta?{' '}
                        <Text style={styles.textBold} onPress={handleNavigateToSignUp}>
                            Cadastre-se
                        </Text>
                    </Text>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

export default SignInScreen;