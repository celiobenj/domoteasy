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
    listContent: {
        paddingHorizontal: theme.spacing.large,
        paddingBottom: 80,
    },
    deviceCard: {
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
    deviceCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deviceThumbnail: {
        width: 50,
        height: 50,
        borderRadius: theme.radii.small,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.medium,
    },
    deviceInfo: {
        flex: 1,
    },
    deviceName: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        marginBottom: 4,
    },
    deviceBrand: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.text,
        opacity: 0.7,
    },
    deviceActions: {
        flexDirection: 'row',
        gap: theme.spacing.small,
    },
    actionButton: {
        width: 36,
        height: 36,
        borderRadius: theme.radii.small,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
    },
    deleteButton: {
        backgroundColor: theme.colors.error,
    },
    emptyText: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        textAlign: 'center',
        marginTop: theme.spacing.xlarge,
        opacity: 0.6,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing.xlarge,
        right: theme.spacing.large,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
});
