import React from 'react';
import { Head } from '@inertiajs/react';
import AuthRegister from '../../components/AuthRegister';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Register({ registerData, data }) {
    const payload = registerData || data || {};

    return (
        <PublicLayout>
            <Head title="Register" />
            <AuthRegister data={payload} />
        </PublicLayout>
    );
}