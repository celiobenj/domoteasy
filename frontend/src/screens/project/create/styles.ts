import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.large,
    },
    header: {
        marginBottom: theme.spacing.xlarge,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.styles.heading,
        fontSize: theme.typography.fontSize.xxlarge,
        marginBottom: theme.spacing.small,
        textAlign: 'center',
    },
    subtitle: {
        ...theme.typography.styles.body,
        color: theme.colors.text,
        opacity: 0.8,
        textAlign: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    stepContainer: {
        gap: theme.spacing.large,
    },
    label: {
        ...theme.typography.styles.bodyBold,
        fontSize: theme.typography.fontSize.large,
        marginBottom: theme.spacing.medium,
    },
    optionButton: {
        padding: theme.spacing.large,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.medium,
        borderWidth: 1,
        borderColor: 'transparent',
        marginBottom: theme.spacing.medium,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    optionButtonSelected: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.white,
    },
    optionText: {
        ...theme.typography.styles.body,
        fontSize: theme.typography.fontSize.medium,
    },
    optionTextSelected: {
        ...theme.typography.styles.bodyBold,
        color: theme.colors.primary,
    },
    input: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.medium,
        padding: theme.spacing.large,
        fontSize: theme.typography.fontSize.medium,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    footer: {
        marginTop: theme.spacing.xxlarge,
        gap: theme.spacing.medium,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.large,
        borderRadius: theme.radii.large,
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        ...theme.typography.styles.button,
    },
    backButton: {
        padding: theme.spacing.medium,
        alignItems: 'center',
    },
    backButtonText: {
        ...theme.typography.styles.body,
        color: theme.colors.text,
    },
    roomItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.medium,
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.small,
        marginBottom: theme.spacing.small,
    },
});
