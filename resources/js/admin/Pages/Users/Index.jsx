import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function UsersIndex({ users }) {
    const me = usePage().props.auth?.user;

    const toggle = (id) => router.post(`/admin/users/${id}/toggle`);
    const destroy = (id) => {
        if (!window.confirm('Delete this user?')) return;
        router.delete(`/admin/users/${id}`);
    };

    return (
        <>
            <Head title="Manage Users" />
            <AdminLayout pageTitle="Manage Users">
                <div className="glass-card" style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px', borderBottom: '1px solid #f3f4f6' }} className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
                        <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', margin: 0 }}>
                            <i className="bi bi-people me-2" style={{ color: '#e8192c' }} />All Users
                        </h5>
                        <Link href="/admin/users/create" className="btn btn-primary btn-sm">
                            <i className="bi bi-person-plus me-1" />Create User
                        </Link>
                    </div>
                    <div className="table-responsive admin-table">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Registered</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <div style={{ width: 34, height: 34, background: user.role === 'admin' ? '#e8192c' : '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>
                                                    {user.name.slice(0, 1)}
                                                </div>
                                                <strong style={{ color: '#1a1a2e' }}>{user.name}</strong>
                                            </div>
                                        </td>
                                        <td style={{ color: '#374151' }}>{user.email}</td>
                                        <td style={{ color: '#374151' }}>{user.phone}</td>
                                        <td>
                                            <span style={{ background: user.role === 'admin' ? '#fee2e2' : '#eff6ff', color: user.role === 'admin' ? '#991b1b' : '#1d4ed8', padding: '3px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>
                                                {user.role_label}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ background: user.is_active ? '#d1fae5' : '#fee2e2', color: user.is_active ? '#065f46' : '#991b1b', padding: '3px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>
                                                {user.is_active ? 'Enabled' : 'Disabled'}
                                            </span>
                                        </td>
                                        <td style={{ color: '#6c757d', fontSize: '0.85rem' }}>{user.created_at_label}</td>
                                        <td>
                                            <div className="d-flex gap-1 flex-wrap">
                                                <Link href={`/admin/users/${user.id}/edit`} className="btn btn-sm" style={{ background: '#eff6ff', color: '#1d4ed8', border: 'none', borderRadius: 20 }}>Edit</Link>
                                                <button type="button" className="btn btn-sm" style={{ background: user.is_active ? '#fff7ed' : '#ecfdf5', color: user.is_active ? '#c2410c' : '#065f46', border: 'none', borderRadius: 20 }} disabled={me?.id === user.id} onClick={() => toggle(user.id)}>
                                                    {user.is_active ? 'Enable' : 'Disable'}
                                                </button>
                                                <button type="button" className="btn btn-sm" style={{ background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: 20 }} disabled={me?.id === user.id} onClick={() => destroy(user.id)}>
                                                    Delete
                                                </button>
                                            </div>
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
