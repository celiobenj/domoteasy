import { StyleSheet } from 'react-native';
import { theme } from '../../theme/theme';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topSection: {
        paddingTop: theme.spacing.xxxlarge,
        paddingHorizontal: theme.spacing.large,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: theme.spacing.xlarge,
        alignSelf: "stretch",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    title: {
        fontFamily: theme.typography.styles.heading.fontFamily,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xxlarge,
    },
    greetings: {
        paddingHorizontal: theme.spacing.small,
        alignItems: "flex-start",
        gap: theme.spacing.small,
        alignSelf: "stretch"
    },
    greetingText: {
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        fontSize: theme.typography.fontSize.xlarge,
    },
    content: {
        flex: 1,
        width: '100%',
        paddingHorizontal: theme.spacing.large,
    },
    projectsSection: {
        marginTop: theme.spacing.medium,
        marginBottom: theme.spacing.large,
    },
    sectionTitle: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.large,
        color: theme.colors.text,
        marginBottom: theme.spacing.medium,
    },
    projectsList: {
        gap: theme.spacing.small,
    },
    loadingContainer: {
        padding: theme.spacing.xxlarge,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyState: {
        padding: theme.spacing.xxlarge,
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.large,
    },
    emptyStateText: {
        fontFamily: theme.typography.fontFamily.regular,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.text,
        textAlign: 'center',
        opacity: 0.7,
    },
    emptyStateButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: theme.spacing.xlarge,
        paddingVertical: theme.spacing.medium,
        borderRadius: theme.radii.medium,
    },
    emptyStateButtonText: {
        fontFamily: theme.typography.fontFamily.bold,
        fontSize: theme.typography.fontSize.medium,
        color: theme.colors.onPrimary,
    },
    actionsSection: {
        marginTop: theme.spacing.large,
        marginBottom: theme.spacing.large,
        gap: theme.spacing.medium,
    },
    actionButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.large,
        borderRadius: theme.radii.medium,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionButtonText: {
        ...theme.typography.styles.button,
        fontSize: theme.typography.fontSize.large,
    },
    actionButtonIcon: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: theme.spacing.small,
        borderRadius: 50,
    },
    footer: {
        flexDirection: "row",
        paddingHorizontal: theme.spacing.xxlarge,
        paddingVertical: theme.spacing.medium,
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        backgroundColor: theme.colors.background,
        borderTopColor: theme.colors.primary,
        borderTopWidth: 4,
    },
    footerButton: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});