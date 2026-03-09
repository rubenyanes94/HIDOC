import Swal from "sweetalert2";
import { useState } from "react";

export const DoctorProfileCard = ({ doctor }) => {
    const [syncing, setSyncing] = useState(false);
    const backendUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, '');
    
    if (!doctor) return null;

    const handleUpdateSchedule = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Availability Schedule',
            html: `
                <div class="text-start p-2">
                    <p class="small text-muted mb-4 text-center">Set your professional working hours.</p>
                    <div class="mb-3">
                        <label class="form-label fw-bold small text-uppercase">Working days</label>
                        <input id="swal-days" class="form-control rounded-3" placeholder="e.g. Monday Tuesday Friday" value="Monday Tuesday Wednesday Thursday Friday">
                    </div>
                    <div class="row g-2">
                        <div class="col-6">
                            <label class="form-label fw-bold small text-uppercase">Start Time</label>
                            <input id="swal-start" type="time" class="form-control rounded-3" value="08:00">
                        </div>
                        <div class="col-6">
                            <label class="form-label fw-bold small text-uppercase">End Time</label>
                            <input id="swal-end" type="time" class="form-control rounded-3" value="18:00">
                        </div>
                    </div>
                </div>`,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save & Sync',
            confirmButtonColor: '#1A5799',
            cancelButtonText: 'Cancel',
            borderRadius: '16px',
            preConfirm: () => {
                const days = document.getElementById('swal-days').value;
                const start = document.getElementById('swal-start').value;
                const end = document.getElementById('swal-end').value;
                if (!days || !start || !end) {
                    Swal.showValidationMessage('Please fill in all fields');
                }
                return { days, start, end };
            }
        });

        if (formValues) {
            setSyncing(true);
            try {
                const response = await fetch(`${backendUrl}/api/doctor/${doctor.id}/edit-availability`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formValues)
                });
                if (response.ok) {
                    Swal.fire({ title: "Success!", text: "Schedule synchronized successfully.", icon: "success", confirmButtonColor: "#1A5799" });
                } else {
                    const data = await response.json();
                    Swal.fire("Error", data.msg || "Sync failed", "error");
                }
            } catch (error) {
                Swal.fire("Error", "Server connection failed", "error");
            } finally {
                setSyncing(false);
            }
        }
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white doctor-profile-card">
            <div className="p-4 text-center">
                <div className="position-relative d-inline-block mb-3">
                    <img src={doctor.picture} alt="Doctor" className="rounded-circle shadow-sm border border-3 border-white" style={{ width: "110px", height: "110px", objectFit: "cover" }} />
                    <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{ width: "18px", height: "18px" }}></span>
                </div>
                <h5 className="fw-bold mb-1">Dr. {doctor.name}</h5>
                <p className="text-primary small fw-semibold mb-4">{doctor.specialties}</p>

                <div className="d-flex flex-column gap-2">
                    <button onClick={handleUpdateSchedule} className="btn btn-primary py-2 rounded-3 shadow-sm" disabled={syncing}>
                        <i className={`fa-solid ${syncing ? 'fa-spinner fa-spin' : 'fa-calendar-day'} me-2`}></i>
                        {syncing ? "Processing..." : "Manage Schedule"}
                    </button>
                </div>
            </div>
        </div>
    );
};