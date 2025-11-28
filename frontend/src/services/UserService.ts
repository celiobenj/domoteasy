import api from './api';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    subscriptionType: 'common' | 'premium';
}

function mapBackendUser(u: any): User {
    const tipoAssinatura: string = (u.tipoAssinatura || '').toLowerCase();
    const isPremium = tipoAssinatura.includes('premium');

    return {
        id: String(u.id),
        name: u.nome ?? '',
        email: u.email ?? '',
        role: 'user',
        status: 'active',
        subscriptionType: isPremium ? 'premium' : 'common',
    };
}

export const UserService = {
    /**
     * Get all users with optional search filter
     * @param search Optional search string to filter by name or email
     * @returns Promise with array of users
     */
    async getAllUsers(search?: string): Promise<User[]> {
        try {
            const response = await api.get('/admin/usuarios');
            let users = (response.data as any[]).map(mapBackendUser);

            if (search && search.trim() !== '') {
                const lowerSearch = search.toLowerCase();
                users = users.filter(
                    user =>
                        user.name.toLowerCase().includes(lowerSearch) ||
                        user.email.toLowerCase().includes(lowerSearch)
                );
            }

            return users;
        } catch (error) {
            console.error('Erro ao listar usuários admin:', error);
            throw error;
        }
    },

    /**
     * Get a single user by ID
     * @param id User ID
     * @returns Promise with user or undefined if not found
     */
    async getUserById(id: string): Promise<User | undefined> {
        try {
            const all = await this.getAllUsers();
            return all.find(user => user.id === id);
        } catch (error) {
            console.error('Erro ao buscar usuário admin:', error);
            throw error;
        }
    },

    /**
     * Update a user's data
     * @param id User ID
     * @param data Partial user data to update
     * @returns Promise with updated user or undefined if not found
     */
    async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
        try {
            const patch: any = {};

            if (data.name) patch.nome = data.name;
            if (data.email) patch.email = data.email;
            if (data.subscriptionType) {
                patch.tipoAssinatura = data.subscriptionType === 'premium' ? 'Premium' : 'Comum';
            }

            // Backend admin endpoint: PATCH /admin/usuarios/:idUsuario
            await api.patch(`/admin/usuarios/${id}`, patch);

            // Reload user to reflect changes
            return this.getUserById(id);
        } catch (error) {
            console.error('Erro ao atualizar usuário admin:', error);
            return undefined;
        }
    },
};
