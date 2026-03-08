import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const token = searchParams.get("token");

    const handleResetPw = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPw) {
            Swal.fire({
                title: "Mismatch",
                text: "Passwords do not match",
                icon: "warning",
                confirmButtonColor: "#1A5799"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/resetpassword`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token: token,
                    new_password: newPassword
                }),
            });
            
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "Credentials Updated",
                    text: "Your professional password has been reset successfully.",
                    icon: "success",
                    confirmButtonColor: "#1A5799",
                    borderRadius: "16px"
                });
                navigate("/api/doctor/login");
            } else {
                Swal.fire("Error", data.msg || "The link has expired or is invalid.", "error");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Medical server connection failed", "error");
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
                <div className="text-center p-5 bg-white shadow" style={{ borderRadius: "24px", maxWidth: "500px" }}>
                    <i className="fa-solid fa-user-lock text-danger display-1 mb-4 opacity-50"></i>
                    <h3 className="fw-bold">Security Alert</h3>
                    <p className="text-muted">No professional token detected. For security reasons, you must request a new reset link from the portal.</p>
                    <Link to="/api/doctor/forgotpassword" className="btn btn-primary px-4 py-2 mt-3 rounded-pill shadow-sm" style={{ backgroundColor: "#1A5799", border: "none" }}>
                        Doctor Recovery Portal
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
            <div 
                className="container shadow-lg overflow-hidden bg-white animate__animated animate__fadeIn" 
                style={{ borderRadius: "24px", maxWidth: "1000px", border: "none" }}
            >
                <div className="row g-0">
                    
                    {/* LADO IZQUIERDO: DISEÑO UNIFICADO DOCTOR */}
                    <div className="col-lg-6 d-none d-lg-flex p-0 bg-unified-gradient">
                        <div className="d-flex flex-column justify-content-center h-100 w-100 p-5 text-white">
                            <div className="mb-4">
                                <i className="fa-solid fa-user-md display-1 opacity-25"></i>
                            </div>
                            <h2 className="fw-bold display-5 mb-3">Medical <br/>Security.</h2>
                            <p className="lead opacity-75 mb-5">
                                Professional credential management. Please set a complex password to protect clinical data and patient privacy.
                            </p>
                            
                            <div className="mt-auto p-4 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                                <p className="small m-0">
                                    <i className="fa-solid fa-circle-info me-2 text-info"></i>
                                    Passphrases with more than 10 characters are highly recommended.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* LADO DERECHO: FORMULARIO */}
                    <div className="col-12 col-lg-6 bg-white">
                        <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
                            
                            <div className="mb-5 text-center text-lg-start">
                                <h3 className="fw-bold text-dark mb-2">Reset Credentials</h3>
                                <p className="text-muted small text-uppercase" style={{ letterSpacing: "1px" }}>Doctor Portal - Password Update</p>
                            </div>

                            <form onSubmit={handleResetPw}>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ letterSpacing: "1px" }}>New Professional Password</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <i className="fa-solid fa-key text-primary"></i>
                                        </span>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            className="form-control bg-light border-0 py-3 shadow-none" 
                                            placeholder="••••••••"
                                            required
                                            onChange={(e) => setNewPassword(e.target.value)} 
                                        />
                                        <button 
                                            type="button" 
                                            className="btn bg-light border-0 text-muted"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase" style={{ letterSpacing: "1px" }}>Confirm Password</label>
                                    <div className="input-group custom-input-group">
                                        <span className="input-group-text bg-light border-0">
                                            <i className="fa-solid fa-check-to-slot text-primary"></i>
                                        </span>
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            className="form-control bg-light border-0 py-3 shadow-none" 
                                            placeholder="••••••••"
                                            required
                                            onChange={(e) => setConfirmPw(e.target.value)} 
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className="btn w-100 py-3 mb-4 btn-unified shadow-sm d-flex align-items-center justify-content-center gap-2" 
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status"></span>
                                    ) : (
                                        <>
                                            <span className="fw-bold">CONFIRM UPDATED PASSWORD</span>
                                            <i className="fa-solid fa-shield-check ms-2 small"></i>
                                        </>
                                    )}
                                </button>

                                <div className="text-center pt-2">
                                    <Link to="/api/doctor/login" className="text-muted text-decoration-none small hover-link">
                                        <i className="fa-solid fa-arrow-left me-2"></i> Cancel and go back
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .bg-unified-gradient {
                    background: linear-gradient(135deg, #1A5799 0%, #092F64 100%) !important;
                }
                .row.g-0 { margin: 0 !important; }
                .row.g-0 > [class*='col-'] { padding: 0 !important; }

                .custom-input-group {
                    background-color: #f8f9fa;
                    border-radius: 12px;
                    border: 1px solid #eee;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }
                .custom-input-group:focus-within {
                    border-color: #1A5799;
                    background-color: #fff;
                    box-shadow: 0 0 0 4px rgba(26, 87, 153, 0.1);
                }
                .btn-unified {
                    background-color: #1A5799;
                    color: white;
                    border-radius: 12px;
                    border: none;
                    transition: all 0.3s ease;
                }
                .btn-unified:hover {
                    background-color: #092F64;
                    transform: translateY(-1px);
                    box-shadow: 0 5px 15px rgba(26, 87, 153, 0.3);
                    color: white;
                }
                .hover-link:hover {
                    text-decoration: underline !important;
                }
            `}</style>
        </div>
    );
};