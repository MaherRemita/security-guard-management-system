import { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { MenuFoldOutlined, MenuUnfoldOutlined, DashboardOutlined, TeamOutlined } from '@ant-design/icons';
import { Layout, Button, Menu } from 'antd';
import AppLogo from '../Components/AppLogo';
import UserInfo from '../Components/UserInfo';

const { Header, Content, Sider, Footer } = Layout;

export default function AuthLayout ({ children }) {
    // State to manage sidebar collapse
    const [collapsed, setCollapsed] = useState(false);
    const { url } = usePage();

    const menuItems = [
        { 
            label: 'Dashboard', 
            key: '/admin/dashboard', 
            icon: <DashboardOutlined /> 
        },
        { 
            label: 'Users', 
            key: '/admin/users', 
            icon: <TeamOutlined /> 

        },
    ];

    const getSelectedKey = () => {
        const currentRoute = url;
        return currentRoute || '/dashboard';
    };

    const handleMenuClick = (item) => {
        router.visit(item.key);
    };

    return (
        <Layout className='!min-h-screen'>
            {/* Header */}
            <Header className='flex items-center justify-between !px-3 !bg-slate-900'>
                <AppLogo />
                <UserInfo />
            </Header>
            
            <Layout>
                {/* Sidebar */}
                <Sider 
                    collapsible 
                    collapsed={collapsed} 
                    onCollapse={setCollapsed}
                    trigger={null}
                    className='!bg-slate-800'
                >
                    <Menu 
                        theme="dark" 
                        selectedKeys={[getSelectedKey()]} 
                        mode="inline" 
                        items={menuItems} 
                        className='h-full' 
                        onClick={handleMenuClick}
                    />
                    
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className='!text-white hover:!bg-slate-800 !w-full !h-10 !absolute bottom-0'
                    />
                </Sider>
                
                {/* Main Content */}
                <Layout>
                    <Content className='m-2 p-2 bg-slate-50 rounded-lg min-h-[280px]'>
                        {children}
                    </Content>
                </Layout>
            </Layout>
            
            {/* Footer */}
            <Footer className='text-center !bg-slate-100 !text-slate-600'>
                Security Guard Management System ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
