import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 15,
        total: 0,
    });
    const [filters, setFilters] = useState({
        search: '',
        user_type: undefined,
    });

    const fetchUsers = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                ...(filters.search && { search: filters.search }),
                ...(filters.user_type && { user_type: filters.user_type }),
            };

            const response = await axios.get('/api/users', { params });
            
            setUsers(response.data.data);
            setPagination({
                current_page: response.data.meta.current_page,
                per_page: response.data.meta.per_page,
                total: response.data.meta.total,
            });
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(1);
    }, [filters]);

    const handleSearch = (value) => {
        setFilters(prev => ({ ...prev, search: value }));
    };

    const handleFilterChange = (value) => {
        setFilters(prev => ({ ...prev, user_type: value }));
    };

    const handlePageChange = (page) => {
        fetchUsers(page);
    };

    const refreshUsers = () => {
        fetchUsers(pagination.current_page);
    };

    return {
        users,
        loading,
        pagination,
        filters,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        refreshUsers,
    };
}
