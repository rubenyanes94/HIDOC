import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Swal from "sweetalert2";

export const SignupDoctor = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        specialties: "",
        biography: "",
        picture: "",
        phone: "",
        address: "",
        latitud: "",
        longitud: "",
        cal_link: "",
    });

    const hadleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const hadleSpecialty = (value) => {
        setForm({ ...form, specialties: value });
    };

    const uploadImagen = async (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const data = new FormData();
        data.append("file", files[0]);
        data.append("upload_preset", "hidoctor");

        setUploading(true);
        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dvcvlvscy/image/upload", {
                method: "POST",
                body: data,
            });
            const file = await response.json();
            if (file.secure_url) {
                setForm(prevForm => ({ ...prevForm, picture: file.secure_url }));
            }
        } catch (error) {
            console.error("Error subiendo la imagen", error);
            Swal.fire("Error", "Could not upload image", "error");
        } finally {
            setUploading(false);
        }
    };

    const handleSignupDoctor = async (e) => {
        e.preventDefault();
        if (!form.specialties) {
            Swal.fire("Wait!", "Please select a medical specialty", "warning");
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "Welcome to the team!",
                    text: "Your professional account has been created successfully.",
                    icon: "success",
                    confirmButtonText: "Go to Login",
                    confirmButtonColor: "#1A5799"
                }).then((result) => {
                    if (result.isConfirmed) navigate("/doctor/login");
                });
            } else {
                Swal.fire("Error", data.msg || "Registration failed", "error");
            }
        } catch (error) {
            Swal.fire("Connection Error", "Check your internet or server status", "error");
        }
    };

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
            <div className="container shadow-lg overflow-hidden bg-white" style={{ borderRadius: "28px", maxWidth: "1100px", border: "none" }}>
                <div className="row g-0 align-items-stretch">

                    {/* LADO IZQUIERDO: INFORMACIÓN */}
                    <div className="col-lg-4 d-none d-lg-flex p-0" style={{ background: "linear-gradient(135deg, #092F64 0%, #1A5799 100%)" }}>
                        <div className="p-5 d-flex flex-column justify-content-center h-100 text-white text-center">
                            <i className="fa-solid fa-user-doctor display-1 mb-4 opacity-25"></i>
                            <h2 className="fw-bold mb-4">Professional Registration</h2>
                            <p className="opacity-75">Join our platform to reach more patients and manage your clinic with digital tools.</p>

                            <ul className="list-unstyled text-start mt-4 small">
                                <li className="mb-2"><i className="fa-solid fa-check-circle text-info me-2"></i> Custom medical profile</li>
                                <li className="mb-2"><i className="fa-solid fa-check-circle text-info me-2"></i> Digital schedule management</li>
                                <li className="mb-2"><i className="fa-solid fa-check-circle text-info me-2"></i> Secure patient records</li>
                            </ul>
                        </div>
                    </div>

                    {/* LADO DERECHO: FORMULARIO */}
                    <div className="col-lg-8 p-4 p-md-5">
                        <div className="mb-4">
                            <h3 className="fw-bold text-dark mb-1">Create Professional Account</h3>
                            <p className="text-muted small">Fill in the details to set up your medical profile.</p>
                        </div>

                        <form onSubmit={handleSignupDoctor}>
                            <div className="row">
                                {/* Datos Básicos */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">FULL NAME</label>
                                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" name="name" onChange={hadleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">WORK EMAIL</label>
                                    <input type="email" className="form-control bg-light border-0 py-2 shadow-none" name="email" onChange={hadleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">PASSWORD</label>
                                    <input type="password" className="form-control bg-light border-0 py-2 shadow-none" name="password" onChange={hadleChange} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">PHONE NUMBER</label>
                                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" name="phone" onChange={hadleChange} required />
                                </div>

                                {/* Especialidad y Bio */}
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">SPECIALTY</label>
                                    <select className="form-select bg-light border-0 py-2 shadow-none" onChange={(e) => hadleSpecialty(e.target.value)} required>
                                        <option value="">Choose specialty...</option>
                                        <option value="CARDIOLOGY">Cardiology</option>
                                        <option value="DERMATOLOGY">Dermatology</option>
                                        <option value="PSYCHOLOGY">Psychology</option>
                                        <option value="GENERAL_PRACTICE">General Practice</option>
                                        <option value="NEUROLOGY">Neurology</option>
                                        <option value="GASTROENTEROLOGY">Gastroenterology</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label small fw-bold text-muted">PROFESSIONAL PICTURE</label>
                                    <input className="form-control bg-light border-0 py-2 shadow-none" type="file" onChange={uploadImagen} />
                                    {uploading && <small className="text-primary animate-pulse">Uploading to Cloudinary...</small>}
                                    {form.picture && <small className="text-success"><i className="fa-solid fa-circle-check"></i> Image ready</small>}
                                </div>

                                <div className="col-12 mb-3">
                                    <label className="form-label small fw-bold text-muted">BIOGRAPHY / CLINICAL FOCUS</label>
                                    <textarea className="form-control bg-light border-0 shadow-none" name="biography" rows="2" onChange={hadleChange}></textarea>
                                </div>

                                {/* Ubicación y Agenda */}
                                <div className="col-12 mb-3">
                                    <label className="form-label small fw-bold text-muted">CLINIC ADDRESS</label>
                                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" name="address" onChange={hadleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label small fw-bold text-muted">LATITUDE</label>
                                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" name="latitud" onChange={hadleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label small fw-bold text-muted">LONGITUDE</label>
                                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" name="longitud" onChange={hadleChange} required />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label small fw-bold text-muted">CAL LINK</label>
                                    <input type="text" className="form-control bg-light border-0 py-2 shadow-none" name="cal_link" onChange={hadleChange} required />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn w-100 py-3 mt-3 shadow-sm btn-submit-doctor"
                                style={{ backgroundColor: "#1A5799", color: "#fff", borderRadius: "12px", fontWeight: "600", border: "none" }}
                                disabled={uploading}
                            >
                                Complete Professional Registration
                            </button>

                            <div className="text-center mt-4">
                                <p className="small text-muted">Already have an account? <Link to="/doctor/login" className="text-primary fw-bold text-decoration-none">Sign In</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>{`
                .row.g-0 { margin: 0; }
                .row.g-0 > [class*='col-'] { padding: 0; }
                .form-control:focus, .form-select:focus {
                    background-color: #fff !important;
                    border: 1px solid #1A5799 !important;
                    box-shadow: 0 0 0 4px rgba(26, 87, 153, 0.1) !important;
                }
                .btn-submit-doctor:hover {
                    background-color: #092F64 !important;
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(9, 47, 100, 0.2) !important;
                }
                }
                container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
                    --bs-gutter-x: none;
                }
            `}</style>
        </div>
    );
};