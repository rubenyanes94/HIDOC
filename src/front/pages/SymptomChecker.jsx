import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import Swal from 'sweetalert2';

export const SymptomChecker = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const resultsRef = useRef(null);

    // Estados
    const [suggestedDoctors, setSuggestedDoctors] = useState(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Base de datos de síntomas y especialidades
    const symptomDatabase = {
        "Headache": { specialists: ["Neurologist", "General Practitioner"], urgency: "medium", icon: "fa-head-side-virus" },
        "Dizziness": { specialists: ["Neurologist", "General Practitioner"], urgency: "medium", icon: "fa-spinner" },
        "ChestPain": { specialists: ["Cardiologist", "Emergency Medicine"], urgency: "high", icon: "fa-heart-pulse" },
        "Rash": { specialists: ["Dermatologist", "Allergist"], urgency: "low", icon: "fa-hand-dots" },
        "JointPain": { specialists: ["Rheumatologist", "Orthopedist"], urgency: "medium", icon: "fa-bone" },
        "Cough": { specialists: ["Pulmonologist", "General Practitioner"], urgency: "medium", icon: "fa-lungs" },
        "AbdominalPain": { specialists: ["Gastroenterologist", "General Practitioner"], urgency: "medium", icon: "fa-stomach" },
        "Nausea": { specialists: ["Gastroenterologist", "General Practitioner"], urgency: "medium", icon: "fa-face-frown-slight" },
        "BlurryVision": { specialists: ["Ophthalmologist", "Neurologist"], urgency: "high", icon: "fa-eye-low-vision" },
        "Anxiety": { specialists: ["Psychiatrist", "Psychologist"], urgency: "medium", icon: "fa-brain" },
        "Fatigue": { specialists: ["General Practitioner", "Endocrinologist"], urgency: "low", icon: "fa-battery-quarter" },
        "WeightLoss": { specialists: ["Endocrinologist", "Nutritionist"], urgency: "low", icon: "fa-weight-scale" },
        "BackPain": { specialists: ["Orthopaedic Surgeon", "Neurologist"], urgency: "low", icon: "fa-child" },
        "Otalgia": { specialists: ["Otolaryngologist", "General Practitioner"], urgency: "low", icon: "fa-ear-listen" },
        "Pruritus": { specialists: ["Dermatologist", "Allergist"], urgency: "low", icon: "fa-hand-sparkles" },
        "Trauma": { specialists: ["Orthopedic Surgeon", "Neurosurgeon"], urgency: "low", icon: "fa-user-injured" },
    };

    const symptomsList = Object.keys(symptomDatabase).map(key => ({
        label: key.replace(/([A-Z])/g, ' $1').trim(),
        value: key,
        icon: symptomDatabase[key].icon
    }));

    // Verificación de Token
    useEffect(() => {
        const verifyToken = (token) => {
            if (!token) return false;
            try {
                const decoded = jwtDecode(token);
                return decoded.exp > Date.now() / 1000;
            } catch (error) { return false; }
        };
        if (!verifyToken(token)) navigate("/api/pacient/signup");
    }, [token, navigate]);

    // Manejo de Selección (Máximo 3)
    const toggleSymptom = (value) => {
        if (selectedSymptoms.includes(value)) {
            setSelectedSymptoms(selectedSymptoms.filter(s => s !== value));
        } else {
            if (selectedSymptoms.length >= 3) {
                Swal.fire({
                    title: "Limit reached",
                    text: "You can select up to 3 symptoms for this analysis.",
                    icon: "info",
                    confirmButtonColor: "#1A5799"
                });
                return;
            }
            setSelectedSymptoms([...selectedSymptoms, value]);
        }
    };

    // Buscador
    const filteredSymptoms = symptomsList.filter(s => 
        s.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Procesar Diagnóstico
    const handleSearch = () => {
        if (selectedSymptoms.length === 0) {
            Swal.fire({ icon: "error", title: "Selection required", text: "Please choose at least one symptom.", confirmButtonColor: "#1A5799" });
            return;
        }
        setIsLoading(true);
        setTimeout(() => {
            const mainSymptom = selectedSymptoms[0];
            const data = symptomDatabase[mainSymptom];
            setSuggestedDoctors({
                doctor: data.specialists[0],
                alternatives: data.specialists.slice(1),
                urgency: data.urgency
            });
            setIsLoading(false);
        }, 1000);
    };

    // Redirección corregida a /find-doctors
    const goToDoctorList = (specialty) => {
        navigate(`/find-doctors?specialty=${encodeURIComponent(specialty)}`);
    };

    // Auto-scroll al resultado
    useEffect(() => {
        if (suggestedDoctors && resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [suggestedDoctors]);

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3 fw-bold">SMART DIAGNOSTIC</span>
                    <h1 className="display-5 fw-bold text-dark">How are you feeling today?</h1>
                    <p className="text-muted fs-5">Select up to 3 symptoms to receive an expert recommendation.</p>
                </div>

                {/* Buscador y Tags */}
                <div className="row justify-content-center mb-4">
                    <div className="col-md-8">
                        <div className="search-box shadow-sm mb-3">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                            <input 
                                type="text" 
                                className="form-control form-control-lg border-0 ps-5 shadow-none" 
                                placeholder="Search symptoms..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        
                        <div className="d-flex flex-wrap gap-2 justify-content-center mb-2">
                            {selectedSymptoms.map(val => (
                                <span key={val} className="badge bg-primary rounded-pill px-3 py-2 d-flex align-items-center animate__animated animate__fadeIn">
                                    {val.replace(/([A-Z])/g, ' $1')}
                                    <i className="fa-solid fa-xmark ms-2 cursor-pointer" onClick={() => toggleSymptom(val)}></i>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Grid de Síntomas con Scroll Interno */}
                <div className="row g-3 mb-5 justify-content-center" style={{ maxHeight: '450px', overflowY: 'auto', padding: '10px' }}>
                    {filteredSymptoms.map((s) => (
                        <div className="col-6 col-md-4 col-lg-3" key={s.value}>
                            <div 
                                onClick={() => toggleSymptom(s.value)}
                                className={`symptom-card p-4 text-center h-100 shadow-sm transition-all border-2 ${selectedSymptoms.includes(s.value) ? 'active' : ''}`}
                            >
                                <div className="icon-wrapper mb-3">
                                    <i className={`fa-solid ${s.icon} fs-2`}></i>
                                </div>
                                <h6 className="fw-bold m-0">{s.label}</h6>
                                {selectedSymptoms.includes(s.value) && (
                                    <div className="position-absolute top-0 end-0 p-2 text-white">
                                        <i className="fa-solid fa-circle-check scale-in"></i>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Botón de Análisis */}
                <div className="text-center mb-5">
                    <button className="btn btn-unified-lg px-5 py-3 shadow-lg" onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? (
                            <><span className="spinner-border spinner-border-sm me-2"></span>Processing...</>
                        ) : (
                            <><i className="fa-solid fa-wand-magic-sparkles me-2"></i>Analyze My Symptoms</>
                        )}
                    </button>
                </div>

                {/* Resultado Final */}
                {suggestedDoctors && (
                    <div ref={resultsRef} className="row justify-content-center animate__animated animate__fadeInUp pb-5">
                        <div className="col-md-8 col-lg-6">
                            <div className={`result-card border-0 shadow-lg overflow-hidden bg-white ${suggestedDoctors.urgency === 'high' ? 'border-urgent' : ''}`}>
                                <div className="p-5 text-center">
                                    <div className="doctor-avatar mb-4 shadow-sm bg-light text-primary">
                                        <i className="fa-solid fa-user-doctor display-3"></i>
                                    </div>
                                    <p className="text-uppercase small fw-bold text-muted mb-1">Recommended Specialist</p>
                                    <h2 className="text-primary fw-bold mb-4">{suggestedDoctors.doctor}</h2>
                                    
                                    <div className="d-grid gap-3">
                                        <button 
                                            onClick={() => goToDoctorList(suggestedDoctors.doctor)}
                                            className="btn btn-primary py-3 rounded-pill fw-bold shadow-sm"
                                        >
                                            View Available {suggestedDoctors.doctor}s
                                            <i className="fa-solid fa-arrow-right ms-2"></i>
                                        </button>
                                        <button 
                                            onClick={() => {setSuggestedDoctors(null); setSelectedSymptoms([])}} 
                                            className="btn btn-link text-muted text-decoration-none"
                                        >
                                            Reset analysis
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .search-box { position: relative; background: white; border-radius: 50px; border: 1px solid #dee2e6; }
                .search-icon { position: absolute; left: 20px; top: 50%; transform: translateY(-50%); color: #1A5799; }
                .symptom-card { 
                    background: white; border-radius: 20px; cursor: pointer; position: relative;
                    transition: all 0.3s ease; border-color: transparent;
                }
                .symptom-card:hover { transform: translateY(-5px); box-shadow: 0 8px 15px rgba(0,0,0,0.1) !important; }
                .symptom-card.active { background: #1A5799; color: white; border-color: #1A5799; }
                .symptom-card.active .icon-wrapper { color: white; }
                .icon-wrapper { color: #1A5799; }
                .btn-unified-lg { 
                    background: linear-gradient(135deg, #1A5799 0%, #092F64 100%); 
                    color: white; border: none; border-radius: 50px; font-weight: bold;
                    transition: all 0.3s ease;
                }
                .btn-unified-lg:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(26, 87, 153, 0.3); }
                .result-card { border-radius: 30px; }
                .border-urgent { border-top: 8px solid #dc3545; }
                .doctor-avatar { width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto; }
                .cursor-pointer { cursor: pointer; }
                .scale-in { animation: scaleIn 0.3s ease; }
                @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
            `}</style>
        </div>
    );
};