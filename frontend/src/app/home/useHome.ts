import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { BackHandler, Alert } from 'react-native';

export const useHome = () => {
    // Simulação de dados (no futuro virá do contexto/API)
    const [userName, setUserName] = useState("Célio Benjamim");

    useEffect(() => {
        const onBackPress = () => {
            // Abre o alerta perguntando se quer sair
            Alert.alert(
                "Sair do aplicativo", // Título
                "Você deseja sair do aplicativo?", // Mensagem
                [
                    {
                        text: "Não",
                        onPress: () => null, // Faz nada, apenas fecha o alerta
                        style: "cancel" // Estilo visual de cancelamento
                    },
                    {
                        text: "Sim",
                        onPress: () => BackHandler.exitApp(), // Fecha o aplicativo totalmente
                    }
                ],
                { cancelable: true } // Pode cancelar a operação
            );

            // Retornar 'true' diz ao sistema: "Eu já tratei o botão voltar, não faça mais nada"
            return true;
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        // Na limpeza do useEffect, chamamos .remove() nessa referência
        return () => subscription.remove();
    }, []);

    const handleNavigateToProfile = () => {
        router.push('/editProfile');
    };

    const handleLogout = () => {
        // Ao clicar no botão de logout da tela, volta para o início
        router.replace('/welcome');
    };

    return {
        userName,
        handleNavigateToProfile,
        handleLogout
    };
};