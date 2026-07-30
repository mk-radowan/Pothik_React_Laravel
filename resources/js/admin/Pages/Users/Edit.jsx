import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

export default function UsersEdit({ user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || 'customer',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <>
            <Head title="Edit User" />
            <AdminLayout pageTitle="Edit User">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="glass-card p-4" style={{ borderTop: '4px solid #3b82f6' }}>
                            <h5 style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, color: '#1a1a2e', marginBottom: 20 }}>
                                <i className="bi bi-pencil-square me-2" style={{ color: '#3b82f6' }} />Edit User
                            </h5>

                            <form onSubmit={submit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-control" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                        {errors.name ? <div className="invalid-feedback d-block">{errors.name}</div> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                        {errors.email ? <div className="invalid-feedback d-block">{errors.email}</div> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Phone</label>
                                        <input type="text" className="form-control" maxLength="11" value={data.phone} onChange={(e) => setData('phone', e.target.value)} required />
                                        {errors.phone ? <div className="invalid-feedback d-block">{errors.phone}</div> : null}
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Role</label>
                                        <select className="form-select" value={data.role} onChange={(e) => setData('role', e.target.value)} required>
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label">New Password (optional)</label>
                                        <input type="password" className="form-control" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="Leave blank to keep old password" />
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mt-4 flex-wrap">
                                    <button type="submit" className="btn btn-primary" disabled={processing}>
                                        <i className="bi bi-check-circle me-2" />Update User
                                    </button>
                                    <Link href="/admin/users" className="btn btn-outline-red">
                                        <i className="bi bi-arrow-left me-2" />Back
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </>
    );
}
