import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

export default function Index(){
    const [name, setName] = useState("")

    function handleNext(){
        router.navigate("./dashboard")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Olá, {name}</Text>
            
            {/* <Input onChangeText={(text) => setName(text)}  /> */}
            <Input onChangeText={setName}  />

            <Button title="Continuar" onPress={handleNext} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        padding: 32,
        justifyContent: "center",
        gap: 16
    },
    title: {
        color:"#000", 
        fontSize:24,
        fontWeight: "bold"
    },
})
