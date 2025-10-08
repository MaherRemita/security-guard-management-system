import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';

const { Header, Content, Sider, Footer } = Layout;

export default function AuthLayout ({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className='!min-h-screen'>
            <Header className='flex items-center justify-between px-6 !bg-slate-900'>
                <div className="flex items-center gap-4">
                    
                    <h1 className='text-white text-xl font-semibold m-0'>Security Guard System</h1>
                </div>
            </Header>
            
            <Layout>
                <Sider 
                    collapsible 
                    collapsed={collapsed} 
                    onCollapse={setCollapsed}
                    trigger={null}
                    className='!bg-slate-800'
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className='!text-white hover:!bg-slate-800 !w-full !h-10 !absolute bottom-0'
                    />
                </Sider>
                
                <Layout>
                    <Content className='m-4 p-6 bg-slate-50 rounded-lg min-h-[280px]'>
                        {children}
                    </Content>
                </Layout>
            </Layout>
            
            <Footer className='text-center !bg-slate-100 !text-slate-600'>
                Security Guard Management System ©{new Date().getFullYear()}
            </Footer>
        </Layout>
    );
};
