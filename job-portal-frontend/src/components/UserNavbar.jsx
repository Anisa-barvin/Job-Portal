import { Link, useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/user/dashboard">
        JobPortal
      </Link>

      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#userNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="userNavbar">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          {/* <li className="nav-item">
            <Link className="nav-link" to="/user/browse">
              Browse Jobs
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/user/applications">
              My Applications
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/user/saved">
              Saved Jobs ❤️
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

export default UserNavbar;
