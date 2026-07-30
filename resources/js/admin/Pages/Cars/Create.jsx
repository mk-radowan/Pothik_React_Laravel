import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import CarFormFields from './FormFields';

export default function CarsCreate({ categories, divisions }) {
    const { data, setData, post, processing, errors } = useForm({
        brand: '',
        model: '',
        category: categories[0] || 'Sedan',
        location: '',
        fuel_type: 'Petrol',
        transmission: 'Manual',
        seats: 5,
        price_per_day: 1200,
        rating: 4,
        image: null,
        description: '',
        availability: 'available',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/cars', { forceFormData: true });
    };

    return (
        <>
            <Head title="Add Car" />
            <AdminLayout pageTitle="Add New Car">
                <div className="row justify-content-center">
                    <div className="col-lg-9">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #e8192c' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>
                                <i className="bi bi-plus-circle me-2" style={{ color: '#e8192c' }} />Add New Car
                            </h5>
                            <form onSubmit={submit}>
                                <CarFormFields data={data} setData={setData} errors={errors} categories={categories} divisions={divisions} />
                                <div className="d-flex gap-3 mt-4 flex-wrap">
                                    <button type="submit" className="btn btn-primary" disabled={processing}>
                                        <i className="bi bi-check-circle me-2" />Save Car
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
