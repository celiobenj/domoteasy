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
    backButton: {
        marginRight: theme.spacing.medium,
    },
    title: {
        fontSize: theme.typography.fontSize.xlarge,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    subtitle: {
        fontSize: theme.typography.fontSize.medium,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        marginBottom: theme.spacing.xlarge,
        paddingHorizontal: theme.spacing.large,
    },
    planCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    selectedPlan: {
        borderColor: theme.colors.primary,
    },
    planHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    planName: {
        fontSize: 18,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    planPrice: {
        fontSize: 20,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    planPeriod: {
        fontSize: 14,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
    },
    featureList: {
        marginTop: 10,
    },
    featureItem: {
        fontSize: 14,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        marginBottom: 5,
    },
    recommendedBadge: {
        backgroundColor: theme.colors.success,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    recommendedText: {
        color: theme.colors.white,
        fontSize: 12,
        fontFamily: theme.typography.fontFamily.bold,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: theme.colors.onPrimary,
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.bold,
    },
    inputContainer: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        marginBottom: 5,
    },
    input: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.regular,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    row: {
        flexDirection: 'row',
        gap: 15,
    },
    flex1: {
        flex: 1,
    },
    statusContainer: {
        alignItems: 'center',
        marginVertical: 40,
    },
    statusText: {
        fontSize: 20,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.success,
        marginBottom: 10,
    },
    cancelButton: {
        backgroundColor: theme.colors.error,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
});
