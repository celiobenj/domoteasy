import { StyleSheet, Text, View } from 'react-native'
import { useFonts } from 'expo-font'
import { Roboto_400Regular, Roboto_600SemiBold, Roboto_700Bold } from "@expo-google-fonts/roboto";
import Logo_hor from '@/assets/Logo/Logo-hor'
import { Button } from '@/components/button';
import { router } from 'expo-router';

const Index = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_600SemiBold,
    Roboto_700Bold
  });

  function bold(text: string) {
    return <Text style={styles.text_bold}>{text}</Text>
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}><Logo_hor/></View>

        <Text style={styles.text}>{bold("Planeje")}, {bold("escolha")} e {bold("viva")} sua casa inteligente!</Text>
      </View>
      <View style={styles.buttons}>
        <Button title='Entrar' onPress={() => router.navigate("./entrar")} />
        <Button title='Cadastro' onPress={() => router.navigate("./cadastro")} />
      </View>
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2E9E4",
    flex: 1,
    paddingVertical: 48,
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logo: {
    height: 60,
    width: 200,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 16,
  },

  text: {
    color: "#4A4E69",
    fontFamily: "Roboto_400Regular",
    fontSize: 20,
  },
  text_bold: {
    fontFamily: "Roboto_700Bold",
  },
  buttons: {
    gap: 24,
    width: "100%"
  }
})