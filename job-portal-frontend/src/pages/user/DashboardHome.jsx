// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import Spinner from "../../components/Spinner";
// import RecommendedJobs from "./RecommendedJobs";
// function DashboardHome() {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
 
 
//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/applications/stats/user");
//       setStats(res.data);
//       setError("");
//     } catch (err) {
//       alert("Failed to load dashboard stats"+ (err.response?.data?.message ? `: ${err.response?.data?.message}` : ''));
//       setError("Failed to load applications");
//     } finally {
//       setLoading(false);
//     }

//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchStats();
//   }, []);

//    if (loading) {
//     return <Spinner message="Loading Dashboard..." />;
//   }

//   // ❌ ERROR STATE
//   if (error) {
//     return (
//       <div className="alert alert-danger text-center my-4">
//         {error}
//       </div>
//     );
//   }

//   if (!stats) return <p>Loading dashboard...</p>;

//   return (
//     <>
//       <h2 className="dashboard-title">Dashboard</h2>
//       <p className="text-muted">
//         Overview of your job applications
//       </p>

//       <div className="row mt-4">
//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <h6>Applications</h6>
//             <h3>{stats.total}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <h6>Accepted</h6>
//             <h3 className="text-success">{stats.accepted}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <h6>Pending</h6>
//             <h3 className="text-warning">{stats.pending}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <h6>Rejected</h6>
//             <h3 className="text-danger">{stats.rejected}</h3>
//           </div>
//         </div>
//       </div>
//       <div>
//         <br></br>
//         <hr></hr>
//       </div>
//       <RecommendedJobs />
      
//     </>
//   );
// }

// export default DashboardHome;



import { useEffect, useState } from "react";
import API from "../../services/api";
import Spinner from "../../components/Spinner";
import RecommendedJobs from "./RecommendedJobs";
import "./DashboardHome.css";

function DashboardHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/applications/stats/user");
      setStats(res.data);
      setError("");
    } catch (err) {
      alert(
        "Failed to load dashboard stats" +
          (err.response?.data?.message
            ? `: ${err.response?.data?.message}`
            : "")
      );
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return <Spinner message="Loading Dashboard..." />;
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <>
      {/* ⭐ HEADER SECTION */}
      <div className="dashboard-home-header mb-4">
        <h2 className="dashboard-title fw-bold">Welcome Back 👋</h2>
        <p className="text-muted mb-0">
          Track your job applications and opportunities
        </p>
      </div>

      {/* ⭐ STATS CARDS */}
      <div className="row g-4">

        <div className="col-md-3">
          <div className="dashboard-stat-card">
            <div className="stat-icon">📄</div>
            <div>
              <p className="stat-label">Applications</p>
              <h3 className="stat-value">{stats.total}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-stat-card success">
            <div className="stat-icon">✅</div>
            <div>
              <p className="stat-label">Accepted</p>
              <h3 className="stat-value text-success">
                {stats.accepted}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-stat-card warning">
            <div className="stat-icon">⏳</div>
            <div>
              <p className="stat-label">Pending</p>
              <h3 className="stat-value text-warning">
                {stats.pending}
              </h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-stat-card danger">
            <div className="stat-icon">❌</div>
            <div>
              <p className="stat-label">Rejected</p>
              <h3 className="stat-value text-danger">
                {stats.rejected}
              </h3>
            </div>
          </div>
        </div>

      </div>

      {/* ⭐ SECTION DIVIDER */}
      <div className="dashboard-divider my-5"></div>

      {/* ⭐ RECOMMENDED JOBS SECTION */}
      <div className="dashboard-section-card">
        <RecommendedJobs />
      </div>
    </>
  );
}

export default DashboardHome;
