import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';

export default function Analytics({ bookingsByStatus, categoryStats, cityStats }) {
    const categoryMax = Math.max(...Object.values(categoryStats || { x: 1 }));
    const cityMax = Math.max(...Object.values(cityStats || { x: 1 }));

    return (
        <>
            <Head title="Analytics" />
            <AdminLayout pageTitle="Analytics">
                <div className="row g-4 mb-4">
                    <StatusCard icon="bi-hourglass-split" color="warning" iconColor="#f59e0b" value={bookingsByStatus.pending} label="Pending Bookings" />
                    <StatusCard icon="bi-check-circle" color="success" iconColor="#10b981" value={bookingsByStatus.approved} label="Approved Bookings" />
                    <StatusCard icon="bi-x-circle" color="danger" iconColor="#e8192c" value={bookingsByStatus.rejected} label="Rejected Bookings" />
                </div>

                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="glass-card p-4">
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
                                <i className="bi bi-tags me-2" style={{ color: '#e8192c' }} />Cars by Category
                            </h5>
                            {Object.entries(categoryStats).map(([cat, count]) => (
                                <div key={cat}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span style={{ color: '#374151', fontSize: '0.88rem' }}>{cat}</span>
                                        <strong style={{ color: '#1a1a2e' }}>{count}</strong>
                                    </div>
                                    <div className="progress mb-3" style={{ height: 6, borderRadius: 4, background: '#f3f4f6' }}>
                                        <div className="progress-bar" style={{ width: `${Math.round((count / categoryMax) * 100)}%`, background: '#e8192c', borderRadius: 4 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="glass-card p-4">
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
                                <i className="bi bi-geo-alt me-2" style={{ color: '#e8192c' }} />Cars by City
                            </h5>
                            {Object.entries(cityStats).map(([city, count]) => (
                                <div key={city}>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span style={{ color: '#374151', fontSize: '0.88rem' }}>{city}</span>
                                        <strong style={{ color: '#1a1a2e' }}>{count}</strong>
                                    </div>
                                    <div className="progress mb-3" style={{ height: 6, borderRadius: 4, background: '#f3f4f6' }}>
                                        <div className="progress-bar" style={{ width: `${Math.round((count / cityMax) * 100)}%`, background: '#3b82f6', borderRadius: 4 }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

function StatusCard({ icon, color, iconColor, value, label }) {
    return (
        <div className="col-md-4">
            <div className={`glass-card stat-card ${color} text-center`}>
                <i className={`bi ${icon}`} style={{ fontSize: '2rem', color: iconColor, marginBottom: 10, display: 'block' }} />
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
}
