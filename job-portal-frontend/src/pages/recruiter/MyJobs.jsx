import { useEffect, useState } from "react";
import API from "../../services/api";
//import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import "./MyJobs.css";
function MyJobs({ onViewApplications }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//const navigate = useNavigate();

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
  <div className="myjobs-modern-wrapper">

    {/* HEADER */}
    <div className="myjobs-modern-header">
      <h1>My Job Listings</h1>
      <p>Manage and track your posted job openings</p>
    </div>

    {jobs.length === 0 && (
      <div className="myjobs-empty-modern">
        <h4>No Jobs Posted Yet</h4>
        <p>Create your first job to start hiring candidates</p>
      </div>
    )}

    {jobs.map((job) => (
      <div className="myjob-modern-card" key={job._id}>

        {/* LEFT SIDE */}
        <div className="myjob-modern-left">

          <h2 className="myjob-modern-title">
            {job.title}
          </h2>

          <p className="myjob-modern-company">
            {job.companyName || "Company"}
          </p>

          <div className="myjob-modern-details">

            <span>
              <strong>Location:</strong> {job.location}
            </span>

            <span>
              <strong>Experience:</strong> {job.experience}
            </span>

            <span>
              <strong>Salary:</strong> {job.salary}
            </span>

          </div>

        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="myjob-modern-actions">

          <button
            className="myjob-view-btn"
           onClick={() => onViewApplications(job._id)}

          >
            View Applications
          </button>

          <button
            className="myjob-delete-btn"
            onClick={() => handleDelete(job._id)}
          >
            Delete Job
          </button>

        </div>

      </div>
    ))}

  </div>
);


}

export default MyJobs;
