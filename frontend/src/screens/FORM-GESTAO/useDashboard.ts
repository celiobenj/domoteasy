import { router } from 'expo-router';

export const useDashboard = () => {
    const handleGoBack = () => {
        router.back();
    };

    const handleNavigateToUsers = () => {
        // Placeholder: Navigate to user management
        router.push('/FORM-GESTAO/users');
    };

    const handleNavigateToDevices = () => {
        // Placeholder: Navigate to devices management
        router.push('/FORM-GESTAO/devices');
    };

    const handleNavigateToTechnicians = () => {
        // Placeholder: Navigate to technicians approval
        router.push('/FORM-GESTAO/technicians');
    };

    return {
        handleGoBack,
        handleNavigateToUsers,
        handleNavigateToDevices,
        handleNavigateToTechnicians,
    };
};
