import { router } from 'expo-router';

export const useDashboard = () => {
    const handleGoBack = () => {
        router.back();
    };

    const handleNavigateToUsers = () => {
        // Placeholder: Navigate to user management
        router.push('/admin/users');
    };

    const handleNavigateToDevices = () => {
        // Placeholder: Navigate to devices management
        router.push('/admin/devices');
    };

    const handleNavigateToTechnicians = () => {
        // Placeholder: Navigate to technicians approval
        router.push('/admin/technicians');
    };

    return {
        handleGoBack,
        handleNavigateToUsers,
        handleNavigateToDevices,
        handleNavigateToTechnicians,
    };
};
