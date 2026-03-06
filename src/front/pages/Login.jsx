import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Swal from "sweetalert2";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store, dispatch } = useGlobalReducer();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/pacient/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", "pacient");

        dispatch({
          type: "login_pacient",
          payload: {
            token: data.token,
            pacient: data.pacient
          }
        });

        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "Accessing your health records...",
          timer: 1500,
          showConfirmButton: false,
          borderRadius: "16px"
        });

        navigate("/api/listappointments");
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data.msg || "Incorrect email or password",
          icon: "error",
          confirmButtonColor: "#1A5799"
        });
      }
    } catch (error) {
      console.error("Error en login:", error);
      Swal.fire("Connection Error", "The server is not responding", "error");
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
        {/* g-0 elimina el espacio bs-gutter-x para un diseño perfecto */}
        <div className="row g-0 align-items-stretch">

          {/* LADO IZQUIERDO: DISEÑO UNIFICADO (AZUL DOCTOR) */}
          <div className="col-lg-6 d-none d-lg-flex p-0 bg-unified-gradient">
            <div className="d-flex flex-column justify-content-center h-100 w-100 p-5 text-white">
              <div className="mb-4">
                <i className="fa-solid fa-notes-medical display-1 opacity-25"></i>
              </div>
              <h2 className="fw-bold display-5 mb-3">Your Health, <br />Simplified.</h2>
              <p className="lead opacity-75 mb-5">
                Manage your appointments, check your medical history and connect with specialists instantly.
              </p>

              <div className="mt-auto p-4 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <p className="small m-0">
                  <i className="fa-solid fa-shield-halved me-2 text-info"></i>
                  All your data is encrypted and protected under healthcare standards.
                </p>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO */}
          <div className="col-12 col-lg-6 p-4 p-md-5">
            <div className="text-center text-lg-start mb-5 pt-3 pt-lg-0">
              <h3 className="fw-bold text-dark mb-2">Patient Access</h3>
              <p className="text-muted small">Enter your credentials to manage your healthcare.</p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                <div className="input-group custom-input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fa-regular fa-envelope text-primary"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control bg-light border-0 py-2 ps-0 shadow-none"
                    placeholder="patient@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-bold text-muted">PASSWORD</label>
                <div className="input-group custom-input-group">
                  <span className="input-group-text bg-light border-0">
                    <i className="fa-solid fa-lock text-primary"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control bg-light border-0 py-2 ps-0 shadow-none"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-end mb-4 pt-1">
                <Link
                  to="/api/pacient/forgotpassword"
                  className="fw-bold text-decoration-none small hover-link"
                  style={{ color: "#1A5799" }}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn w-100 py-3 mb-4 d-flex align-items-center justify-content-center gap-2 shadow-sm btn-login-unified"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <i className="fa-solid fa-chevron-right ms-2 small"></i>
                  </>
                )}
              </button>

              <div className="text-center pb-3">
                <p className="small text-muted mb-0">Don't have an account yet?</p>
                <Link to="/api/pacient/signup" className="fw-bold text-decoration-none small hover-link" style={{ color: "#1A5799" }}>
                  Register as a New Patient
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        /* Degradado Unificado para toda la plataforma */
        .bg-unified-gradient {
          background: linear-gradient(135deg, #1A5799 0%, #092F64 100%) !important;
        }

        /* Corrección técnica de gutters (espacio blanco) */
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

        .btn-login-unified {
          background-color: #1A5799;
          color: white;
          border-radius: 14px;
          font-weight: 600;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-login-unified:hover {
          background-color: #092F64;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(9, 47, 100, 0.2) !important;
        }

        .hover-link:hover {
          text-decoration: underline !important;
          opacity: 0.8;
        }
        .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
          --bs-gutter-x: 0rem;
          --bs-gutter-y: 0;
        }
      `}</style>
    </div>
  );
};