import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="container hero-section">
      <div className="row align-items-center">
        
        {/* LEFT SIDE CONTENT */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="hero-title">
            Find Your <span className="text-primary">Dream Job</span> <br />
            Or Hire Top Talent
          </h1>

          <p className="hero-subtitle">
            A smart job portal connecting job seekers and recruiters.
            Apply for jobs, post openings, and manage applications easily.
          </p>

          <div className="hero-buttons mt-4">
            <Link to="/login" className="btn btn-primary me-3">
              Get Started
            </Link>
            <Link to="/register" className="btn btn-outline-primary">
              Create Account
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="col-md-6 text-center mt-5 mt-md-0">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Job Search"
            className="hero-image"
          />
        </div>

      </div>
    </div>
  );
}

export default Home;
