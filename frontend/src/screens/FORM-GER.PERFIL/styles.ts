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
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    // Seção Superior (Header + Título)
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
        alignItems: 'center',
        alignSelf: 'stretch',
        // justifyContent: 'flex-start', // Alinhado à esquerda devido ao botão voltar
    },
    // Título da Página
    title: {
        fontFamily: theme.typography.styles.heading.fontFamily, // Arvo
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xxlarge, // 28
        marginLeft: theme.spacing.medium, // Espaço entre a seta e o título
        flex: 1, // Ocupa o espaço restante para empurrar conteúdo se necessário
        textAlign: 'center', // Opcional: Centralizar título visualmente
        marginRight: 48, // Compensa o tamanho do ícone da esquerda para centralizar perfeito
    },
    // Corpo do Formulário
    body: {
        paddingHorizontal: theme.spacing.large, // 16
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: theme.spacing.xlarge, // 24
        alignSelf: "stretch",
        marginTop: theme.spacing.xlarge,
    },
    // Rodapé (Tab Bar simulada)
    footer: {
        flexDirection: "row",
        paddingHorizontal: theme.spacing.xxlarge, // 32
        paddingVertical: theme.spacing.medium, // 12
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.colors.background,
        borderTopColor: theme.colors.primary,
        borderTopWidth: 4,
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: theme.colors.error,
        fontSize: theme.typography.fontSize.xsmall,
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