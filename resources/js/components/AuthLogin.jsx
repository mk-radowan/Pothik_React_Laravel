import React from "react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function AuthLogin({ data }) {
    const flashError = usePage().props.flash?.error;
    const {
        post,
        processing,
        errors,
        data: form,
        setData,
    } = useForm({
        email: data.oldEmail || "",
        password: "",
        redirect: data.redirect || "",
        remember: false,
    });

    const submit = (event) => {
        event.preventDefault();
        post(data.loginUrl);
    };

    return (
        <div
            style={{
                background: "linear-gradient(135deg,#f8f9fa 0%,#fef2f3 100%)",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                paddingTop: 80,
            }}
        >
            <div className="container py-5">
                <div className="row align-items-center g-5 justify-content-center">
                    <div className="col-lg-5 d-none d-lg-block text-center">
                        <div className="hero-badge mb-3">Welcome Back</div>
                        <h2
                            style={{
                                fontFamily: "Montserrat, sans-serif",
                                fontWeight: 800,
                                color: "#1a1a2e",
                            }}
                        >
                            Your Next Adventure
                            <br />
                            <span style={{ color: "#e8192c" }}>
                                Starts Here
                            </span>
                        </h2>
                    </div>

                    <div className="col-lg-5 col-md-8">
                        <div className="auth-card">
                            <h2
                                className="text-center"
                                style={{
                                    fontFamily: "Montserrat, sans-serif",
                                    fontWeight: 800,
                                    color: "#1a1a2e",
                                }}
                            >
                                Sign In
                            </h2>
                            <p className="text-center text-muted mb-4">
                                Login to your account
                            </p>

                            {flashError && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {flashError}
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <input
                                    type="hidden"
                                    name="redirect"
                                    value={form.redirect || ""}
                                />

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        value={form.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        value={form.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        className="form-check-input"
                                        id="remember"
                                        checked={form.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="remember"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={processing}
                                >
                                    Login
                                </button>
                            </form>

                            <p className="text-center mt-3 mb-0 text-muted">
                                New here?{" "}
                                <Link href={data.registerUrl}>
                                    Create account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
