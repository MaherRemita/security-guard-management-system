import { useForm, usePage } from '@inertiajs/react';
import { Modal, Form, Input, Select, DatePicker, notification } from 'antd';

export default function CreateUserModal({ open, onClose }) {
    const [form] = Form.useForm();
    const { flash } = usePage().props;
    const [api, contextHolder] = notification.useNotification();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        user_type: '',
        date_of_birth: '',
    });

    const handleCancel = () => {
        form.resetFields();
        reset();
        onClose();
    };

    const handleSubmit = () => {
        form.validateFields().then(() => {
            post('/admin/users/create', {
                preserveScroll: true,
                onSuccess: () => {
                    api.success({
                        message: 'Success',
                        description: flash?.success || 'User created successfully!',
                        placement: 'bottom',
                    });
                    handleCancel();
                },
                onError: (errors) => {   
                    api.error({
                        message: 'Error',
                        description: errors.message || 'Failed to create user. Please check your input.',
                        placement: 'bottom',
                    });
                }
            });
        });
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Create New User"
                open={open}
                onOk={handleSubmit}
                onCancel={handleCancel}
                confirmLoading={processing}
                okText="Create User"
                cancelText="Cancel"
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    className="mt-4"
                >
                    {/* Name Field */}
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[
                            { required: true, message: 'Please input the name!' },
                            { max: 255, message: 'Name must not exceed 255 characters!' }
                        ]}
                        validateStatus={errors.name ? 'error' : ''}
                        help={errors.name}
                    >
                        <Input 
                            placeholder="Enter full name"
                            size="large"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                    </Form.Item>

                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input the email!' },
                            { type: 'email', message: 'Please enter a valid email!' },
                            { max: 255, message: 'Email must not exceed 255 characters!' }
                        ]}
                        validateStatus={errors.email ? 'error' : ''}
                        help={errors.email}
                    >
                        <Input 
                            placeholder="Enter email address"
                            size="large"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </Form.Item>

                    {/* User Type Field */}
                    <Form.Item
                        label="User Type"
                        name="user_type"
                        rules={[
                            { required: true, message: 'Please select a user type!' }
                        ]}
                        validateStatus={errors.user_type ? 'error' : ''}
                        help={errors.user_type}
                    >
                        <Select
                            placeholder="Select user type"
                            size="large"
                            value={data.user_type}
                            onChange={(value) => setData('user_type', value)}
                        >
                            <Select.Option value="CUSTOMER">Customer</Select.Option>
                            <Select.Option value="GUARD">Security Guard</Select.Option>
                        </Select>
                    </Form.Item>

                    {/* Date of Birth Field */}
                    <Form.Item
                        label="Date of Birth"
                        name="date_of_birth"
                        rules={[
                            { required: true, message: 'Please select date of birth!' }
                        ]}
                        validateStatus={errors.date_of_birth ? 'error' : ''}
                        help={errors.date_of_birth}
                    >
                        <DatePicker 
                            placeholder="Select date of birth"
                            size="large"
                            className="w-full"
                            format="YYYY-MM-DD"
                            onChange={(date, dateString) => setData('date_of_birth', dateString)}
                        />
                    </Form.Item>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                        <p className="text-sm text-blue-800">
                            <strong>Note:</strong> A default password "password" will be assigned to the new user.
                        </p>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
