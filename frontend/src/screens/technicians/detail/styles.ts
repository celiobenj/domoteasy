import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.large,
        paddingTop: theme.spacing.xxxlarge,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.medium,
        borderWidth: 4,
        borderColor: theme.colors.background,
    },
    avatarText: {
        ...theme.typography.styles.heading,
        fontSize: 40,
        color: theme.colors.primary,
    },
    name: {
        ...theme.typography.styles.heading,
        fontSize: theme.typography.fontSize.xxlarge,
        color: theme.colors.onPrimary,
        marginBottom: 4,
    },
    specialty: {
        ...theme.typography.styles.body,
        color: theme.colors.onPrimary,
        opacity: 0.9,
        fontSize: theme.typography.fontSize.large,
    },
    content: {
        flex: 1,
        padding: theme.spacing.large,
    },
    section: {
        marginBottom: theme.spacing.xlarge,
    },
    sectionTitle: {
        ...theme.typography.styles.bodyBold,
        fontSize: theme.typography.fontSize.large,
        marginBottom: theme.spacing.small,
        color: theme.colors.text,
    },
    description: {
        ...theme.typography.styles.body,
        lineHeight: 24,
        color: theme.colors.text,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.medium,
    },
    infoText: {
        ...theme.typography.styles.body,
        marginLeft: theme.spacing.medium,
        color: theme.colors.text,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: theme.spacing.medium,
        borderRadius: theme.radii.medium,
        alignSelf: 'flex-start',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    ratingText: {
        ...theme.typography.styles.bodyBold,
        marginLeft: 8,
        fontSize: theme.typography.fontSize.large,
    },
    footer: {
        padding: theme.spacing.large,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    contactButton: {
        backgroundColor: '#25D366', // WhatsApp color
        padding: theme.spacing.large,
        borderRadius: theme.radii.large,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactButtonText: {
        ...theme.typography.styles.button,
        marginLeft: theme.spacing.small,
        fontSize: theme.typography.fontSize.large,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        ...theme.typography.styles.body,
        color: theme.colors.error,
        textAlign: 'center',
    },
});
