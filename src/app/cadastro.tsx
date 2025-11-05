import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Checkbox } from 'expo-checkbox';
import { useState } from 'react';

import Logo_hor from '@/assets/Logo/Logo-hor'
import { Button } from '@/components/button'
import { InputTitle } from '@/components/inputTitle'

const Cadastro = () => {
    const [isChecked, setChecked] = useState(false);

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height" } keyboardVerticalOffset={-150} style={styles.container}>
            <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.svcontainer} >

                <View style={styles.header}>
                    <View style={styles.logo}><Logo_hor onPress={() => router.navigate("./")} /></View>
                    <Text style={styles.h1}>Cadastro</Text>
                </View>

                <View style={styles.body} >
                    <InputTitle title='Nome' icon='account' placeholder='Digite seu nome' />
                    <InputTitle title='E-mail' icon='email' placeholder='exemplo@email.com' />
                    <InputTitle title='Senha' icon='lock' isPsw={true} placeholder='Digite sua senha' />
                    <InputTitle title='Confirme sua senha' isPsw={true} icon='lock' placeholder='Digite sua senha novamente' />
                    <View style={styles.check_section}>
                        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                        <Text style={styles.text}>Permanecer conectado?</Text>
                    </View>
                    <Button title='Fazer Cadastro' onPress={() => router.navigate("./home")} />
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
        width: 16,
        height: 16
    },
    check_section: {
        gap: 8,
        flexDirection: "row",
        alignItems: "center"
    },

})