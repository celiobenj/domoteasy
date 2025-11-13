import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

// Fontes que precisam carregar
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Arvo_400Regular, Arvo_700Bold } from '@expo-google-fonts/arvo';

// Importe seu serviço de autenticação (ajuste o caminho se necessário)
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';

const AppEntry = () => {
    const router = useRouter();
    const { loadUserData } = useAuth();

    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
        Arvo_400Regular,
        Arvo_700Bold
    });

    useEffect(() => {
        if (fontsLoaded) {
            const checkAuth = async () => {
                try {
                    // 3. Lógica de verificação de autenticação
                    const token = await authService.getToken();

                    if (token) {
                        // Carrega dados do usuário se houver token
                        await loadUserData();
                        // Se logado, manda para a home
                        router.replace('./home');
                    } else {
                        // Se não, manda para a tela de 'welcome'
                        router.replace('./welcome');
                    }
                } catch (e) {
                    console.error("Falha ao verificar status de auth", e);
                    // Em caso de erro, vá para a tela de 'welcome'
                    router.replace('./welcome');
                }
            };

            checkAuth();
        }
    }, [fontsLoaded]); 

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A4E69" />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F2E9E4', // Cor de fundo do seu app
    },
});

export default AppEntry;