import React from 'react';
import { Head } from '@inertiajs/react';
import CarDetailsPage from '../components/CarDetailsPage';
import PublicLayout from '../Layouts/PublicLayout';

export default function CarDetails({ carDetailsData }) {
    return (
        <PublicLayout>
            <Head title="Car Details" />
            <CarDetailsPage data={carDetailsData || {}} />
        </PublicLayout>
    );
}