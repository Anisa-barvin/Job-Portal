import { useEffect, useState } from "react";
import API from "../../services/api";
import Spinner from "../../components/Spinner";
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
      alert("Failed to load dashboard stats"+ (err.response?.data?.message ? `: ${err.response?.data?.message}` : ''));
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

   if (loading) {
    return <Spinner message="Loading Dashboard..." />;
  }

  // ❌ ERROR STATE
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
      <h2 className="dashboard-title">Dashboard</h2>
      <p className="text-muted">
        Overview of your job applications
      </p>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Applications</h6>
            <h3>{stats.total}</h3>
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

        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Rejected</h6>
            <h3 className="text-danger">{stats.rejected}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
