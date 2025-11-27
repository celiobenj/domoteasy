import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.large,
        paddingTop: theme.spacing.xxxlarge,
        paddingBottom: theme.spacing.xlarge,
        gap: theme.spacing.large,
    },
    backButton: {
        padding: theme.spacing.small,
    },
    title: {
        ...theme.typography.styles.heading,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.large,
        paddingTop: theme.spacing.xlarge,
    },
    cardsContainer: {
        gap: theme.spacing.large,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.radii.large,
        padding: theme.spacing.xlarge,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: theme.colors.text,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardContent: {
        flex: 1,
        gap: theme.spacing.small,
    },
    cardTitle: {
        ...theme.typography.styles.bodyBold,
        fontSize: theme.typography.fontSize.large,
    },
    cardDescription: {
        ...theme.typography.styles.body,
        fontSize: theme.typography.fontSize.small,
        opacity: 0.7,
    },
    cardIcon: {
        width: 48,
        height: 48,
        borderRadius: theme.radii.medium,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
