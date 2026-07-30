import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    buildLocationValue,
    getDistrictOptions,
    getDivisionOptions,
    getUpazilaOptions,
    parseLocationParts,
} from '../utils/bangladeshLocations';

export default function CarsPage({ data }) {
    const filters = data.filters || {};
    const cars = data.cars || [];
    const [locationSelection, setLocationSelection] = useState(() =>
        parseLocationParts(filters.location || ''),
    );

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
            <div style={{ background: 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)', padding: '80px 0 60px' }}>
                <div className="container text-center" style={{ paddingTop: 40 }}>
                    <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, color: '#fff' }}>Browse Cars</h1>
                    <p style={{ color: 'rgba(255,255,255,.7)', margin: 0 }}>{data.total} cars found</p>
                </div>
            </div>

            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="filter-sidebar" style={{ marginTop: -30 }}>
                            <form method="GET" action={data.indexUrl}>
                                <input type="text" name="search" className="form-control form-control-sm mb-2" defaultValue={filters.search || ''} placeholder="Search" />

                                <input type="hidden" name="location" value={buildLocationValue(locationSelection)} />
                                <div className="row g-2 mb-2">
                                    <div className="col-12">
                                        <select
                                            className="form-select form-select-sm"
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
                                    <div className="col-6">
                                        <select
                                            className="form-select form-select-sm"
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
                                    <div className="col-6">
                                        <select
                                            className="form-select form-select-sm"
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

                                <select name="category" className="form-select form-select-sm mb-2" defaultValue={filters.category || ''}>
                                    <option value="">All Categories</option>
                                    {(data.categories || []).map((c) => <option key={c} value={c}>{c}</option>)}
                                </select>

                                <select name="availability" className="form-select form-select-sm mb-2" defaultValue={filters.availability || 'available'}>
                                    <option value="available">Available</option>
                                    <option value="booked">Booked</option>
                                    <option value="">All</option>
                                </select>

                                <input type="number" name="min_price" className="form-control form-control-sm mb-2" defaultValue={filters.min_price || ''} placeholder="Min price" />
                                <input type="number" name="max_price" className="form-control form-control-sm mb-2" defaultValue={filters.max_price || ''} placeholder="Max price" />

                                <select name="rental_days" className="form-select form-select-sm mb-3" defaultValue={filters.rental_days || ''}>
                                    <option value="">Any Duration</option>
                                    {[1, 2, 3, 5, 7, 14, 30].map((d) => <option key={d} value={d}>{d} Day{d > 1 ? 's' : ''}</option>)}
                                </select>

                                <button type="submit" className="btn btn-primary btn-sm w-100 mb-2">Apply</button>
                                <Link href={data.indexUrl} className="btn btn-outline-red btn-sm w-100">Clear</Link>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="row">
                            {cars.length ? cars.map((car) => (
                                <div className="col-md-6 col-lg-4 mb-4" key={car.id}>
                                    <div className="glass-card h-100" style={{ overflow: 'hidden' }}>
                                        <img src={car.image_url} alt={`${car.brand} ${car.model}`} style={{ width: '100%', height: 190, objectFit: 'cover' }} onError={(e) => { e.currentTarget.src = car.fallback_image_url; }} />
                                        <div className="p-3">
                                            <h6 className="mb-1" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>{car.brand} {car.model}</h6>
                                            <p className="text-muted mb-2" style={{ fontSize: '.85rem' }}>{car.location}</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <strong>{car.formatted_price}</strong>
                                                <Link href={car.showUrl} className="btn btn-primary btn-sm">View</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="col-12"><div className="glass-card p-5 text-center">No cars found</div></div>
                            )}
                        </div>

                        <div className="d-flex justify-content-center mt-3" dangerouslySetInnerHTML={{ __html: data.paginationHtml || '' }} />
                    </div>
                </div>
            </div>
        </>
    );
}
