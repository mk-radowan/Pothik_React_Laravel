import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';

export default function BookingPaymentResult({ booking, result, historyUrl, retryUrl, carUrl }) {
    const normalized = String(result || '').toLowerCase();
    const isSuccess = ['success', 'paid'].includes(normalized);
    const isCancelled = ['cancelled', 'canceled'].includes(normalized);

    return (
        <PublicLayout>
            <Head title="Payment Status" />
            <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', padding: '80px 0 56px' }}>
                <div className="container" style={{ paddingTop: 40 }}>
                    <h1 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, color: 'white', fontSize: '2rem', margin: 0 }}>Payment Status</h1>
                </div>
            </div>

            <div className="container py-5" style={{ marginTop: -24 }}>
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #e8192c' }}>
                            {isSuccess ? (
                                <div className="alert alert-success" role="alert"><strong>Payment Successful.</strong> Your booking payment is confirmed.</div>
                            ) : isCancelled ? (
                                <div className="alert alert-warning" role="alert"><strong>Payment Cancelled.</strong> You can retry payment anytime.</div>
                            ) : (
                                <div className="alert alert-danger" role="alert"><strong>Payment Failed.</strong> Please try again.</div>
                            )}

                            <div className="mb-3">
                                <div><strong>Booking ID:</strong> #{booking.id}</div>
                                <div><strong>Car:</strong> {booking.car_name}</div>
                                <div><strong>Amount:</strong> {booking.total_amount}</div>
                                <div><strong>Payment Status:</strong> {booking.payment_status}</div>
                                <div><strong>Reference:</strong> {booking.payment_reference || 'N/A'}</div>
                            </div>

                            <div className="d-flex gap-2 flex-wrap">
                                <Link href={historyUrl} className="btn btn-primary">Go To Booking History</Link>
                                {booking.payment_status !== 'paid' ? <Link href={retryUrl} className="btn btn-outline-red">Retry Payment</Link> : null}
                                <Link href={carUrl} className="btn btn-outline-secondary">Back To Car</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}