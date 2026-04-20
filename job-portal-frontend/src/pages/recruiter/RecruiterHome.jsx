// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import RecruiterDashboardCharts from "../../components/RecruiterDashboardCharts";
// import Spinner from "../../components/Spinner";

// function RecruiterHome() {
//   const [stats, setStats] = useState(null);
//     const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/applications/stats/recruiter");
//       setStats(res.data);
//       setError("");
//     } catch (err) {
//       alert("Failed to load recruiter stats"+ (err.response?.data?.message ? `: ${err.response?.data?.message}` : ''));
//       setError("Failed to load applications");
//     }finally {
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
//       <h2 className="dashboard-title">Recruiter Dashboard</h2>
//       <p className="text-muted">
//         Hiring overview and activity
//       </p>

//       <div className="row mt-4">
//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <h6>Total Jobs</h6>
//             <h3>{stats.totalJobs}</h3>
//           </div>
//         </div>

//         <div className="col-md-3">
//           <div className="card p-3 shadow-sm">
//             <h6>Total Applications</h6>
//             <h3>{stats.totalApplications}</h3>
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
//         <RecruiterDashboardCharts />

//       </div>
//     </>
//   );
// }

// export default RecruiterHome;



import { useEffect, useState } from "react";
import API from "../../services/api";
import RecruiterDashboardCharts from "../../components/RecruiterDashboardCharts";
import Spinner from "../../components/Spinner";
import "./RecruiterHome.css";

function RecruiterHome() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await API.get("/applications/stats/recruiter");
      setStats(res.data);
      setError("");
    } catch (err) {
      alert(
        "Failed to load recruiter stats" +
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

  if (loading) return <Spinner message="Loading Dashboard..." />;

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div className="recruiter-home-wrapper">

      {/* HEADER */}
      <div className="recruiter-home-header">
        <h2>Recruiter Dashboard</h2>
        <p>Track hiring performance and recruitment activity</p>
      </div>

      {/* STATS CARDS */}
      <div className="row recruiter-stats-row">

        <div className="col-md-3">
          <div className="recruiter-stat-card stat-blue">
            <h6>Total Jobs</h6>
            <h3>{stats.totalJobs}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="recruiter-stat-card stat-purple">
            <h6>Total Applications</h6>
            <h3>{stats.totalApplications}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="recruiter-stat-card stat-green">
            <h6>Accepted</h6>
            <h3>{stats.accepted}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="recruiter-stat-card stat-orange">
            <h6>Pending</h6>
            <h3>{stats.pending}</h3>
          </div>
        </div>

      </div>

      {/* CHART SECTION */}
      <div className="recruiter-chart-section">
        <h5 className="mb-3">Hiring Analytics</h5>
        <RecruiterDashboardCharts />
      </div>

    </div>
  );
}

export default RecruiterHome;
