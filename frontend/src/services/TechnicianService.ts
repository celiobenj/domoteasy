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
            // Backend sends array directly in response.data (not nested in desc)
            const backendTechnicians = Array.isArray(response.data) ? response.data : [];

            // Map each backend technician to frontend format
            return backendTechnicians.map(adaptBackendTechnician);
        } catch (error) {
            console.error('Error fetching technicians:', error);
            // Return empty array on error to prevent UI crashes
            return [];
        }
    },

    async getById(id: string): Promise<Technician | undefined> {
        try {
            // Try to fetch specific technician if endpoint exists, otherwise filter from all
            // Assuming /tecnicos/:id might not exist yet, but we should try or use getAll
            // Since we want to remove "mock" behavior (simulated delay), we just use real data.
            const all = await this.getAll();
            return all.find(t => t.id === id);
        } catch (error) {
            console.error('Error fetching technician by id:', error);
            return undefined;
        }
    },

    async getPendingTechnicians(): Promise<Technician[]> {
        // Real implementation: Filter from all or call specific endpoint
        // For now, filtering from getAll is a valid client-side operation on real data
        const allTechnicians = await this.getAll();
        return allTechnicians.filter(t => t.status === 'pending');
    },

    async approve(id: string): Promise<Technician | undefined> {
        try {
            const response = await api.post('/admin/profissionais/status', {
                idTecnico: id,
                acao: 'aprovar'
            });

            // Verify successful status code
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }

            console.log('Technician approved successfully:', id);
            // Return updated technician if backend provides it, otherwise fetch
            return await this.getById(id);
        } catch (error) {
            console.error('Error approving technician:', error);
            throw error;
        }
    },

    async reject(id: string): Promise<Technician | undefined> {
        try {
            const response = await api.post('/admin/profissionais/status', {
                idTecnico: id,
                acao: 'reprovar'
            });

            // Verify successful status code
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }

            console.log('Technician rejected successfully:', id);
            return await this.getById(id);
        } catch (error) {
            console.error('Error rejecting technician:', error);
            throw error;
        }
    },

    async deactivate(id: string): Promise<Technician | undefined> {
        try {
            const response = await api.post('/admin/profissionais/status', {
                idTecnico: id,
                acao: 'desativar'
            });

            // Verify successful status code
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }

            console.log('Technician deactivated successfully:', id);
            return await this.getById(id);
        } catch (error) {
            console.error('Error deactivating technician:', error);
            throw error;
        }
    },

    async reactivate(id: string): Promise<Technician | undefined> {
        try {
            const response = await api.post('/admin/profissionais/status', {
                idTecnico: id,
                acao: 'reativar'
            });

            // Verify successful status code
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(`Unexpected status code: ${response.status}`);
            }

            console.log('Technician reactivated successfully:', id);
            return await this.getById(id);
        } catch (error) {
            console.error('Error reactivating technician:', error);
            throw error;
        }
    },

    async updateTechnicianData(
        id: string,
        data: Partial<Technician>
    ): Promise<Technician | undefined> {
        // Backend only supports password change via /usuario/atualizar
        // Profile data updates are not yet implemented in backend for technicians
        throw new Error("Feature not available on server");
    },

    async delete(id: string): Promise<boolean> {
        throw new Error("Feature not available on server");
    },
};
