import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background, // #F2E9E4
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topSection: {
        paddingTop: theme.spacing.xxxlarge, // 48
        paddingHorizontal: theme.spacing.large, // 16
        flexDirection: "column",
        alignItems: "flex-start",
        gap: theme.spacing.xlarge, // 24
        alignSelf: "stretch",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    title: {
        fontFamily: theme.typography.styles.heading.fontFamily, // Arvo
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xxlarge, // 28
    },
    greetings: {
        paddingHorizontal: theme.spacing.small, // 8
        alignItems: "flex-start",
        gap: 10,
        alignSelf: "stretch"
    },
    greetingText: {
        fontFamily: theme.typography.fontFamily.bold, // Roboto Bold
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xlarge, // 24
    },
    // Rodapé simulando uma TabBar
    footer: {
        flexDirection: "row",
        paddingHorizontal: theme.spacing.xxlarge, // 32
        paddingVertical: theme.spacing.medium, // 12
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%", // Garante largura total
        backgroundColor: theme.colors.background, // Garante fundo sólido
        borderTopColor: theme.colors.primary, // #4A4E69
        borderTopWidth: 4,
    },
    // Estilo extra para botões do rodapé ficarem alinhados
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});