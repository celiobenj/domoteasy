import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { BackHandler, Alert } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { ProjectService, Project } from '@/services/ProjectService';

export const useHome = () => {
    const { userName, clearUserName } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setLoading(true);
            const userProjects = await ProjectService.listByUser();
            setProjects(userProjects);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const onBackPress = () => {
            Alert.alert(
                "Sair do aplicativo",
                "Você deseja sair do aplicativo?",
                [
                    {
                        text: "Não",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "Sim",
                        onPress: () => BackHandler.exitApp(),
                    }
                ],
                { cancelable: true }
            );
            return true;
        };

        const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => subscription.remove();
    }, []);

    const handleNavigateToProfile = () => {
        router.push('/profile');
    };

    const handleLogout = async () => {
        await authService.logout();
        clearUserName();
        router.replace('/');
    };

    const handleNavigateToCreateProject = () => {
        router.push('/project/create');
    };

    const handleNavigateToTechnicians = () => {
        router.push('/technicians/list');
    };

    const handleNavigateToProject = (projectId: string) => {
        router.push(`/project/budget?projectId=${projectId}`);
    };

    return {
        userName: userName || "Usuário",
        projects,
        loading,
        handleNavigateToProfile,
        handleLogout,
        handleNavigateToCreateProject,
        handleNavigateToTechnicians,
        handleNavigateToProject,
    };
};