import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

function buildLocation(division, district, upazila) {
    if (!division || !district) return '';
    if (!upazila) return `Division: ${division}, ${district}`;
    return `Division: ${division}, ${district}, ${upazila}`;
}

export default function BookingCreate({ customers, cars, divisions }) {
    const { data, setData, transform, post, processing, errors } = useForm({
        user_id: '',
        car_id: '',
        pickup_date: '',
        return_date: '',
        pickup_division: '',
        pickup_district: '',
        pickup_upazila: '',
        pickup_city: '',
        pickup_pourosova: '',
        pickup_ward: '',
        dropoff_division: '',
        dropoff_district: '',
        dropoff_upazila: '',
        dropoff_city: '',
        dropoff_pourosova: '',
        dropoff_ward: '',
    });

    const submit = (e) => {
        e.preventDefault();

        transform((form) => ({
            ...form,
            pickup_location: buildLocation(form.pickup_division, form.pickup_district, form.pickup_upazila),
            dropoff_location: buildLocation(form.dropoff_division, form.dropoff_district, form.dropoff_upazila),
        })).post('/admin/bookings/create-car');
    };

    return (
        <>
            <Head title="Booking Car" />
            <AdminLayout pageTitle="Booking Car">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #e8192c' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
                                <i className="bi bi-plus-circle me-2" style={{ color: '#e8192c' }} />Booking Car
                            </h5>

                            <form onSubmit={submit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Customer</label>
                                        <select className="form-select" value={data.user_id} onChange={(e) => setData('user_id', e.target.value)} required>
                                            <option value="">Select Customer</option>
                                            {customers.map((customer) => (
                                                <option key={customer.id} value={customer.id}>{customer.name} ({customer.email})</option>
                                            ))}
                                        </select>
                                        {errors.user_id ? <div className="invalid-feedback d-block">{errors.user_id}</div> : null}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Car</label>
                                        <select className="form-select" value={data.car_id} onChange={(e) => setData('car_id', e.target.value)} required>
                                            <option value="">Select Car</option>
                                            {cars.map((car) => (
                                                <option key={car.id} value={car.id}>{car.display_name} - {car.formatted_price}</option>
                                            ))}
                                        </select>
                                        {errors.car_id ? <div className="invalid-feedback d-block">{errors.car_id}</div> : null}
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Pickup Date</label>
                                        <input type="date" className="form-control" value={data.pickup_date} min={new Date().toISOString().slice(0, 10)} onChange={(e) => setData('pickup_date', e.target.value)} required />
                                        {errors.pickup_date ? <div className="invalid-feedback d-block">{errors.pickup_date}</div> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Return Date</label>
                                        <input type="date" className="form-control" value={data.return_date} onChange={(e) => setData('return_date', e.target.value)} required />
                                        {errors.return_date ? <div className="invalid-feedback d-block">{errors.return_date}</div> : null}
                                    </div>

                                    <LocationFields
                                        title="Start Location"
                                        data={data}
                                        setData={setData}
                                        divisions={divisions}
                                        prefix="pickup"
                                        error={errors.pickup_location}
                                    />

                                    <div className="col-md-4">
                                        <label className="form-label">City (optional)</label>
                                        <input type="text" className="form-control" value={data.pickup_city} onChange={(e) => setData('pickup_city', e.target.value)} placeholder="e.g. Dhaka City" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Pourosova (optional)</label>
                                        <input type="text" className="form-control" value={data.pickup_pourosova} onChange={(e) => setData('pickup_pourosova', e.target.value)} placeholder="e.g. Gazipur Pourosova" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Ward (optional)</label>
                                        <input type="text" className="form-control" value={data.pickup_ward} onChange={(e) => setData('pickup_ward', e.target.value)} placeholder="e.g. Ward 5" />
                                    </div>

                                    <LocationFields
                                        title="End Location"
                                        data={data}
                                        setData={setData}
                                        divisions={divisions}
                                        prefix="dropoff"
                                        error={errors.dropoff_location}
                                    />

                                    <div className="col-md-4">
                                        <label className="form-label">City (optional)</label>
                                        <input type="text" className="form-control" value={data.dropoff_city} onChange={(e) => setData('dropoff_city', e.target.value)} placeholder="e.g. Chattogram City" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Pourosova (optional)</label>
                                        <input type="text" className="form-control" value={data.dropoff_pourosova} onChange={(e) => setData('dropoff_pourosova', e.target.value)} placeholder="e.g. Comilla Pourosova" />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Ward (optional)</label>
                                        <input type="text" className="form-control" value={data.dropoff_ward} onChange={(e) => setData('dropoff_ward', e.target.value)} placeholder="e.g. Ward 3" />
                                    </div>
                                </div>

                                <div className="alert alert-info mt-3 mb-0" role="alert">
                                    New booking will be created as approved and selected car will be marked booked.
                                </div>

                                <div className="d-flex gap-3 mt-4 flex-wrap">
                                    <button type="submit" className="btn btn-primary" disabled={processing}>
                                        <i className="bi bi-check-circle me-2" />Create Booking
                                    </button>
                                    <Link href="/admin/bookings" className="btn btn-outline-red">
                                        <i className="bi bi-arrow-left me-2" />Back
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

function LocationFields({ title, data, setData, divisions, prefix, error }) {
    return (
        <div className="col-12">
            <label className="form-label">{title}</label>
            <div className="row g-2">
                <div className="col-md-4">
                    <select className="form-select" value={data[`${prefix}_division`]} onChange={(e) => setData(`${prefix}_division`, e.target.value)} required>
                        <option value="">Select Division</option>
                        {divisions.map((division) => (
                            <option key={division} value={division}>{division}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="District" value={data[`${prefix}_district`]} onChange={(e) => setData(`${prefix}_district`, e.target.value)} required />
                </div>
                <div className="col-md-4">
                    <input type="text" className="form-control" placeholder="Upazila (optional)" value={data[`${prefix}_upazila`]} onChange={(e) => setData(`${prefix}_upazila`, e.target.value)} />
                </div>
            </div>
            {error ? <div className="invalid-feedback d-block">{error}</div> : null}
        </div>
    );
}
