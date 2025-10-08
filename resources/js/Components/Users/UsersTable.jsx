import { useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteUserModal from './DeleteUserModal';

export default function UsersTable({ users, loading, pagination, onPageChange }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
        onPageChange();
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 60,
            fixed: 'left',
            render: (id) => <span className="font-mono text-slate-600 text-xs">#{id}</span>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            ellipsis: true,
            render: (name) => (
                <div className="flex items-center gap-2">
                    <UserOutlined className="text-blue-500 flex-shrink-0" />
                    <span className="font-medium text-slate-800 text-sm truncate">{name}</span>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            render: (email) => (
                <div className="flex items-center gap-2">
                    <MailOutlined className="text-slate-400 flex-shrink-0" />
                    <span className="text-slate-600 text-sm truncate">{email}</span>
                </div>
            ),
        },
        {
            title: 'Type',
            dataIndex: 'user_type',
            key: 'user_type',
            render: (type) => {
                const color = type === 'CUSTOMER' ? 'blue' : 'green';
                const text = type === 'CUSTOMER' ? 'Customer' : 'Guard';
                return <Tag color={color} className="text-xs">{text}</Tag>;
            },
        },
        {
            title: 'Birth Date',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            render: (date) => (
                <div className="flex items-center gap-2">
                    <CalendarOutlined className="text-slate-400 flex-shrink-0" />
                    <span className="text-slate-600 text-sm">{date}</span>
                </div>
            ),
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 60,
            render: (age) => <span className="font-semibold text-slate-700 text-sm">{age}</span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
                <Button
                    type="text"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteClick(record)}
                    className="hover:bg-red-50"
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <>
            <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
                <Table
                    columns={columns}
                    dataSource={users}
                    loading={loading}
                    rowKey="id"
                    scroll={{ x: 600, y: 'calc(100vh - 400px)' }}
                    size="small"
                    sticky
                    pagination={{
                        current: pagination.current_page,
                        total: pagination.total,
                        pageSize: pagination.per_page,
                        showSizeChanger: false,
                        showTotal: (total, range) => (
                            <span className="text-sm">{`${range[0]}-${range[1]} of ${total}`}</span>
                        ),
                        onChange: onPageChange,
                        responsive: true,
                        simple: window.innerWidth < 640,
                    }}
                    locale={{
                        emptyText: (
                            <div className="py-8">
                                <p className="text-slate-500 text-base">No users found</p>
                                <p className="text-slate-400 text-xs mt-2">
                                    Try adjusting your search or filter
                                </p>
                            </div>
                        ),
                    }}
                />
            </div>
        </div>

            {/* Delete User Modal */}
            {selectedUser && (
                <DeleteUserModal
                    user={selectedUser}
                    open={isDeleteModalOpen}
                    onClose={handleCloseDeleteModal}
                />
            )}
        </>
    );
}
