import React from "react";
import { Head, Link } from "@inertiajs/react";
import PublicLayout from "../Layouts/PublicLayout";

export default function BookingInvoice({ booking, downloadUrl, historyUrl }) {
    const invoiceNo = `INV-${String(booking.id).padStart(6, "0")}`;
    const paymentStatus = String(
        booking.payment_status || "unpaid",
    ).toUpperCase();
    const paymentMethod = booking.payment_method
        ? String(booking.payment_method).toUpperCase()
        : "N/A";
    const infoItems = [
        { label: "Journey Start", value: booking.pickup_location || "N/A" },
        { label: "Journey End", value: booking.dropoff_location || "N/A" },
        { label: "Payment Method", value: paymentMethod },
        { label: "Payment Status", value: paymentStatus },
        { label: "Pickup Date", value: booking.pickup_date || "N/A" },
        { label: "Return Date", value: booking.return_date || "N/A" },
        { label: "Payment Ref", value: booking.payment_reference || "N/A" },
    ];

    return (
        <PublicLayout>
            <Head title={invoiceNo} />

            <div
                style={{
                    background:
                        "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                    padding: "52px 0 30px",
                }}
            >
                <div className="container" style={{ paddingTop: 30 }}>
                    <h1
                        style={{
                            color: "#fff",
                            margin: 0,
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 800,
                            fontSize: "1.6rem",
                        }}
                    >
                        Booking Invoice
                    </h1>
                </div>
            </div>

            <div
                className="container py-4"
                style={{ marginTop: -14, maxWidth: 860 }}
            >
                <div
                    className="glass-card p-3"
                    style={{ borderTop: "3px solid #e8192c", borderRadius: 12 }}
                >
                    <div className="d-flex justify-content-between align-items-start mb-2 flex-wrap gap-2">
                        <div>
                            <h5
                                className="mb-1"
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: 700,
                                    color: "#111827",
                                    fontSize: "1rem",
                                }}
                            >
                                #{invoiceNo}
                            </h5>
                            <div
                                className="text-muted"
                                style={{ fontSize: "0.82rem" }}
                            >
                                Issued: {booking.created_at_label}
                            </div>
                        </div>
                        <span
                            className="badge"
                            style={{
                                background:
                                    paymentStatus === "PAID"
                                        ? "#dcfce7"
                                        : "#fff7ed",
                                color:
                                    paymentStatus === "PAID"
                                        ? "#166534"
                                        : "#9a3412",
                                border:
                                    paymentStatus === "PAID"
                                        ? "1px solid #bbf7d0"
                                        : "1px solid #fdba74",
                                borderRadius: 999,
                            }}
                        >
                            {paymentStatus}
                        </span>
                    </div>

                    <div className="row g-2 mb-3">
                        <div className="col-md-6">
                            <div
                                className="p-2"
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 9,
                                    background: "#f8fafc",
                                }}
                            >
                                <div
                                    className="text-muted"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Customer
                                </div>
                                <strong>{booking.customer_name}</strong>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div
                                className="p-2"
                                style={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 9,
                                    background: "#f8fafc",
                                }}
                            >
                                <div
                                    className="text-muted"
                                    style={{ fontSize: "0.75rem" }}
                                >
                                    Car
                                </div>
                                <strong>{booking.car_name}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="row g-2 mb-3">
                        {infoItems.map((item) => (
                            <div className="col-md-6" key={item.label}>
                                <div
                                    className="p-2"
                                    style={{
                                        border: "1px solid #e5e7eb",
                                        borderRadius: 9,
                                        background: "#ffffff",
                                    }}
                                >
                                    <div
                                        className="text-muted"
                                        style={{ fontSize: "0.76rem" }}
                                    >
                                        {item.label}
                                    </div>
                                    <div
                                        style={{
                                            color: "#111827",
                                            fontWeight: 600,
                                            fontSize: "0.92rem",
                                        }}
                                    >
                                        {item.value}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div
                        className="p-2"
                        style={{
                            border: "1px solid #fecdd3",
                            borderRadius: 9,
                            background: "#fff1f2",
                        }}
                    >
                        <div className="d-flex justify-content-between mb-1">
                            <span>Rental Days</span>
                            <strong>{booking.rental_days}</strong>
                        </div>
                        <div
                            className="d-flex justify-content-between"
                            style={{ fontSize: "0.98rem" }}
                        >
                            <span>Total Amount</span>
                            <strong style={{ color: "#be123c" }}>
                                {booking.total_amount}
                            </strong>
                        </div>
                    </div>

                    <div className="d-flex gap-2 flex-wrap mt-3">
                        <a
                            href={downloadUrl}
                            className="btn btn-primary btn-sm"
                        >
                            <i className="bi bi-download me-1" />
                            Download
                        </a>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => window.print()}
                        >
                            <i className="bi bi-printer me-1" />
                            Print
                        </button>
                        <Link
                            href={historyUrl}
                            className="btn btn-outline-red btn-sm"
                        >
                            My Bookings
                        </Link>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
