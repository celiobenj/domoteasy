import { router } from 'expo-router';

export const useDashboard = () => {
    const handleGoBack = () => {
        router.back();
    };

    const handleNavigateToUsers = () => {
        // Placeholder: Navigate to user management
        router.push('./FORM-GESTAO/USUARIOS');
    };

    const handleNavigateToDevices = () => {
        // Placeholder: Navigate to devices management
        router.push('./FORM-GESTAO/DISPOSITIVOS');
    };

    const handleNavigateToTechnicians = () => {
        // Placeholder: Navigate to technicians approval
        router.push('./FORM-GESTAO/TECNICOS');
    };

    return {
        handleGoBack,
        handleNavigateToUsers,
        handleNavigateToDevices,
        handleNavigateToTechnicians,
    };
};
