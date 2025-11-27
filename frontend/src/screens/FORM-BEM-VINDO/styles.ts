import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme'; // Certifique-se que o caminho está correto

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background, // Usando #F2E9E4 do tema
        paddingVertical: theme.spacing.xxxlarge,  // Usando 48 do tema
        paddingHorizontal: theme.spacing.large,   // Usando 16 do tema
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center"
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: theme.spacing.large, // Usando 16 do tema
    },
    logoContainer: {
        height: 60,
        width: 200,
        // Adicionado justifyContent para garantir que o SVG centralize se necessário
        justifyContent: 'center',
    },
    text: {
        color: theme.colors.text, // Usando #4A4E69 do tema
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.large, // Usando 20 do tema
        lineHeight: 28, // Boa prática para legibilidade em textos maiores
    },
    textBold: {
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    buttonContainer: {
        width: "100%",
        gap: theme.spacing.xlarge, // Usando 24 do tema
    }
});