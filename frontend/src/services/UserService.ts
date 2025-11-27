export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    status: 'active' | 'inactive';
    subscriptionType: 'common' | 'premium';
}

const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Ana Silva',
        email: 'ana.silva@email.com',
        role: 'user',
        status: 'active',
        subscriptionType: 'premium',
    },
    {
        id: '2',
        name: 'Carlos Santos',
        email: 'carlos.santos@email.com',
        role: 'user',
        status: 'active',
        subscriptionType: 'common',
    },
    {
        id: '3',
        name: 'Beatriz Oliveira',
        email: 'beatriz.oliveira@email.com',
        role: 'user',
        status: 'inactive',
        subscriptionType: 'common',
    },
    {
        id: '4',
        name: 'Daniel Costa',
        email: 'daniel.costa@email.com',
        role: 'user',
        status: 'active',
        subscriptionType: 'premium',
    },
    {
        id: '5',
        name: 'Fernanda Lima',
        email: 'fernanda.lima@email.com',
        role: 'user',
        status: 'active',
        subscriptionType: 'common',
    },
    {
        id: '6',
        name: 'Gabriel Pereira',
        email: 'gabriel.pereira@email.com',
        role: 'admin',
        status: 'active',
        subscriptionType: 'premium',
    },
    {
        id: '7',
        name: 'Helena Rodrigues',
        email: 'helena.rodrigues@email.com',
        role: 'user',
        status: 'inactive',
        subscriptionType: 'common',
    },
    {
        id: '8',
        name: 'Igor Almeida',
        email: 'igor.almeida@email.com',
        role: 'user',
        status: 'active',
        subscriptionType: 'premium',
    },
    {
        id: '9',
        name: 'Julia Ferreira',
        email: 'julia.ferreira@email.com',
        role: 'user',
        status: 'active',
        subscriptionType: 'common',
    },
    {
        id: '10',
        name: 'Lucas Martins',
        email: 'lucas.martins@email.com',
        role: 'user',
        status: 'inactive',
        subscriptionType: 'common',
    },
];

// In-memory storage to simulate persistence during the session
let usersData = [...MOCK_USERS];

export const UserService = {
    /**
     * Get all users with optional search filter
     * @param search Optional search string to filter by name or email
     * @returns Promise with array of users
     */
    async getAllUsers(search?: string): Promise<User[]> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        if (!search || search.trim() === '') {
            return usersData;
        }

        const lowerSearch = search.toLowerCase();
        return usersData.filter(
            user =>
                user.name.toLowerCase().includes(lowerSearch) ||
                user.email.toLowerCase().includes(lowerSearch)
        );
    },

    /**
     * Get a single user by ID
     * @param id User ID
     * @returns Promise with user or undefined if not found
     */
    async getUserById(id: string): Promise<User | undefined> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return usersData.find(user => user.id === id);
    },

    /**
     * Update a user's data
     * @param id User ID
     * @param data Partial user data to update
     * @returns Promise with updated user or undefined if not found
     */
    async updateUser(id: string, data: Partial<User>): Promise<User | undefined> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const userIndex = usersData.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return undefined;
        }

        usersData[userIndex] = {
            ...usersData[userIndex],
            ...data,
        };

        return usersData[userIndex];
    },
};
