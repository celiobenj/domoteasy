import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { TechnicianService, Technician } from '@/services/TechnicianService';

export const useTechnicianList = () => {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [filteredTechnicians, setFilteredTechnicians] = useState<Technician[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTechnicians();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredTechnicians(technicians);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = technicians.filter(
                t =>
                    t.name.toLowerCase().includes(lowerQuery) ||
                    t.specialty.toLowerCase().includes(lowerQuery)
            );
            setFilteredTechnicians(filtered);
        }
    }, [searchQuery, technicians]);

    const loadTechnicians = async () => {
        try {
            setLoading(true);
            const data = await TechnicianService.getAll();
            setTechnicians(data);
            setFilteredTechnicians(data);
        } catch (error) {
            console.error('Error loading technicians:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const handleTechnicianPress = (id: string) => {
        router.push({ pathname: '/FORM-CONTATO-DETALHE/[id]', params: { id } });
    };

    return {
        technicians: filteredTechnicians,
        loading,
        searchQuery,
        handleSearch,
        handleTechnicianPress,
    };
};
