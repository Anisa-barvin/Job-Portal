import { useState } from "react";
import "./RecruiterDashboard.css";
import Navbar from "../../components/Navbar";

import RecruiterHome from "./RecruiterHome";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import Applications from "./Applications";
import RecruiterProfile from "./RecruiterProfile";

function RecruiterDashboard() {
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <RecruiterHome />;
      case "post":
        return <PostJob />;
      case "jobs":
        return <MyJobs />;
      case "applications":
        return <Applications />;
      case "profile":
        return <RecruiterProfile />;
      default:
        return <RecruiterHome />;
    }
  };

  return (
    <>
      <Navbar />

      <div className="container-fluid recruiter-dashboard">
        <div className="row">

          {/* SIDEBAR */}
          <div className="col-md-3 col-lg-2 sidebar">
            <h4>Recruiter</h4>

            <button onClick={() => setActive("dashboard")}>Dashboard</button>
            <button onClick={() => setActive("post")}>Post Job</button>
            <button onClick={() => setActive("jobs")}>My Jobs</button>
            <button onClick={() => setActive("applications")}>Applications</button>
            <button onClick={() => setActive("profile")}>Profile</button>
            <button onClick={handleLogout} className="text-danger">
              Logout
            </button>
          </div>

          {/* MAIN CONTENT */}
          <div className="col-md-9 col-lg-10 dashboard-content">
            {renderContent()}
          </div>

        </div>
      </div>
    </>
  );
}

export default RecruiterDashboard;
