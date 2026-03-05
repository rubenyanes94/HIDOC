import { useNavigate } from "react-router-dom";

export const MostSearchedSpecialists = () => {
    const navigate = useNavigate();

    const specialities = [
        { name: "Cardiology", icon: "https://cdn3d.iconscout.com/3d/premium/thumb/heart-health-3d-icon-png-download-7343436.png", param: "CARDIOLOGY" },
        { name: "Orthopedics", icon: "https://cdn3d.iconscout.com/3d/premium/thumb/broken-bone-3d-icon-png-download-6561286.png", param: "ORTHOPEDICS" },
        { name: "Dermatology", icon: "https://cdn3d.iconscout.com/3d/premium/thumb/skin-3d-icon-png-download-12223055.png", param: "DERMATOLOGY" },
        { name: "General Medicine", icon: "https://cdn3d.iconscout.com/3d/premium/thumb/medicine-bottle-3d-icon-png-download-4995342.png", param: "GENERAL_PRACTICE" },
        { name: "Psychology", icon: "https://cdn3d.iconscout.com/3d/premium/thumb/brain-operating-3d-icon-png-download-8176333.png", param: "PSYCHOLOGY" }
    ];

    return (
        <div className="py-5" style={{ backgroundColor: "#E9F5FF" }}> {/* Fondo azul claro consistente */}
            <div className="container px-4">
                <div className="text-center text-md-start mb-5">
                    <h2 className="fw-bold mb-2" style={{ color: "#092F64" }}>
                        Top-searched specialties
                    </h2>
                    <div style={{ width: "60px", height: "4px", backgroundColor: "#1A5799", borderRadius: "2px" }} className="mx-auto mx-md-0"></div>
                </div>

                {/* Contenedor con Scroll Horizontal para móviles */}
                <div className="d-flex overflow-auto pb-5 custom-dark-card-scroll" 
                     style={{ 
                        gap: "1.2rem", 
                        scrollSnapType: "x mandatory",
                        paddingTop: "10px" 
                     }}>
                    
                    {specialities.map((item, index) => (
                        <div 
                            key={index}
                            className="specialty-card-dark-pro"
                            style={{ scrollSnapAlign: "center" }}
                            onClick={() => navigate(`/find-doctors?specialty=${item.param}`)}
                        >
                            <div className="card-content">
                                <div className="icon-sphere mb-4">
                                    <img 
                                        src={item.icon}
                                        alt={item.name} 
                                        className="img-fluid specialty-img-pro" 
                                    />
                                </div>
                                <h6 className="text-white fw-bold mb-1" style={{ fontSize: "1.05rem" }}>{item.name}</h6>
                                <p className="text-info-emphasis small mb-0 opacity-75">Find experts</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .specialty-card-dark-pro {
                    min-width: 175px;
                    flex: 0 0 auto;
                    cursor: pointer;
                    background: #092F64; /* Color oscuro profundo para la card */
                    border-radius: 28px;
                    padding: 30px 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 25px rgba(9, 47, 100, 0.2);
                    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
                    position: relative;
                    text-align: center;
                    overflow: hidden;
                }

                .specialty-card-dark-pro:hover {
                    transform: translateY(-12px);
                    background: #0c3d81;
                    box-shadow: 0 20px 40px rgba(9, 47, 100, 0.3);
                    border-color: #38BDF8;
                }

                .icon-sphere {
                    background: rgba(255, 255, 255, 0.05);
                    width: 90px;
                    height: 90px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                    transition: all 0.4s ease;
                }

                .specialty-card-dark-pro:hover .icon-sphere {
                    background: rgba(56, 189, 248, 0.15);
                    transform: scale(1.1);
                }

                .specialty-img-pro {
                    height: 75px;
                    filter: drop-shadow(0 8px 12px rgba(0,0,0,0.3));
                    transition: transform 0.4s ease;
                }

                .specialty-card-dark-pro:hover .specialty-img-pro {
                    transform: scale(1.15) rotate(8deg);
                }

                .custom-dark-card-scroll::-webkit-scrollbar { height: 6px; }
                .custom-dark-card-scroll::-webkit-scrollbar-track { background: transparent; }
                .custom-dark-card-scroll::-webkit-scrollbar-thumb { 
                    background: #1A5799; 
                    border-radius: 10px; 
                }

                @media (max-width: 768px) {
                    .specialty-card-dark-pro { min-width: 155px; padding: 25px 15px; }
                    .specialty-img-pro { height: 65px; }
                    .icon-sphere { width: 80px; height: 80px; }
                }
            `}</style>
        </div>
    );
};