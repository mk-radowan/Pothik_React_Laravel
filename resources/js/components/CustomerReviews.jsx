import React from "react";
import { router, useForm } from "@inertiajs/react";
import CustomerLayout from "./CustomerLayout";

function Stars({ rating }) {
    const value = Number(rating || 0);

    return (
        <div style={{ color: "#f59e0b", letterSpacing: "1px" }}>
            {[1, 2, 3, 4, 5].map((i) => (
                <i
                    key={i}
                    className={`bi ${i <= value ? "bi-star-fill" : "bi-star"}`}
                ></i>
            ))}
        </div>
    );
}

export default function CustomerReviews({ data }) {
    const [editingId, setEditingId] = React.useState(null);
    const {
        data: form,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        car_id: data.eligibleCars?.[0]?.car_id || "",
        rating: 5,
        comment: "",
    });
    const {
        data: editForm,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit,
    } = useForm({
        rating: 5,
        comment: "",
    });

    const submitReview = (event) => {
        event.preventDefault();
        post(data.submitUrl, {
            preserveScroll: true,
            onSuccess: () => reset("comment"),
        });
    };

    const startEdit = (review) => {
        setEditingId(review.id);
        setEditData("rating", String(review.rating));
        setEditData("comment", review.comment || "");
    };

    const cancelEdit = () => {
        setEditingId(null);
        resetEdit("rating", "comment");
    };

    const submitEdit = (event, review) => {
        event.preventDefault();
        put(review.update_url, {
            preserveScroll: true,
            onSuccess: () => cancelEdit(),
        });
    };

    const removeReview = (review) => {
        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }

        router.delete(review.delete_url, {
            preserveScroll: true,
        });
    };

    return (
        <CustomerLayout data={data} active="reviews" title="Customer Reviews">
            <div
                className="glass-card p-4 mb-4"
                style={{ borderTop: "4px solid #0ea5a4" }}
            >
                <h5
                    style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        marginBottom: 16,
                    }}
                >
                    Write Review (Approved Booking Only)
                </h5>

                {data.eligibleCars?.length ? (
                    <form onSubmit={submitReview}>
                        <div className="row g-3">
                            <div className="col-md-5">
                                <label className="form-label">Car</label>
                                <select
                                    className="form-select"
                                    value={form.car_id}
                                    onChange={(e) =>
                                        setData("car_id", e.target.value)
                                    }
                                    required
                                >
                                    {data.eligibleCars.map((car) => (
                                        <option
                                            key={car.car_id}
                                            value={car.car_id}
                                        >
                                            {car.car_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.car_id ? (
                                    <div className="text-danger small mt-1">
                                        {errors.car_id}
                                    </div>
                                ) : null}
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Rating</label>
                                <select
                                    className="form-select"
                                    value={form.rating}
                                    onChange={(e) =>
                                        setData("rating", e.target.value)
                                    }
                                    required
                                >
                                    {[5, 4, 3, 2, 1].map((value) => (
                                        <option key={value} value={value}>
                                            {value} Star{value > 1 ? "s" : ""}
                                        </option>
                                    ))}
                                </select>
                                {errors.rating ? (
                                    <div className="text-danger small mt-1">
                                        {errors.rating}
                                    </div>
                                ) : null}
                            </div>

                            <div className="col-md-12">
                                <label className="form-label">Comment</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={form.comment}
                                    onChange={(e) =>
                                        setData("comment", e.target.value)
                                    }
                                    placeholder="Share your ride experience"
                                    maxLength={500}
                                    required
                                ></textarea>
                                {errors.comment ? (
                                    <div className="text-danger small mt-1">
                                        {errors.comment}
                                    </div>
                                ) : null}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            disabled={processing}
                        >
                            <i className="bi bi-send me-2"></i>
                            {processing ? "Submitting..." : "Submit Review"}
                        </button>
                    </form>
                ) : (
                    <p className="text-muted mb-0">
                        No approved booking found. After booking approval, you
                        can review.
                    </p>
                )}
            </div>

            <div className="glass-card p-4">
                <h5
                    style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 700,
                        marginBottom: 16,
                    }}
                >
                    My Reviews
                </h5>
                {data.myReviews?.length ? (
                    <div className="row g-3">
                        {data.myReviews.map((review) => (
                            <div className="col-12" key={review.id}>
                                <div
                                    className="p-3"
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 12,
                                        background: "#fff",
                                    }}
                                >
                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
                                        <strong>{review.car_name}</strong>
                                        <small className="text-muted">
                                            {review.created_at}
                                        </small>
                                    </div>
                                    {editingId === review.id ? (
                                        <form
                                            onSubmit={(event) =>
                                                submitEdit(event, review)
                                            }
                                        >
                                            <div className="row g-2">
                                                <div className="col-12 col-md-3">
                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={editForm.rating}
                                                        onChange={(event) =>
                                                            setEditData(
                                                                "rating",
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                        required
                                                    >
                                                        {[5, 4, 3, 2, 1].map(
                                                            (value) => (
                                                                <option
                                                                    key={value}
                                                                    value={
                                                                        value
                                                                    }
                                                                >
                                                                    {value} Star
                                                                    {value > 1
                                                                        ? "s"
                                                                        : ""}
                                                                </option>
                                                            ),
                                                        )}
                                                    </select>
                                                    {editErrors.rating ? (
                                                        <div className="text-danger small mt-1">
                                                            {editErrors.rating}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="col-12 col-md-9">
                                                    <textarea
                                                        className="form-control form-control-sm"
                                                        rows="2"
                                                        value={editForm.comment}
                                                        onChange={(event) =>
                                                            setEditData(
                                                                "comment",
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                        maxLength={500}
                                                        required
                                                    ></textarea>
                                                    {editErrors.comment ? (
                                                        <div className="text-danger small mt-1">
                                                            {editErrors.comment}
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="col-12 d-flex gap-2 mt-2">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm btn-primary"
                                                        disabled={
                                                            editProcessing
                                                        }
                                                    >
                                                        {editProcessing
                                                            ? "Saving..."
                                                            : "Save"}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={cancelEdit}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <Stars rating={review.rating} />
                                            <p
                                                className="mb-2 mt-2"
                                                style={{ color: "#374151" }}
                                            >
                                                {review.comment}
                                            </p>
                                            <div className="d-flex gap-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-primary"
                                                    onClick={() =>
                                                        startEdit(review)
                                                    }
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i>
                                                    Edit
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() =>
                                                        removeReview(review)
                                                    }
                                                >
                                                    <i className="bi bi-trash me-1"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted mb-0">
                        You have not submitted any review yet.
                    </p>
                )}
            </div>
        </CustomerLayout>
    );
}
