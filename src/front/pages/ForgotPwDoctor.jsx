import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Swal from "sweetalert2";

export const ForgotPwDoctor = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPw = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/forgotpassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          title: "Professional Recovery",
          text: "If your email is registered in our medical network, you will receive a reset link shortly.",
          icon: "success",
          confirmButtonColor: "#1A5799",
          borderRadius: "16px"
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/api/doctor/login");
          }
        });
      } else {
        Swal.fire({
          title: "Verification Failed",
          text: data.msg || "Medical credentials not found",
          icon: "error",
          confirmButtonColor: "#1A5799"
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Connection Error", "The medical server is not responding", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <div 
        className="container shadow-lg overflow-hidden bg-white" 
        style={{ borderRadius: "24px", maxWidth: "1000px", border: "none" }}
      >
        <div className="row g-0">
          
          {/* LADO IZQUIERDO: PANEL DE INFORMACIÓN */}
          <div className="col-lg-6 d-none d-lg-flex p-0 bg-unified-gradient">
            <div className="d-flex flex-column justify-content-center h-100 w-100 p-5 text-white">
              <div className="mb-4 pt-4">
                <i className="fa-solid fa-user-md display-2 opacity-50"></i>
              </div>
              <h2 className="fw-bold display-5 mb-3">Doctor Access Recovery.</h2>
              <p className="lead opacity-75 mb-5">
                Securely reset your professional credentials to continue providing excellent care to your patients.
              </p>
              
              <div className="mt-auto p-4 rounded-4 mb-4" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <p className="small m-0">
                  <i className="fa-solid fa-shield-halved me-2 text-info"></i>
                  Verified professional recovery area.
                </p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO CORREGIDO */}
          <div className="col-12 col-lg-6 bg-white">
            <div className="p-4 p-md-5 h-100 d-flex flex-column justify-content-center">
              
              <div className="mb-5">
                <h3 className="fw-bold text-dark mb-2">Password Recovery</h3>
                <p className="text-muted small">Enter your professional email to receive a secure link.</p>
              </div>

              <form onSubmit={handleForgotPw} className="w-100">
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted mb-2 text-uppercase" style={{ letterSpacing: "1px" }}>
                    Medical Email
                  </label>
                  <div className="input-group custom-input-group">
                    <span className="input-group-text bg-light border-0 px-3">
                      <i className="fa-regular fa-envelope text-primary"></i>
                    </span>
                    <input 
                      type="email" 
                      className="form-control bg-light border-0 py-3 shadow-none" 
                      placeholder="doctor@hidoc.com"
                      required
                      style={{ borderRadius: "0 12px 12px 0" }}
                      onChange={(e) => setEmail(e.target.value)} 
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
                      <span className="fw-bold text-uppercase" style={{ letterSpacing: "1px" }}>Request Reset Link</span>
                      <i className="fa-solid fa-paper-plane ms-2 small"></i>
                    </>
                  )}
                </button>

                <div className="text-center pt-2 d-flex flex-column gap-3">
                  <Link 
                    to="/api/doctor/login" 
                    className="fw-bold text-decoration-none small hover-link py-2" 
                    style={{ color: "#1A5799" }}
                  >
                     <i className="fa-solid fa-arrow-left me-2"></i>
                     Return to Doctor Portal
                  </Link>
                  <hr className="my-2 opacity-10" />
                  <Link to="/" className="text-muted text-decoration-none small hover-link">
                    Go to Main Website
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
          min-height: 500px;
        }

        /* Contenedor de input estilizado */
        .custom-input-group {
          background-color: #f8f9fa;
          border-radius: 12px;
          border: 1px solid #eee;
          transition: all 0.3s ease;
        }

        .custom-input-group:focus-within {
          border-color: #1A5799;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(26, 87, 153, 0.1);
        }

        /* Botón profesional */
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
          opacity: 0.8;
        }

        .form-control::placeholder {
          color: #adb5bd;
          font-size: 0.9rem;
        }

        .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
          --bs-gutter-x: 0rem;
          --bs-gutter-y: 0;
        }
      `}</style>
    </div>
  );
};