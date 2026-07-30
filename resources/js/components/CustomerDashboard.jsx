import React from 'react';
import { Link } from '@inertiajs/react';
import CustomerLayout from './CustomerLayout';

const cardBorder = {
    total: '#3b82f6',
    pending: '#f59e0b',
    approved: '#10b981',
};

const iconColor = {
    total: '#3b82f6',
    pending: '#f59e0b',
    approved: '#10b981',
};

function StatCard({ label, value, icon, type }) {
    return (
        <div className="col-md-4">
            <div className="glass-card p-3" style={{ borderLeft: `4px solid ${cardBorder[type]}` }}>
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <div style={{ fontSize: '0.82rem', color: '#6c757d' }}>{label}</div>
                        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: '#1a1a2e' }}>{value}</div>
                    </div>
                    <i className={`bi ${icon}`} style={{ fontSize: '1.6rem', color: iconColor[type] }}></i>
                </div>
            </div>
        </div>
    );
}

function PendingTable({ pendingBookings }) {
    return (
        <div className="col-lg-6">
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div className="d-flex justify-content-between align-items-center" style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                    <h5 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#1a1a2e' }}>
                        <i className="bi bi-hourglass-split me-2" style={{ color: '#f59e0b' }}></i>Pending Bookings
                    </h5>
                </div>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th>Car</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingBookings.length ? (
                                pendingBookings.map((booking, index) => (
                                    <tr key={`${booking.car_name}-${booking.pickup_date}-${index}`}>
                                        <td>{booking.car_name}</td>
                                        <td>{booking.pickup_date} - {booking.return_date}</td>
                                        <td><span className="status-badge-pending">{booking.total_amount}</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted py-4">No pending bookings.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function ApprovedTable({ approvedBookings, historyUrl }) {
    return (
        <div className="col-lg-6">
            <div className="glass-card" style={{ overflow: 'hidden' }}>
                <div className="d-flex justify-content-between align-items-center" style={{ padding: '16px 20px', borderBottom: '1px solid #f3f4f6' }}>
                    <h5 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontWeight: 700, color: '#1a1a2e' }}>
                        <i className="bi bi-check-circle me-2" style={{ color: '#10b981' }}></i>Approved Rentals
                    </h5>
                    <Link href={historyUrl} style={{ fontSize: '0.82rem', color: '#e8192c', textDecoration: 'none' }}>View All</Link>
                </div>
                <div className="table-responsive">
                    <table className="table mb-0">
                        <thead>
                            <tr>
                                <th>Car</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedBookings.length ? (
                                approvedBookings.map((booking, index) => (
                                    <tr key={`${booking.car_name}-${booking.pickup_date}-${index}`}>
                                        <td>{booking.car_name}</td>
                                        <td>{booking.pickup_date} - {booking.return_date}</td>
                                        <td><span className="status-badge-approved">Approved</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted py-4">No approved bookings yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function CustomerDashboard({ data }) {
    const stats = [
        { label: 'Total Bookings', value: data.totalBookings || 0, icon: 'bi-calendar-check', type: 'total' },
        { label: 'Pending', value: data.pendingCount || 0, icon: 'bi-hourglass-split', type: 'pending' },
        { label: 'Approved', value: data.approvedCount || 0, icon: 'bi-check-circle', type: 'approved' },
    ];

    return (
        <CustomerLayout data={data} active="dashboard" title="Customer Dashboard">
            <div className="glass-card p-4 mb-3" style={{ borderTop: '4px solid #0ea5a4' }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                        <p style={{ color: '#6b7280', margin: 0 }}>Welcome back,</p>
                        <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, margin: 0, color: '#0f172a' }}>
                            {data.userName || 'Customer'}
                        </h3>
                    </div>
                    <Link href={data.carsUrl} className="btn btn-primary" style={{ background: '#0ea5a4', borderColor: '#0ea5a4' }}>
                        <i className="bi bi-car-front me-2"></i>Browse Cars
                    </Link>
                </div>
            </div>

            <div className="row g-3 mb-4">
                {stats.map((item) => (
                    <StatCard key={item.label} {...item} />
                ))}
            </div>

            <div className="row g-4">
                <PendingTable pendingBookings={data.pendingBookings || []} />
                <ApprovedTable approvedBookings={data.approvedBookings || []} historyUrl={data.historyUrl} />
            </div>
        </CustomerLayout>
    );
}
