
// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import ResumePreviewModal from "../../components/ResumePreviewModal";

// function Applications() {
//   const [applications, setApplications] = useState([]);
//   const [selectedResume, setSelectedResume] = useState(null);

//   const fetchApplications = async () => {
//     try {
//       const res = await API.get("/applications/recruiter");
//       setApplications(res.data);
//     } catch (error) {
//       alert(
//         "Failed to load applications " +
//           (error.response?.data?.message || "")
//       );
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await API.put(`/applications/${id}/status`, { status });
//       fetchApplications(); // refresh
//     } catch {
//       alert("Failed to update status");
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchApplications();
//   }, []);

//   return (
//     <>
//       <h2 className="dashboard-title">Applications</h2>

//       {applications.length === 0 && (
//         <p className="text-muted">No applications received yet</p>
//       )}

//       {applications.map((app) => (
//         <div className="card p-3 shadow-sm mb-3" key={app._id}>
//           <h6>{app.user.name}</h6>
//           <p className="text-muted mb-1">{app.user.email}</p>
//           <p className="mb-1">
//             <strong>Job:</strong> {app.job.title}
//           </p>

//           <div className="d-flex align-items-center gap-2 mb-2">
//             {/* ✅ PREVIEW RESUME BUTTON */}
//             <button
//               className="btn btn-sm btn-outline-primary"
//               onClick={() =>
//                 setSelectedResume(
//                   `http://job-portal-backend-asg7.onrender.com${app.resume}`
//                 )
//               }
//             >
//               Preview Resume
//             </button>

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
//             <div className="mt-2">
//   <strong>Match:</strong>{" "}
//   <span
//     className={`badge ${
//       app.matchPercentage >= 70
//         ? "bg-success"
//         : app.matchPercentage >= 40
//         ? "bg-warning"
//         : "bg-danger"
//     }`}
//   >
//     {app.matchPercentage}%
//   </span>
// </div>

// {app.matchedSkills?.length > 0 && (
//   <div className="mt-1">
//     <small>
//       <strong>Matched Skills:</strong>{" "}
//       {app.matchedSkills.join(", ")}
//     </small>
//   </div>
// )}

//           </div>

//           {app.status === "pending" && (
//             <div>
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

//       {/* ✅ RESUME PREVIEW MODAL */}
//       {selectedResume && (
//         <ResumePreviewModal
//           resumeUrl={selectedResume}
//           onClose={() => setSelectedResume(null)}
//         />
//       )}
//     </>
//   );
// }

// export default Applications;



import { useEffect, useState } from "react";
import API from "../../services/api";
import ResumePreviewModal from "../../components/ResumePreviewModal";
import Spinner from "../../components/Spinner";
import "./Applications.css";
function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
   const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
 
  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await API.get("/applications/recruiter");
      setApplications(res.data);
      setError("");
    } catch (error) {
      setError("Failed to load applications");
      alert(
        "Failed to load applications " +
          (error.response?.data?.message || "")
      );
    }
     finally {
      setLoading(false);
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
  
 if (loading) {
    return <Spinner message="Loading applications..." />;
  }

   if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
      </div>
    );
  }

  // return (
  //   <>
  //     <h2 className="dashboard-title">Applications</h2>

  //     {applications.length === 0 && (
  //       <p className="text-muted">No applications received yet</p>
  //     )}

  //     {applications.map((app) => (
  //       <div className="card p-3 shadow-sm mb-3" key={app._id}>
  //         <h6>{app.user.name}</h6>
  //         <p className="text-muted mb-1">{app.user.email}</p>

  //         <p className="mb-1">
  //           <strong>Job:</strong> {app.job.title}
  //         </p>

  //         {/* 🔥 AI RESUME MATCH SECTION */}
  //         {app.matchPercentage !== undefined && (
  //           <>
  //             <div className="mt-2">
  //               <strong>Match:</strong>{" "}
  //               <span
  //                 className={`badge ${
  //                   app.matchPercentage >= 70
  //                     ? "bg-success"
  //                     : app.matchPercentage >= 40
  //                     ? "bg-warning"
  //                     : "bg-danger"
  //                 }`}
  //               >
  //                 {app.matchPercentage}%
  //               </span>
  //             </div>

  //             {app.matchedSkills?.length > 0 && (
  //               <div className="mt-1">
  //                 <small>
  //                   <strong>Matched Skills:</strong>{" "}
  //                   {app.matchedSkills.join(", ")}
  //                 </small>
  //               </div>
  //             )}
  //           </>
  //         )}

  //         <div className="d-flex align-items-center gap-2 mt-2 mb-2">
  //           {/* ✅ PREVIEW RESUME BUTTON */}
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

  //         {app.status === "pending" && (
  //           <div>
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
  <div className="apps-modern-wrapper">

    {/* HEADER */}
    <div className="apps-header">
      <h2>Candidate Applications</h2>
      <p>Review and manage job applicants</p>
    </div>

    {/* EMPTY STATE */}
    {applications.length === 0 && (
      <div className="apps-empty">
        No applications received yet
      </div>
    )}

    {/* APPLICATION LIST */}
    {applications.map((app) => (
      <div className="apps-card" key={app._id}>

        {/* LEFT - USER */}
        <div className="apps-left">

          <div className="apps-avatar">
            {app.user.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4>{app.user.name}</h4>
            <p>{app.user.email}</p>
            <span className="apps-job">
              Applied for: {app.job.title}
            </span>
          </div>

        </div>

        {/* RIGHT - ACTIONS */}
        <div className="apps-right">

          {/* MATCH */}
          {app.matchPercentage !== undefined && (
            <div className="apps-match">
              <span>Match</span>
              <div
                className={`apps-match-badge ${
                  app.matchPercentage >= 70
                    ? "match-high"
                    : app.matchPercentage >= 40
                    ? "match-mid"
                    : "match-low"
                }`}
              >
                {app.matchPercentage}%
              </div>
            </div>
          )}

          {/* MATCHED SKILLS */}
          {app.matchedSkills?.length > 0 && (
            <div className="apps-skills">
              {app.matchedSkills.join(", ")}
            </div>
          )}

          {/* STATUS */}
          <span
            className={`apps-status ${
              app.status === "accepted"
                ? "status-success"
                : app.status === "rejected"
                ? "status-danger"
                : "status-warning"
            }`}
          >
            {app.status}
          </span>

          {/* BUTTONS */}
          <div className="apps-actions">

            <button
              className="apps-preview-btn"
              onClick={() =>
                setSelectedResume(
                  `http://job-portal-backend-asg7.onrender.com${app.resume}`
                )
              }
            >
              Preview Resume
            </button>

            {app.status === "pending" && (
              <>
                <button
                  className="apps-accept-btn"
                  onClick={() => updateStatus(app._id, "accepted")}
                >
                  Accept
                </button>

                <button
                  className="apps-reject-btn"
                  onClick={() => updateStatus(app._id, "rejected")}
                >
                  Reject
                </button>
              </>
            )}

          </div>

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

export default Applications;
