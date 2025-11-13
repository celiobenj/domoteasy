import { router } from 'expo-router';

export const useWelcome = () => {
    const handleNavigateToSignIn = () => {
        // Push: Adiciona na pilha, usuário pode voltar para Welcome se quiser (ou use replace se preferir que não volte)
        router.push("/signIn");
    };

    const handleNavigateToSignUp = () => {
        router.push("/signUp");
    };

    return {
        handleNavigateToSignIn,
        handleNavigateToSignUp
    };
};