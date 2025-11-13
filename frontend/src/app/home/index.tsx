import { StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Button } from '@/components/button'
import { ProfilePhoto } from "@/components/profilePhoto";
import { TouchableOpacity } from 'react-native';

var name = "Célio Benjamim"

const Home = () => {
    return (
        <View style={styles.page}>
            <View style={styles.top}>
                <View style={styles.header}>
                    {/* <MaterialCommunityIcons
                        name={"menu"}
                        size={48}
                        color={"#4A4E69"}
                    /> */}
                    <Text style={styles.title}>Home</Text>
                    <ProfilePhoto size={48} />
                </View>
                <View style={styles.greetings}>
                    <Text style={styles.text_bold}>Olá, {name}</Text>
                </View>
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
        fontSize: 24,
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
    }
})