import React, { useMemo, useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function AdminLayout({ pageTitle = 'Dashboard', children }) {
    const { url, props } = usePage();
    const [open, setOpen] = useState(false);

    const user = props.auth?.user;
    const flash = props.flash || {};

    const nav = useMemo(
        () => [
            { key: 'dashboard', label: 'Dashboard', icon: 'bi-grid-3x3-gap', href: '/admin/dashboard' },
            { key: 'cars', label: 'Manage Cars', icon: 'bi-car-front', href: '/admin/cars' },
            { key: 'bookings', label: 'Booking Requests', icon: 'bi-calendar-check', href: '/admin/bookings' },
            { key: 'booking-car', label: 'Booking Car', icon: 'bi-plus-circle', href: '/admin/bookings/create-car' },
            { key: 'users', label: 'Manage Users', icon: 'bi-people', href: '/admin/users' },
            { key: 'reviews', label: 'Customer Reviews', icon: 'bi-chat-left-text', href: '/admin/reviews' },
            { key: 'analytics', label: 'Analytics', icon: 'bi-bar-chart-line', href: '/admin/analytics' },
        ],
        []
    );

    const isActive = (href) => url === href || url.startsWith(`${href}/`);

    return (
        <div className="admin-wrapper">
            <div className={`admin-sidebar-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />

            <aside className={`admin-sidebar ${open ? 'show' : ''}`}>
                <div className="sidebar-brand">
                    <h5>
                        <i className="bi bi-car-front-fill me-2" />Pothik
                    </h5>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', margin: '4px 0 0', letterSpacing: '0.5px' }}>
                        ADMIN PANEL
                    </p>
                </div>
                <nav className="nav flex-column p-3">
                    {nav.map((item) => (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                            onClick={() => setOpen(false)}
                        >
                            <i className={`bi ${item.icon}`} /> {item.label}
                        </Link>
                    ))}
                    <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: '12px 0' }} />
                    <Link className="nav-link" href="/">
                        <i className="bi bi-house" /> View Site
                    </Link>
                    <button
                        type="button"
                        className="nav-link btn btn-link text-start w-100 border-0"
                        style={{ color: '#ef4444', padding: '11px 16px' }}
                        onClick={() => router.post('/logout')}
                    >
                        <i className="bi bi-box-arrow-right me-2" />Logout
                    </button>
                </nav>
            </aside>

            <main className="admin-main">
                <div className="admin-topbar glass-panel mb-4 p-3 d-flex align-items-center justify-content-between gap-2 flex-wrap">
                    <div className="d-flex align-items-center gap-2">
                        <button type="button" className="btn btn-sm admin-menu-btn" onClick={() => setOpen(!open)}>
                            <i className="bi bi-list" />
                        </button>
                        <h4 className="mb-0">{pageTitle}</h4>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                        <span style={{ fontSize: '0.82rem', color: '#6c757d' }}>
                            <i className="bi bi-person-circle me-1" style={{ color: '#e8192c' }} />{user?.name}
                        </span>
                        <span
                            style={{
                                background: '#fef2f3',
                                color: '#e8192c',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '20px',
                                fontFamily: 'Montserrat, sans-serif',
                            }}
                        >
                            ADMIN
                        </span>
                    </div>
                </div>

                {flash.success ? (
                    <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
                        <i className="bi bi-check-circle me-2" />{flash.success}
                    </div>
                ) : null}

                {flash.error ? (
                    <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                        <i className="bi bi-exclamation-triangle me-2" />{flash.error}
                    </div>
                ) : null}

                {children}
            </main>
        </div>
    );
}
