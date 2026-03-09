export const AppointmentsTable = ({ appointments, onUpdateStatus }) => {
    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-transparent bg-md-white">
            <div className="card-body p-0 p-md-4">
                <div className="d-flex justify-content-between align-items-center mb-4 px-3 px-md-0">
                    <h5 className="fw-bold mb-0">Schedule Management</h5>
                    <button className="btn btn-sm btn-outline-primary rounded-pill px-3">View History</button>
                </div>
                
                <div className="table-responsive d-none d-md-block">
                    <table className="table table-hover mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="border-0 px-4">Date</th>
                                <th className="border-0">Hour</th>
                                <th className="border-0">Patient</th>
                                <th className="border-0">Status</th>
                                <th className="border-0 text-end px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments?.map(apt => (
                                <AppointmentRow key={apt.id} apt={apt} onUpdateStatus={onUpdateStatus} />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* En móvil renderiza las cards dentro de la columna */}
                <div className="d-md-none px-3">
                    {appointments?.map(apt => (
                        <AppointmentRow key={apt.id} apt={apt} onUpdateStatus={onUpdateStatus} />
                    ))}
                </div>
            </div>
        </div>
    );
};