import React from 'react';
import { Head } from '@inertiajs/react';
import CustomerDashboard from '../../components/CustomerDashboard';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Dashboard({ dashboardData, data }) {
    const payload = dashboardData || data || {};

    return (
        <PublicLayout>
            <Head title="Dashboard" />
            <CustomerDashboard data={payload} />
        </PublicLayout>
    );
}