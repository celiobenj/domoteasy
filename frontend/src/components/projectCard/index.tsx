import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Project } from '@/services/ProjectService';
import { styles } from './styles';

interface ProjectCardProps {
    project: Project;
    onPress: (projectId: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onPress }) => {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoje';
        if (diffDays === 1) return 'Ontem';
        if (diffDays < 7) return `${diffDays} dias atrás`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`;

        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getStatusLabel = (status: string): string => {
        switch (status) {
            case 'draft': return 'Rascunho';
            case 'in-progress': return 'Em andamento';
            case 'completed': return 'Concluído';
            default: return status;
        }
    };

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => onPress(project.id)}
            activeOpacity={0.7}
        >
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <Text style={styles.projectStatus}>{getStatusLabel(project.status)}</Text>
                </View>
                <Text style={styles.projectDate}>{formatDate(project.createdAt)}</Text>
            </View>
        </TouchableOpacity>
    );
};
