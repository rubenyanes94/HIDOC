import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();
  
  const token = store.token || localStorage.getItem("token");
  const userType = store.userType || localStorage.getItem("userType");

  const isTokenValid = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp > Date.now() / 1000;
    } catch { return false; }
  };

  const isLoggedIn = isTokenValid(token);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "logout" });
    window.location.reload();
  };

  const getUserName = () => {
    if (userType === 'doctor') return "Doctor";
    if (userType === 'pacient') return "Patient";
    return 'Profile';
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top shadow-sm" style={{ backgroundColor: "#E9F5FF" }}>
      <div className="container">
        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="fa-solid fa-house-medical" style={{ color: "#1a5799", fontSize: "28px" }}></i>
          <span className="fw-bold fs-3 ms-2" style={{ color: "#1a5799" }}>HiDoc</span>
        </Link>

        {/* BOTÓN HAMBURGUESA */}
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO DEL NAVBAR */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="ms-auto mt-3 mt-lg-0 d-flex flex-column flex-lg-row gap-2 align-items-stretch align-items-lg-center">
            
            {!isLoggedIn ? (
              <>
                {/* --- SECCIÓN LOG IN --- */}
                <div className="dropdown">
                  {/* Botón que controla el Dropdown en PC y el Collapse en Móvil */}
                  <button 
                    className="btn btn-outline-primary w-100 d-flex justify-content-between align-items-center dropdown-toggle" 
                    type="button"
                    data-bs-toggle="dropdown" // Para PC
                    aria-expanded="false"
                  >
                    Log in
                  </button>
                  {/* Lista de opciones: En PC es un menú flotante, en móvil se adapta al flujo del menú */}
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm w-100 w-lg-auto mt-lg-2">
                    <li className="d-lg-none px-3 py-2 fw-bold border-bottom mb-2" style={{color: "#1a5799"}}>Select Access:</li>
                    <li><Link to="/doctor/login" className="dropdown-item py-2"><i className="fa-solid fa-user-md me-2"></i>As Doctor</Link></li>
                    <li><Link to="/api/pacient/login" className="dropdown-item py-2"><i className="fa-solid fa-user me-2"></i>As Patient</Link></li>
                  </ul>
                </div>

                {/* --- SECCIÓN SIGN UP --- */}
                <div className="dropdown">
                  <button 
                    className="btn btn-primary w-100 d-flex justify-content-between align-items-center dropdown-toggle" 
                    style={{ backgroundColor: "#1A5799", border: "none" }}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sign up
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm w-100 w-lg-auto mt-lg-2">
                    <li className="d-lg-none px-3 py-2 fw-bold border-bottom mb-2" style={{color: "#1a5799"}}>Join as:</li>
                    <li><Link to="/api/doctor/register" className="dropdown-item py-2"><i className="fa-solid fa-user-md me-2"></i>As Doctor</Link></li>
                    <li><Link to="/api/pacient/signup" className="dropdown-item py-2"><i className="fa-solid fa-user me-2"></i>As Patient</Link></li>
                  </ul>
                </div>
              </>
            ) : (
              /* --- SECCIÓN USUARIO LOGUEADO --- */
              <div className="dropdown">
                <button 
                  className="btn btn-primary w-100 d-flex justify-content-center align-items-center gap-2 dropdown-toggle" 
                  style={{ backgroundColor: "#1A5799", border: "none" }}
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className={`fa-solid ${userType === 'doctor' ? 'fa-user-md' : 'fa-user'}`}></i>
                  {getUserName()}
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-lg-2">
                  <li>
                    <Link className="dropdown-item py-2" to={userType === 'doctor' ? "/doctor/dashboard" : "/api/listappointments"}>
                      <i className="fa-solid fa-circle-user me-2"></i>My Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger py-2" onClick={handleLogout}>
                      <i className="fa-solid fa-power-off me-2"></i>Log out
                    </button>
                  </li>
                </ul>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};