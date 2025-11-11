import { router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/button';
import { InputTitle } from '@/components/inputTitle';
import { ProfilePhoto } from '@/components/profilePhoto';
import { SuccessCard } from '@/components/successCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const EditProfile = () => {
    const [showSuccess, setShowSuccess] = useState(false);

    const handleUpdateProfile = () => {
        setShowSuccess(true);
        setTimeout(() => {
            router.navigate("./home");
        }, 2000);
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={-150} style={styles.container}>
            <SuccessCard 
                visible={showSuccess} 
                message="Cadastro atualizado com sucesso!"
                onHide={() => setShowSuccess(false)}
            />
            <ScrollView style={{ width: "100%" }} contentContainerStyle={styles.svcontainer} keyboardShouldPersistTaps="handled">
                <View style={styles.top}>
                    <View style={styles.header}>
                        <MaterialCommunityIcons
                            name={"arrow-left"}
                            size={48}
                            color={"#4A4E69"}
                            onPress={() => router.back()}
                        />
                        <Text style={styles.title}>Editar Perfil</Text>
                        <View style={{ width: 48 }} ></View>
                    </View>
                </View>
                <View style={styles.body}>
                    <InputTitle title='Senha atual' icon='lock' isPsw={true} placeholder='Digite sua senha atual' />
                    <InputTitle title='Nova senha' icon='lock' isPsw={true} placeholder='Digite sua nova senha' />
                    <InputTitle title='Confirme sua senha' isPsw={true} icon='lock' placeholder='Digite sua senha novamente' />
                    <Button title='Atualizar Cadastro' onPress={handleUpdateProfile} />
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => router.navigate("./home")}>
                        <MaterialCommunityIcons
                            name={"home"}
                            size={48}
                            color={"#4A4E69"}
                        />
                    </TouchableOpacity>
                    <ProfilePhoto size={48} />
                </View>
                {/* ----------------------------------------------------------------- */}
                {/* <View style={styles.header}>
                    <View style={styles.logo}><Logo_hor onPress={() => router.navigate("./")} /></View>
                    <Text style={styles.h1}>EditProfile</Text>
                </View>

                <View style={styles.body} >
                    <InputTitle title='Nome' icon='account' placeholder='Digite seu nome' />
                    <InputTitle title='E-mail' icon='email' placeholder='exemplo@email.com' />
                    <InputTitle title='Senha' icon='lock' isPsw={true} placeholder='Digite sua senha' />
                    <InputTitle title='Confirme sua senha' isPsw={true} icon='lock' placeholder='Digite sua senha novamente' />
                    <View style={styles.check_section}>
                        <Checkbox color={"#4A4E69"} style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
                        <Text style={styles.text}>Permanecer conectado?</Text>
                    </View>
                    <Button title='Fazer EditProfile' onPress={() => router.navigate("./home")} />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.text} >Já tem uma conta? <Text style={styles.text_bold} onPress={() => router.navigate("./entrar")} >Entre</Text></Text>
                </View> */}
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto_400Regular",
        color: "#4A4E69",
        fontSize: 20,
    },
    text_bold: {
        fontFamily: "Roboto_700Bold",
        color: "#4A4E69",
        fontSize: 24,
    },
    title: {
        fontFamily: "Arvo_400Regular",
        color: "#4A4E69",
        fontSize: 28,
    },
    container: {
        backgroundColor: "#F2E9E4",
        flex: 1,
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
    top: {
        paddingTop: 48,
        paddingHorizontal: 16,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 24,
        alignSelf: "stretch",
    },
    footer: {
        // height: 70,
        flexDirection: "row",
        paddingHorizontal: 32,
        paddingVertical: 12,
        justifyContent: "space-around",
        alignItems: "center",
        flexShrink: 0,
        alignSelf: "stretch",
        borderTopColor: "#4A4E69",
        borderTopWidth: 4,
        borderStyle: "solid",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    greetings: {
        // align-items: center;
        // gap: 10px;
        // align-self: stretch;
        paddingHorizontal: 8,
        alignItems: "flex-start",
        gap: 10,
        alignSelf: "stretch"
    },
    body: {
        paddingHorizontal: 16,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 24,
        alignSelf: "stretch"
    }
})