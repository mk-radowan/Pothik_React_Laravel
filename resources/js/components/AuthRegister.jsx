import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function AuthRegister({ data }) {
    const old = data.old || {};
    const perks = ['Fast booking access', 'Real-time car availability', 'Secure customer account'];
    const { data: formData, setData, post, processing, errors } = useForm({
        name: old.name || '',
        email: old.email || '',
        phone: old.phone || '',
        password: '',
        password_confirmation: '',
    });

    const submit = (event) => {
        event.preventDefault();
        post(data.registerUrl);
    };

    return (
        <div style={{ background: 'linear-gradient(135deg,#f8f9fa 0%,#fef2f3 100%)', minHeight: '100vh', padding: '32px 0' }}>
            <div className="container py-4 py-md-5">
                <div className="row align-items-center g-4 g-lg-5 justify-content-center">
                    <div className="col-lg-4 d-none d-lg-block">
                        <div className="hero-badge mb-3">Join Pothik</div>
                        <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#1a1a2e', lineHeight: 1.15 }}>Create your customer account</h2>
                        <p className="mt-3 mb-4 text-muted" style={{ lineHeight: 1.7 }}>
                            Register once and start booking cars. Enjoy the benefits of having a secure customer account with us.
                        </p>
                        <div className="d-grid gap-3">
                            {perks.map((perk) => (
                                <div key={perk} className="d-flex align-items-center gap-3">
                                    <div style={{ width: 32, height: 32, background: '#e8192c', borderRadius: '50%', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                                        <i className="bi bi-check text-white" style={{ fontSize: '1rem' }} />
                                    </div>
                                    <span style={{ color: '#374151' }}>{perk}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 col-md-9">
                        <div className="auth-card" style={{ borderRadius: 24, padding: 'clamp(20px, 4vw, 36px)', boxShadow: '0 20px 60px rgba(17, 24, 39, 0.08)' }}>
                            <div className="text-center mb-4">
                                <div style={{ width: 64, height: 64, background: '#fef2f3', borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 16px', border: '2px solid rgba(232,25,44,0.2)' }}>
                                    <i className="bi bi-person-plus-fill" style={{ fontSize: '1.8rem', color: '#e8192c' }} />
                                </div>
                                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#1a1a2e', marginBottom: 8 }}>Register</h2>
                                <p className="text-muted mb-0">Customer only registration</p>
                            </div>

                            <form onSubmit={submit}>

                                <div className="row g-3">
                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label">Full name</label>
                                        <input type="text" id="name" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Full name" value={formData.name} onChange={(e) => setData('name', e.target.value)} autoComplete="name" required />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="email" id="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="Email" value={formData.email} onChange={(e) => setData('email', e.target.value)} autoComplete="email" required />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input type="tel" id="phone" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="11 digit phone" value={formData.phone} onChange={(e) => setData('phone', e.target.value)} autoComplete="tel" inputMode="numeric" required />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input type="password" id="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" value={formData.password} onChange={(e) => setData('password', e.target.value)} autoComplete="new-password" required />
                                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <label htmlFor="password_confirmation" className="form-label">Confirm password</label>
                                        <input type="password" id="password_confirmation" name="password_confirmation" className="form-control" placeholder="Confirm password" value={formData.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} autoComplete="new-password" required />
                                    </div>
                                </div>

                                <button type="submit" className="btn btn-primary w-100 mt-4 py-2 fw-semibold" disabled={processing}>Create customer account</button>
                            </form>

                            <p className="text-center mt-3 mb-0 text-muted small">
                                Already registered? <Link href={data.loginUrl}>Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
