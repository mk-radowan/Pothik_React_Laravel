import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../Layouts/AdminLayout';

export default function Dashboard({ stats, recentBookings, availableCars, bookedCars }) {
    const total = availableCars + bookedCars;
    const pct = total > 0 ? Math.round((availableCars / total) * 100) : 0;

    return (
        <>
            <Head title="Admin Dashboard" />
            <AdminLayout pageTitle="Dashboard">
                <div className="row g-4 mb-4">
                    <StatCard color="primary" icon="bi-people" value={stats.total_users} label="Total Users" iconColor="#e8192c" />
                    <StatCard color="info" icon="bi-car-front" value={stats.total_cars} label="Total Cars" iconColor="#3b82f6" />
                    <StatCard color="success" icon="bi-calendar-check" value={stats.total_bookings} label="Total Bookings" iconColor="#10b981" />
                    <StatCard color="warning" icon="bi-hourglass-split" value={stats.pending} label="Pending" iconColor="#f59e0b" />
                    <StatCard color="success" icon="bi-check-circle" value={stats.approved} label="Approved" iconColor="#10b981" />
                    <StatCard color="danger" icon="bi-x-circle" value={stats.rejected} label="Rejected" iconColor="#e8192c" />
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <div className="glass-card p-4" style={{ borderLeft: '4px solid #e8192c' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>
                                <i className="bi bi-bar-chart me-2" style={{ color: '#e8192c' }} />Fleet Availability
                            </h5>
                            <div className="d-flex gap-4">
                                <div>
                                    <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#10b981' }}>{availableCars}</div>
                                    <div style={{ fontSize: '0.82rem', color: '#6c757d' }}>Available</div>
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 800, fontSize: '1.8rem', color: '#f59e0b' }}>{bookedCars}</div>
                                    <div style={{ fontSize: '0.82rem', color: '#6c757d' }}>Booked</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 16, background: '#f3f4f6', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${pct}%`, background: '#10b981', borderRadius: 8, transition: 'width 0.5s' }} />
                            </div>
                            <p style={{ fontSize: '0.78rem', color: '#6c757d', margin: '6px 0 0' }}>{pct}% fleet available</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="glass-card p-4" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 16 }}>
                                <i className="bi bi-lightning-charge me-2" style={{ color: '#3b82f6' }} />Quick Actions
                            </h5>
                            <div className="d-flex flex-wrap gap-2">
                                <Link href="/admin/cars/create" className="btn btn-primary btn-sm"><i className="bi bi-plus-circle me-1" />Add Car</Link>
                                <Link href="/admin/bookings" className="btn btn-sm" style={{ background: '#fef3c7', color: '#92400e', border: 'none', borderRadius: 20, fontWeight: 600 }}><i className="bi bi-clock me-1" />View Requests</Link>
                                <Link href="/admin/analytics" className="btn btn-sm" style={{ background: '#f0f9ff', color: '#0369a1', border: 'none', borderRadius: 20, fontWeight: 600 }}><i className="bi bi-bar-chart me-1" />Analytics</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                            <i className="bi bi-clock-history me-2" style={{ color: '#e8192c' }} />Recent Bookings
                        </h5>
                        <Link href="/admin/bookings" style={{ fontSize: '0.85rem', color: '#e8192c', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
                    </div>
                    <div className="table-responsive admin-table">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Car</th>
                                    <th>Pickup</th>
                                    <th>Return</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td><strong>{booking.customer_name}</strong></td>
                                        <td>{booking.car_name}</td>
                                        <td>{booking.pickup_date}</td>
                                        <td>{booking.return_date}</td>
                                        <td><span className={`status-badge-${booking.status}`}>{booking.status_label}</span></td>
                                        <td>
                                            <Link href={`/admin/bookings/${booking.id}`} className="btn btn-sm" style={{ background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: 20 }}>View</Link>
                                            {booking.status === 'pending' ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => router.post(`/admin/bookings/approve/${booking.id}`)}
                                                        className="btn btn-sm"
                                                        style={{ background: '#d1fae5', color: '#065f46', border: 'none', borderRadius: 20, margin: '0 2px' }}
                                                    >
                                                        ✓ Approve
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => router.post(`/admin/bookings/reject/${booking.id}`)}
                                                        className="btn btn-sm"
                                                        style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 20 }}
                                                    >
                                                        ✕ Reject
                                                    </button>
                                                </>
                                            ) : null}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}

function StatCard({ color, icon, value, label, iconColor }) {
    return (
        <div className="col-md-4 col-lg-2">
            <div className={`glass-card stat-card ${color}`}>
                <div style={{ fontSize: '1.8rem', color: iconColor, marginBottom: 8 }}><i className={`bi ${icon}`} /></div>
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
            </div>
        </div>
    );
}
