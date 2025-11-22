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
    },
    title: {
        ...theme.typography.styles.heading,
        fontSize: theme.typography.fontSize.xxlarge,
        marginBottom: theme.spacing.small,
    },
    subtitle: {
        ...theme.typography.styles.body,
        color: theme.colors.text,
        opacity: 0.8,
    },
    listContent: {
        paddingBottom: 100, // Space for footer
    },
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.medium,
        padding: theme.spacing.medium,
        marginBottom: theme.spacing.medium,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: theme.radii.small,
        backgroundColor: '#eee', // Placeholder
        marginRight: theme.spacing.medium,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        ...theme.typography.styles.bodyBold,
        fontSize: theme.typography.fontSize.medium,
    },
    itemBrand: {
        ...theme.typography.styles.caption,
        color: theme.colors.text,
        opacity: 0.6,
    },
    itemPrice: {
        ...theme.typography.styles.bodyBold,
        color: theme.colors.primary,
        marginTop: 4,
    },
    checkboxContainer: {
        padding: theme.spacing.small,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.large,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.large,
        borderRadius: theme.radii.large,
        alignItems: 'center',
    },
    buttonText: {
        ...theme.typography.styles.button,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
