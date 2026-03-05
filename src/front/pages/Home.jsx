import React from "react";
import { Link } from "react-router-dom";
import { FoundDoc } from "../components/FoundDoc.jsx";
import { FindYourDoctor } from "../components/FindYourDoctor";
import { MostSearchedSpecialists } from "../components/MostSearchedSpecialists.jsx";

export const Home = () => {
    return (
        <div className="overflow-hidden">
            {/* HERO SECTION */}
            <div className="container-fluid py-5 px-4 position-relative" 
                 style={{ 
                     backgroundColor: "#E9F5FF", 
                     minHeight: "600px", 
                     display: "flex", 
                     alignItems: "center",
                     background: "linear-gradient(135deg, #E9F5FF 0%, #FFFFFF 100%)" 
                 }}>
                
                {/* Elemento Decorativo de Fondo (Senior UI touch) */}
                <div className="position-absolute d-none d-lg-block" 
                     style={{ top: "10%", right: "5%", width: "300px", height: "300px", background: "rgba(26, 87, 153, 0.03)", borderRadius: "50%", filter: "blur(50px)" }}></div>

                <div className="container position-relative">
                    <div className="row align-items-center">
                        
                        {/* COLUMNA DE CONTENIDO */}
                        <div className="col-12 col-md-7 text-center text-md-start animate__animated animate__fadeInLeft">
                            
                            {/* BADGE DE NOVEDAD (UX Senior: genera curiosidad) */}
                            <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: "rgba(26, 87, 153, 0.1)", color: "#1A5799", fontSize: "0.8rem", letterSpacing: "1px" }}>
                                <i className="fa-solid fa-star me-2"></i>#1 HEALTH PLATFORM IN LATAM
                            </span>

                            <h1 className="fw-bold display-3 mb-3" style={{ color: "#092F64", lineHeight: "1.1", letterSpacing: "-1px" }}>
                                Your Health, <br className="d-none d-md-block" />
                                <span style={{ color: "#1A5799" }}>Simplified.</span>
                            </h1>
                            
                            <p className="fs-5 text-muted mb-4 mx-auto mx-md-0" style={{ maxWidth: "520px", fontWeight: "400" }}>
                                Connect with verified specialists in minutes. Schedule appointments, manage records, and get expert care from anywhere.
                            </p>
                            
                            {/* SECCIÓN DE ACCIÓN & BADGES */}
                            <div className="d-flex flex-column gap-4">
                                <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                                    <Link to="/find-doctors" className="text-decoration-none w-100 w-md-auto">
                                        <button className="btn btn-lg px-5 py-3 shadow-lg w-100 w-md-auto hover-scale" 
                                                style={{ backgroundColor: "#1A5799", color: "#FFFFFF", borderRadius: "16px", border: "none", fontWeight: "600", transition: "all 0.3s ease" }}>
                                            <i className="fa-solid fa-calendar-check me-2"></i> Book Appointment
                                        </button>
                                    </Link>

                                    {/* SOCIAL PROOF (UX Senior: genera confianza) */}
                                    <div className="d-flex align-items-center gap-2 mt-2 mt-md-0">
                                        <div className="d-flex">
                                            {[1,2,3].map(i => (
                                                <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} 
                                                     className="rounded-circle border border-2 border-white" 
                                                     style={{ width: "35px", height: "35px", marginLeft: i === 1 ? "0" : "-10px" }} alt="user" />
                                            ))}
                                        </div>
                                        <div className="small text-muted fw-medium">
                                            <span className="text-dark fw-bold">10k+</span> Happy Patients
                                        </div>
                                    </div>
                                </div>

                                {/* BADGES PILL (Glassmorphism style) */}
                                <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
                                    <span className="badge rounded-pill bg-white text-dark px-3 py-2 shadow-sm border-0 d-flex align-items-center" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.7)" }}>
                                        <i className="fa-solid fa-user-check text-success me-2"></i> Verified Staff
                                    </span>
                                    <span className="badge rounded-pill bg-white text-dark px-3 py-2 shadow-sm border-0 d-flex align-items-center" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.7)" }}>
                                        <i className="fa-solid fa-bolt text-warning me-2"></i> Instant Booking
                                    </span>
                                    <span className="badge rounded-pill bg-white text-dark px-3 py-2 shadow-sm border-0 d-flex align-items-center" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255,255,255,0.7)" }}>
                                        <i className="fa-solid fa-shield-halved text-primary me-2"></i> SSL Secure
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* COLUMNA DE IMAGEN CON ANIMACIÓN */}
                        <div className="col-md-5 d-none d-md-flex justify-content-center position-relative">
                            {/* Card Flotante (UI Senior: da profundidad) */}
                            <div className="position-absolute bg-white p-3 rounded-4 shadow-lg d-flex align-items-center gap-3 animate-float" 
                                 style={{ bottom: "20%", left: "-10%", zIndex: 2, minWidth: "200px" }}>
                                <div className="bg-success-subtle p-2 rounded-3 text-success">
                                    <i className="fa-solid fa-clock-rotate-left"></i>
                                </div>
                                <div>
                                    <div className="fw-bold small">Quick Response</div>
                                    <div className="text-muted" style={{ fontSize: "0.7rem" }}>Under 15 minutes</div>
                                </div>
                            </div>

                            <img src="https://cdn.dribbble.com/userupload/7843601/file/original-1c817c79717d27c25a72dd4e6e0d5af6.png"
                                 alt="Doctor image" className="img-fluid animate-main-img"
                                 style={{ maxHeight: "480px", zHeight: 1, filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.1))" }} />
                        </div>

                    </div>
                </div>
            </div>

            {/* CSS NECESARIO PARA LAS ANIMACIONES (Agregarlo a tu index.css) */}
            <style>
                {`
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                .hover-scale:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 20px rgba(26, 87, 153, 0.2) !important;
                }
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                `}
            </style>

            <FoundDoc />
            <FindYourDoctor />
            <MostSearchedSpecialists />
        </div>
    );
};