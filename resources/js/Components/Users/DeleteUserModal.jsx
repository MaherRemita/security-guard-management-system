import { Modal, notification } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';

export default function DeleteUserModal({ user, open, onClose }) {
    const [api, contextHolder] = notification.useNotification();

    const handleDelete = () => {
        router.delete(`/admin/users/delete/${user.id}`, {
            onSuccess: () => {
                api.success({
                    message: 'User Deleted',
                    description: `${user.name} has been successfully deleted.`,
                    placement: 'topRight',
                });
                onClose();
            },
            onError: (errors) => {
                api.error({
                    message: 'Deletion Failed',
                    description: errors.message || 'Failed to delete user. Please try again.',
                    placement: 'topRight',
                });
            },
        });
    };

    return (
        <>
            {contextHolder}
            <Modal
                title={
                    <div className="flex items-center gap-2">
                        <ExclamationCircleOutlined className="text-red-500 text-xl" />
                        <span>Delete User</span>
                    </div>
                }
                open={open}
                onOk={handleDelete}
                onCancel={onClose}
                okText="Delete"
                okType="danger"
                cancelText="Cancel"
                okButtonProps={{
                    size: 'large',
                }}
                cancelButtonProps={{
                    size: 'large',
                }}
            >
                <div className="py-4">
                    <p className="text-slate-700 mb-4">
                        Are you sure you want to delete this user?
                    </p>
                    
                    <div className="p-4 bg-slate-50 rounded-lg mb-4">
                        <p className="text-sm mb-2">
                            <strong className="text-slate-700">Name:</strong>{' '}
                            <span className="text-slate-600">{user?.name}</span>
                        </p>
                        <p className="text-sm">
                            <strong className="text-slate-700">Email:</strong>{' '}
                            <span className="text-slate-600">{user?.email}</span>
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
}
