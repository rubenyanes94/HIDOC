import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Swal from "sweetalert2";

export const DoctorCard = ({ doctor }) => {
    if (!doctor) return null;

    const navigate = useNavigate();
    const { store } = useGlobalReducer();
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAvailability = async () => {
            if (!doctor.id) return;
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/api/doctor/${doctor.id}/availability`);
                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) setSlots(data.slice(0, 3));
                }
            } catch (error) {
                console.error("Error fetching availability:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAvailability();
    }, [doctor.id]);

    const handleBooking = async (slot) => {
        const result = await Swal.fire({
            title: 'Confirm Appointment?',
            html: `Do you want to schedule with <b>Dr. ${doctor.name}</b> <br/> on <span class="text-primary">${slot.day} at ${slot.hour}</span>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#1A5799',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, book it!',
            cancelButtonText: 'Cancel',
            borderRadius: '16px'
        });

        if (result.isConfirmed) {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${backendUrl}/api/appointments`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        doctor_id: doctor.id,
                        patient_id: store.user?.id, 
                        hour: slot.hour,
                        day: slot.day
                    })
                });

                if (response.ok) {
                    Swal.fire({
                        title: 'Booked!',
                        text: 'Your appointment has been successfully registered.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false,
                        borderRadius: '16px'
                    });
                } else {
                    throw new Error("Booking failed");
                }
            } catch (error) {
                Swal.fire('Error', 'Could not process the appointment. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="card border-0 shadow-sm h-100 card-doctor-senior" 
             style={{ borderRadius: "20px", transition: "all 0.3s ease", overflow: "hidden" }}>
            
            <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex align-items-center mb-4">
                    <div className="position-relative">
                        <img
                            src={doctor.picture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                            className="rounded-circle border border-3 border-light shadow-sm"
                            style={{ width: "65px", height: "65px", objectFit: "cover" }}
                            alt="doctor"
                        />
                        <span className="position-absolute bottom-0 end-0 bg-success border border-white border-2 rounded-circle" 
                              style={{ width: "14px", height: "14px" }}></span>
                    </div>
                    <div className="ms-3 overflow-hidden">
                        <h6 className="mb-0 fw-bold text-dark text-truncate" style={{ fontSize: "1.1rem" }}>
                            Dr. {doctor.name || "Professional"}
                        </h6>
                        <div className="badge bg-primary-subtle text-primary fw-semibold rounded-pill mt-1" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
                            {doctor.specialties || "General Medicine"}
                        </div>
                    </div>
                </div>
                <div className="mb-4 d-flex align-items-start p-2 rounded-3 bg-light-subtle border border-light">
                    <i className="fa-solid fa-location-dot text-primary mt-1 me-2" style={{ fontSize: "0.9rem" }}></i>
                    <span className="text-muted small text-truncate-2" style={{ lineHeight: "1.4" }}>
                        {doctor.address || "Location not available"}
                    </span>
                </div>
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <p className="fw-bold mb-0 small text-dark">Next slots:</p>
                        <span className="text-success small fw-bold" style={{ fontSize: "0.7rem" }}>Available Today</span>
                    </div>
                    
                    <div className="d-flex gap-2 mb-4">
                        {loading ? (
                            <div className="py-2"><div className="spinner-border spinner-border-sm text-primary opacity-50"></div></div>
                        ) : slots.length > 0 ? (
                            slots.map((slot, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleBooking(slot)}
                                    className="btn btn-slot-senior flex-grow-1 fw-bold"
                                    style={{ fontSize: "0.75rem", borderRadius: "12px", padding: "10px 5px" }}
                                >
                                    {slot.hour}
                                </button>
                            ))
                        ) : (
                            <span className="text-muted small fst-italic py-2">No slots available</span>
                        )}
                    </div>
                    <button
                        className="btn btn-primary w-100 fw-bold py-2 shadow-sm btn-view-profile"
                        style={{ backgroundColor: "#1A5799", color: "#FFFFFF", borderRadius: "12px", border: "none" }}
                        onClick={() => navigate(`/doctorpage/${doctor.id}`)}
                    >
                        View Full Profile
                    </button>
                </div>
            </div>
            <style>{`
                .card-doctor-senior:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(26, 87, 153, 0.12) !important;
                }
                .btn-slot-senior {
                    background-color: #F0F7FF;
                    color: #1A5799;
                    border: 1px solid #D1E9FF;
                    transition: all 0.2s ease;
                }
                .btn-slot-senior:hover {
                    background-color: #1A5799;
                    color: white;
                    transform: scale(1.05);
                }
                .btn-view-profile {
                    transition: filter 0.2s;
                }
                .btn-view-profile:hover {
                    filter: brightness(1.2);
                }
                .text-truncate-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};