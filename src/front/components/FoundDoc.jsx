import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { DoctorCard } from "./DoctorCard.jsx";

export const FoundDoc = () => {
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(false);

    // MODIFICACIÓN: Los 'value' deben coincidir EXACTAMENTE con tu SpecialtyType de Python
    const specialties = [
        { label: "Cardiology", value: "CARDIOLOGY" },
        { label: "Dermatology", value: "DERMATOLOGY" },
        { label: "Pediatrics", value: "PEDIATRICS" },
        { label: "General Practice", value: "GENERAL_PRACTICE" },
        { label: "Neurology", value: "NEUROLOGY" },
        { label: "Psychology", value: "PSYCHOLOGY" },
        { label: "Orthopedics", value: "ORTHOPEDICS" },
        { label: "Gastroenterology", value: "GASTROENTEROLOGY" }
    ];

    const fetchDoctors = async (specialty = null) => {
        setLoading(true);
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            
            // Usamos tu lógica original de endpoints
            const url = specialty
                ? `${backendUrl}/api/doctors?specialty=${specialty}`
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
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    return (
        <div className="container py-4 py-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
                <div className="text-center text-md-start">
                    <h3 className="fw-bold mb-0" style={{ color: "#092F64" }}>Top Rated Doctors</h3>
                    <p className="text-muted small mb-0 d-none d-md-block">Verified specialists in our network</p>
                </div>
                
                <div className="w-100" style={{ maxWidth: "300px" }}>
                    <select
                        className="form-select border-0 shadow-sm bg-white py-2 px-3"
                        style={{ borderRadius: "12px", color: "#1A5799", fontWeight: "600" }}
                        onChange={(e) => {
                            const val = e.target.value;
                            fetchDoctors(val === "All" ? null : val);
                        }}
                    >
                        <option value="All"> All Specialties</option>
                        {specialties.map(spec => (
                            <option key={spec.value} value={spec.value}>{spec.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                </div>
            ) : (
                <div className="d-flex overflow-auto pb-4 custom-scrollbar" 
                     style={{ gap: "1.25rem", scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
                    {store.doctors && store.doctors.length > 0 ? (
                        store.doctors.map((doctor, index) => (
                            <div key={doctor.id || index} style={{ scrollSnapAlign: "start", flex: "0 0 auto", width: "285px" }}>
                                <DoctorCard doctor={doctor} />
                            </div>
                        ))
                    ) : (
                        <div className="alert alert-info w-100 rounded-4 shadow-sm border-0 py-4 text-center">
                            <i className="fa-solid fa-user-md me-2"></i>
                            No doctors found for this specialty.
                        </div>
                    )}
                </div>
            )}

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #D1E9FF; border-radius: 10px; }
            `}</style>
        </div>
    );
};