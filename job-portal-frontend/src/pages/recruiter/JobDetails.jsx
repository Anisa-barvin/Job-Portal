
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../../services/api";

// function JobDetails() {
//   const { id } = useParams(); // jobId
//   const [job, setJob] = useState(null);
//   const [applications, setApplications] = useState([]);

//   const fetchJob = async () => {
//     try {
//       const res = await API.get(`/jobs/${id}`);
//       setJob(res.data);
//     } catch {
//       alert("Failed to load job details");
//     }
//   };

//   const fetchApplicants = async () => {
//     try {
//       const res = await API.get(`/applications/job/${id}`);
//       setApplications(res.data);
//     } catch {
//       alert("Failed to load applicants");
//     }
//   };

//   const updateStatus = async (applicationId, status) => {
//     try {
//       await API.put(`/applications/${applicationId}/status`, { status });
//       fetchApplicants(); // refresh list
//     } catch (error) {
//       alert("Failed to update status"+""+(error.response?.data?.message || ""));
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchJob();
//     fetchApplicants();
//   },[]);

//   if (!job) return <p>Loading...</p>;

//   return (
//     <>
//       {/* JOB DETAILS */}
//       <div className="card p-4 shadow-sm mb-4" style={{ maxWidth: "800px" }}>
//         <h3>{job.title}</h3>
//         <p className="text-muted">{job.companyName}</p>

//         <p><strong>Location:</strong> {job.location}</p>
//         <p><strong>Experience:</strong> {job.experience}</p>
//         <p><strong>Salary:</strong> {job.salary}</p>
//         <p><strong>Job Type:</strong> {job.jobType}</p>
//         <p><strong>Skills:</strong> {job.skills}</p>

//         <p>
//           <strong>Description:</strong><br />
//           {job.description}
//         </p>
//       </div>

//       {/* APPLICANTS */}
//       <h4 className="mb-3">Applicants</h4>

//       {applications.length === 0 && (
//         <p className="text-muted">No applications yet</p>
//       )}

//       {applications.map((app) => (
//         <div className="card p-3 shadow-sm mb-3" key={app._id}>
//           <h6>{app.user.name}</h6>
//           <p className="text-muted mb-1">{app.user.email}</p>

//           <div className="d-flex align-items-center gap-2">
//             <a
//               href={`http://job-portal-backend-asg7.onrender.com${app.resume}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="btn btn-sm btn-outline-primary"
//             >
//               View Resume
//             </a>

//             <span
//               className={`badge ${
//                 app.status === "pending"
//                   ? "bg-warning"
//                   : app.status === "accepted"
//                   ? "bg-success"
//                   : "bg-danger"
//               }`}
//             >
//               {app.status}
//             </span>
//           </div>

//           {/* ACTION BUTTONS */}
//           {app.status === "pending" && (
//             <div className="mt-2">
//               <button
//                 className="btn btn-sm btn-success me-2"
//                 onClick={() => updateStatus(app._id, "accepted")}
//               >
//                 Accept
//               </button>

//               <button
//                 className="btn btn-sm btn-danger"
//                 onClick={() => updateStatus(app._id, "rejected")}
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </>
//   );
// }

// export default JobDetails;




