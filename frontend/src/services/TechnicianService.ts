import api from './api';

export interface Technician {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    email: string;
    phone: string;
    description: string;
    avatar?: string;
    status: 'pending' | 'active' | 'rejected' | 'inactive';
}

// Backend response interface (Portuguese keys)
interface BackendTechnician {
    id?: string | number;
    nome?: string;
    especialidade?: string;
    telefone?: string;
    email?: string;
}

/**
 * Adapter: Maps backend Portuguese data to frontend English interface
 */
const adaptBackendTechnician = (backendData: BackendTechnician): Technician => {
    return {
        id: String(backendData.id || ''),
        name: backendData.nome || '',
        specialty: backendData.especialidade || '',
        phone: backendData.telefone || '',
        email: backendData.email || '',
        // Backend doesn't provide these fields yet - using defaults
        rating: 0,
        description: '',
        avatar: undefined,
        status: 'active', // Backend returns only active technicians
    };
};

export const TechnicianService = {
    async getAll(): Promise<Technician[]> {
        try {
            const response = await api.get('/tecnicos');
            // Backend returns data in response.data.desc (array)
            const backendTechnicians = response.data?.desc || [];

            // Map each backend technician to frontend format
            return backendTechnicians.map(adaptBackendTechnician);
        } catch (error) {
            console.error('Error fetching technicians:', error);
            // Return empty array on error to prevent UI crashes
            return [];
        }
    },

    async getById(id: string): Promise<Technician | undefined> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock implementation - replace when backend ready
        const mockTechnicians = await this.getAll();
        return mockTechnicians.find(t => t.id === id);
    },

    async getPendingTechnicians(): Promise<Technician[]> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 800));

        // Mock implementation - backend should provide a /tecnicos/pendentes endpoint
        const allTechnicians = await this.getAll();
        return allTechnicians.filter(t => t.status === 'pending');
    },

    async approve(id: string): Promise<Technician | undefined> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock: Approving technician', id);
        return undefined;
    },

    async reject(id: string): Promise<Technician | undefined> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock: Rejecting technician', id);
        return undefined;
    },

    async deactivate(id: string): Promise<Technician | undefined> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock: Deactivating technician', id);
        return undefined;
    },

    async reactivate(id: string): Promise<Technician | undefined> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock: Reactivating technician', id);
        return undefined;
    },

    async updateTechnicianData(
        id: string,
        data: Partial<Technician>
    ): Promise<Technician | undefined> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock: Updating technician', id, data);
        return undefined;
    },

    async delete(id: string): Promise<boolean> {
        // TODO: Implement backend endpoint - currently mock
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Mock: Deleting technician', id);
        return false;
    },
};
