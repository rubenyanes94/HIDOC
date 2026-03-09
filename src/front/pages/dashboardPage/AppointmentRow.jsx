export const AppointmentRow = ({ apt, onUpdateStatus }) => {
    const status = apt.status?.toLowerCase();
    
    // Función segura para formatear la fecha independientemente de cómo venga del backend
    const formatDateTime = (dateString) => {
        if (!dateString) return { date: "N/A", time: "N/A" };
        try {
            // Reemplazar el espacio por "T" para que sea un ISO válido en JS si viene como "YYYY-MM-DD HH:MM"
            const isoString = dateString.replace(" ", "T");
            const dateObj = new Date(isoString);
            return {
                date: dateObj.toLocaleDateString(),
                time: dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
        } catch (e) {
            return { date: dateString, time: "" }; // Fallback
        }
    };

    const { date, time } = formatDateTime(apt.dateTime);

    return (
        <>
            {/* VISTA ESCRITORIO (Mantiene la tabla original) */}
            <tr className="d-none d-md-table-row align-middle">
                <td className="fw-medium">{date}</td>
                <td className="text-primary fw-bold">{time}</td>
                {/* Aseguramos usar la propiedad correcta que envía tu backend (pacient_name) */}
                <td className="fw-semibold">{apt.pacient_name || "Paciente no especificado"}</td>
                <td>
                    <span
                        className={`badge px-3 py-2 rounded-pill bg-${
                            status === "pending"
                                ? "warning text-dark"
                                : status === "confirmed"
                                ? "success"
                                : "danger"
                        }`}
                    >
                        {status}
                    </span>
                </td>
                <td className="text-end">
                    {status === "pending" && (
                        <div className="btn-group shadow-sm">
                            <button
                                className="btn btn-sm btn-success px-3"
                                onClick={() => onUpdateStatus(apt.id, "confirmed")}
                                title="Confirmar cita"
                            >
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button
                                className="btn btn-sm btn-danger px-3"
                                onClick={() => onUpdateStatus(apt.id, "cancelled")}
                                title="Cancelar cita"
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    )}
                </td>
            </tr>

            {/* VISTA MÓVIL (Cards) */}
            <div className="d-md-none card mb-3 shadow-sm border-0">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fw-bold mb-0 text-truncate">{apt.pacient_name || "Paciente"}</h6>
                        <span className={`badge bg-${status === "pending" ? "warning text-dark" : status === "confirmed" ? "success" : "danger"}`}>
                            {status}
                        </span>
                    </div>
                    <div className="text-muted small mb-3">
                        <i className="fa-regular fa-calendar me-2"></i>{date}
                        <i className="fa-regular fa-clock ms-3 me-2"></i>{time}
                    </div>
                    
                    {status === "pending" && (
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-success flex-grow-1"
                                onClick={() => onUpdateStatus(apt.id, "confirmed")}
                            >
                                Confirmar
                            </button>
                            <button
                                className="btn btn-outline-danger flex-grow-1"
                                onClick={() => onUpdateStatus(apt.id, "cancelled")}
                            >
                                Cancelar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};