// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import Spinner from "../../components/Spinner";

// function RecommendedJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchRecommendedJobs = async () => {
//     try {
//       const res = await API.get("/jobs/recommended");
//       setJobs(res.data);
//     } catch {
//       alert("Failed to load recommendations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRecommendedJobs();
//   }, []);

//   if (loading) return <Spinner message="Finding best jobs for you..." />;

//   return (
//     <>
//       <h3 className="mb-3">⭐ Recommended Jobs for You</h3>

//       {jobs.length === 0 && (
//         <p className="text-muted">No recommendations yet</p>
//       )}

//       {jobs.map((job) => (
//         <div className="card p-3 shadow-sm mb-3" key={job._id}>
//           <h6>{job.title}</h6>
//           <p className="text-muted">{job.companyName}</p>

//           <span
//             className={`badge ${
//               job.matchPercentage >= 70
//                 ? "bg-success"
//                 : job.matchPercentage >= 40
//                 ? "bg-warning"
//                 : "bg-danger"
//             }`}
//           >
//             Match: {job.matchPercentage}%
//           </span>
//         </div>
//       ))}
//     </>
//   );
// }

// export default RecommendedJobs;


import { useEffect, useState } from "react";
import API from "../../services/api";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
function RecommendedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
    const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();
  const fetchRecommendedJobs = async () => {
    try {
      const res = await API.get("/jobs/recommended");

      // ✅ SHOW ONLY JOBS WITH MATCH ≥ 70%
      const filteredJobs = res.data.filter(
        (job) => job.matchPercentage >= 70
      );

      setJobs(filteredJobs);
    } catch {
      alert("Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

   
const fetchSavedJobs = async () => {
  const res = await API.get("/users/saved");
  setSavedJobs(res.data.map((job) => job._id));
};

 const toggleSave = async (jobId) => {
    try {
      await API.post(`/users/save/${jobId}`);
      fetchSavedJobs(); // refresh saved jobs
    } catch (error) {
      alert("Failed to save job"+(error.response?.data?.message || ""));
    }
  };

  useEffect(() => {
    fetchRecommendedJobs();
  }, []);
 useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    
      fetchSavedJobs();
  });

  if (loading) {
    return <Spinner message="Finding best jobs for you..." />;
  }

  return (
    <>
      <h3 className="mb-3">⭐ Recommended Jobs for You</h3>

      {/* 🧠 SMART EMPTY STATE */}
      {jobs.length === 0 && (
        <div className="alert alert-info">
          No strong matches found yet (70%+).  
          Try updating your skills to get better recommendations 🚀
        </div>
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
          <div></div>
          <br></br>
          <button
  className={`btn btn-sm lefr ${
    savedJobs.includes(job._id)
      ? "btn-danger"
      : "btn-outline-danger"
  }`}
  onClick={() => toggleSave(job._id)}
>
  {savedJobs.includes(job._id) ? "♥ Saved" : "♡ Save"}
</button>
<br></br>
<span className="badge bg-success w-100 mt-2">
            Match: {job.matchPercentage}%
          </span>
        </div>
      ))}
    </>
  );
}

export default RecommendedJobs;
