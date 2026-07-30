import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import CarFormFields from './FormFields';

export default function CarsEdit({ car, categories, divisions }) {
    const { data, setData, put, processing, errors } = useForm({
        brand: car.brand || '',
        model: car.model || '',
        category: car.category || (categories[0] || 'Sedan'),
        location: car.location || '',
        fuel_type: car.fuel_type || 'Petrol',
        transmission: car.transmission || 'Manual',
        seats: car.seats || 5,
        price_per_day: car.price_per_day || 1200,
        rating: car.rating || 4,
        image: null,
        description: car.description || '',
        availability: car.availability || 'available',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/cars/${car.id}`, { forceFormData: true });
    };

    return (
        <>
            <Head title="Edit Car" />
            <AdminLayout pageTitle="Edit Car">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #3b82f6' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>
                                <i className="bi bi-pencil-square me-2" style={{ color: '#3b82f6' }} />Edit: {car.brand} {car.model}
                            </h5>
                            <form onSubmit={submit}>
                                <CarFormFields data={data} setData={setData} errors={errors} categories={categories} divisions={divisions} isEdit />
                                <div className="d-flex gap-3 mt-4 flex-wrap">
                                    <button type="submit" className="btn btn-primary" disabled={processing}>
                                        <i className="bi bi-check-circle me-2" />Update Car
                                    </button>
                                    <Link href="/admin/cars" className="btn btn-outline-red">
                                        <i className="bi bi-arrow-left me-2" />Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
