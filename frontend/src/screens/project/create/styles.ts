import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.large,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.large,
        paddingVertical: theme.spacing.medium,
        marginBottom: theme.spacing.medium,
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
        paddingHorizontal: theme.spacing.large,
        marginBottom: theme.spacing.medium,
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
