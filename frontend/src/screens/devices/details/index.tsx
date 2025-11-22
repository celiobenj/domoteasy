import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useDeviceDetails } from './useDeviceDetails';
import { theme } from '@/theme/theme';

const DeviceDetailsScreen = () => {
    const { device, loading, subscriptionStatus, handleViewManual, handleGoBack } = useDeviceDetails();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!device) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.headerBackButton}>
                        <Feather name="arrow-left" size={24} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Detalhes do Dispositivo</Text>
                    <View style={styles.headerSpacer} />
                </View>
                <View style={styles.loadingContainer}>
                    <Text>Dispositivo não encontrado</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.headerBackButton}>
                    <Feather name="arrow-left" size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Device Image Placeholder */}
                <View style={styles.imagePlaceholder}>
                    <MaterialCommunityIcons name="devices" size={80} color="#999" />
                    <Text style={styles.imageText}>{device.name}</Text>
                </View>

                {/* Device Info Card */}
                <View style={styles.infoCard}>
                    <Text style={styles.deviceName}>{device.name}</Text>
                    <Text style={styles.deviceBrand}>{device.brand}</Text>
                    <Text style={styles.devicePrice}>
                        R$ {device.price.toFixed(2).replace('.', ',')}
                    </Text>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>{device.category}</Text>
                    </View>
                </View>

                {/* Description */}
                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.description}>{device.description}</Text>
                </View>

                {/* Technical Specifications */}
                <View style={styles.infoCard}>
                    <Text style={styles.sectionTitle}>Especificações Técnicas</Text>
                    {device.specs.map((spec, index) => (
                        <View key={index} style={styles.specsRow}>
                            <Text style={styles.specLabel}>{spec.label}</Text>
                            <Text style={styles.specValue}>{spec.value}</Text>
                        </View>
                    ))}
                </View>

                {/* View Manual Button */}
                <TouchableOpacity style={styles.manualButton} onPress={handleViewManual}>
                    <MaterialCommunityIcons name="book-open-variant" size={24} color={theme.colors.onPrimary} />
                    <Text style={styles.manualButtonText}>Ver Manual de Instalação</Text>
                    {subscriptionStatus !== 'premium' && (
                        <View style={styles.premiumBadge}>
                            <Text style={styles.premiumText}>PREMIUM</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default DeviceDetailsScreen;
