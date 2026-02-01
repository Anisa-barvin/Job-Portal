// import { useEffect, useState } from "react";
// import "./JobList.css";
// import { useNavigate } from "react-router-dom";
// import API from "../../services/api";

// function JobList() {
//   const [jobs, setJobs] = useState([]);
//   const navigate = useNavigate();

//   const fetchJobs = async () => {
//     try {
//       const res = await API.get("/jobs");
//       setJobs(res.data);
//     } catch (error) {
//       alert("Failed to load jobs"+(error.response?.data?.message || ""));
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchJobs();
//   }, []);

//   return (
//     <div>
//       {jobs.length === 0 && (
//         <p className="text-muted">No jobs available right now</p>
//       )}

//       {jobs.map((job) => (
//         <div className="job-card" key={job._id}>
          
//           {/* Company Logo */}
//           {job.companyLogo && (
//             <img
//               src={`http://localhost:5000${job.companyLogo}`}
//               alt="Company Logo"
//               style={{
//                 width: "60px",
//                 height: "60px",
//                 objectFit: "contain",
//                 marginBottom: "10px",
//               }}
//             />
//           )}

//           <h5 className="job-title">{job.title}</h5>
//           <p className="job-company">{job.companyName}</p>

//           <div className="job-meta mt-2">
//             <strong>Location :  </strong>
//               { job.location} &nbsp;
//           </div>

//           <div className="job-meta mt-2">
//             <strong>Experience :   </strong>
//               {job.experience}
//           </div>

//           <div className="job-meta mt-2">
//              <strong>Salary : </strong>
//              {job.salary} &nbsp;
//           </div>

//            <div className="job-meta mt-2">
//              <strong>Job Type :  </strong>
//               {job.jobType}
//           </div>

//           {/* SKILLS */}
//           {job.skills && (
//             <div className="job-skills mt-2">
//               <strong>Skills : </strong> {job.skills}
//             </div>
//           )}

//           {/* DESCRIPTION PREVIEW */}
//           {job.description && (
            
//             <p className="job-description mt-2">
//                <strong>Descrpition : </strong>
//               {job.description}
//             </p>
//           )}

//           <button
//             className="btn btn-primary apply-btn"
//             onClick={() => navigate(`/user/apply/${job._id}`)}
//           >
//             Apply Now
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default JobList;




import { useEffect, useState } from "react";
import "./JobList.css";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import Spinner from "../../components/Spinner";

function JobList({ filters }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [savedJobs, setSavedJobs] = useState([]);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/jobs", {
        params: {
          ...filters,
          page,
          limit: 5,
        },
      });
       setError("");
      setJobs(res.data.jobs);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      setError("Failed to load applications");
      alert("Failed to load jobs"+(error.response?.data?.message || ""));
    }finally {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJobs();
      fetchSavedJobs();
  }, [filters, page]);


  if (loading) {
    return <Spinner message="No jobs available right now. Check back later 🚀" />;
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
      {jobs.length === 0 && (
        <p className="text-muted">No jobs available</p>
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
          <button
  className={`btn btn-sm ${
    savedJobs.includes(job._id)
      ? "btn-danger"
      : "btn-outline-danger"
  }`}
  onClick={() => toggleSave(job._id)}
>
  {savedJobs.includes(job._id) ? "♥ Saved" : "♡ Save"}
</button>

        </div>
      ))}

      {/* PAGINATION CONTROLS */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        <button
          className="btn btn-outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-outline-secondary"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default JobList;
