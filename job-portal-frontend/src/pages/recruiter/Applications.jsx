import { useEffect, useState } from "react";
import API from "../../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/recruiter");
      setApplications(res.data);
    } catch (error) {
      alert("Failed to load applications"+(error.response?.data?.message || ""));
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/${id}/status`, { status });
      fetchApplications(); // refresh
    } catch {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchApplications();
  }, []);

  return (
    <>
      <h2 className="dashboard-title">Applications</h2>

      {applications.length === 0 && (
        <p className="text-muted">No applications received yet</p>
      )}

      {applications.map((app) => (
        <div className="card p-3 shadow-sm mb-3" key={app._id}>
          <h6>{app.user.name}</h6>
          <p className="text-muted mb-1">{app.user.email}</p>
          <p className="mb-1">
            <strong>Job:</strong> {app.job.title}
          </p>

          <div className="d-flex align-items-center gap-2 mb-2">
            <a
              href={`http://localhost:5000${app.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-primary"
            >
              View Resume
            </a>

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
          </div>

          {app.status === "pending" && (
            <div>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => updateStatus(app._id, "accepted")}
              >
                Accept
              </button>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default Applications;
