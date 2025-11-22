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
        marginBottom: theme.spacing.medium,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.medium,
        paddingHorizontal: theme.spacing.medium,
        height: 48,
        marginBottom: theme.spacing.large,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchIcon: {
        marginRight: theme.spacing.small,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: theme.typography.fontSize.medium,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
    },
    listContent: {
        paddingBottom: theme.spacing.xxlarge,
    },
    emptyText: {
        ...theme.typography.styles.body,
        textAlign: 'center',
        marginTop: theme.spacing.xlarge,
        opacity: 0.6,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
