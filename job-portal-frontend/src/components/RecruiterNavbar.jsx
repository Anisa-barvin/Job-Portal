import { Link, useNavigate } from "react-router-dom";

function RecruiterNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/recruiter/dashboard">
        JobPortal Recruiter
      </Link>

      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#recruiterNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="recruiterNavbar">
        <ul className="navbar-nav ms-auto">

 <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recruiter/dashboard">
              Dashboard
            </Link>
          </li>

         

          {/* <li className="nav-item">
            <Link className="nav-link" to="/recruiter/my-jobs">
              My Jobs
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/recruiter/applications">
              Applications
            </Link>
          </li> */}

          <li className="nav-item">
            <button
              className="btn btn-outline-light ms-lg-3 mt-2 mt-lg-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default RecruiterNavbar;
