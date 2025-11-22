import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Componentes
import { ProfilePhoto } from "@/components/profilePhoto";

// Hook e Estilos
import { useHome } from './useHome';
import { styles } from './styles';
import { theme } from '@/theme/theme';

const HomeScreen = () => {
    const { userName, handleNavigateToProfile, handleLogout, handleNavigateToCreateProject, handleNavigateToTechnicians } = useHome();

    return (
        <View style={styles.container}>
            {/* Seção Superior */}
            <View style={styles.topSection}>
                <View style={styles.header}>
                    {/* Título da Página */}
                    <Text style={styles.title}>Home</Text>

                    {/* Foto de Perfil no Topo (Clicável para Logout ou Perfil?) */}
                    <TouchableOpacity>
                        <ProfilePhoto size={48} onPress={handleNavigateToProfile} />
                    </TouchableOpacity>
                </View>

                {/* Saudação */}
                <View style={styles.greetings}>
                    <Text style={styles.greetingText}>Olá, {userName}</Text>
                </View>
            </View>

            {/* Conteúdo Principal */}
            <View style={styles.content}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleNavigateToCreateProject}
                    activeOpacity={0.8}
                >
                    <Text style={styles.actionButtonText}>Novo Projeto</Text>
                    <View style={styles.actionButtonIcon}>
                        <MaterialCommunityIcons name="plus" size={24} color={theme.colors.onPrimary} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: theme.colors.white }]}
                    onPress={handleNavigateToTechnicians}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>Encontrar Técnicos</Text>
                    <View style={[styles.actionButtonIcon, { backgroundColor: theme.colors.background }]}>
                        <MaterialCommunityIcons name="account-search" size={24} color={theme.colors.primary} />
                    </View>
                </TouchableOpacity>
            </View>

            {/* Rodapé / Menu de Navegação */}
            <View style={styles.footer}>
                {/* Botão Home (Ativo) */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.footerButton}
                // onPress={() => {}} // Já estamos na home
                >
                    <MaterialCommunityIcons
                        name={"home"}
                        size={48}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>

                {/* Botão Perfil/Logout no Rodapé */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.footerButton}
                    onPress={handleLogout} // Exemplo: Botão da direita faz Logout
                >
                    {/* Usando um ícone de 'Sair' (logout) para ficar claro, ou manter ProfilePhoto */}
                    <MaterialCommunityIcons
                        name="logout"
                        size={32}
                        color={theme.colors.primary}
                    />
                    {/* Se preferir manter a foto como no original: <ProfilePhoto size={48} /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;