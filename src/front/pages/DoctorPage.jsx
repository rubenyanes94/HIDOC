import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { Biography } from "./Biography"
import { DocttoCalendar } from "./DoctorCalendar"
import { DoctorMap } from "./DoctorMap"
import { DoctorStickyProfile } from "./DocttoStickProfile"

export const DoctorPage = () => {
    const { doctorId } = useParams()
    const [doctor, setDoctor] = useState({})
    const [activeTab, setActiveTab] = useState("highlights")
    const [showSticky, setShowSticky] = useState(false)

    // Refs para scroll
    const aboutRef = useRef(null)
    const locationRef = useRef(null)
    const highLightsRef = useRef(null)
    const insurancesRef = useRef(null)
    const faqsRef = useRef(null)
    const topProfileRef = useRef(null)
    const calendarRef = useRef(null)

    const getDoctor = async () => {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/${doctorId}`)
        const data = await response.json()
        setDoctor(data.data)
    }

    useEffect(() => {
        if (doctorId) getDoctor()
    }, [doctorId])

    const handleTabClick = (tabName, scrollRef) => {
        setActiveTab(tabName)
        const offset = 100; // Ajuste para que el header no tape el título
        const elementPosition = scrollRef.current?.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }

    useEffect(() => {
        const handleScroll = () => {
            if (!calendarRef.current) return
            const calendarBottom = calendarRef.current.getBoundingClientRect().bottom
            setShowSticky(calendarBottom < 0)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="doctor-page-wrapper bg-white">
            {showSticky && (
                <DoctorStickyProfile
                    doctor={doctor}
                    onClick={() => topProfileRef.current?.scrollIntoView({ behavior: "smooth" })}
                />
            )}

            {/* HEADER DEL PERFIL */}
            <div ref={topProfileRef} className="profile-header-bg py-4 py-md-5" style={{ background: "linear-gradient(180deg, #e9f5ff 0%, #ffffff 100%)" }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-auto text-center text-md-start mb-3 mb-md-0">
                            <img
                                src={doctor.picture}
                                alt={doctor.name}
                                className="shadow-sm doctor-main-img"
                                style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover", border: "5px solid white" }}
                            />
                        </div>
                        <div className="col-12 col-md text-center text-md-start">
                            <h1 className="fw-bold h2 mb-1">Dr. {doctor.name}</h1>
                            <p className="fs-5 fw-medium mb-2" style={{ color: "#468BE6" }}>{doctor.specialties}</p>
                            <p className="text-muted mb-0"><i className="fa-solid fa-location-dot me-2"></i>{doctor.address}</p>
                        </div>
                    </div>

                    {/* TABS NAVEGACIÓN - Scrollable en móvil */}
                    <div className="tabs-container-scrollable mt-4 border-bottom">
                        <div className="d-flex gap-4 no-scrollbar" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                            {[
                                { id: "highlights", label: "Highlights", ref: highLightsRef },
                                { id: "about", label: "About", ref: aboutRef },
                                { id: "insurances", label: "Insurances", ref: insurancesRef },
                                { id: "location", label: "Location", ref: locationRef },
                                { id: "faqs", label: "FAQs", ref: faqsRef }
                            ].map((tab) => (
                                <span
                                    key={tab.id}
                                    className={`pb-2 fw-bold tab-item ${activeTab === tab.id ? "active-tab text-primary" : "text-muted"}`}
                                    onClick={() => handleTabClick(tab.id, tab.ref)}
                                    style={{ cursor: "pointer", fontSize: "0.95rem" }}
                                >
                                    {tab.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="container mt-4">
                <div className="row g-5">
                    {/* COLUMNA IZQUIERDA: Información */}
                    <div className="col-12 col-lg-7">
                        <section ref={highLightsRef} className="mb-5">
                            <h3 className="fw-bold h5 mb-3">Trusted Care You Can Count On</h3>
                            <p className="text-secondary leading-relaxed">
                                Dr. {doctor.name} is a licensed, board-certified {doctor.specialties} with years of dedicated experience...
                            </p>
                            
                            <div className="insurance-preview-card p-3 rounded-4 border bg-light d-flex align-items-center mt-4">
                                <div className="icon-shield me-3 text-primary fs-2">
                                    <i className="fa-solid fa-shield-heart"></i>
                                </div>
                                <div>
                                    <p className="fw-bold mb-0">In-network insurances</p>
                                    <p className="small text-muted mb-0">Aetna, AmeriHealth, UnitedHealthOne and 10+ more</p>
                                </div>
                            </div>
                        </section>

                        <hr />

                        <section ref={aboutRef} className="py-4">
                            <h4 className="fw-bold h5 mb-4">About Dr. {doctor.name}</h4>
                            <div className="mb-4">
                                <h6 className="fw-bold text-dark mb-3">Clientele seen</h6>
                                <div className="d-flex flex-wrap gap-2">
                                    {doctor.specialties === "Pediatrics" ? 
                                        ["Newborns", "Infants", "Children", "Adolescents"].map(t => <span key={t} className="badge bg-white text-dark border fw-normal p-2 px-3 rounded-pill">{t}</span>) :
                                        ["Young adults", "Adults", "Seniors"].map(t => <span key={t} className="badge bg-white text-dark border fw-normal p-2 px-3 rounded-pill">{t}</span>)
                                    }
                                </div>
                            </div>
                            <h6 className="fw-bold mb-2">Languages</h6>
                            <p className="text-secondary">English, Spanish</p>
                            
                            <div className="mt-4">
                                <h6 className="fw-bold mb-2">Biography</h6>
                                <Biography text={doctor.biography} />
                            </div>
                        </section>

                        <section ref={insurancesRef} className="py-4">
                            <h5 className="fw-bold">Insurances</h5>
                            <div className="row g-3 mt-2">
                                {/* Logos con layout responsivo */}
                                {["Aetna", "Ambether", "AmeriHealth", "Medicare"].map(ins => (
                                    <div key={ins} className="col-6 col-sm-3 text-center border rounded p-2 d-flex align-items-center justify-content-center" style={{height: "80px"}}>
                                        <span className="small fw-bold">{ins}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-outline-primary w-100 mt-4 rounded-pill" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                View all 150+ plans
                            </button>
                        </section>

                        <section ref={locationRef} className="py-5">
                            <h5 className="fw-bold mb-4">Office Location</h5>
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-md-4 p-4 bg-primary text-white">
                                        <h6 className="fw-bold">Direction</h6>
                                        <p className="small opacity-90">{doctor.address}</p>
                                        <hr className="bg-white" />
                                        <h6 className="fw-bold">Business hours</h6>
                                        <p className="small mb-0">Mon - Fri: 9:00 AM - 5:00 PM</p>
                                    </div>
                                    <div className="col-md-8" style={{ minHeight: "300px" }}>
                                        <DoctorMap doctor={doctor} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* COLUMNA DERECHA: Calendario (Sticky en desktop) */}
                    <div className="col-12 col-lg-5">
                        <div className="sticky-md-top" style={{ top: "100px", zIndex: 10 }}>
                            <div ref={calendarRef} className="card border-0 shadow-lg rounded-4 p-4">
                                <h3 className="h5 fw-bold mb-1">Available Service Days</h3>
                                <p className="text-muted small mb-4">Book through HiDoc for instant confirmation</p>
                                <div className="d-flex justify-content-center bg-light rounded-4 p-2">
                                    <DocttoCalendar doctorId={doctor.id} />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="small text-muted"><i className="fa-solid fa-circle-info me-2"></i>Secure, fast, and free booking.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ SECTION (Full width) */}
            <div className="bg-light py-5 mt-5">
                <div className="container">
                    <div ref={faqsRef} className="max-w-800 mx-auto" style={{maxWidth: "800px"}}>
                        <h5 className="fw-bold mb-4">Frequently Asked Questions</h5>
                        <div className="accordion" id="faqAccordion">
                            <div className="mb-4 border-bottom pb-3">
                                <p className="fw-bold mb-2">How soon can I make an appointment with Dr. {doctor.name}?</p>
                                <p className="text-secondary small">Generally available within 1 week. You can see the earliest availability and <span className="text-primary text-decoration-underline cursor-pointer" onClick={() => calendarRef.current?.scrollIntoView({ behavior: "smooth" })}>book online</span>.</p>
                            </div>
                            <div className="mb-4 border-bottom pb-3">
                                <p className="fw-bold mb-2">Is Dr. {doctor.name} accepting new patients?</p>
                                <p className="text-secondary small">Yes, new patients can book consultations via HiDoc directly.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .tab-item { transition: all 0.3s ease; position: relative; }
                .active-tab { border-bottom: 3px solid #0d6efd; }
                .doctor-main-img { transition: transform 0.3s ease; }
                .doctor-main-img:hover { transform: scale(1.05); }
                .cursor-pointer { cursor: pointer; }
                @media (max-width: 768px) {
                    .doctor-page-wrapper { padding-bottom: 80px; }
                }
            `}</style>
        </div>
    )
}