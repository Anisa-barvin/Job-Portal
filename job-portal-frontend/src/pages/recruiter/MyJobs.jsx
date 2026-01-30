import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
       setLoading(true);
      const res = await API.get("/jobs/myjobs");
      setJobs(res.data);
      setError("");
    } catch (error) {
      alert("Failed to load jobs" + (error.response?.data?.message || ""));
      setError("Failed to load applications");
    }finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);
      fetchMyJobs(); // refresh list
    } catch (error) {
      alert("Failed to delete job"+(error.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMyJobs();
  }, []);


  // 🔄 LOADING STATE
  if (loading) {
    return <Spinner message="Loading Jobs..." />;
  }

  // ❌ ERROR STATE
  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  return (
    <>
      <h2 className="dashboard-title">My Jobs</h2>

      {jobs.length === 0 && (
        <p className="text-muted">No jobs posted yet</p>
      )}

      {jobs.map((job) => (
        <div className="card p-3 shadow-sm mb-3" key={job._id}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6>{job.title}</h6>
              <p className="text-muted mb-1">
                {job.location} • {job.experience}
              </p>
              <small className="text-muted">{job.salary}</small>
            </div>

            <div>
              <button
  className="btn btn-sm btn-outline-primary me-2"
  onClick={() => navigate(`/recruiter/jobs/${job._id}`)}
>
  View Applications
</button>


              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleDelete(job._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MyJobs;
