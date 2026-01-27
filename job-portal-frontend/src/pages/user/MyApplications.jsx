import { useEffect, useState } from "react";
import API from "../../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchMyApplications = async () => {
    try {
      const res = await API.get("/applications/my");
      setApplications(res.data);
    } catch (error) {
      alert("Failed to load applications"+(error.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyApplications();
  }, []);

  return (
    <>
      <h2 className="dashboard-title">My Applications</h2>
      <p className="text-muted mb-4">
        Track the status of jobs you applied for
      </p>

      {applications.length === 0 && (
        <p className="text-muted">You have not applied for any jobs yet</p>
      )}

      {applications.map((app) => (
        <div className="card p-3 shadow-sm mb-3" key={app._id}>
          <h6>{app.job?.title}</h6>
          <p className="text-muted mb-1">
            {app.job?.companyName}
          </p>

          <div className="d-flex align-items-center gap-2">
            <span
              className={`badge ${
                app.status === "pending"
                  ? "bg-warning"
                  : app.status === "accepted"
                  ? "bg-success"
                  : "bg-danger"
              }`}
            >
              {app.status}
            </span>

            <a
              href={`http://localhost:5000${app.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-primary"
            >
              View Resume
            </a>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyApplications;
