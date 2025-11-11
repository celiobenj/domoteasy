import { StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

import { Button } from '@/components/button'

const Home = () => {
    return (
        <View style={styles.page}>
            <View style={styles.top}>
                <View style={styles.header}>
                    <Text style={styles.title}>Home</Text>
                </View>
            </View>
            <View style={styles.footer}>
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
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
    title: {
        fontFamily: "Arvo_400Regular",
        color: "#4A4E69",
        fontSize: 28,
    },
    page: {
        backgroundColor: "#F2E9E4",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
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
        height: 70,
        paddingVertical: 12,
        paddingHorizontal: 32,
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
        alignSelf: "stretch",
    },
    header: {
        display: "contents"
    }
})