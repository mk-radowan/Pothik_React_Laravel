import React from 'react';

export default function CarFormFields({ data, setData, errors, categories, divisions, isEdit = false }) {
    return (
        <div className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Brand</label>
                <input type="text" name="brand" className="form-control" value={data.brand} onChange={(e) => setData('brand', e.target.value)} required placeholder="e.g. Honda" />
                {errors.brand ? <div className="invalid-feedback d-block">{errors.brand}</div> : null}
            </div>
            <div className="col-md-6">
                <label className="form-label">Model</label>
                <input type="text" name="model" className="form-control" value={data.model} onChange={(e) => setData('model', e.target.value)} required placeholder="e.g. City" />
                {errors.model ? <div className="invalid-feedback d-block">{errors.model}</div> : null}
            </div>
            <div className="col-md-6">
                <label className="form-label">Category</label>
                <select name="category" className="form-select" value={data.category} onChange={(e) => setData('category', e.target.value)} required>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-6">
                <label className="form-label">Location (Division)</label>
                <select name="location" className="form-select" value={data.location} onChange={(e) => setData('location', e.target.value)} required>
                    <option value="">Select Division</option>
                    {divisions.map((division) => (
                        <option key={division} value={`Division: ${division}`}>{division}</option>
                    ))}
                </select>
                <small style={{ color: '#6c757d', fontSize: '0.78rem' }}>Selected division will make this car available across that division.</small>
                {errors.location ? <div className="invalid-feedback d-block">{errors.location}</div> : null}
            </div>
            <div className="col-md-4">
                <label className="form-label">Fuel Type</label>
                <select name="fuel_type" className="form-select" value={data.fuel_type} onChange={(e) => setData('fuel_type', e.target.value)} required>
                    {['Petrol', 'Diesel', 'Electric', 'CNG'].map((fuel) => (
                        <option key={fuel} value={fuel}>{fuel}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">Transmission</label>
                <select name="transmission" className="form-select" value={data.transmission} onChange={(e) => setData('transmission', e.target.value)} required>
                    {['Manual', 'Automatic'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">Seats</label>
                <input type="number" name="seats" className="form-control" value={data.seats} onChange={(e) => setData('seats', e.target.value)} min="2" max="9" required />
            </div>
            <div className="col-md-4">
                <label className="form-label">Price per Day (৳)</label>
                <input type="number" name="price_per_day" className="form-control" value={data.price_per_day} onChange={(e) => setData('price_per_day', e.target.value)} min="100" required />
            </div>
            <div className="col-md-4">
                <label className="form-label">Rating (1-5)</label>
                <input type="number" name="rating" className="form-control" step="0.1" min="1" max="5" value={data.rating} onChange={(e) => setData('rating', e.target.value)} required />
            </div>
            <div className="col-md-4">
                <label className="form-label">Availability</label>
                <select name="availability" className="form-select" value={data.availability} onChange={(e) => setData('availability', e.target.value)} required>
                    <option value="available">Available</option>
                    <option value="booked">Booked</option>
                </select>
            </div>
            <div className="col-12">
                <label className="form-label">Car Image</label>
                <input
                    type="file"
                    name="image"
                    className="form-control"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setData('image', e.target.files[0] || null)}
                    required={!isEdit}
                />
                {isEdit && data.image ? (
                    <small style={{ color: '#6c757d', fontSize: '0.78rem' }}>Choose a new file only if you want to replace the current image.</small>
                ) : (
                    <small style={{ color: '#6c757d', fontSize: '0.78rem' }}>Upload a JPG, PNG, or WebP file from your device.</small>
                )}
                {errors.image ? <div className="invalid-feedback d-block">{errors.image}</div> : null}
            </div>
            <div className="col-12">
                <label className="form-label">Description</label>
                <textarea name="description" className="form-control" rows="3" value={data.description} onChange={(e) => setData('description', e.target.value)} placeholder="Brief description of the car..." />
            </div>
        </div>
    );
}
