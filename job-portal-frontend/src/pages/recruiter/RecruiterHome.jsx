import { useEffect, useState } from "react";
import API from "../../services/api";
import RecruiterDashboardCharts from "../../components/RecruiterDashboardCharts";

function RecruiterHome() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/applications/stats/recruiter");
      setStats(res.data);
    } catch {
      alert("Failed to load recruiter stats");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <>
      <h2 className="dashboard-title">Recruiter Dashboard</h2>
      <p className="text-muted">
        Hiring overview and activity
      </p>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Jobs</h6>
            <h3>{stats.totalJobs}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Applications</h6>
            <h3>{stats.totalApplications}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Accepted</h6>
            <h3 className="text-success">{stats.accepted}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Pending</h6>
            <h3 className="text-warning">{stats.pending}</h3>
          </div>
        </div>
        <RecruiterDashboardCharts />

      </div>
    </>
  );
}

export default RecruiterHome;
