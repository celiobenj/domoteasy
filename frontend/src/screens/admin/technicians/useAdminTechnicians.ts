import { useState, useEffect } from 'react';
import { TechnicianService, Technician } from '@/services/TechnicianService';

export const useAdminTechnicians = () => {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPendingTechnicians();
    }, []);

    const loadPendingTechnicians = async () => {
        try {
            setLoading(true);
            const data = await TechnicianService.getPendingTechnicians();
            setTechnicians(data);
        } catch (error) {
            console.error('Error loading pending technicians:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            // Optimistic update: remove from list immediately
            setTechnicians(prev => prev.filter(t => t.id !== id));

            // Call service to update status
            await TechnicianService.updateTechnicianStatus(id, 'active');
        } catch (error) {
            console.error('Error approving technician:', error);
            // Reload list on error
            loadPendingTechnicians();
        }
    };

    const handleReject = async (id: string) => {
        try {
            // Optimistic update: remove from list immediately
            setTechnicians(prev => prev.filter(t => t.id !== id));

            // Call service to update status
            await TechnicianService.updateTechnicianStatus(id, 'rejected');
        } catch (error) {
            console.error('Error rejecting technician:', error);
            // Reload list on error
            loadPendingTechnicians();
        }
    };

    return {
        technicians,
        loading,
        handleApprove,
        handleReject,
    };
};
