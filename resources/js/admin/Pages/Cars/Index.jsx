import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

export default function CarsIndex({ cars }) {
    const removeCar = (id) => {
        if (!window.confirm("Delete this car?")) return;
        router.delete(`/admin/cars/${id}`);
    };

    const toggleCar = (id) => {
        router.post(`/admin/cars/${id}/toggle`);
    };

    return (
        <>
            <Head title="Manage Cars" />
            <AdminLayout pageTitle="Manage Cars">
                <div className="mb-4">
                    <Link href="/admin/cars/create" className="btn btn-primary">
                        <i className="bi bi-plus-circle me-2" />
                        Add New Car
                    </Link>
                </div>

                <div className="glass-card" style={{ overflow: "hidden" }}>
                    <div
                        style={{
                            padding: "20px 24px",
                            borderBottom: "1px solid #f3f4f6",
                        }}
                    >
                        <h5
                            style={{
                                fontFamily: "Montserrat,sans-serif",
                                fontWeight: 700,
                                color: "#1a1a2e",
                                margin: 0,
                            }}
                        >
                            <i
                                className="bi bi-car-front me-2"
                                style={{ color: "#e8192c" }}
                            />
                            Car Management
                        </h5>
                    </div>

                    <div className="table-responsive admin-table">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Car</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>Price/Day</th>
                                    <th>Availability</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car.id}>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <img
                                                    src={car.image_url}
                                                    width="56"
                                                    height="40"
                                                    className="rounded"
                                                    style={{
                                                        objectFit: "cover",
                                                        border: "1px solid #f3f4f6",
                                                    }}
                                                    onError={(e) => {
                                                        e.currentTarget.onerror =
                                                            null;
                                                        e.currentTarget.src =
                                                            car.fallback_image_url;
                                                    }}
                                                />
                                                <strong
                                                    style={{ color: "#1a1a2e" }}
                                                >
                                                    {car.brand} {car.model}
                                                </strong>
                                            </div>
                                        </td>
                                        <td>
                                            <span
                                                style={{
                                                    background: "#fef2f3",
                                                    color: "#e8192c",
                                                    padding: "3px 10px",
                                                    borderRadius: 20,
                                                    fontSize: "0.75rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {car.category}
                                            </span>
                                        </td>
                                        <td style={{ color: "#374151" }}>
                                            {car.location}
                                        </td>
                                        <td>
                                            <strong
                                                style={{ color: "#10b981" }}
                                            >
                                                ৳
                                                {Number(
                                                    car.price_per_day,
                                                ).toLocaleString()}
                                                /day
                                            </strong>
                                        </td>
                                        <td>
                                            <span
                                                style={{
                                                    background:
                                                        car.availability ===
                                                        "available"
                                                            ? "#d1fae5"
                                                            : "#f3f4f6",
                                                    color:
                                                        car.availability ===
                                                        "available"
                                                            ? "#065f46"
                                                            : "#6b7280",
                                                    padding: "3px 12px",
                                                    borderRadius: 20,
                                                    fontSize: "0.78rem",
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {car.availability_label}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-1">
                                                <Link
                                                    href={`/admin/cars/${car.id}/edit`}
                                                    className="btn btn-sm"
                                                    style={{
                                                        background: "#eff6ff",
                                                        color: "#1d4ed8",
                                                        border: "none",
                                                        borderRadius: 20,
                                                    }}
                                                >
                                                    <i className="bi bi-pencil me-1" />
                                                    Edit
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm"
                                                    style={{
                                                        background: car.is_enabled
                                                            ? "#dcfce7"
                                                            : "#f3f4f6",
                                                        color: car.is_enabled
                                                            ? "#166534"
                                                            : "#4b5563",
                                                        border: "none",
                                                        borderRadius: 20,
                                                    }}
                                                    onClick={() =>
                                                        toggleCar(car.id)
                                                    }
                                                >
                                                    <i className="bi bi-toggle-on me-1" />
                                                    {car.is_enabled
                                                        ? "Enable"
                                                        : "Disable"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm"
                                                    style={{
                                                        background: "#fee2e2",
                                                        color: "#991b1b",
                                                        border: "none",
                                                        borderRadius: 20,
                                                    }}
                                                    onClick={() =>
                                                        removeCar(car.id)
                                                    }
                                                >
                                                    <i className="bi bi-trash me-1" />
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
