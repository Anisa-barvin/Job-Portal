
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
//                   `http://localhost:5000${app.resume}`
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

function Applications() {
  const [applications, setApplications] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/recruiter");
      setApplications(res.data);
    } catch (error) {
      alert(
        "Failed to load applications " +
          (error.response?.data?.message || "")
      );
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

          {/* 🔥 AI RESUME MATCH SECTION */}
          {app.matchPercentage !== undefined && (
            <>
              <div className="mt-2">
                <strong>Match:</strong>{" "}
                <span
                  className={`badge ${
                    app.matchPercentage >= 70
                      ? "bg-success"
                      : app.matchPercentage >= 40
                      ? "bg-warning"
                      : "bg-danger"
                  }`}
                >
                  {app.matchPercentage}%
                </span>
              </div>

              {app.matchedSkills?.length > 0 && (
                <div className="mt-1">
                  <small>
                    <strong>Matched Skills:</strong>{" "}
                    {app.matchedSkills.join(", ")}
                  </small>
                </div>
              )}
            </>
          )}

          <div className="d-flex align-items-center gap-2 mt-2 mb-2">
            {/* ✅ PREVIEW RESUME BUTTON */}
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() =>
                setSelectedResume(
                  `http://localhost:5000${app.resume}`
                )
              }
            >
              Preview Resume
            </button>

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

      {/* ✅ RESUME PREVIEW MODAL */}
      {selectedResume && (
        <ResumePreviewModal
          resumeUrl={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </>
  );
}

export default Applications;
