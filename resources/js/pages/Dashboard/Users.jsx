import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import CreateUserModal from '@/Components/Users/CreateUserModal';
import UsersSearch from '@/Components/Users/UsersSearch';
import UsersTable from '@/Components/Users/UsersTable';
import useUsers from '@/Hooks/useUsers';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        users,
        loading,
        pagination,
        filters,
        handleSearch,
        handleFilterChange,
        handlePageChange,
        refreshUsers,
    } = useUsers();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        refreshUsers();
    };

    return (
        <AuthLayout>
            <Head title="Users" />
            
            <div className="space-y-4">
                {/* Header Section */}
                <div className="flex justify-between items-center m-0 flex-col sm:flex-row gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Users Management</h1>
                    </div>
                    
                    <Button 
                        type="primary" 
                        size="large"
                        icon={<PlusOutlined />}
                        onClick={showModal}
                    >
                        Create New User
                    </Button>
                </div>

                {/* Search and Filter Section */}
                <UsersSearch
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    filters={filters}
                />

                {/* Users Table Section */}
                <UsersTable
                    users={users}
                    loading={loading}
                    pagination={pagination}
                    onPageChange={handlePageChange}
                />
            </div>

            {/* Create User Modal */}
            <CreateUserModal 
                open={isModalOpen} 
                onClose={handleCloseModal} 
            />
        </AuthLayout>
    );
}
