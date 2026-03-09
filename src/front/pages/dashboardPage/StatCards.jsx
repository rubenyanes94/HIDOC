export const StatCards = ({ title, value, color }) => {
    const iconMap = {
        Pending: "fa-clock",
        Confirmed: "fa-check-circle",
        Cancelled: "fa-times-circle"
    };

    return (
        <div className="col-12 col-md-4">
            <div className={`card border-0 shadow-sm rounded-4 card-stat-hover mb-3 bg-white border-start border-4 border-${color}`}>
                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                    <div>
                        <p className="text-muted small fw-bold text-uppercase mb-1">{title}</p>
                        <h2 className={`fw-bold mb-0 text-${color}`}>{value}</h2>
                    </div>
                    <div className={`fs-1 opacity-25 text-${color}`}>
                        <i className={`fa-solid ${iconMap[title]}`}></i>
                    </div>
                </div>
            </div>
        </div>
    );
};