import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function BookingShow({ booking, car }) {
    return (
        <>
            <Head title="Booking Detail" />
            <AdminLayout pageTitle="Booking Detail">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #e8192c' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 24 }}>
                                <i className="bi bi-info-circle me-2" style={{ color: '#e8192c' }} />Booking Information
                            </h5>
                            <table className="table mb-0">
                                <tbody>
                                    <InfoRow label="Customer" value={booking.customer_name} strong />
                                    <InfoRow label="Car" value={booking.car_name} strong />
                                    <InfoRow label="Pickup Date" value={booking.pickup_date} />
                                    <InfoRow label="Return Date" value={booking.return_date} />
                                    <InfoRow label="Journey Start" value={booking.pickup_location_clean} />
                                    <InfoRow label="Journey End" value={booking.dropoff_location_clean} />
                                    <InfoRow label="Rental Days" value={booking.rental_days || 'N/A'} />
                                    <InfoRow label="Total Amount" value={booking.total_amount} className="text-success fw-bold fs-5" />
                                    <tr>
                                        <th style={{ width: '35%', color: '#6c757d', fontWeight: 600, fontSize: '0.85rem', borderColor: '#f3f4f6' }}>Payment Status</th>
                                        <td style={{ borderColor: '#f3f4f6' }}>
                                            <span className={booking.payment_status === 'paid' ? 'badge bg-success' : 'badge bg-secondary'}>
                                                {booking.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th style={{ width: '35%', color: '#6c757d', fontWeight: 600, fontSize: '0.85rem', borderColor: '#f3f4f6' }}>Status</th>
                                        <td style={{ borderColor: '#f3f4f6' }}><span className={`status-badge-${booking.status}`}>{booking.status_label}</span></td>
                                    </tr>
                                </tbody>
                            </table>

                            {booking.status === 'pending' ? (
                                <div className="mt-4 d-flex gap-2 flex-wrap">
                                    <button className="btn btn-primary" onClick={() => router.post(`/admin/bookings/approve/${booking.id}`)}>
                                        <i className="bi bi-check-circle me-2" />Approve Booking
                                    </button>
                                    <button className="btn btn-danger" onClick={() => router.post(`/admin/bookings/reject/${booking.id}`)}>
                                        <i className="bi bi-x-circle me-2" />Reject Booking
                                    </button>
                                </div>
                            ) : null}

                            <Link href="/admin/bookings" className="btn btn-outline-red mt-3">
                                <i className="bi bi-arrow-left me-2" />Back to Bookings
                            </Link>
                        </div>
                    </div>

                    {car ? (
                        <div className="col-lg-4">
                            <div className="glass-card p-4" style={{ borderTop: '4px solid #3b82f6' }}>
                                <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>
                                    <i className="bi bi-car-front me-2" style={{ color: '#3b82f6' }} />Car Details
                                </h5>
                                <img src={car.image_url} className="img-fluid rounded mb-3" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = car.fallback_image_url; }} />
                                <h5 style={{ color: '#1a1a2e', fontFamily: 'Montserrat,sans-serif', fontWeight: 700 }}>{car.display_name}</h5>
                                <p style={{ color: '#6c757d', fontSize: '0.85rem', margin: '4px 0' }}>
                                    <i className="bi bi-geo-alt me-1" style={{ color: '#e8192c' }} />{car.location}
                                </p>
                                <p style={{ color: '#e8192c', fontWeight: 700, margin: '4px 0' }}>{car.formatted_price}</p>
                                <span style={{ background: car.availability === 'available' ? '#d1fae5' : '#f3f4f6', color: car.availability === 'available' ? '#065f46' : '#6b7280', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }}>
                                    {car.availability_label}
                                </span>
                            </div>
                        </div>
                    ) : null}
                </div>
            </AdminLayout>
        </>
    );
}

function InfoRow({ label, value, strong = false, className = '' }) {
    return (
        <tr>
            <th style={{ width: '35%', color: '#6c757d', fontWeight: 600, fontSize: '0.85rem', borderColor: '#f3f4f6' }}>{label}</th>
            <td style={{ color: '#1a1a2e', borderColor: '#f3f4f6' }} className={`${strong ? 'fw-semibold' : ''} ${className}`}>{value}</td>
        </tr>
    );
}
