import { Head, usePage } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Users() {
    return (
        <AuthLayout>
            <Head title="Users" />
            <div className="">
                this is the users page
            </div>
        </AuthLayout>
    );
}
