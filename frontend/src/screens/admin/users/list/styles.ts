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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        marginHorizontal: theme.spacing.large,
        marginVertical: theme.spacing.medium,
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.small,
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
    searchIcon: {
        marginRight: theme.spacing.small,
    },
    searchInput: {
        flex: 1,
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        paddingVertical: theme.spacing.small,
    },
    listContent: {
        paddingHorizontal: theme.spacing.large,
        paddingBottom: theme.spacing.large,
    },
    userCard: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.medium,
        padding: theme.spacing.large,
        marginBottom: theme.spacing.medium,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    userCardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userInfo: {
        flex: 1,
        marginRight: theme.spacing.medium,
    },
    userName: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.text,
        opacity: 0.7,
    },
    statusBadge: {
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.xsmall,
        borderRadius: theme.radii.small,
    },
    statusBadgeActive: {
        backgroundColor: theme.colors.success,
    },
    statusBadgeInactive: {
        backgroundColor: '#9E9E9E',
    },
    statusText: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.xsmall,
        color: theme.colors.white,
    },
    emptyText: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: theme.spacing.xlarge,
        opacity: 0.6,
    },
});
