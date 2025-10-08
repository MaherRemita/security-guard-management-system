import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import CreateUserModal from '@/Components/CreateUserModal';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Users() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <AuthLayout>
            <Head title="Users" />
            
            <div className="space-y-2">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Users Management</h1>
                        <p className="text-slate-600 mt-1">Manage customers and security guards</p>
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

                {/* Table Section - Placeholder */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <p className="text-slate-500 text-center">Users table will be displayed here</p>
                </div>
            </div>

            {/* Create User Modal */}
            <CreateUserModal 
                open={isModalOpen} 
                onClose={handleCloseModal} 
            />
        </AuthLayout>
    );
}
