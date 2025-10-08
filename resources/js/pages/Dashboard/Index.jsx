import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { props } = usePage();
    const { customer_count, guards_count } = props;
    console.log(props);
    
    return (
        <AuthLayout>
            <Head title="Dashboard" />
            
            <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Dashboard</h1>
                <p className="text-slate-600">Welcome to the Security Guard Management System dashboard.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-slate-700">Total Customers</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{ customer_count ?? '0' }</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-slate-700">Total Guards</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2"> { guards_count ?? '0' }</p>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
