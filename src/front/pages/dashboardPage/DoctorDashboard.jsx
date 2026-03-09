import { useEffect } from "react"
import useGlobalReducer from "../../hooks/useGlobalReducer"
import { DashboardStats } from "./DashboardStats"
import { AppointmentsTable } from "./AppointmentsTable"
import './doctorDashboard.css'
import { DoctorProfileCard } from "./DoctorProfileCard"

export const DoctorDashboard = () => {

  const { store, dispatch } = useGlobalReducer()
  const doctor = store.doctor || JSON.parse(localStorage.getItem("doctor"))

  const updateAppointmentStatus = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/doctor/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      })

      if (!res.ok) {
        console.error("Failed update", res.status)
        return
      }

      const data = await res.json()
      const updateAppointment = data.appointment

      if (!updateAppointment) {
        console.error("No appointment returned from backend", data)
        return
      }

      dispatch({
        type: "set_appointments",
        payload: store.appointments.map(apt =>
          apt.id === updateAppointment.id ? updateAppointment : apt
        )
      })

    } catch (error) {
      console.error('Error updating appointment ', error)
    }
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctor/appointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: "set_appointments",
          payload: data.appointments,
        });
      }
    };

    fetchAppointments();
    const interval = setInterval(fetchAppointments, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
        <div className="min-vh-100 bg-light py-4 py-md-5">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12 col-lg-3">
                        <DoctorProfileCard doctor={doctor} />
                        
                        <div className="mt-4 p-4 rounded-4 bg-primary text-white d-none d-lg-block shadow-sm">
                            <h6 className="fw-bold mb-2">Pro Tip:</h6>
                            <p className="small mb-0 opacity-75">Keep your schedule updated to reduce no-shows by 40%.</p>
                        </div>
                    </div>
                    <div className="col-12 col-lg-9">
                        <div className="mb-4 text-center text-md-start">
                            <h2 className="fw-bold text-dark">Welcome back, Dr. {doctor?.name.split(' ')[0]}</h2>
                            <p className="text-muted">Here's what is happening with your practice today.</p>
                        </div>

                        <DashboardStats appointments={store.appointments || []} />
                        
                        <div className="mt-5">
                            <AppointmentsTable 
                                appointments={store.appointments || []}
                                onUpdateStatus={updateAppointmentStatus}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};