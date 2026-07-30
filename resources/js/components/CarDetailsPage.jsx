import React, { useMemo, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    buildLocationValue,
    getDistrictOptions,
    getDivisionOptions,
    getUpazilaOptions,
    parseLocationParts,
} from "../utils/bangladeshLocations";

function stars(value) {
    const out = [];
    for (let i = 1; i <= 5; i += 1) {
        out.push(
            <i
                key={i}
                className={`bi bi-star${i <= Number(value) ? "-fill" : ""}`}
            ></i>,
        );
    }
    return out;
}

export default function CarDetailsPage({ data }) {
    const car = data.car || {};
    const reviews = data.reviews || [];
    const [pickupSelection, setPickupSelection] = useState(() =>
        parseLocationParts(data.old?.pickup_location || ""),
    );
    const [dropoffSelection, setDropoffSelection] = useState(() =>
        parseLocationParts(data.old?.dropoff_location || ""),
    );

    const pickupAddress = useMemo(() => {
        const { division, district, upazila } = pickupSelection;
        if (!division && !district) return "";
        if (!division) return district + (upazila ? `, ${upazila}` : "");
        if (!district) return `Division: ${division}`;
        return upazila
            ? `Division: ${division}, ${district}, ${upazila}`
            : `Division: ${division}, ${district}`;
    }, [pickupSelection]);

    const dropoffAddress = useMemo(() => {
        const { division, district, upazila } = dropoffSelection;
        if (!division && !district) return "";
        if (!division) return district + (upazila ? `, ${upazila}` : "");
        if (!district) return `Division: ${division}`;
        return upazila
            ? `Division: ${division}, ${district}, ${upazila}`
            : `Division: ${division}, ${district}`;
    }, [dropoffSelection]);

    const divisions = useMemo(() => getDivisionOptions(), []);
    const pickupDistricts = useMemo(
        () => getDistrictOptions(pickupSelection.division),
        [pickupSelection.division],
    );
    const dropoffDistricts = useMemo(
        () => getDistrictOptions(dropoffSelection.division),
        [dropoffSelection.division],
    );
    const pickupUpazilas = useMemo(
        () =>
            getUpazilaOptions(
                pickupSelection.division,
                pickupSelection.district,
            ),
        [pickupSelection.division, pickupSelection.district],
    );
    const dropoffUpazilas = useMemo(
        () =>
            getUpazilaOptions(
                dropoffSelection.division,
                dropoffSelection.district,
            ),
        [dropoffSelection.division, dropoffSelection.district],
    );

    return (
        <>
            <div
                style={{
                    background:
                        "linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)",
                    padding: "80px 0 40px",
                    marginTop: 0,
                }}
            >
                <div className="container" style={{ paddingTop: 40 }}>
                    <nav style={{ "--bs-breadcrumb-divider": "'›'" }}>
                        <ol
                            className="breadcrumb mb-2"
                            style={{ fontSize: ".85rem" }}
                        >
                            <li className="breadcrumb-item">
                                <Link
                                    href={data.homeUrl}
                                    style={{
                                        color: "rgba(255,255,255,.6)",
                                        textDecoration: "none",
                                    }}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link
                                    href={data.carsUrl}
                                    style={{
                                        color: "rgba(255,255,255,.6)",
                                        textDecoration: "none",
                                    }}
                                >
                                    Cars
                                </Link>
                            </li>
                            <li
                                className="breadcrumb-item active"
                                style={{ color: "rgba(255,255,255,.4)" }}
                            >
                                {car.brand} {car.model}
                            </li>
                        </ol>
                    </nav>
                    <h1
                        style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 800,
                            color: "#fff",
                            fontSize: "2rem",
                            margin: 0,
                        }}
                    >
                        {car.brand} {car.model}
                    </h1>
                </div>
            </div>

            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-7">
                        <img
                            src={car.image_url}
                            alt={car.display_name}
                            className="car-detail-img"
                            onError={(e) => {
                                e.currentTarget.src = car.fallback_image_url;
                            }}
                        />

                        <div className="mt-5">
                            <h3
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: 800,
                                    color: "#1a1a2e",
                                    marginBottom: 24,
                                }}
                            >
                                <i
                                    className="bi bi-star-fill me-2"
                                    style={{ color: "#e8192c" }}
                                ></i>
                                Customer Reviews
                            </h3>

                            {data.canReview && (
                                <div className="glass-card p-4 mb-4">
                                    <h5
                                        style={{
                                            fontFamily:
                                                "Montserrat, sans-serif",
                                            fontWeight: 700,
                                            color: "#1a1a2e",
                                            marginBottom: 16,
                                        }}
                                    >
                                        Write a Review
                                    </h5>
                                    <form method="POST" action={data.reviewUrl}>
                                        <input
                                            type="hidden"
                                            name="_token"
                                            value={data.csrfToken}
                                        />
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label">
                                                    Rating (1-5)
                                                </label>
                                                <select
                                                    name="rating"
                                                    className="form-select"
                                                    required
                                                >
                                                    {[5, 4, 3, 2, 1].map(
                                                        (i) => (
                                                            <option
                                                                key={i}
                                                                value={i}
                                                            >
                                                                {i} Star
                                                                {i > 1
                                                                    ? "s"
                                                                    : ""}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-md-8">
                                                <label className="form-label">
                                                    Your Comment
                                                </label>
                                                <textarea
                                                    name="comment"
                                                    className="form-control"
                                                    rows="2"
                                                    required
                                                    maxLength="500"
                                                    placeholder="Share your experience..."
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-sm mt-3"
                                        >
                                            <i className="bi bi-send me-1"></i>
                                            Submit Review
                                        </button>
                                    </form>
                                </div>
                            )}

                            {reviews.length ? (
                                reviews.map((review, idx) => (
                                    <div
                                        className="glass-card p-4 mb-3"
                                        key={`${review.user_name}-${idx}`}
                                    >
                                        <div className="d-flex gap-3">
                                            <div
                                                style={{
                                                    width: 42,
                                                    height: 42,
                                                    background: "#e8192c",
                                                    borderRadius: "50%",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#fff",
                                                    fontWeight: 700,
                                                    fontFamily:
                                                        "Montserrat, sans-serif",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {(
                                                    review.user_name || "U"
                                                ).slice(0, 1)}
                                            </div>
                                            <div>
                                                <strong
                                                    style={{
                                                        color: "#1a1a2e",
                                                        fontSize: ".9rem",
                                                    }}
                                                >
                                                    {review.user_name}
                                                </strong>
                                                <div
                                                    className="rating-stars"
                                                    style={{
                                                        fontSize: ".8rem",
                                                    }}
                                                >
                                                    {stars(review.rating)}
                                                </div>
                                            </div>
                                        </div>
                                        <p
                                            style={{
                                                color: "#374151",
                                                margin: "12px 0 0",
                                                fontSize: ".9rem",
                                                lineHeight: 1.6,
                                            }}
                                        >
                                            {review.comment}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="glass-card p-4 text-center">
                                    <i
                                        className="bi bi-chat-dots"
                                        style={{
                                            fontSize: "2rem",
                                            color: "#e8192c",
                                            opacity: 0.4,
                                        }}
                                    ></i>
                                    <p
                                        style={{
                                            color: "#6c757d",
                                            margin: "12px 0 0",
                                        }}
                                    >
                                        No reviews yet. Be the first to review!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div
                            className="glass-card p-4 mb-4"
                            style={{ borderTop: "4px solid #e8192c" }}
                        >
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <span
                                    className="badge"
                                    style={{
                                        background: "#fef2f3",
                                        color: "#e8192c",
                                        border: "1px solid rgba(232,25,44,.2)",
                                        fontWeight: 600,
                                        borderRadius: 20,
                                    }}
                                >
                                    {car.category}
                                </span>
                                <span
                                    className="badge"
                                    style={{
                                        background:
                                            car.availability === "available"
                                                ? "#d1fae5"
                                                : "#f3f4f6",
                                        color:
                                            car.availability === "available"
                                                ? "#065f46"
                                                : "#6b7280",
                                        borderRadius: 20,
                                        fontWeight: 600,
                                    }}
                                >
                                    <i
                                        className="bi bi-circle-fill me-1"
                                        style={{ fontSize: ".5rem" }}
                                    ></i>
                                    {car.availability}
                                </span>
                            </div>

                            <h1
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: 800,
                                    color: "#1a1a2e",
                                    fontSize: "1.8rem",
                                    marginBottom: 4,
                                }}
                            >
                                {car.brand} {car.model}
                            </h1>
                            <p
                                style={{
                                    color: "#6c757d",
                                    fontSize: ".9rem",
                                    marginBottom: 16,
                                }}
                            >
                                <i
                                    className="bi bi-geo-alt me-1"
                                    style={{ color: "#e8192c" }}
                                ></i>
                                {car.location}
                            </p>
                            <h2
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: 800,
                                    color: "#e8192c",
                                    fontSize: "2rem",
                                }}
                            >
                                {car.formatted_price}
                            </h2>
                            <div
                                className="rating-stars mb-4"
                                style={{ fontSize: ".9rem" }}
                            >
                                {stars(car.rating)}{" "}
                                <span
                                    style={{
                                        color: "#6c757d",
                                        fontSize: ".85rem",
                                        marginLeft: 6,
                                    }}
                                >
                                    {car.rating}/5.0
                                </span>
                            </div>

                            <div className="row g-3 mb-4">
                                <div className="col-6">
                                    <div
                                        style={{
                                            background: "#f8f9fa",
                                            borderRadius: 10,
                                            padding: 14,
                                            textAlign: "center",
                                        }}
                                    >
                                        <i
                                            className="bi bi-fuel-pump"
                                            style={{
                                                fontSize: "1.3rem",
                                                color: "#e8192c",
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        ></i>
                                        <span
                                            style={{
                                                fontSize: ".8rem",
                                                color: "#6c757d",
                                            }}
                                        >
                                            {car.fuel_type}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div
                                        style={{
                                            background: "#f8f9fa",
                                            borderRadius: 10,
                                            padding: 14,
                                            textAlign: "center",
                                        }}
                                    >
                                        <i
                                            className="bi bi-gear"
                                            style={{
                                                fontSize: "1.3rem",
                                                color: "#e8192c",
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        ></i>
                                        <span
                                            style={{
                                                fontSize: ".8rem",
                                                color: "#6c757d",
                                            }}
                                        >
                                            {car.transmission}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div
                                        style={{
                                            background: "#f8f9fa",
                                            borderRadius: 10,
                                            padding: 14,
                                            textAlign: "center",
                                        }}
                                    >
                                        <i
                                            className="bi bi-people"
                                            style={{
                                                fontSize: "1.3rem",
                                                color: "#e8192c",
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        ></i>
                                        <span
                                            style={{
                                                fontSize: ".8rem",
                                                color: "#6c757d",
                                            }}
                                        >
                                            {car.seats} Seats
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div
                                        style={{
                                            background: "#f8f9fa",
                                            borderRadius: 10,
                                            padding: 14,
                                            textAlign: "center",
                                        }}
                                    >
                                        <i
                                            className="bi bi-shield-check"
                                            style={{
                                                fontSize: "1.3rem",
                                                color: "#e8192c",
                                                display: "block",
                                                marginBottom: 4,
                                            }}
                                        ></i>
                                        <span
                                            style={{
                                                fontSize: ".8rem",
                                                color: "#6c757d",
                                            }}
                                        >
                                            Insured
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {car.description && (
                                <p
                                    style={{
                                        color: "#374151",
                                        fontSize: ".9rem",
                                        lineHeight: 1.7,
                                        padding: 14,
                                        background: "#f8f9fa",
                                        borderRadius: 10,
                                        marginBottom: 20,
                                    }}
                                >
                                    {car.description}
                                </p>
                            )}

                            {data.canBook ? (
                                <form method="POST" action={data.bookingUrl}>
                                    <input
                                        type="hidden"
                                        name="_token"
                                        value={data.csrfToken}
                                    />

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Pickup Date
                                        </label>
                                        <input
                                            type="date"
                                            name="pickup_date"
                                            className={`form-control ${data.errors?.pickup_date ? "is-invalid" : ""}`}
                                            min={
                                                new Date()
                                                    .toISOString()
                                                    .split("T")[0]
                                            }
                                            defaultValue={
                                                data.old?.pickup_date || ""
                                            }
                                            required
                                        />
                                        {data.errors?.pickup_date && (
                                            <div className="invalid-feedback">
                                                {data.errors.pickup_date}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Return Date
                                        </label>
                                        <input
                                            type="date"
                                            name="return_date"
                                            className={`form-control ${data.errors?.return_date ? "is-invalid" : ""}`}
                                            defaultValue={
                                                data.old?.return_date || ""
                                            }
                                            required
                                        />
                                        {data.errors?.return_date && (
                                            <div className="invalid-feedback">
                                                {data.errors.return_date}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Journey Start Location (Division /
                                            District / Upazila)
                                        </label>
                                        <input
                                            type="hidden"
                                            name="pickup_location"
                                            value={buildLocationValue(
                                                pickupSelection,
                                            )}
                                        />
                                        <div className="row g-2">
                                            <div className="col-12">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={
                                                        pickupSelection.division
                                                    }
                                                    onChange={(e) =>
                                                        setPickupSelection({
                                                            division:
                                                                e.target.value,
                                                            district: "",
                                                            upazila: "",
                                                        })
                                                    }
                                                    required
                                                >
                                                    <option value="">
                                                        Select Division
                                                    </option>
                                                    {divisions.map(
                                                        (division) => (
                                                            <option
                                                                key={division}
                                                                value={division}
                                                            >
                                                                {division}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={
                                                        pickupSelection.district
                                                    }
                                                    onChange={(e) =>
                                                        setPickupSelection(
                                                            (prev) => ({
                                                                ...prev,
                                                                district:
                                                                    e.target
                                                                        .value,
                                                                upazila: "",
                                                            }),
                                                        )
                                                    }
                                                    required
                                                    disabled={
                                                        !pickupSelection.division
                                                    }
                                                >
                                                    <option value="">
                                                        Select District
                                                    </option>
                                                    {pickupDistricts.map(
                                                        (district) => (
                                                            <option
                                                                key={district}
                                                                value={district}
                                                            >
                                                                {district}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={
                                                        pickupSelection.upazila
                                                    }
                                                    onChange={(e) =>
                                                        setPickupSelection(
                                                            (prev) => ({
                                                                ...prev,
                                                                upazila:
                                                                    e.target
                                                                        .value,
                                                            }),
                                                        )
                                                    }
                                                    required
                                                    disabled={
                                                        !pickupSelection.district
                                                    }
                                                >
                                                    <option value="">
                                                        Select Upazila
                                                    </option>
                                                    {pickupUpazilas.map(
                                                        (upazila) => (
                                                            <option
                                                                key={upazila}
                                                                value={upazila}
                                                            >
                                                                {upazila}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="form-text mt-2"
                                            style={{
                                                color: "#e8192c",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {pickupAddress ||
                                                "Please choose a pickup location"}
                                        </div>
                                        {data.errors?.pickup_location && (
                                            <div className="invalid-feedback d-block">
                                                {data.errors.pickup_location}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            Journey End Location (Division /
                                            District / Upazila)
                                        </label>
                                        <input
                                            type="hidden"
                                            name="dropoff_location"
                                            value={buildLocationValue(
                                                dropoffSelection,
                                            )}
                                        />
                                        <div className="row g-2">
                                            <div className="col-12">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={
                                                        dropoffSelection.division
                                                    }
                                                    onChange={(e) =>
                                                        setDropoffSelection({
                                                            division:
                                                                e.target.value,
                                                            district: "",
                                                            upazila: "",
                                                        })
                                                    }
                                                    required
                                                >
                                                    <option value="">
                                                        Select Division
                                                    </option>
                                                    {divisions.map(
                                                        (division) => (
                                                            <option
                                                                key={division}
                                                                value={division}
                                                            >
                                                                {division}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={
                                                        dropoffSelection.district
                                                    }
                                                    onChange={(e) =>
                                                        setDropoffSelection(
                                                            (prev) => ({
                                                                ...prev,
                                                                district:
                                                                    e.target
                                                                        .value,
                                                                upazila: "",
                                                            }),
                                                        )
                                                    }
                                                    required
                                                    disabled={
                                                        !dropoffSelection.division
                                                    }
                                                >
                                                    <option value="">
                                                        Select District
                                                    </option>
                                                    {dropoffDistricts.map(
                                                        (district) => (
                                                            <option
                                                                key={district}
                                                                value={district}
                                                            >
                                                                {district}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                            <div className="col-6">
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={
                                                        dropoffSelection.upazila
                                                    }
                                                    onChange={(e) =>
                                                        setDropoffSelection(
                                                            (prev) => ({
                                                                ...prev,
                                                                upazila:
                                                                    e.target
                                                                        .value,
                                                            }),
                                                        )
                                                    }
                                                    required
                                                    disabled={
                                                        !dropoffSelection.district
                                                    }
                                                >
                                                    <option value="">
                                                        Select Upazila
                                                    </option>
                                                    {dropoffUpazilas.map(
                                                        (upazila) => (
                                                            <option
                                                                key={upazila}
                                                                value={upazila}
                                                            >
                                                                {upazila}
                                                            </option>
                                                        ),
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            className="form-text mt-2"
                                            style={{
                                                color: "#e8192c",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {dropoffAddress ||
                                                "Please choose a return location"}
                                        </div>
                                        {data.errors?.dropoff_location && (
                                            <div className="invalid-feedback d-block">
                                                {data.errors.dropoff_location}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        style={{ padding: 14 }}
                                    >
                                        <i className="bi bi-calendar-plus me-2"></i>
                                        Request Booking
                                    </button>
                                </form>
                            ) : data.isLoggedIn ? (
                                !car.is_available && (
                                    <div className="alert alert-warning mt-3">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        This car is currently not available for
                                        booking.
                                    </div>
                                )
                            ) : (
                                <Link
                                    href={data.loginUrl}
                                    className="btn btn-primary w-100 mt-3"
                                    style={{ padding: 14 }}
                                >
                                    <i className="bi bi-box-arrow-in-right me-2"></i>
                                    Login to Book This Car
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
