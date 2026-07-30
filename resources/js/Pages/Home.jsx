import React from 'react';
import { Head } from '@inertiajs/react';
import HomePage from '../components/HomePage';
import CarsPage from '../components/CarsPage';
import PublicLayout from '../Layouts/PublicLayout';

export default function Home({ homeData, carsData }) {
    const data = homeData || carsData || {};
    const isCarsListing = Array.isArray(data.cars) || Boolean(data.paginationHtml) || typeof data.total === 'number';

    return (
        <PublicLayout>
            <Head title={isCarsListing ? 'Browse Cars' : 'Home'} />
            {isCarsListing ? <CarsPage data={data} /> : <HomePage data={data} />}
        </PublicLayout>
    );
}