import { AppointmentRow } from "./AppointmentRow"

export const AppointmentsTable = ({ appointments, onUpdateStatus }) => {
    return (
        <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Appointments</h5>
                
                {/* Tabla clásica para pantallas grandes */}
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Date</th>
                                <th>Hour</th>
                                <th>Patient</th>
                                <th>Status</th>
                                <th className="text-end">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments && appointments.length > 0 ? (
                                appointments.map(apt => (
                                    <AppointmentRow 
                                        key={apt.id} 
                                        apt={apt}
                                        onUpdateStatus={onUpdateStatus}
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-4 text-muted">
                                        No appointments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Contenedor para tarjetas en móviles */}
                <div className="d-md-none">
                     {appointments && appointments.length > 0 ? (
                        appointments.map(apt => (
                            <AppointmentRow 
                                key={apt.id} 
                                apt={apt}
                                onUpdateStatus={onUpdateStatus}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4 text-muted border rounded">
                            No appointments found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}