import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="container text-center mt-5">
      <h2>🚫 Access Denied</h2>
      <p className="text-muted">
        You do not have permission to view this page.
      </p>

      <Link to="/login" className="btn btn-primary mt-3">
        Go to Login
      </Link>
    </div>
  );
}

export default Unauthorized;
