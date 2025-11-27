import { useState } from 'react';
import { router } from 'expo-router';
import { ProjectService, ProjectData } from '@/services/ProjectService';

export const useCreateProject = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ProjectData>({
        type: 'house',
        rooms: [],
        budgetLimit: 0,
    });

    const totalSteps = 3;

    const handleNext = async () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            await handleSubmit();
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            router.back();
        }
    };

    const updateFormData = (key: keyof ProjectData, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleRoom = (room: string) => {
        setFormData(prev => {
            const rooms = prev.rooms.includes(room)
                ? prev.rooms.filter(r => r !== room)
                : [...prev.rooms, room];
            return { ...prev, rooms };
        });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const project = await ProjectService.create(formData);
            router.push({
                pathname: '/FORM-RECOMENDACOES',
                params: { projectId: project.id }
            });
        } catch (error) {
            console.error('Error creating project:', error);
            // Handle error (show alert, etc.)
        } finally {
            setLoading(false);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return !!formData.type;
            case 2:
                return formData.rooms.length > 0;
            case 3:
                return formData.budgetLimit > 0;
            default:
                return false;
        }
    };

    return {
        step,
        totalSteps,
        formData,
        loading,
        handleNext,
        handleBack,
        updateFormData,
        toggleRoom,
        isStepValid,
    };
};
