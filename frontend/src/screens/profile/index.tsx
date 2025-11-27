import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfilePhoto } from "@/components/profilePhoto";
import { styles } from './styles';
import { useProfile } from './useProfile';
import { theme } from '@/theme/theme';

const ProfileScreen = () => {
    const { userName, subscriptionStatus, isAdmin, handleGoBack, handleEditProfile, handleUpgrade, handleNavigateToAdmin, handleLogout } = useProfile();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={28} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Perfil</Text>
            </View>

            <View style={styles.profileInfo}>
                <ProfilePhoto size={100} />
                <Text style={styles.userName}>{userName || 'User Name'}</Text>
                <Text style={styles.userEmail}>seu_email@email.com</Text>
            </View>

            <View style={styles.actionsContainer}>
                {isAdmin() && (
                    <TouchableOpacity style={styles.actionButton} onPress={handleNavigateToAdmin}>
                        <Text style={styles.actionButtonText}>Painel Admin</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.actionButton} onPress={handleEditProfile}>
                    <Text style={styles.actionButtonText}>Editar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleUpgrade}>
                    <Text style={styles.actionButtonText}>
                        {subscriptionStatus === 'premium' ? 'Gerenciar Assinatura' : 'Fazer Upgrade'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.actionButtonText}>Sair da conta</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <MaterialCommunityIcons name="account" size={32} color={theme.colors.primary} />
            </View>
        </View>
    );
};

export default ProfileScreen;
