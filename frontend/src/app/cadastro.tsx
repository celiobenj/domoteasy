import { Checkbox } from 'expo-checkbox';
import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import Logo_hor from '@/assets/Logo/Logo-hor';
import { Button } from '@/components/button';
import { ErrorMessage } from '@/components/errorMessage';
import { InputTitle } from '@/components/inputTitle';
import { SuccessCard } from '@/components/successCard';
import { authService, SignUpData } from '@/services/authService';
import { validateSignUp, ValidationError } from '@/utils/validation';

const Cadastro = () => {
    const [isChecked, setChecked] = useState(false);
    const [formData, setFormData] = useState<SignUpData>({
        nome: '',
        email: '',
        senha: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (field: keyof SignUpData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        // Limpar erro do campo ao começar a digitar
        if (errors[field]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleSignUp = async () => {
        // Validar formulário
        const validation = validateSignUp(
            formData.nome,
            formData.email,
            formData.senha,
            confirmPassword
        );

        if (!validation.isValid) {
            const errorMap: Record<string, string> = {};
            validation.errors.forEach((error: ValidationError) => {
                errorMap[error.field] = error.message;
            });
            setErrors(errorMap);
            return;
        }

        setLoading(true);
        try {
            const response = await authService.signUp(formData);
            await authService.saveToken(response.token);
            
            setShowSuccess(true);
            setTimeout(() => {
                router.navigate('./home');
            }, 1000);
        } catch (error: any) {
            setErrors({
                submit: error.message || 'Erro ao realizar cadastro'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } keyboardVerticalOffset={-150} style={styles.container}>
            <SuccessCard 
                visible={showSuccess} 
                message="Cadastro realizado com sucesso!"
                onHide={() => setShowSuccess(false)}
            />
            <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.svcontainer} keyboardShouldPersistTaps="handled">

                <View style={styles.header}>
                    <View style={styles.logo}><Logo_hor onPress={() => router.navigate("./")} /></View>
                    <Text style={styles.h1}>Cadastro</Text>
                </View>

                <View style={styles.body} >
                    <ErrorMessage 
                        message={errors.submit}
                        visible={!!errors.submit}
                    />
                    
                    <InputTitle 
                        title='Nome' 
                        icon='account' 
                        placeholder='Digite seu nome'
                        value={formData.nome}
                        onChangeText={(text) => handleInputChange('nome', text)}
                    />
                    {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
                    
                    <InputTitle 
                        title='E-mail' 
                        icon='email' 
                        placeholder='exemplo@email.com'
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                    
                    <InputTitle 
                        title='Senha' 
                        icon='lock' 
                        isPsw={true} 
                        placeholder='Min. 8 caracteres, letra e número'
                        value={formData.senha}
                        onChangeText={(text) => handleInputChange('senha', text)}
                    />
                    {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
                    
                    <InputTitle 
                        title='Confirme sua senha' 
                        isPsw={true} 
                        icon='lock' 
                        placeholder='Digite sua senha novamente'
                        value={confirmPassword}
                        onChangeText={(text) => {
                            setConfirmPassword(text);
                            if (errors.confirmaSenha) {
                                setErrors((prev) => {
                                    const newErrors = { ...prev };
                                    delete newErrors.confirmaSenha;
                                    return newErrors;
                                });
                            }
                        }}
                    />
                    {errors.confirmaSenha && <Text style={styles.errorText}>{errors.confirmaSenha}</Text>}
                    
                    <View style={styles.check_section}>
                        <Checkbox color={"#4A4E69"} style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                        <Text style={styles.text}>Permanecer conectado?</Text>
                    </View>
                    <Button 
                        title={loading ? 'Cadastrando...' : 'Fazer Cadastro'} 
                        onPress={handleSignUp}
                        disabled={loading}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.text} >Já tem uma conta? <Text style={styles.text_bold} onPress={() => router.navigate("./entrar")} >Entre</Text></Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Cadastro

const styles = StyleSheet.create({
    logo: {
        height: 60,
        width: 200,
    },
    container: {
        backgroundColor: "#F2E9E4",
        flex: 1,
        paddingVertical: 48,
        paddingHorizontal: 16,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20
    },
    svcontainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: 16,
    },
    body: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 24,
        alignSelf: "stretch"
    },
    text: {
        fontFamily: "Roboto_400Regular",
        color: "#4A4E69",
        fontSize: 16
    },
    text_bold: {
        fontFamily: "Roboto_700Bold",
        color: "#4A4E69",
        textDecorationLine: "underline",
    },
    footer: {

    },
    h1: {
        fontFamily: "Roboto_700Bold",
        color: "#4A4E69",
        fontSize: 28,
    },
    checkbox: {
        borderRadius: 4,
        width: 20,
        height: 20
    },
    check_section: {
        gap: 8,
        flexDirection: "row",
        alignItems: "center"
    },
    errorText: {
        color: "#F44336",
        fontSize: 12,
        fontFamily: "Roboto_400Regular",
        marginTop: -20,
        marginBottom: 8
    }

})