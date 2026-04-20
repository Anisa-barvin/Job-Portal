// import { useState } from "react";
// import "./RecruiterDashboard.css";


// import RecruiterHome from "./RecruiterHome";
// import PostJob from "./PostJob";
// import MyJobs from "./MyJobs";
// import Applications from "./Applications";
// import RecruiterProfile from "./RecruiterProfile";
// import RecruiterNavbar from "../../components/RecruiterNavbar";

// function RecruiterDashboard() {
//   const [active, setActive] = useState("dashboard");

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   const renderContent = () => {
//     switch (active) {
//       case "dashboard":
//         return <RecruiterHome />;
//       case "post":
//         return <PostJob />;
//       case "jobs":
//         return <MyJobs />;
//       case "applications":
//         return <Applications />;
//       case "profile":
//         return <RecruiterProfile />;
//       default:
//         return <RecruiterHome />;
//     }
//   };

//   return (
//     <>
//       <RecruiterNavbar />

//       <div className="container-fluid recruiter-dashboard">
//         <div className="row">

//           {/* SIDEBAR */}
//           <div className="col-md-3 col-lg-2 sidebar">
//             <h4>Recruiter</h4>

//             <button onClick={() => setActive("dashboard")}>Dashboard</button>
//             <button onClick={() => setActive("post")}>Post Job</button>
//             <button onClick={() => setActive("jobs")}>My Jobs</button>
//             <button onClick={() => setActive("applications")}>Applications</button>
//             <button onClick={() => setActive("profile")}>Profile</button>
//             <button onClick={handleLogout} className="text-danger">
//               Logout
//             </button>
//           </div>

//           {/* MAIN CONTENT */}
//           <div className="col-md-9 col-lg-10 dashboard-content">
//             {renderContent()}
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default RecruiterDashboard;



import { useState } from "react";
import "./RecruiterDashboard.css";

import RecruiterHome from "./RecruiterHome";
import PostJob from "./PostJob";
import MyJobs from "./MyJobs";
import Applications from "./Applications";
import RecruiterProfile from "./RecruiterProfile";
import RecruiterNavbar from "../../components/RecruiterNavbar";
import JobDetails from "./JobDetails";
function RecruiterDashboard() {
  const [active, setActive] = useState("dashboard");
const [selectedJobId, setSelectedJobId] = useState(null);

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
      return (
        <MyJobs
          onViewApplications={(jobId) => {
            setSelectedJobId(jobId);
            setActive("jobDetails");
          }}
        />
      );

    case "jobDetails":
      return (
        <JobDetails
          jobId={selectedJobId}
          onBack={() => setActive("jobs")}
        />
      );

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
      <RecruiterNavbar setActive={setActive}/>

      <div className="recruiter-dashboard-modern">

        {/* SIDEBAR */}
        <div className="recruiter-sidebar">

          <div className="recruiter-sidebar-header">
            <h4>Recruiter Panel</h4>
            <small>Manage jobs & applicants</small>
          </div>

          <button
            className={active === "dashboard" ? "active" : ""}
            onClick={() => setActive("dashboard")}
          >
            📊 Dashboard
          </button>

          <button
            className={active === "post" ? "active" : ""}
            onClick={() => setActive("post")}
          >
           🧾 Post Job
          </button>

          <button
            className={active === "jobs" ? "active" : ""}
            onClick={() => setActive("jobs")}
          >
           🧑‍💻 My Jobs
          </button>

          <button
            className={active === "applications" ? "active" : ""}
            onClick={() => setActive("applications")}
          >
           📄 Applications
          </button>

          <button
            className={active === "profile" ? "active" : ""}
            onClick={() => setActive("profile")}
          >
           👤  Profile
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>

        </div>

        {/* MAIN CONTENT */}
        <div className="recruiter-content-modern">
          {renderContent()}
        </div>

      </div>
    </>
  );
}

export default RecruiterDashboard;
