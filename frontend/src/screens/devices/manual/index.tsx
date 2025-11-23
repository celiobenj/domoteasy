import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import { useDeviceManual } from './useDeviceManual';
import { theme } from '@/theme/theme';

const DeviceManualScreen = () => {
    const { manual, loading, handleGoBack, handleOpenVideo, handleOpenPDF } = useDeviceManual();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    if (!manual) {
        return (
            <View style={styles.container}>
                <View style={[styles.header, { padding: 20 }]}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Manual de Instalação</Text>
                </View>
                <View style={styles.loadingContainer}>
                    <Text>Manual não disponível</Text>
                </View>
            </View>
        );
    }

    // Parse manual content to render with proper formatting
    const renderContent = () => {
        return manual.content.split('\n').map((line, index) => {
            // Headers
            if (line.startsWith('# ')) {
                return (
                    <Text key={index} style={styles.sectionTitle}>
                        {line.replace('# ', '')}
                    </Text>
                );
            }
            if (line.startsWith('## ')) {
                return (
                    <Text key={index} style={styles.sectionSubtitle}>
                        {line.replace('## ', '')}
                    </Text>
                );
            }
            // Bullet points
            if (line.startsWith('- ')) {
                return (
                    <Text key={index} style={styles.bulletPoint}>
                        • {line.replace('- ', '')}
                    </Text>
                );
            }
            // Regular text
            if (line.trim()) {
                return (
                    <Text key={index} style={styles.manualContent}>
                        {line}
                    </Text>
                );
            }
            // Empty line for spacing
            return <View key={index} style={{ height: 10 }} />;
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                        <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Manual de Instalação</Text>
                    <View style={styles.premiumBadge}>
                        <MaterialCommunityIcons name="crown" size={16} color="#000" />
                        <Text style={styles.premiumText}>PREMIUM</Text>
                    </View>
                </View>

                <View style={styles.contentCard}>
                    {renderContent()}
                </View>

                {/* Additional Resources */}
                {(manual.videoUrl || manual.pdfUrl) && (
                    <View style={styles.contentCard}>
                        <Text style={styles.sectionSubtitle}>Recursos Adicionais</Text>
                        <View style={styles.resourcesContainer}>
                            {manual.videoUrl && (
                                <TouchableOpacity style={styles.resourceButton} onPress={handleOpenVideo}>
                                    <MaterialCommunityIcons name="play-circle" size={24} color={theme.colors.onPrimary} />
                                    <Text style={styles.resourceButtonText}>Assistir Vídeo Tutorial</Text>
                                </TouchableOpacity>
                            )}
                            {manual.pdfUrl && (
                                <TouchableOpacity style={styles.resourceButton} onPress={handleOpenPDF}>
                                    <MaterialCommunityIcons name="file-pdf-box" size={24} color={theme.colors.onPrimary} />
                                    <Text style={styles.resourceButtonText}>Baixar Manual em PDF</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default DeviceManualScreen;
