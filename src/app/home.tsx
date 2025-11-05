import { StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

import { Button } from '@/components/button'

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text_bold} >Tela de Home</Text>
            <Button title='Voltar' onPress={() => router.navigate("./")} />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({

    container: {
        backgroundColor: "#F2E9E4",
        flex: 1,
        paddingVertical: 48,
        paddingHorizontal: 16,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 20
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: 16,
    },
    text: {
        fontFamily: "Roboto_400Regular",
        color: "#4A4E69",
        fontSize: 20,
    },
    text_bold: {
        fontFamily: "Roboto_700Bold",
        color: "#4A4E69",
        fontSize: 20,
    },
})