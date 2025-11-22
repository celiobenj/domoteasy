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
        borderBottomColor: theme.colors.background,
        paddingBottom: theme.spacing.small,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: theme.spacing.medium,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background,
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: theme.spacing.medium,
    },
    itemName: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        flex: 1,
    },
    itemPrice: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
    },
    purchaseLinkButton: {
        padding: theme.spacing.small,
        backgroundColor: theme.colors.background,
        borderRadius: theme.radii.small,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.spacing.medium,
        paddingTop: theme.spacing.medium,
        borderTopWidth: 1,
        borderTopColor: theme.colors.background,
    },
    totalLabel: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.text,
    },
    totalValue: {
        fontFamily: theme.typography.fontFamily.bold,
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
