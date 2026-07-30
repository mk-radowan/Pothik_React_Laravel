import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';

export default function CustomerLayout({ data, active = 'dashboard', title = 'Customer Dashboard', children }) {
    const [open, setOpen] = useState(false);
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const menu = useMemo(() => ([
        { key: 'dashboard', label: 'Dashboard', icon: 'bi-grid-3x3-gap', href: data.dashboardUrl || '#' },
        { key: 'booking', label: 'My Booking', icon: 'bi-calendar-check', href: data.historyUrl || '#' },
        { key: 'reviews', label: 'Customer Reviews', icon: 'bi-chat-left-text', href: data.reviewsUrl || '#' },
        { key: 'profile', label: 'Profile', icon: 'bi-person-circle', href: data.profileUrl || '#' },
    ]), [data.dashboardUrl, data.historyUrl, data.reviewsUrl, data.profileUrl]);

    return (
        <div style={{ minHeight: '100vh', background: '#eef7f8', marginTop: '-24px' }}>
            <div className="d-flex justify-content-between align-items-center d-lg-none p-3" style={{ background: '#0f766e', color: 'white' }}>
                <strong>Customer Panel</strong>
                <button
                    className="btn btn-sm"
                    style={{ color: 'white', border: '1px solid rgba(255,255,255,0.45)' }}
                    onClick={() => setOpen((v) => !v)}
                    type="button"
                >
                    <i className="bi bi-list"></i>
                </button>
            </div>

            <div className="d-flex flex-column flex-lg-row" style={{ minHeight: '100vh' }}>
                <aside
                    style={{
                        width: '260px',
                        background: 'linear-gradient(180deg,#0f766e 0%,#115e59 100%)',
                        color: 'white',
                        padding: '20px 14px',
                        boxShadow: '4px 0 20px rgba(0,0,0,0.12)',
                        display: open ? 'block' : '',
                    }}
                    className={open ? '' : 'd-none d-lg-block'}
                >
                    <div className="text-center mb-3">
                        {data.userPhotoUrl ? (
                            <img
                                src={data.userPhotoUrl}
                                alt="Profile"
                                style={{ width: '78px', height: '78px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.35)' }}
                            />
                        ) : (
                            <div
                                style={{
                                    width: '78px',
                                    height: '78px',
                                    borderRadius: '50%',
                                    margin: '0 auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(255,255,255,0.2)',
                                    fontSize: '28px',
                                }}
                            >
                                <i className="bi bi-person"></i>
                            </div>
                        )}
                        <div style={{ marginTop: '10px', fontWeight: 700 }}>{data.userName || 'Customer'}</div>
                        <div style={{ fontSize: '0.77rem', opacity: 0.8 }}>CUSTOMER</div>
                    </div>

                    <nav className="d-flex flex-column gap-1 mt-3">
                        {menu.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                style={{
                                    color: 'white',
                                    textDecoration: 'none',
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    background: active === item.key ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    fontWeight: 500,
                                    fontSize: '0.92rem',
                                }}
                            >
                                <i className={`bi ${item.icon} me-2`}></i>{item.label}
                            </Link>
                        ))}

                        <form method="POST" action={data.logoutUrl || '/logout'} style={{ marginTop: '6px' }}>
                            <input type="hidden" name="_token" value={csrfToken} />
                            <button
                                type="submit"
                                style={{
                                    width: '100%',
                                    textAlign: 'left',
                                    border: 'none',
                                    color: '#ffd7d7',
                                    background: 'transparent',
                                    padding: '10px 12px',
                                    borderRadius: '10px',
                                    fontWeight: 500,
                                    fontSize: '0.92rem',
                                }}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>Logout
                            </button>
                        </form>
                    </nav>
                </aside>

                <main className="flex-grow-1" style={{ padding: '20px' }}>
                    <div className="glass-card p-3 mb-3" style={{ borderTop: '4px solid #0ea5a4' }}>
                        <h5 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontWeight: 800 }}>{title}</h5>
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}