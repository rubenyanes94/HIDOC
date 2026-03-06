import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { jwtDecode } from "jwt-decode";
import SweetAlert from "sweetalert2";

export const LoginDoctor = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { store, dispatch } = useGlobalReducer();

  const handleLoginDoctor = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("doctor", JSON.stringify(data.doctor));
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", "doctor");

        const decoded = jwtDecode(data.token);
        const doctorFromToken = {
          email: decoded.sub,
          id: decoded.user_id || decoded.id || null,
          name: decoded.name || decoded.sub || "Doctor"
        };

        dispatch({
          type: "login_doctor",
          payload: { doctor: data.doctor || doctorFromToken, token: data.token }
        });

        SweetAlert.fire({
          icon: "success",
          title: "Welcome back!",
          text: "Dr. " + (data.doctor?.name || ""),
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/doctor/dashboard");
      } else {
        SweetAlert.fire({
          title: "Access Denied",
          text: data.msg || "Invalid email or password",
          icon: "error",
          confirmButtonColor: "#1A5799"
        });
      }
    } catch (error) {
      SweetAlert.fire("Error", "Could not connect to the server", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (store.token && store.doctor) {
      navigate("/doctor/dashboard", { replace: true });
    }
  }, [store.token, store.doctor]);

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px" }}
    >
      <div
        className="container shadow-lg overflow-hidden bg-white mx-3"
        style={{ borderRadius: "28px", maxWidth: "1050px", border: "none" }}
      >
        {/* g-0 elimina el espacio bs-gutter-x que detectaste */}
        <div className="row g-0 align-items-stretch">

          {/* LADO IZQUIERDO: FONDO TOTAL (SOLUCIÓN AL ESPACIO BLANCO) */}
          <div
            className="col-lg-6 d-none d-lg-flex p-0"
            style={{
              background: "linear-gradient(135deg, #1A5799 0%, #092F64 100%)",
              position: "relative"
            }}
          >
            {/* Contenido con padding interno independiente del fondo */}
            <div className="p-5 d-flex flex-column justify-content-center w-100 text-white">
              <div className="mb-4 animate__animated animate__fadeInLeft">
                <i className="fa-solid fa-user-md display-2 opacity-50"></i>
              </div>
              <h2 className="fw-bold display-5 mb-3">HiDoc for Professionals</h2>
              <p className="lead opacity-75 mb-5">Your medical agenda, patient records and digital prescriptions in one single, secure platform.</p>

              <div className="mt-auto pt-5">
                <div className="p-3 rounded-4" style={{ backgroundColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(4px)" }}>
                  <p className="small m-0"><i className="fa-solid fa-shield-halved me-2 text-info"></i> HIPAA Compliant & Secure Data Encryption</p>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DERECHO: FORMULARIO */}
          <div className="col-12 col-lg-6 p-4 p-md-5 bg-white">
            <div className="mb-5 text-center text-lg-start">
              <h3 className="fw-bold text-dark mb-2">Doctor Login</h3>
              <p className="text-muted">Enter your verified credentials to manage your clinic.</p>
            </div>

            <form onSubmit={handleLoginDoctor}>
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">WORK EMAIL</label>
                <div className="input-group custom-input-group">
                  <span className="input-group-text bg-light border-0"><i className="fa-regular fa-envelope text-primary"></i></span>
                  <input
                    type="email"
                    className="form-control bg-light border-0 py-3 shadow-none"
                    placeholder="doctor@medical.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary">PASSWORD</label>
                <div className="input-group custom-input-group">
                  <span className="input-group-text bg-light border-0"><i className="fa-solid fa-lock text-primary"></i></span>
                  <input
                    type="password"
                    className="form-control bg-light border-0 py-3 shadow-none"
                    placeholder="••••••••"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-5">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label small text-muted" htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/api/doctor/forgotpassword" style={{ fontSize: "0.85rem", color: "#1A5799", textDecoration: "none" }} className="fw-bold hover-underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn w-100 py-3 mb-4 d-flex align-items-center justify-content-center gap-2 shadow btn-doctor-submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                ) : (
                  <>
                    <span className="fs-5">Access Profile</span>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  </>
                )}
              </button>

              <div className="text-center pb-3">
                <p className="small text-muted mb-0">Don't have a professional account yet?</p>
                <Link to="/api/doctor/register" className="text-primary fw-bold text-decoration-none small hover-link">
                  Create Professional Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .row.g-0 {
            margin-right: 0;
            margin-left: 0;
        }
        .row.g-0 > [class*='col-'] {
            padding-right: 0;
            padding-left: 0;
        }

        .custom-input-group {
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid transparent;
            transition: all 0.3s ease;
        }
        .custom-input-group:focus-within {
            border-color: #1A5799;
            box-shadow: 0 0 0 4px rgba(26, 87, 153, 0.1);
        }

        .btn-doctor-submit {
            background-color: #1A5799;
            color: white;
            border: none;
            border-radius: 14px;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .btn-doctor-submit:hover {
            background-color: #93BFEF;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(9, 47, 100, 0.25) !important;
        }
        .btn-doctor-submit:active {
            transform: translateY(0);
        }
        .hover-underline:hover {
            text-decoration: underline !important;
        }
        .container, .container-fluid, .container-lg, .container-md, .container-sm, .container-xl, .container-xxl {
         --bs-gutter-x: 0;
        }
      `}</style>
    </div>
  );
};