import React from 'react';
import { Link } from '@inertiajs/react';
import CustomerLayout from './CustomerLayout';

function paymentBadge(booking) {
    const status = booking.payment_status || 'unpaid';
    if (status === 'paid') return <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>Paid</span>;
    if (status === 'processing') return <span className="badge" style={{ background: '#e0f2fe', color: '#075985' }}>Processing</span>;
    if (status === 'failed' || status === 'cancelled') return <span className="badge" style={{ background: '#fee2e2', color: '#991b1b' }}>{status}</span>;
    return <span className="badge" style={{ background: '#f3f4f6', color: '#374151' }}>Unpaid</span>;
}

export default function CustomerHistory({ data }) {
    const bookings = data.bookings || [];

    const getStatusText = (status) => {
        if (status === 'approved') return 'Approved';
        if (status === 'rejected') return 'Rejected';
        return 'Pending';
    };

    return (
        <CustomerLayout data={data} active="booking" title="My Booking History">
            <div className="glass-card p-3" style={{ overflow: 'hidden', borderTop: '4px solid #0ea5a4' }}>
                {bookings.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-calendar-x" style={{ fontSize: '3rem', color: '#0ea5a4', opacity: 0.35 }}></i>
                        <h5 className="mt-3">No bookings yet</h5>
                        <Link href={data.carsUrl} className="btn btn-primary" style={{ background: '#0ea5a4', borderColor: '#0ea5a4' }}>Browse Cars</Link>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th>Car</th>
                                    <th>Pickup</th>
                                    <th>Return</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Payment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.car_name}</td>
                                        <td>{booking.pickup_date}</td>
                                        <td>{booking.return_date}</td>
                                        <td>{booking.total_amount}</td>
                                        <td><span className={`status-badge-${booking.status}`}>{getStatusText(booking.status)}</span></td>
                                        <td>
                                            {paymentBadge(booking)}
                                            <div className="mt-2 d-flex gap-1 flex-wrap">
                                                {(booking.payment_status || 'unpaid') !== 'paid' && booking.paymentUrl && (
                                                    <Link href={booking.paymentUrl} className="btn btn-sm btn-outline-secondary">Pay</Link>
                                                )}
                                                {booking.invoiceUrl && <Link href={booking.invoiceUrl} className="btn btn-sm btn-outline-secondary">Invoice</Link>}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </CustomerLayout>
    );
}
