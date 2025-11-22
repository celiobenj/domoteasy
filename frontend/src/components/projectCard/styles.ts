import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    card: {
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
        shadowRadius: 3.84,
        elevation: 3,
    },
    cardContent: {
        gap: theme.spacing.small,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    projectName: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.text,
        flex: 1,
    },
    projectStatus: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.primary,
        marginLeft: theme.spacing.small,
    },
    projectDate: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.small,
        color: theme.colors.text,
        opacity: 0.6,
    },
});
