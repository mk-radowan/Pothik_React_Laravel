import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    buildLocationValue,
    getDistrictOptions,
    getDivisionOptions,
    getUpazilaOptions,
} from '../utils/bangladeshLocations';

export default function HomePage({ data }) {
    const categories = data.categories || [];
    const cars = data.featuredCars || [];
    const [locationSelection, setLocationSelection] = useState({
        division: '',
        district: '',
        upazila: '',
    });

    const divisions = useMemo(() => getDivisionOptions(), []);
    const districts = useMemo(
        () => getDistrictOptions(locationSelection.division),
        [locationSelection.division],
    );
    const upazilas = useMemo(
        () => getUpazilaOptions(locationSelection.division, locationSelection.district),
        [locationSelection.division, locationSelection.district],
    );

    return (
        <>
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 hero-content">
                            <div className="hero-badge"><i className="bi bi-shield-check me-1"></i>#1 Car Rental Platform</div>
                            <h1 className="hero-title">Easy and Fast Way To <span className="text-red">Rent Your Car</span></h1>
                            <form className="hero-search-bar mt-4" method="GET" action={data.carsUrl}>
                                <div className="search-field">
                                    <label>Location</label>
                                    <input type="hidden" name="location" value={buildLocationValue(locationSelection)} />
                                    <div className="row g-2">
                                        <div className="col-12">
                                            <select
                                                className="form-select"
                                                value={locationSelection.division}
                                                onChange={(e) =>
                                                    setLocationSelection({
                                                        division: e.target.value,
                                                        district: '',
                                                        upazila: '',
                                                    })
                                                }
                                            >
                                                <option value="">All Divisions</option>
                                                {divisions.map((division) => (
                                                    <option key={division} value={division}>
                                                        {division}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <select
                                                className="form-select"
                                                value={locationSelection.district}
                                                onChange={(e) =>
                                                    setLocationSelection((prev) => ({
                                                        ...prev,
                                                        district: e.target.value,
                                                        upazila: '',
                                                    }))
                                                }
                                                disabled={!locationSelection.division}
                                            >
                                                <option value="">All Districts</option>
                                                {districts.map((district) => (
                                                    <option key={district} value={district}>
                                                        {district}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <select
                                                className="form-select"
                                                value={locationSelection.upazila}
                                                onChange={(e) =>
                                                    setLocationSelection((prev) => ({
                                                        ...prev,
                                                        upazila: e.target.value,
                                                    }))
                                                }
                                                disabled={!locationSelection.district}
                                            >
                                                <option value="">All Upazilas</option>
                                                {upazilas.map((upazila) => (
                                                    <option key={upazila} value={upazila}>
                                                        {upazila}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-field">
                                    <label>Category</label>
                                    <select className="form-select" name="category">
                                        <option value="">All Categories</option>
                                        {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label>&nbsp;</label>
                                    <button className="btn btn-primary w-100" type="submit">Search Car</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container py-5">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <h2 className="section-title m-0">Featured Cars</h2>
                    <Link href={data.carsUrl} className="btn btn-outline-red">View All</Link>
                </div>
                <div className="row g-4">
                    {cars.map((car) => (
                        <div className="col-md-6 col-lg-4" key={car.id}>
                            <div className="glass-card h-100" style={{ overflow: 'hidden' }}>
                                <img src={car.image_url} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: 220, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = car.fallback_image_url; }} />
                                <div className="p-3">
                                    <h5 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{car.brand} {car.model}</h5>
                                    <p className="mb-2 text-muted" style={{ fontSize: '.85rem' }}>{car.location}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <strong>{car.formatted_price}</strong>
                                        <Link href={car.showUrl} className="btn btn-primary btn-sm">View</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
