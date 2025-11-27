import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Componentes
import { ProfilePhoto } from "@/components/profilePhoto";
import { ProjectCard } from '@/components/projectCard';

// Hook e Estilos
import { useHome } from './useHome';
import { styles } from './styles';
import { theme } from '@/theme/theme';

const HomeScreen = () => {
    const {
        userName,
        projects,
        loading,
        isAdmin,
        handleNavigateToProfile,
        handleLogout,
        handleNavigateToCreateProject,
        handleNavigateToTechnicians,
        handleNavigateToProject,
        handleNavigateToAdmin
    } = useHome();

    return (
        <View style={styles.container}>
            {/* Seção Superior */}
            <View style={styles.topSection}>
                <View style={styles.header}>
                    {/* Título da Página */}
                    <Text style={styles.title}>Home</Text>

                    {/* Foto de Perfil no Topo */}
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
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Meus Projetos Section */}
                <View style={styles.projectsSection}>
                    <Text style={styles.sectionTitle}>Meus Projetos</Text>

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        </View>
                    ) : projects.length > 0 ? (
                        <View style={styles.projectsList}>
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onPress={handleNavigateToProject}
                                />
                            ))}
                        </View>
                    ) : (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>
                                Você ainda não criou nenhum projeto.
                            </Text>
                            <TouchableOpacity
                                style={styles.emptyStateButton}
                                onPress={handleNavigateToCreateProject}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.emptyStateButtonText}>Criar seu primeiro projeto</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsSection}>
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

                {/* Admin Button */}
                {isAdmin && (
                    <View style={[styles.actionsSection, { marginTop: 0, paddingTop: 0 }]}>
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: theme.colors.text }]}
                            onPress={handleNavigateToAdmin}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.actionButtonText}>Painel Admin</Text>
                            <View style={styles.actionButtonIcon}>
                                <MaterialCommunityIcons name="shield-account" size={24} color={theme.colors.onPrimary} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>

            {/* Rodapé / Menu de Navegação */}
            <View style={styles.footer}>
                {/* Botão Home (Ativo) */}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.footerButton}
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
                    onPress={handleLogout}
                >
                    <MaterialCommunityIcons
                        name="logout"
                        size={32}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default HomeScreen;