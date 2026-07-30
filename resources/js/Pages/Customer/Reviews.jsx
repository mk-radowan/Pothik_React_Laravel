import React from 'react';
import { Head } from '@inertiajs/react';
import CustomerReviews from '../../components/CustomerReviews';
import PublicLayout from '../../Layouts/PublicLayout';

export default function Reviews({ reviewsData, data }) {
    const payload = reviewsData || data || {};

    return (
        <PublicLayout>
            <Head title="Customer Reviews" />
            <CustomerReviews data={payload} />
        </PublicLayout>
    );
}
