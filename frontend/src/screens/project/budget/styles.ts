import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.large,
    },
    header: {
        marginBottom: theme.spacing.large,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.styles.heading,
        fontSize: theme.typography.fontSize.xxlarge,
        marginBottom: theme.spacing.small,
    },
    content: {
        flex: 1,
    },
    summaryCard: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.medium,
        padding: theme.spacing.large,
        marginBottom: theme.spacing.large,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    summaryTitle: {
        ...theme.typography.styles.bodyBold,
        fontSize: theme.typography.fontSize.large,
        marginBottom: theme.spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: theme.spacing.small,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.small,
    },
    itemName: {
        ...theme.typography.styles.body,
        flex: 1,
    },
    itemPrice: {
        ...theme.typography.styles.bodyBold,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.medium,
        paddingTop: theme.spacing.medium,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalLabel: {
        ...theme.typography.styles.heading,
        fontSize: theme.typography.fontSize.large,
    },
    totalValue: {
        ...theme.typography.styles.heading,
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.primary,
    },
    footer: {
        gap: theme.spacing.medium,
        marginTop: theme.spacing.large,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.large,
        borderRadius: theme.radii.large,
        alignItems: 'center',
    },
    saveButtonText: {
        ...theme.typography.styles.button,
    },
    exitButton: {
        padding: theme.spacing.medium,
        alignItems: 'center',
    },
    exitButtonText: {
        ...theme.typography.styles.body,
        color: theme.colors.error,
    },
});
