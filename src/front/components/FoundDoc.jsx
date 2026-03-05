import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { DoctorCard } from "./DoctorCard.jsx";

export const FoundDoc = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(false);

    const specialties = ["Cardiology", "Dermatology", "General Practice", "Psychology", "Orthopedics", "Neurology", "Gastroenterology"];

    const fetchDoctors = async (specialty = null) => {
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const url = specialty
                ? `${backendUrl}/api/doctors?specialty=${encodeURIComponent(specialty)}`
                : `${backendUrl}/api/doctor`;

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                const payload = data.msg || data; 
                dispatch({ type: "set_doctors", payload: payload || [] });
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        } finally {
            // Un pequeño delay artificial mejora la percepción de carga (UX)
            setTimeout(() => setLoading(false), 400);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="container py-4 py-md-5">
            {/* Header: Título y Selector compacto en PC */}
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <div className="text-center text-md-start">
                    <h3 className="fw-bold mb-0" style={{ color: "#092F64" }}>Top Rated Doctors</h3>
                    <p className="text-muted small mb-0 d-none d-md-block">Book with our most trusted specialists</p>
                </div>
                
                {/* Selector: w-100 en móvil, limitado a 300px en PC */}
                <div className="w-100" style={{ maxWidth: "300px" }}>
                    <select
                        className="form-select border-0 shadow-sm bg-white py-2 px-3"
                        style={{ 
                            borderRadius: "12px", 
                            color: "#1A5799", 
                            cursor: "pointer",
                            fontWeight: "500",
                            fontSize: "0.95rem"
                        }}
                        onChange={(e) => {
                            const val = e.target.value;
                            fetchDoctors(val === "All" ? null : val);
                        }}
                    >
                        <option value="All">✨ All Specialties</option>
                        {specialties.map(spec => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                /* Estado de carga: Skeletons elegantes */
                <div className="d-flex gap-3 overflow-hidden pb-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-light rounded-4 animate-pulse" 
                             style={{ minWidth: "280px", height: "350px", border: "1px solid #eee" }}></div>
                    ))}
                </div>
            ) : (
                /* Contenedor de Scroll Horizontal con Snap */
                <div 
                    className="d-flex overflow-auto pb-4 px-1 custom-scrollbar" 
                    style={{ 
                        gap: "1.25rem", 
                        scrollSnapType: "x mandatory",
                        WebkitOverflowScrolling: "touch" 
                    }}
                >
                    {store.doctors && store.doctors.length > 0 ? (
                        store.doctors.map((doctor, index) => (
                            <div 
                                key={doctor.id || index} 
                                className="animate__animated animate__fadeIn"
                                style={{ 
                                    scrollSnapAlign: "start",
                                    flex: "0 0 auto", 
                                    width: "285px",
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <DoctorCard doctor={doctor} />
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-info w-100 rounded-4 border-0 shadow-sm py-4 text-center">
                            <i className="fa-solid fa-circle-info me-2"></i>
                            No doctors found for this specialty yet.
                        </div>
                    )}
                </div>
            )}

            {/* Estilos locales para el componente */}
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #d1e9ff;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #1a5799;
                }
                .animate-pulse {
                    animation: pulse 1.8s infinite ease-in-out;
                }
                @keyframes pulse {
                    0% { background-color: #f8f9fa; }
                    50% { background-color: #e9ecef; }
                    100% { background-color: #f8f9fa; }
                }
            `}</style>
        </div>
    );
};