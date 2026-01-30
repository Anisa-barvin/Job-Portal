import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

function SavedJobs() {
  const [jobs, setJobs] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users/saved");
      setJobs(res.data);
    } catch (error) {
      setError("Failed to load saved jobs"+(error.response?.data?.message || ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSavedJobs();
  }, []);

   if (loading) {
    return <Spinner message="No saved jobs yet ❤️" />;
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
      <h2 className="dashboard-title">Saved Jobs</h2>

      {jobs.length === 0 && (
        <p className="text-muted">No saved jobs</p>
      )}

      {jobs.map((job) => (
        
       
        <div className="job-card" key={job._id}>
          {job.companyLogo && (
            <img
              src={`http://localhost:5000${job.companyLogo}`}
              alt="Company Logo"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
          )}

          <h5>{job.title}</h5>
          <p className="text-muted">{job.companyName}</p>

          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Job Type:</strong> {job.jobType}</p>

          {job.skills && (
            <p><strong>Skills:</strong> {job.skills}</p>
          )}

          {job.description && (
            <p>
              <strong>Description:</strong>{" "}
              { job.description}
            </p>
          )}

          <button
            className="btn btn-primary"
            onClick={() => navigate(`/user/apply/${job._id}`)}
          >
            Apply Now
          </button>
        </div>
      ))}
    </>
  );
}

export default SavedJobs;
