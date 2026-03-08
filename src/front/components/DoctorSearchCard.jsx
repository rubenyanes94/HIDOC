import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCalApi } from "@calcom/embed-react";
import "./DoctorSearchCard.css";

export const DoctorSearchCard = ({ doctor }) => {
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal("ui", {
                theme: "light",
                styles: { branding: { brandColor: "#092F64" } },
                hideEventTypeDetails: true,
                layout: "month_view"
            });
        })();
    }, []);
    
    const getLocationString = (loc) => {
        if (!loc) return "Location not available";
        return typeof loc === 'object' ? "Caracas, Venezuela" : loc;
    };

    const specialty = doctor.specialties || "Specialist";

    return (
        <div className="card doctor-card mb-4 shadow-sm border-0 overflow-hidden">
            <div className="row g-0 align-items-center h-100">
                {/* Lado Izquierdo: Info del Doctor */}
                <div className="col-12 col-md-8 p-3 p-md-4 d-flex align-items-center flex-column flex-md-row">
                    <div className="doctor-img-container mb-3 mb-md-0 me-md-5">
                        <img
                            src={doctor.picture || "https://via.placeholder.com/150"}
                            className="doctor-img"
                            alt={`Dr. ${doctor.name}`}
                        />
                    </div>
                    <div className="flex-grow-1 overflow-hidden text-center text-md-start">
                        <h4 className="doc-name text-truncate">
                            Dr. {doctor.name}
                        </h4>
                        
                        <div className="mb-1">
                            <span className="doc-specialty">
                                {specialty}
                            </span>
                        </div>
                        
                        <div className="doc-stats mb-2">
                            <i className="fa-solid fa-star text-warning"></i>
                            <span className="fw-bold text-dark"> 4.9</span> 
                            <span className="text-muted small ms-1">(120 reviews)</span>
                        </div>
                        
                        <p className="doc-location mb-0 text-truncate">
                            <i className="fa-solid fa-location-dot me-2 text-danger opacity-75"></i>
                            {getLocationString(doctor.location)}
                        </p>
                    </div>
                </div>

                {/* Lado Derecho: Botones de Acción */}
                <div className="col-12 col-md-4 border-start-custom d-flex align-items-stretch bg-light bg-opacity-25">
                    <div className="p-3 p-md-4 d-flex flex-column justify-content-center w-100">
                        <button
                            data-cal-link={doctor.cal_link}
                            className="btn-book-appointment mb-2"
                        >
                            <i className="fa-regular fa-calendar-check me-2"></i>
                            Book Appointment
                        </button>
                        <button
                            className="btn btn-sm btn-view-profile w-100"
                            onClick={() => navigate(`/doctorpage/${doctor.id}`)}
                        >
                            View Full Profile
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                /* Ajustes de responsividad sin cambiar estructura */
                .border-start-custom {
                    border-left: 1px solid #dee2e6;
                }

                @media (max-width: 767px) {
                    .border-start-custom {
                        border-left: none;
                        border-top: 1px solid #dee2e6;
                    }
                    .doctor-img-container {
                        margin-right: 0 !important;
                    }
                    .doctor-img {
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                    }
                    .btn-book-appointment {
                        padding: 12px; /* Más fácil de presionar en móvil */
                    }
                }
            `}</style>
        </div>
    );
};