import React from "react";
import { router, useForm } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";

function renderStars(rating) {
    const value = Number(rating || 0);

    return [1, 2, 3, 4, 5].map((i) => (
        <i
            key={i}
            className={`bi ${i <= value ? "bi-star-fill" : "bi-star"}`}
            style={{ color: "#f59e0b" }}
        ></i>
    ));
}

export default function ReviewsIndex({
    reviews = [],
    cars = [],
    filters = {},
    indexUrl = "/admin/reviews",
}) {
    const { data, setData, get, processing, reset } = useForm({
        rating: filters.rating || "",
        car_id: filters.car_id || "",
        date_from: filters.date_from || "",
        date_to: filters.date_to || "",
    });

    const submitFilters = (event) => {
        event.preventDefault();
        get(indexUrl, {
            preserveScroll: true,
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        reset("rating", "car_id", "date_from", "date_to");
        router.get(
            indexUrl,
            {},
            {
                preserveScroll: true,
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <AdminLayout pageTitle="Customer Reviews">
            <div className="glass-panel p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                    <h5
                        className="mb-0"
                        style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 700,
                        }}
                    >
                        All Customer Reviews
                    </h5>
                    <span className="badge text-bg-light">
                        Total: {reviews.length}
                    </span>
                </div>

                <form onSubmit={submitFilters} className="row g-2 mb-4">
                    <div className="col-12 col-md-2">
                        <select
                            className="form-select"
                            value={data.rating}
                            onChange={(event) =>
                                setData("rating", event.target.value)
                            }
                        >
                            <option value="">All Ratings</option>
                            {[5, 4, 3, 2, 1].map((value) => (
                                <option key={value} value={value}>
                                    {value} Star{value > 1 ? "s" : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-3">
                        <select
                            className="form-select"
                            value={data.car_id}
                            onChange={(event) =>
                                setData("car_id", event.target.value)
                            }
                        >
                            <option value="">All Cars</option>
                            {cars.map((car) => (
                                <option key={car.id} value={car.id}>
                                    {car.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-6 col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={data.date_from}
                            onChange={(event) =>
                                setData("date_from", event.target.value)
                            }
                        />
                    </div>
                    <div className="col-6 col-md-2">
                        <input
                            type="date"
                            className="form-control"
                            value={data.date_to}
                            onChange={(event) =>
                                setData("date_to", event.target.value)
                            }
                        />
                    </div>
                    <div className="col-12 col-md-3 d-flex gap-2">
                        <button
                            type="submit"
                            className="btn btn-primary btn-sm"
                            disabled={processing}
                        >
                            <i className="bi bi-funnel me-1"></i>Filter
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={clearFilters}
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {reviews.length ? (
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Car</th>
                                    <th>Rating</th>
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map((review) => (
                                    <tr key={review.id}>
                                        <td>{review.id}</td>
                                        <td>{review.customer_name}</td>
                                        <td>{review.car_name}</td>
                                        <td>{renderStars(review.rating)}</td>
                                        <td style={{ minWidth: 240 }}>
                                            {review.comment}
                                        </td>
                                        <td>{review.created_at}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-5 text-muted">
                        <i
                            className="bi bi-chat-left-text"
                            style={{ fontSize: "2rem" }}
                        ></i>
                        <p className="mb-0 mt-2">No customer reviews found.</p>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
