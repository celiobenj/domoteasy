import { StyleSheet } from 'react-native';
import { theme } from '@/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContainer: {
        padding: theme.spacing.large,
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
    backButton: {
        marginRight: theme.spacing.medium,
    },
    title: {
        fontSize: theme.typography.fontSize.xlarge,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    imagePlaceholder: {
        width: '100%',
        height: 250,
        backgroundColor: '#E0E0E0',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    imageText: {
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.regular,
        color: '#999',
    },
    infoCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
    },
    deviceName: {
        fontSize: 22,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        marginBottom: 5,
    },
    deviceBrand: {
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.regular,
        color: '#666',
        marginBottom: 10,
    },
    devicePrice: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.primary,
        marginBottom: 10,
    },
    category: {
        alignSelf: 'flex-start',
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    categoryText: {
        color: theme.colors.onPrimary,
        fontSize: 12,
        fontFamily: theme.typography.fontFamily.bold,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.regular,
        color: theme.colors.text,
        lineHeight: 24,
    },
    specsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    specLabel: {
        fontSize: 14,
        fontFamily: theme.typography.fontFamily.bold,
        color: theme.colors.text,
    },
    specValue: {
        fontSize: 14,
        fontFamily: theme.typography.fontFamily.regular,
        color: '#666',
    },
    manualButton: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    manualButtonText: {
        color: theme.colors.onPrimary,
        fontSize: 16,
        fontFamily: theme.typography.fontFamily.bold,
        marginLeft: 8,
    },
    premiumBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginLeft: 10,
    },
    premiumText: {
        color: '#000',
        fontSize: 10,
        fontFamily: theme.typography.fontFamily.bold,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
