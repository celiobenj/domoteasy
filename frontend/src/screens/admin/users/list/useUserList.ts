import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { UserService, User } from '@/services/UserService';

export const useUserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUsers(users);
        } else {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = users.filter(
                user =>
                    user.name.toLowerCase().includes(lowerQuery) ||
                    user.email.toLowerCase().includes(lowerQuery)
            );
            setFilteredUsers(filtered);
        }
    }, [searchQuery, users]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            const data = await UserService.getAllUsers();
            setUsers(data);
            setFilteredUsers(data);
        } catch (error) {
            console.error('Error loading users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    const handleUserPress = (id: string) => {
        router.push({ pathname: '/admin/users/[id]', params: { id } });
    };

    return {
        users: filteredUsers,
        loading,
        searchQuery,
        handleSearch,
        handleUserPress,
    };
};
