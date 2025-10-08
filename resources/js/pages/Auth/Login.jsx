import { Head, useForm } from '@inertiajs/react';
import { Form, Input, Button, Card, notification, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [api, contextHolder] = notification.useNotification();

    const onFinish = () => {
        post('/login', {
            preserveScroll: true,
            onError: (error) =>{      
                api.error({
                    message: 'Login Failed',
                    description: error.message || error.password || error.email || 'Please check your input and try again.',
                    placement: 'bottom',
                });
            }
        });
    };

    return (
        <>
            {contextHolder}

            <Head title="Login" />
            
            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md shadow-lg mx-4">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 m-0">Admin Login</h2>
                    </div>

                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        layout="vertical"
                    >
                        {/* email */}
                        <Form.Item
                            name="email"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Please input your email!' 
                                },
                                { 
                                    type: 'email', 
                                    message: 'Please enter a valid email!' 
                                }
                            ]}
                            validateStatus={errors.email ? 'error' : ''}
                            help={errors.email}
                        >
                            <Input 
                                prefix={<UserOutlined className="text-gray-400" />} 
                                placeholder="Email"
                                size="large"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </Form.Item>

                        {/* password */}
                        <Form.Item
                            name="password"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Please input your password!' 
                                }
                            ]}
                            validateStatus={errors.password ? 'error' : ''}
                            help={errors.password}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="text-gray-400" />}
                                placeholder="Password"
                                size="large"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </Form.Item>

                        {/* remember me */}
                        <Form.Item name="remember" label={null}>
                            <Checkbox 
                            checked={data.remember} onChange={(e) => setData('remember', e.target.checked)}> Remember me </Checkbox>
                        </Form.Item>

                        {/* login button */}
                        <Form.Item>
                            <Button 
                                type="primary" 
                                htmlType="submit" 
                                block 
                                size="large"
                                loading={processing}
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </>
    );
}
