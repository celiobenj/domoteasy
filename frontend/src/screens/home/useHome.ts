import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { BackHandler, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export const useHome = () => {
    const { userName, clearUserName } = useAuth();

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

    const handleLogout = async () => {
        // Limpa dados de autenticação
        await authService.logout();
        clearUserName();
        // Ao clicar no botão de logout da tela, volta para o início
        router.replace('/welcome');
    };

    return {
        userName: userName || "Usuário",
        handleNavigateToProfile,
        handleLogout
    };
};