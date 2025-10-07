import { Head, usePage } from '@inertiajs/react';

export default function main() {
    const  page  = usePage().props;
    console.log(page);
    return (
        <>
            <Head title="Main" />
            <div className="">
                this is the main page
            </div>
        </>
    );
}
