import React from 'react';
import { Head } from '@inertiajs/react';
import AuthLogin from '../../components/AuthLogin';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Login({ loginData, data }) {
    const payload = loginData || data || {};

    return (
        <PublicLayout>
            <Head title="Login" />
            <AuthLogin data={payload} />
        </PublicLayout>
    );
}