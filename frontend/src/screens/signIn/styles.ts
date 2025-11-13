import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        paddingVertical: theme.spacing.xxxlarge, // 48
        paddingHorizontal: theme.spacing.large,  // 16
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20 // Fallback para telas menores
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    header: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        gap: theme.spacing.large,
    },
    logoContainer: {
        height: 60,
        width: 200,
        justifyContent: 'center',
    },
    title: {
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xxlarge, // 28
    },
    body: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: theme.spacing.xlarge, // 24
        alignSelf: "stretch"
    },
    checkSection: {
        gap: theme.spacing.small, // 8
        flexDirection: "row",
        alignItems: "center"
    },
    checkbox: {
        borderRadius: theme.radii.xsmall, // 4
        width: 20,
        height: 20,
        borderColor: theme.colors.primary,
    },
    text: {
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.medium, // 16
    },
    textBold: {
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        textDecorationLine: "underline",
    },
    footer: {
        // Espaço reservado para rodapé se necessário
    },
    errorText: {
        color: theme.colors.error,
        fontSize: theme.typography.fontSize.xsmall, // 12
        fontFamily: theme.typography.fontFamily.regular,
        marginTop: theme.spacing.small,
        marginBottom: theme.spacing.small,
        lineHeight: 18,
    },
    validationText: {
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xsmall,
        fontFamily: theme.typography.fontFamily.regular,
        marginTop: theme.spacing.small,
        marginBottom: theme.spacing.small,
        lineHeight: 18,
    }
});