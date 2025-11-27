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
        width: 24,
    },
    headerTitle: {
        ...theme.typography.styles.subheading,
        flex: 1,
        textAlign: 'center',
    },
    headerSpacer: {
        width: 24,
    },
    listContent: {
        padding: theme.spacing.large,
        gap: theme.spacing.medium,
    },
    technicianCard: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.large,
        padding: theme.spacing.large,
        gap: theme.spacing.medium,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    technicianInfo: {
        flex: 1,
        gap: theme.spacing.xsmall,
    },
    technicianName: {
        ...theme.typography.styles.bodyBold,
        color: theme.colors.text,
    },
    technicianSpecialty: {
        ...theme.typography.styles.body,
        color: theme.colors.text,
    },
    pendingBadge: {
        backgroundColor: '#FFF3CD',
        paddingHorizontal: theme.spacing.medium,
        paddingVertical: theme.spacing.xsmall,
        borderRadius: theme.radii.small,
    },
    pendingBadgeText: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.small,
        color: '#856404',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.medium,
    },
    actionButton: {
        flex: 1,
        paddingVertical: theme.spacing.medium,
        borderRadius: theme.radii.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    approveButton: {
        backgroundColor: theme.colors.success,
    },
    rejectButton: {
        backgroundColor: theme.colors.error,
    },
    actionButtonText: {
        ...theme.typography.styles.button,
        color: theme.colors.white,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xlarge,
    },
    emptyText: {
        ...theme.typography.styles.body,
        color: theme.colors.text,
        textAlign: 'center',
    },
});
