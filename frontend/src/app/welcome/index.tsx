import { View, Text } from 'react-native';
import { router } from 'expo-router';

import LogoHor from '@/assets/Logo/Logo-hor';
import { Button } from '@/components/button';

import { styles } from './styles';

const WelcomeScreen = () => {

    // Função auxiliar para negrito
    const BoldText = ({ children }: { children: string }) => (
        <Text style={styles.textBold}>{children}</Text>
    );

    // Funções de navegação (Handlers)
    const handleNavigateToSignIn = () => {
        router.push("./signIn"); 
    };

    const handleNavigateToSignUp = () => {
        router.push("./signUp"); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <LogoHor />
                </View>

                <Text style={styles.text}>
                    <BoldText>Planeje</BoldText>, <BoldText>escolha</BoldText> e <BoldText>viva</BoldText> sua casa inteligente!
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    title='Entrar'
                    onPress={handleNavigateToSignIn}
                />
                <Button
                    title='Cadastro'
                    onPress={handleNavigateToSignUp}
                />
            </View>
        </View>
    );
}

export default WelcomeScreen;