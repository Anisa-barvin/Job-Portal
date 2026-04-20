// import { Link, useNavigate } from "react-router-dom";

// function RecruiterNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
//       <Link className="navbar-brand fw-bold" to="/recruiter/dashboard">
//         JobPortal Recruiter
//       </Link>

//       <button
//         className="navbar-toggler"
//         data-bs-toggle="collapse"
//         data-bs-target="#recruiterNavbar"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="recruiterNavbar">
//         <ul className="navbar-nav ms-auto">

//  <li className="nav-item">
//             <Link className="nav-link" to="/">
//               Home
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/recruiter/dashboard">
//               Dashboard
//             </Link>
//           </li>

         

//           <li className="nav-item">
//             <Link className="nav-link" to="/recruiter/my-jobs">
//               My Jobs
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" to="/recruiter/applications">
//               Applications
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

// export default RecruiterNavbar;




// import { Link } from "react-router-dom";
// import "./RecruiterNavbar.css";



// function RecruiterNavbar({ setActive }) {

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   return (
//     <nav className="recruiter-navbar-modern">

//       <div className="recruiter-navbar-left">
//         <span
//           className="recruiter-navbar-logo"
//           onClick={() => setActive("dashboard")}
//         >
//           🚀 JobPortal Recruiter
//         </span>
//       </div>

//       <div className="recruiter-navbar-right">

//  <button
//           className="recruiter-nav-link"
//           onClick={() => setActive("dashboard")}
//         >
//           Home
//         </button>
//         <button
//           className="recruiter-nav-link"
//           onClick={() => setActive("dashboard")}
//         >
//           Dashboard
//         </button>

//         <button
//           className="recruiter-nav-link"
//           onClick={() => setActive("jobs")}
//         >
//           My Jobs
//         </button>

//         <button
//           className="recruiter-nav-link"
//           onClick={() => setActive("applications")}
//         >
//           Applications
//         </button>
        

//         <button
//           className="recruiter-logout-btn"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </div>

//     </nav>
//   );
// }


// export default RecruiterNavbar;

import "./RecruiterNavbar.css";

function RecruiterNavbar({ setActive }) {

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="recruiter-navbar-modern">

      {/* LOGO */}
      <div className="recruiter-navbar-left">
        <span
          className="recruiter-navbar-logo"
          onClick={() => setActive("dashboard")}
        >
           JobPortal Recruiter
        </span>
      </div>

      {/* MENU */}
      <div className="recruiter-navbar-right">

       

        <button className="nav-modern-btn" onClick={() => setActive("dashboard")}>
          Dashboard
        </button>

        <button className="nav-modern-btn" onClick={() => setActive("jobs")}>
          My Jobs
        </button>

        <button className="nav-modern-btn" onClick={() => setActive("applications")}>
          Applications
        </button>

        <button className="logout-modern-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default RecruiterNavbar;
