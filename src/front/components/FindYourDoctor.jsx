import { Link } from "react-router-dom";

export const FindYourDoctor = () => {
    return (
        <div className="container my-5 px-3 px-md-0">
            <div 
                className="row align-items-center rounded-5 py-5 px-4 p-md-5 shadow-lg border-0 position-relative overflow-hidden mx-1" 
                style={{ 
                    background: "linear-gradient(135deg, #1A5799 0%, #092F64 100%)",
                    minHeight: "350px"
                }}
            >
                <div className="position-absolute d-none d-md-block" style={{ top: "-50px", right: "-50px", width: "200px", height: "200px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}></div>
                <div className="col-12 col-md-7 text-center text-md-start text-white order-2 order-md-1 mt-4 mt-md-0">
                    <span className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(5px)", fontSize: "0.75rem" }}>
                        <i className="fa-solid fa-wand-magic-sparkles me-2"></i>AI MEDICAL ASSISTANT
                    </span>
                    <h2 className="fw-bold mb-3 display-6 display-md-5" style={{ lineHeight: "1.2" }}>
                        Unsure which doctor <br className="d-none d-lg-block" /> 
                        to choose?
                    </h2>
                    <p className="fs-6 fs-md-5 opacity-75 mb-4 fw-light mx-auto mx-md-0" style={{ maxWidth: "450px" }}>
                        Answer a few questions and our smart system will suggest the right specialist for you.
                    </p>
                    <div className="d-flex justify-content-center justify-content-md-start">
                        <Link to="/symptom-checker" className="text-decoration-none w-100 w-md-auto">
                            <button 
                                id="FindYourDoctor-button" 
                                type="button" 
                                className="btn btn-light btn-lg px-md-5 py-3 shadow-sm hover-up w-100" 
                                style={{ 
                                    color: "#7dabdb", 
                                    borderRadius: "16px", 
                                    fontWeight: "700",
                                    fontSize: "1.05rem",
                                    border: "none"
                                }}
                            >
                                <i className="fa-solid fa-comment-medical me-2"></i> Start Assessment
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-md-5 d-flex justify-content-center order-1 order-md-2">
                    <div className="position-relative animate-float-slow">
                        <img 
                            src="https://static.vecteezy.com/system/resources/previews/047/248/667/non_2x/medical-3d-medical-icon-3d-medical-symbol-3d-medical-image-free-png.png"
                            alt="Medical AI icon"
                            style={{ 
                                width: "100%",
                                maxWidth: "220px",
                                height: "auto", 
                                filter: "drop-shadow(0px 15px 30px rgba(0,0,0,0.3))" 
                            }}
                            className="img-fluid"
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .animate-float-slow {
                    animation: float-slow 5s ease-in-out infinite;
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                .hover-up {
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .hover-up:hover {
                    transform: translateY(-4px);
                    background-color: #ffffff !important;
                    box-shadow: 0 12px 20px rgba(0,0,0,0.2) !important;
                }
                /* Ajuste específico para que en móviles muy pequeños la imagen no sea gigante */
                @media (max-width: 576px) {
                    .display-6 { font-size: 1.75rem; }
                    img { max-width: 160px !important; }
                }
            `}</style>
        </div>
    );
};