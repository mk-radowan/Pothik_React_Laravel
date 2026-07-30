import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../Layouts/PublicLayout';

function MethodBox({ label, note, value, checked, color, bg }) {
    return (
        <label className="method-box p-3 w-100" style={{ display: 'block', border: `1px solid ${color}`, borderRadius: 12, background: bg, cursor: 'pointer' }}>
            <input className="form-check-input me-2" type="radio" name="payment_method" value={value} defaultChecked={checked} />
            <strong style={{ color }}>{label}</strong>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 4 }}>{note}</div>
        </label>
    );
}

export default function BookingPayment({ booking, paymentActionUrl, historyUrl, carUrl, csrfToken }) {
    return (
        <PublicLayout>
            <Head title="Booking Payment" />
            <div style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 100%)', padding: '80px 0 56px' }}>
                <div className="container" style={{ paddingTop: 40 }}>
                    <div className="hero-badge" style={{ background: 'rgba(255,255,255,0.12)', color: '#e2e8f0', borderColor: 'rgba(255,255,255,0.2)' }}>Secure Checkout</div>
                    <h1 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, color: 'white', fontSize: '2rem', marginTop: 12, marginBottom: 8 }}>Complete Booking Payment</h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Bangladesh real-time methods: bKash, Nagad, Rocket, Card</p>
                </div>
            </div>

            <div className="container py-5" style={{ marginTop: -24 }}>
                <div className="row g-4">
                    <div className="col-lg-7">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #e8192c' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 18 }}>
                                <i className="bi bi-credit-card-2-front me-2" style={{ color: '#e8192c' }} />Choose Payment Method
                            </h5>

                            <form method="POST" action={paymentActionUrl}>
                                <input type="hidden" name="_token" value={csrfToken} />

                                <div className="mb-3">
                                    <label className="form-label">Gateway Provider</label>
                                    <select name="payment_provider" className="form-select" defaultValue="sslcommerz">
                                        <option value="sslcommerz">SSLCommerz (bKash / Nagad / Rocket / Card)</option>
                                        <option value="bkash_pgw">bKash PGW API</option>
                                    </select>
                                </div>

                                <div className="row g-3 mb-3">
                                    <div className="col-md-6"><MethodBox label="bKash" note="Instant wallet payment" value="bkash" checked color="#c2185b" bg="#fff5f7" /></div>
                                    <div className="col-md-6"><MethodBox label="Nagad" note="Fast digital wallet" value="nagad" color="#047857" bg="#f0fdf4" /></div>
                                    <div className="col-md-6"><MethodBox label="Rocket" note="DBBL mobile wallet" value="rocket" color="#b45309" bg="#fffbeb" /></div>
                                    <div className="col-md-6"><MethodBox label="Card" note="Visa / MasterCard" value="card" color="#1d4ed8" bg="#eff6ff" /></div>
                                </div>

                                <div className="alert alert-light border" style={{ fontSize: '0.84rem' }}>
                                    <strong>Flow:</strong> Pay Now চাপলে আপনি selected gateway page-এ redirect হবেন, payment complete হলে auto callback এ ফিরে আসবেন।
                                </div>

                                <div className="mt-4 p-3" style={{ borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Payable Amount</div>
                                            <strong style={{ fontSize: '1.5rem', color: '#059669' }}>{booking.total_amount}</strong>
                                        </div>
                                        <span className="badge" style={{ background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' }}>Real-time Confirm</span>
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mt-4" style={{ padding: 13 }}>
                                    <i className="bi bi-shield-check me-2" />Pay Now
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #0ea5e9' }}>
                            <h6 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#0f172a' }}>Booking Summary</h6>
                            <hr />
                            <div className="d-flex justify-content-between mb-2"><span>Car</span><strong>{booking.car_name}</strong></div>
                            <div className="d-flex justify-content-between mb-2"><span>Pickup</span><strong>{booking.pickup_date}</strong></div>
                            <div className="d-flex justify-content-between mb-2"><span>Return</span><strong>{booking.return_date}</strong></div>
                            <div className="d-flex justify-content-between mb-2"><span>Status</span><strong className="text-warning">{booking.status}</strong></div>
                            <div className="d-flex justify-content-between mb-0"><span>Payment</span><strong className="text-danger">{booking.payment_status}</strong></div>

                            <hr />
                            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Payment complete হলে booking history page-এ payment reference দেখাবে।</p>

                            <div className="d-flex gap-2 flex-wrap mt-3">
                                <Link href={historyUrl} className="btn btn-outline-secondary">Back to History</Link>
                                <Link href={carUrl} className="btn btn-outline-red">Back To Car</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}