import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Technician } from '@/services/TechnicianService';
import { styles } from './styles';
import { theme } from '@/theme/theme';

interface TechnicianCardProps {
    technician: Technician;
    onPress: (id: string) => void;
}

export const TechnicianCard = ({ technician, onPress }: TechnicianCardProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(technician.id)}
            activeOpacity={0.7}
        >
            <View style={styles.avatar}>
                {/* Placeholder for avatar image or initials */}
                <Text style={styles.avatarText}>
                    {technician.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{technician.name}</Text>
                <Text style={styles.specialty}>{technician.specialty}</Text>

                <View style={styles.ratingContainer}>
                    <MaterialCommunityIcons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{technician.rating.toFixed(1)}</Text>
                </View>
            </View>

            <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.text} />
        </TouchableOpacity>
    );
};
