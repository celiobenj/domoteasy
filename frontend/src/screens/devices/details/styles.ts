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
