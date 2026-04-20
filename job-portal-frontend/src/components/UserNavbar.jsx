// import { Link, useNavigate } from "react-router-dom";

// function UserNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
//       <Link className="navbar-brand fw-bold" to="/user/dashboard">
//         JobPortal
//       </Link>

//       <button
//         className="navbar-toggler"
//         data-bs-toggle="collapse"
//         data-bs-target="#userNavbar"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="userNavbar">
//         <ul className="navbar-nav ms-auto">

//           <li className="nav-item">
//             <Link className="nav-link" to="/">
//               Home
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/user/browse">
//               Browse Jobs
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/user/applications">
//               My Applications
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/user/saved">
//               Saved Jobs ❤️
//             </Link>
//           </li>

//           <li className="nav-item">
//             <button
//               className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0"
//               onClick={handleLogout}
//             >
//               Logout
//             </button>
//           </li>

//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default UserNavbar;


// import { useNavigate } from "react-router-dom";
// import "./UserNavbar.css";

// function UserNavbar({ setActive }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="user-navbar-modern">

//       {/* LEFT LOGO */}
//       <div className="user-navbar-left">
//         <span
//           className="user-navbar-logo"
//           onClick={() => setActive ? setActive("dashboard") : navigate("/user/dashboard")}
//         >
//           🚀 JobPortal User
//         </span>
//       </div>

//       {/* RIGHT MENU */}
//       <div className="user-navbar-right">

//         <button
//           className="user-nav-link"
//           onClick={() => setActive ? setActive("dashboard") : navigate("/user/dashboard")}
//         >
//           Dashboard
//         </button>

//         <button
//           className="user-nav-link"
//           onClick={() => setActive ? setActive("browse") : navigate("/user/browse")}
//         >
//           Browse Jobs
//         </button>

//         <button
//           className="user-nav-link"
//           onClick={() => setActive ? setActive("applications") : navigate("/user/applications")}
//         >
//           Applications
//         </button>

//         <button
//           className="user-nav-link"
//           onClick={() => setActive ? setActive("saved") : navigate("/user/saved")}
//         >
//           Saved Jobs
//         </button>

//         <button
//           className="user-logout-btn"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// }

// export default UserNavbar;


import "./UserNavbar.css";

function UserNavbar({ setActive }) {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="user-navbar-modern">

      {/* LEFT LOGO */}
      <div className="user-navbar-left">
        <span
          className="user-navbar-logo"
          onClick={() => setActive && setActive("dashboard")}
        >
           JobPortal
        </span>
      </div>

      {/* RIGHT MENU */}
      <div className="user-navbar-right">

        <button
          className="user-nav-link"
          onClick={() => setActive && setActive("dashboard")}
        >
          Dashboard
        </button>

        <button
          className="user-nav-link"
          onClick={() => setActive && setActive("browse")}
        >
          Browse Jobs
        </button>

        <button
          className="user-nav-link"
          onClick={() => setActive && setActive("applications")}
        >
          My Applications
        </button>

        <button
          className="user-nav-link"
          onClick={() => setActive && setActive("saved")}
        >
          Saved Jobs
        </button>

        <button
          className="user-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default UserNavbar;
