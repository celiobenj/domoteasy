import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContainer: {
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        flex: 1,
    },
    premiumBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
    },
    premiumText: {
        color: '#000',
        fontSize: 12,
        fontFamily: theme.typography.fontFamily.bold,
        marginLeft: 5,
    },
    contentCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
    },
    manualContent: {
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        lineHeight: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        marginTop: 15,
        marginBottom: 5,
    },
    sectionSubtitle: {
        fontSize: 18,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        marginTop: 10,
        marginBottom: 5,
    },
    bulletPoint: {
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        lineHeight: 24,
        marginLeft: 10,
    },
    resourcesContainer: {
        marginTop: 10,
    },
    resourceButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    resourceButtonText: {
        color: theme.colors.onPrimary,
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.bold,
        marginLeft: 10,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
