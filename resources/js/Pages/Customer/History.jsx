import React from 'react';
import { Head } from '@inertiajs/react';
import CustomerHistory from '../../components/CustomerHistory';
import PublicLayout from '../../Layouts/PublicLayout';

export default function History({ historyData, data }) {
    const payload = historyData || data || {};

    return (
        <PublicLayout>
            <Head title="My Booking History" />
            <CustomerHistory data={payload} />
        </PublicLayout>
    );
}