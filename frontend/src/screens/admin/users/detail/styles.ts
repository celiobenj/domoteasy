import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.large,
        paddingVertical: theme.spacing.medium,
        backgroundColor: theme.colors.background,
    },
    headerBackButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.text,
    },
    headerSpacer: {
        width: 40,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xlarge,
    },
    profileHeader: {
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
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: 40,
        color: theme.colors.primary,
    },
    name: {
        fontFamily: theme.typography.fontFamily.heading,
        fontSize: theme.typography.fontSize.xxlarge,
        color: theme.colors.onPrimary,
        marginBottom: 4,
    },
    email: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.onPrimary,
        opacity: 0.9,
        marginBottom: theme.spacing.xsmall,
    },
    role: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.onPrimary,
        opacity: 0.8,
        textTransform: 'capitalize',
    },
    content: {
        flex: 1,
        padding: theme.spacing.large,
    },
    section: {
        marginBottom: theme.spacing.xlarge,
    },
    sectionTitle: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.large,
        marginBottom: theme.spacing.medium,
        color: theme.colors.text,
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        padding: theme.spacing.large,
        borderRadius: theme.radii.medium,
        marginBottom: theme.spacing.medium,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    formLabel: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
    },
    subscriptionButtons: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.medium,
        borderRadius: theme.radii.medium,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    subscriptionButtonsRow: {
        flexDirection: 'row',
        gap: theme.spacing.medium,
    },
    subscriptionButton: {
        flex: 1,
        padding: theme.spacing.medium,
        borderRadius: theme.radii.small,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        alignItems: 'center',
    },
    subscriptionButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    },
    subscriptionButtonText: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
    },
    subscriptionButtonTextActive: {
        color: theme.colors.onPrimary,
    },
    footer: {
        padding: theme.spacing.large,
        backgroundColor: theme.colors.white,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.large,
        borderRadius: theme.radii.large,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    saveButtonDisabled: {
        opacity: 0.5,
    },
    saveButtonText: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.onPrimary,
    },
    errorText: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.error,
        textAlign: 'center',
    },
});
