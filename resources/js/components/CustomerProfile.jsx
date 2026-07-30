import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import CustomerLayout from "./CustomerLayout";

export default function CustomerProfile({ data }) {
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);

    const {
        data: personalForm,
        setData: setPersonalData,
        post: postPersonal,
        processing: personalProcessing,
        errors: personalErrors,
        setError: setPersonalError,
        clearErrors: clearPersonalErrors,
    } = useForm({
        name: data.userName || "",
        email: data.email || "",
        phone: data.phone || "",
        gender: data.gender || "",
        address: data.address || "",
        avatar: null,
        _method: "put",
    });

    const {
        data: passwordForm,
        setData: setPasswordData,
        put: putPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset,
    } = useForm({
        password: "",
        password_confirmation: "",
    });

    const submitPersonal = (event) => {
        event.preventDefault();

        if (personalForm.avatar && personalForm.avatar.size > 2 * 1024 * 1024) {
            setPersonalError("avatar", "Avatar must be 2MB or smaller.");
            return;
        }

        clearPersonalErrors("avatar");

        postPersonal(data.updateUrl, {
            forceFormData: true,
            onSuccess: () => setIsEditing(false),
        });
    };

    const submitPassword = (event) => {
        event.preventDefault();
        putPassword(data.passwordUpdateUrl, {
            onSuccess: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <CustomerLayout data={data} active="profile" title="My Profile">
            <div
                className="glass-card p-4"
                style={{ borderTop: "4px solid #0ea5a4" }}
            >
                <div className="row g-2 mb-3">
                    <div className="col-12 col-md-auto">
                        <button
                            type="button"
                            className={`btn btn-sm w-100 ${activeTab === "personal" ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => setActiveTab("personal")}
                        >
                            Personal Information
                        </button>
                    </div>
                    <div className="col-12 col-md-auto">
                        <button
                            type="button"
                            className={`btn btn-sm w-100 ${activeTab === "password" ? "btn-primary" : "btn-outline-secondary"}`}
                            onClick={() => setActiveTab("password")}
                        >
                            Change Password
                        </button>
                    </div>
                </div>

                {activeTab === "personal" ? (
                    <form
                        onSubmit={submitPersonal}
                        encType="multipart/form-data"
                    >
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={() => setIsEditing((prev) => !prev)}
                            >
                                <i className="bi bi-pencil-square me-1"></i>
                                Edit
                            </button>
                        </div>

                        <div className="row g-3">
                            <div className="col-lg-4 text-center">
                                {data.userPhotoUrl ? (
                                    <img
                                        src={data.userPhotoUrl}
                                        alt="Profile"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            border: "3px solid #99f6e4",
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            margin: "0 auto",
                                            background: "#ccfbf1",
                                            color: "#0f766e",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "36px",
                                        }}
                                    >
                                        <i className="bi bi-person"></i>
                                    </div>
                                )}

                                <div className="mt-3 text-start">
                                    <label className="form-label">
                                        Profile Picture
                                    </label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        className="form-control"
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setPersonalData(
                                                "avatar",
                                                e.target.files?.[0] || null,
                                            )
                                        }
                                    />
                                    {personalErrors.avatar && (
                                        <div className="text-danger small mt-1">
                                            {personalErrors.avatar}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-lg-8">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={personalForm.name}
                                        onChange={(e) =>
                                            setPersonalData(
                                                "name",
                                                e.target.value,
                                            )
                                        }
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                    {personalErrors.name && (
                                        <div className="text-danger small mt-1">
                                            {personalErrors.name}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={personalForm.email}
                                        onChange={(e) =>
                                            setPersonalData(
                                                "email",
                                                e.target.value,
                                            )
                                        }
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                    {personalErrors.email && (
                                        <div className="text-danger small mt-1">
                                            {personalErrors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={personalForm.phone}
                                        onChange={(e) =>
                                            setPersonalData(
                                                "phone",
                                                e.target.value,
                                            )
                                        }
                                        className="form-control"
                                        disabled={!isEditing}
                                    />
                                    {personalErrors.phone && (
                                        <div className="text-danger small mt-1">
                                            {personalErrors.phone}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <select
                                        name="gender"
                                        value={personalForm.gender}
                                        onChange={(e) =>
                                            setPersonalData(
                                                "gender",
                                                e.target.value,
                                            )
                                        }
                                        className="form-select"
                                        disabled={!isEditing}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {personalErrors.gender && (
                                        <div className="text-danger small mt-1">
                                            {personalErrors.gender}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={personalForm.address}
                                        onChange={(e) =>
                                            setPersonalData(
                                                "address",
                                                e.target.value,
                                            )
                                        }
                                        className="form-control"
                                        rows="3"
                                        disabled={!isEditing}
                                    ></textarea>
                                    {personalErrors.address && (
                                        <div className="text-danger small mt-1">
                                            {personalErrors.address}
                                        </div>
                                    )}
                                </div>

                                {isEditing && (
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{
                                            background: "#0ea5a4",
                                            borderColor: "#0ea5a4",
                                        }}
                                        disabled={personalProcessing}
                                    >
                                        <i className="bi bi-check2-circle me-2"></i>
                                        Save Information
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={submitPassword}>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                                type="password"
                                name="password"
                                value={passwordForm.password}
                                onChange={(e) =>
                                    setPasswordData("password", e.target.value)
                                }
                                className="form-control"
                                required
                            />
                            {passwordErrors.password && (
                                <div className="text-danger small mt-1">
                                    {passwordErrors.password}
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                value={passwordForm.password_confirmation}
                                onChange={(e) =>
                                    setPasswordData(
                                        "password_confirmation",
                                        e.target.value,
                                    )
                                }
                                className="form-control"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                background: "#0ea5a4",
                                borderColor: "#0ea5a4",
                            }}
                            disabled={passwordProcessing}
                        >
                            <i className="bi bi-shield-lock me-2"></i>
                            Change Password
                        </button>
                    </form>
                )}
            </div>
        </CustomerLayout>
    );
}
