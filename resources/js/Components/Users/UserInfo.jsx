import { usePage, router } from '@inertiajs/react';
import { Avatar, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, MailOutlined } from '@ant-design/icons';

export default function UserInfo() {
    const { auth } = usePage().props;

    // Function to get initials from user name for Avatar display
    const getInitials = (name) => {
        const names = name.trim().split(' ');

        if (names.length === 0) return '';
        if (names.length === 1) return names[0].charAt(0).toUpperCase();

        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    };

    const handleLogout = () => {
        router.post('/logout');
    };

    const items = [
        {
            key: 'user-info',
            type: 'group',
            label: (
                <div className="py-2">
                    <div className="flex items-center gap-2 mb-1 w-52">
                        <UserOutlined className="text-slate-500" />
                        <span className="text-sm font-semibold text-slate-800">
                            {auth.user?.name || 'User'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MailOutlined className="text-slate-500" />
                        <span className="text-xs text-slate-500">
                            {auth.user?.email || 'email@example.com'}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];

    return (
        <Dropdown 
            menu={{ items }} 
            trigger={['click']}
            placement="bottomRight"
        >
            <Avatar 
                size="default"
                className="cursor-pointer !bg-blue-600 !hover:bg-blue-700 transition-colors"
                icon={!auth.user?.name && <UserOutlined />}
            >
                {auth.user?.name && getInitials(auth.user.name)}
            </Avatar>
        </Dropdown>
    );
}
