import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function BookingsIndex({ bookings }) {
    return (
        <>
            <Head title="Booking Requests" />
            <AdminLayout pageTitle="Booking Requests">
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }}>
                        <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                            <i className="bi bi-calendar-check me-2" style={{ color: '#e8192c' }} />All Booking Requests
                        </h5>
                    </div>
                    <div className="table-responsive admin-table">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Car</th>
                                    <th>Pickup</th>
                                    <th>Return</th>
                                    <th>Invoice</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length ? bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td><strong>{booking.customer_name}</strong></td>
                                        <td>{booking.car_name}</td>
                                        <td>{booking.pickup_date}</td>
                                        <td>{booking.return_date}</td>
                                        <td>
                                            {booking.payment_status === 'paid' ? (
                                                <div className="d-flex gap-1">
                                                    <Link href={`/admin/bookings/${booking.id}/invoice`} className="btn btn-sm" title="View Invoice" style={{ background: '#eef2ff', color: '#3730a3', border: 'none', borderRadius: 8 }}>
                                                        <i className="bi bi-eye" />
                                                    </Link>
                                                    <a href={`/admin/bookings/${booking.id}/invoice/download`} className="btn btn-sm" title="Download Invoice" style={{ background: '#ecfdf5', color: '#065f46', border: 'none', borderRadius: 8 }}>
                                                        <i className="bi bi-download" />
                                                    </a>
                                                </div>
                                            ) : <span className="badge" style={{ background: '#f3f4f6', color: '#6b7280' }}>Not Paid</span>}
                                        </td>
                                        <td><span className={`status-badge-${booking.status}`}>{booking.status_label}</span></td>
                                        <td>
                                            <div className="d-flex gap-1 flex-wrap">
                                                {booking.status === 'pending' ? (
                                                    <>
                                                        <button type="button" className="btn btn-sm" style={{ background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: 20 }} onClick={() => router.post(`/admin/bookings/approve/${booking.id}`)}>✓ Approve</button>
                                                        <button type="button" className="btn btn-sm" style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 20 }} onClick={() => router.post(`/admin/bookings/reject/${booking.id}`)}>✕ Reject</button>
                                                        <Link href={`/admin/bookings/${booking.id}`} className="btn btn-sm" style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 20 }}>View</Link>
                                                    </>
                                                ) : (
                                                    <Link href={`/admin/bookings/${booking.id}`} className="btn btn-sm" style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 20 }}>View</Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="text-center py-4" style={{ color: '#6c757d' }}>
                                            <i className="bi bi-calendar-x d-block mb-2" style={{ fontSize: '2rem', color: '#e8192c', opacity: 0.4 }} />
                                            No bookings found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