import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import API from "../../services/api";
import ResumePreviewModal from "../../components/ResumePreviewModal";
import "./JobDetails.css";
function JobDetails({ jobId, onBack }) {
  //const { id } = useParams(); // jobId
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${jobId}`);
      setJob(res.data);
    } catch {
      alert("Failed to load job details");
    }
  };

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApplications(res.data);
    } catch {
      alert("Failed to load applicants");
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await API.put(`/applications/${applicationId}/status`, { status });
      fetchApplicants(); // refresh list
    } catch (error) {
      alert(
        "Failed to update status " +
          (error.response?.data?.message || "")
      );
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchJob();
    fetchApplicants();
  }, []);

  if (!job) return <p>Loading...</p>;

  // return (
  //   <>
  //     {/* JOB DETAILS */}
  //     <div className="card p-4 shadow-sm mb-4" style={{ maxWidth: "800px" }}>
  //       <h3>{job.title}</h3>
  //       <p className="text-muted">{job.companyName}</p>

  //       <p><strong>Location:</strong> {job.location}</p>
  //       <p><strong>Experience:</strong> {job.experience}</p>
  //       <p><strong>Salary:</strong> {job.salary}</p>
  //       <p><strong>Job Type:</strong> {job.jobType}</p>
  //       <p><strong>Skills:</strong> {job.skills}</p>

  //       <p>
  //         <strong>Description:</strong><br />
  //         {job.description}
  //       </p>
  //     </div>

  //     {/* APPLICANTS */}
  //     <h4 className="mb-3">Applicants</h4>

  //     {applications.length === 0 && (
  //       <p className="text-muted">No applications yet</p>
  //     )}

  //     {applications.map((app) => (
  //       <div className="card p-3 shadow-sm mb-3" key={app._id}>
  //         <h6>{app.user.name}</h6>
  //         <p className="text-muted mb-1">{app.user.email}</p>

  //         <div className="d-flex align-items-center gap-2">
  //           {/* ✅ PREVIEW RESUME */}
  //           <button
  //             className="btn btn-sm btn-outline-primary"
  //             onClick={() =>
  //               setSelectedResume(
  //                 `http://job-portal-backend-asg7.onrender.com${app.resume}`
  //               )
  //             }
  //           >
  //             Preview Resume
  //           </button>

  //           <span
  //             className={`badge ${
  //               app.status === "pending"
  //                 ? "bg-warning"
  //                 : app.status === "accepted"
  //                 ? "bg-success"
  //                 : "bg-danger"
  //             }`}
  //           >
  //             {app.status}
  //           </span>
  //         </div>

  //         {/* ACTION BUTTONS */}
  //         {app.status === "pending" && (
  //           <div className="mt-2">
  //             <button
  //               className="btn btn-sm btn-success me-2"
  //               onClick={() => updateStatus(app._id, "accepted")}
  //             >
  //               Accept
  //             </button>

  //             <button
  //               className="btn btn-sm btn-danger"
  //               onClick={() => updateStatus(app._id, "rejected")}
  //             >
  //               Reject
  //             </button>
  //           </div>
  //         )}
  //       </div>
  //     ))}

  //     {/* ✅ RESUME PREVIEW MODAL */}
  //     {selectedResume && (
  //       <ResumePreviewModal
  //         resumeUrl={selectedResume}
  //         onClose={() => setSelectedResume(null)}
  //       />
  //     )}
  //   </>
  // );
  return (
  <div className="jobdetails-modern-wrapper">
<button
  className="btn btn-outline-secondary mb-3"
  onClick={onBack}
>
  ← Back to My Jobs
</button>

    {/* JOB HEADER CARD */}
    <div className="jobdetails-job-card">

      <h1 className="jobdetails-title">{job.title}</h1>
      <p className="jobdetails-company">{job.companyName}</p>

      <div className="jobdetails-info-grid">

        <div>
          <label>Location</label>
          <p>{job.location}</p>
        </div>

        <div>
          <label>Experience</label>
          <p>{job.experience}</p>
        </div>

        <div>
          <label>Salary</label>
          <p>{job.salary}</p>
        </div>

        <div>
          <label>Job Type</label>
          <p>{job.jobType}</p>
        </div>

      </div>

      <div className="jobdetails-section">
        <h5>Required Skills</h5>
        <p>{job.skills}</p>
      </div>

      <div className="jobdetails-section">
        <h5>Job Description</h5>
        <p>{job.description}</p>
      </div>

    </div>

    {/* APPLICANTS HEADER */}
    <div className="jobdetails-app-header">
      <h2>Applicants</h2>
      <span className="jobdetails-count">
        {applications.length} Candidates
      </span>
    </div>

    {/* EMPTY */}
    {applications.length === 0 && (
      <div className="jobdetails-empty">
        No applications yet
      </div>
    )}

    {/* APPLICANTS LIST */}
    {applications.map((app) => (
      <div className="jobdetails-app-card" key={app._id}>

        <div className="jobdetails-app-left">

          <div className="jobdetails-avatar">
            {app.user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4>{app.user.name}</h4>
            <p>{app.user.email}</p>
          </div>

        </div>

        <div className="jobdetails-app-right">

          {/* STATUS */}
          <span
            className={`jobdetails-status ${
              app.status === "accepted"
                ? "status-success"
                : app.status === "rejected"
                ? "status-danger"
                : "status-warning"
            }`}
          >
            {app.status}
          </span>

          {/* PREVIEW */}
          <button
            className="jobdetails-preview-btn"
            onClick={() =>
              setSelectedResume(`http://job-portal-backend-asg7.onrender.com${app.resume}`)
            }
          >
            Preview Resume
          </button>

          {/* ACTIONS */}
          {app.status === "pending" && (
            <>
              <button
                className="jobdetails-accept-btn"
                onClick={() => updateStatus(app._id, "accepted")}
              >
                Accept
              </button>

              <button
                className="jobdetails-reject-btn"
                onClick={() => updateStatus(app._id, "rejected")}
              >
                Reject
              </button>
            </>
          )}

        </div>

      </div>
    ))}

    {/* MODAL */}
    {selectedResume && (
      <ResumePreviewModal
        resumeUrl={selectedResume}
        onClose={() => setSelectedResume(null)}
      />
    )}

  </div>
);

}

export default JobDetails;
