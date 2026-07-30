import React from 'react';
import { Head } from '@inertiajs/react';
import CustomerProfile from '../../components/CustomerProfile';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Profile({ profileData, data }) {
    const payload = profileData || data || {};

    return (
        <PublicLayout>
            <Head title="My Profile" />
            <CustomerProfile data={payload} />
        </PublicLayout>
    );
}