import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
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
        elevation: 3,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E0E0E0',
        marginRight: theme.spacing.medium,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        ...theme.typography.styles.bodyBold,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.large,
    },
    info: {
        flex: 1,
    },
    name: {
        ...theme.typography.styles.bodyBold,
        fontSize: theme.typography.fontSize.medium,
    },
    specialty: {
        ...theme.typography.styles.caption,
        color: theme.colors.text,
        opacity: 0.7,
        fontSize: theme.typography.fontSize.small,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    ratingText: {
        ...theme.typography.styles.caption,
        marginLeft: 4,
        color: theme.colors.text,
    },
});
