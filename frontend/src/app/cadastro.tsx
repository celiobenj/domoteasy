import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, ScrollView, Alert } from 'react-native'
import { router } from 'expo-router'
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';

import Logo_hor from '@/assets/Logo/Logo-hor'
import { Button } from '@/components/button'
import { InputTitle } from '@/components/inputTitle'
import { authService, SignUpData } from '@/services/authService'

const Cadastro = () => {
    const [isChecked, setChecked] = useState(false);
    const [formData, setFormData] = useState<SignUpData>({
        nome: '',
        email: '',
        senha: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: keyof SignUpData, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSignUp = async () => {
        if (!formData.nome || !formData.email || !formData.senha || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos');
            return;
        }

        if (formData.senha !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não conferem');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.signUp(formData);
            await authService.saveToken(response.token);
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
            router.navigate('./home');
        } catch (error: any) {
            Alert.alert('Erro', error.response?.data?.erro || 'Erro ao cadastrar');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } keyboardVerticalOffset={-150} style={styles.container}>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.svcontainer} keyboardShouldPersistTaps="handled">

                <View style={styles.header}>
                    <View style={styles.logo}><Logo_hor onPress={() => router.navigate("./")} /></View>
                    <Text style={styles.h1}>Cadastro</Text>
                </View>

                <View style={styles.body} >
                    <InputTitle 
                        title='Nome' 
                        icon='account' 
                        placeholder='Digite seu nome'
                        value={formData.nome}
                        onChangeText={(text) => handleInputChange('nome', text)}
                    />
                    <InputTitle 
                        title='E-mail' 
                        icon='email' 
                        placeholder='exemplo@email.com'
                        value={formData.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                    />
                    <InputTitle 
                        title='Senha' 
                        icon='lock' 
                        isPsw={true} 
                        placeholder='Digite sua senha'
                        value={formData.senha}
                        onChangeText={(text) => handleInputChange('senha', text)}
                    />
                    <InputTitle 
                        title='Confirme sua senha' 
                        isPsw={true} 
                        icon='lock' 
                        placeholder='Digite sua senha novamente'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
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

})