import { Head } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Settings() {
    return (
        <AuthLayout>
            <Head title="Settings" />
            
            <div>
                <h1 className="text-2xl font-bold text-slate-800 mb-4">Settings</h1>
                <p className="text-slate-600 mb-6">Manage your application settings and preferences.</p>
                
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">General Settings</h2>
                </div>
            </div>
        </AuthLayout>
    );
}
