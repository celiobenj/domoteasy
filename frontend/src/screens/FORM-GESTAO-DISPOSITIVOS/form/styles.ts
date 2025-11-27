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
    scrollContent: {
        paddingHorizontal: theme.spacing.large,
        paddingBottom: theme.spacing.xlarge,
    },
    formSection: {
        gap: theme.spacing.large,
    },
    buttonContainer: {
        marginTop: theme.spacing.xlarge,
    },
    deleteButton: {
        marginTop: theme.spacing.large,
        alignItems: 'center',
        padding: theme.spacing.medium,
    },
    deleteButtonText: {
        color: theme.colors.error,
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.medium,
    },
});
