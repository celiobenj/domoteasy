import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: 40,
    },
    userName: {
        fontSize: 20,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        marginTop: 10,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text, // Fallback since textSecondary doesn't exist
        marginTop: 5,
    },
    actionsContainer: {
        gap: 15,
    },
    actionButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        color: theme.colors.onPrimary,
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.bold,
    },
    logoutButton: {
        backgroundColor: '#A0A0A0', // Cor cinza para sair, conforme imagem
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: theme.colors.background, // Or a slightly different color if needed
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
