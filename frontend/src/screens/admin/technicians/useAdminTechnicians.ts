import { useState, useEffect } from 'react';
import { TechnicianService, Technician } from '@/services/TechnicianService';

export const useAdminTechnicians = () => {
    const [technicians, setTechnicians] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTechnicians();
    }, []);

    const loadTechnicians = async () => {
        try {
            setLoading(true);
            const data = await TechnicianService.getAll();
            setTechnicians(data);
        } catch (error) {
            console.error('Error loading technicians:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            setLoading(true);
            await TechnicianService.approve(id);
            await loadTechnicians();
        } catch (error) {
            console.error('Error approving technician:', error);
            setLoading(false);
        }
    };

    const handleReject = async (id: string) => {
        try {
            setLoading(true);
            await TechnicianService.reject(id);
            await loadTechnicians();
        } catch (error) {
            console.error('Error rejecting technician:', error);
            setLoading(false);
        }
    };

    const handleDeactivate = async (id: string) => {
        try {
            setLoading(true);
            await TechnicianService.deactivate(id);
            await loadTechnicians();
        } catch (error) {
            console.error('Error deactivating technician:', error);
            setLoading(false);
        }
    };

    const handleReactivate = async (id: string) => {
        try {
            setLoading(true);
            await TechnicianService.reactivate(id);
            await loadTechnicians();
        } catch (error) {
            console.error('Error reactivating technician:', error);
            setLoading(false);
        }
    };

    return {
        technicians,
        loading,
        handleApprove,
        handleReject,
        handleDeactivate,
        handleReactivate,
    };
};
