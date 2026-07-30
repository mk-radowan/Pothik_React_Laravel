import React, { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";

export default function PublicLayout({ children }) {
    const { props } = usePage();
    const user = props.auth?.user;
    const flash = props.flash || {};
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    const logout = () => {
        closeMenu();
        router.post("/logout");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg glass-nav fixed-top">
                <div className="container">
                    <Link className="navbar-brand" href="/" onClick={closeMenu}>
                        <i className="bi bi-car-front-fill" />
                        Pothik
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-expanded={menuOpen}
                        aria-controls="navbarNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div
                        className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav me-auto ms-4">
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    href="/"
                                    onClick={closeMenu}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    href="/cars"
                                    onClick={closeMenu}
                                >
                                    Browse Cars
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav align-items-center gap-1">
                            {user ? (
                                <>
                                    {user.role === "admin" ? (
                                        <li className="nav-item">
                                            <Link
                                                className="nav-link"
                                                href="/admin/dashboard"
                                                onClick={closeMenu}
                                            >
                                                <i className="bi bi-speedometer2 me-1" />
                                                Admin Panel
                                            </Link>
                                        </li>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link"
                                                    href="/customer/dashboard"
                                                    onClick={closeMenu}
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link
                                                    className="nav-link"
                                                    href="/customer/bookings/history"
                                                    onClick={closeMenu}
                                                >
                                                    My Bookings
                                                </Link>
                                            </li>
                                        </>
                                    )}
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            href="/customer/profile"
                                            onClick={closeMenu}
                                        >
                                            <i className="bi bi-person-circle me-1" />
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            type="button"
                                            className="btn btn-outline-red btn-sm ms-2"
                                            onClick={logout}
                                        >
                                            <i className="bi bi-box-arrow-right" />{" "}
                                            Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            href="/login"
                                            onClick={closeMenu}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            className="btn btn-primary btn-sm ms-2"
                                            href="/register"
                                            onClick={closeMenu}
                                        >
                                            <i className="bi bi-person-plus" />{" "}
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="main-content">
                {flash.success ? (
                    <div className="container mt-4 pt-4">
                        <div
                            className="alert alert-success alert-dismissible fade show"
                            role="alert"
                        >
                            <i className="bi bi-check-circle-fill me-2" />
                            {flash.success}
                        </div>
                    </div>
                ) : null}

                {flash.error ? (
                    <div className="container mt-4 pt-4">
                        <div
                            className="alert alert-danger alert-dismissible fade show"
                            role="alert"
                        >
                            <i className="bi bi-exclamation-triangle-fill me-2" />
                            {flash.error}
                        </div>
                    </div>
                ) : null}

                {children}
            </main>

            <footer className="footer-glass mt-5">
                <div className="container py-5">
                    <div className="row g-4">
                        <div className="col-lg-4 col-md-6">
                            <h5 className="mb-3">
                                <i
                                    className="bi bi-car-front-fill me-2"
                                    style={{ color: "#e8192c" }}
                                />
                                Pothik Rentals
                            </h5>
                            <p
                                className="small"
                                style={{
                                    color: "rgba(255,255,255,0.6)",
                                    lineHeight: 1.7,
                                }}
                            >
                                Bangladesh's premium car rental platform.
                                Real-time availability across 8 Divisions. All
                                prices in BDT ( ৳).
                            </p>
                        </div>
                        <div className="col-lg-2 col-md-6">
                            <h6
                                className="mb-3"
                                style={{
                                    fontFamily: "Montserrat,sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Quick Links
                            </h6>
                            <ul
                                className="list-unstyled small"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                <li className="mb-2">
                                    <Link
                                        href="/"
                                        style={{
                                            color: "rgba(255,255,255,0.6)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        href="/cars"
                                        style={{
                                            color: "rgba(255,255,255,0.6)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Browse Cars
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        href="/login"
                                        style={{
                                            color: "rgba(255,255,255,0.6)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link
                                        href="/register"
                                        style={{
                                            color: "rgba(255,255,255,0.6)",
                                            textDecoration: "none",
                                        }}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h6
                                className="mb-3"
                                style={{
                                    fontFamily: "Montserrat,sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                All Divisions We Serve
                            </h6>
                            <p
                                className="small"
                                style={{
                                    color: "rgba(255,255,255,0.6)",
                                    lineHeight: 1.8,
                                }}
                            >
                                Dhaka · Chittagong · Khulna · Rajshahi · Sylhet
                                · Barisal · Rangpur · Mymensingh
                            </p>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h6
                                className="mb-3"
                                style={{
                                    fontFamily: "Montserrat,sans-serif",
                                    fontWeight: 700,
                                    letterSpacing: "0.5px",
                                }}
                            >
                                Contact Us
                            </h6>
                            <p
                                className="small mb-2"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                <i
                                    className="bi bi-envelope me-2"
                                    style={{ color: "#e8192c" }}
                                />
                                support@Pothik.com
                            </p>
                            <p
                                className="small mb-2"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                <i
                                    className="bi bi-telephone me-2"
                                    style={{ color: "#e8192c" }}
                                />
                                Anywhere-Drive-BD
                            </p>
                            <p
                                className="small"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                            >
                                <i
                                    className="bi bi-clock me-2"
                                    style={{ color: "#e8192c" }}
                                />
                                24/7 Support
                            </p>
                        </div>
                    </div>
                    <hr
                        style={{
                            borderColor: "rgba(255,255,255,0.1)",
                            marginTop: 40,
                        }}
                    />
                    <p
                        className="text-center small mb-0"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                        &copy; {new Date().getFullYear()} Developed by Khandokar
                        Radowan. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
}
