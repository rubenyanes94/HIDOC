import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPw = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pacient/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        Swal.fire({
          title: "Recovery Link Sent",
          text: "If an account exists with this email, you will receive a reset link shortly.",
          icon: "success",
          confirmButtonColor: "#1A5799",
          borderRadius: "16px"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/api/pacient/login");
          }
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.msg || "User not found or invalid email",
          icon: "error",
          confirmButtonColor: "#1A5799"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Connection Error", "Please try again later", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div 
        className="container shadow-lg overflow-hidden bg-white animate__animated animate__fadeIn" 
        style={{ borderRadius: "28px", maxWidth: "1000px", border: "none" }}
      >
        <div className="row g-0 align-items-stretch">
          
          {/* LADO IZQUIERDO: DISEÑO UNIFICADO */}
          <div className="col-lg-6 d-none d-lg-flex p-0 bg-unified-gradient">
            <div className="d-flex flex-column justify-content-center h-100 w-100 p-5 text-white">
              <div className="mb-4">
                <i className="fa-solid fa-key display-1 opacity-25"></i>
              </div>
              <h2 className="fw-bold display-5 mb-3">Password <br/>Recovery.</h2>
              <p className="lead opacity-75 mb-5">
                Don't worry, it happens to the best of us. We'll help you get back into your account safely.
              </p>
              
              <div className="mt-auto p-4 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <p className="small m-0">
                  <i className="fa-solid fa-circle-info me-2 text-info"></i>
                  For security reasons, reset links expire after 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO */}
          <div className="col-12 col-lg-6 p-4 p-md-5">
            <div className="text-center text-lg-start mb-5 pt-3 pt-lg-0">
              <h3 className="fw-bold text-dark mb-2">Forgot Password</h3>
              <p className="text-muted small">Enter your email and we'll send you a recovery link.</p>
            </div>

            <form onSubmit={handleForgotPw}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">REGISTERED EMAIL</label>
                <div className="input-group custom-input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fa-regular fa-envelope text-primary"></i>
                  </span>
                  <input 
                    type="email" 
                    className="form-control bg-light border-0 py-2 ps-0 shadow-none" 
                    placeholder="name@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn w-100 py-3 mb-4 d-flex align-items-center justify-content-center gap-2 shadow-sm btn-unified" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <i className="fa-solid fa-paper-plane ms-2 small"></i>
                  </>
                )}
              </button>

              <div className="text-center pb-3 d-flex flex-column gap-2">
                <Link to="/api/pacient/login" className="fw-bold text-decoration-none small hover-link" style={{ color: "#1A5799" }}>
                   Return to Login
                </Link>
                <Link to="/" className="text-muted text-decoration-none small hover-link">
                  Back to Homepage
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .bg-unified-gradient {
          background: linear-gradient(135deg, #1A5799 0%, #092F64 100%) !important;
        }

        .row.g-0 { margin: 0; }
        .row.g-0 > [class*='col-'] { padding: 0; }

        .custom-input-group {
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 1px solid transparent;
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
          border-radius: 14px;
          font-weight: 600;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-unified:hover {
          background-color: #092F64;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(9, 47, 100, 0.2) !important;
        }

        .hover-link:hover {
          text-decoration: underline !important;
        }

        .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
          --bs-gutter-x: 0rem;
          --bs-gutter-y: 0;
        }
      `}</style>
    </div>
  );
};