// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../../services/api";
// import "./ApplyJob.css";

// function ApplyJob() {
//   const { id } = useParams(); // jobId
//   const navigate = useNavigate();
//   const [resume, setResume] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!resume) {
//       alert("Please upload your resume (PDF)");
//       return;
//     }

//     const data = new FormData();
//     data.append("jobId", id);
//     data.append("resume", resume);

//     try {
//       await API.post("/applications", data);
//       alert("Applied successfully");
//       navigate("/user/dashboard");
//     } catch (error) {
//       alert(error.response?.data?.message || "Application failed");
//     }
//   };

//   return (
//     <div className="container mt-5 d-flex justify-content-center">
//       <div className="apply-container">
//         <h3 className="apply-title">Apply for Job</h3>
//         <p className="apply-subtitle">
//           Upload your resume (PDF only)
//         </p>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label className="form-label">Resume</label>
//             <input
//               type="file"
//               className="form-control"
//               accept=".pdf"
//               onChange={(e) => setResume(e.target.files[0])}
//               required
//             />
//           </div>

//           <button className="btn btn-primary w-100">
//             Submit Application
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ApplyJob;


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./ApplyJob.css";

function ApplyJob() {
  const { id } = useParams(); // jobId
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [skills, setSkills] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume (PDF)");
      return;
    }

    if (!skills.trim()) {
      alert("Please enter your skills");
      return;
    }

    const data = new FormData();
    data.append("jobId", id);
    data.append("resume", resume);
    data.append("skills", skills); // ✅ NEW (AI MATCHER)

    try {
      await API.post("/applications", data);
      alert("Applied successfully");
      navigate("/user/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Application failed");
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="apply-container">
        <h3 className="apply-title">Apply for Job</h3>
        <p className="apply-subtitle">
          Upload your resume and enter your skills
        </p>

        <form onSubmit={handleSubmit}>
          {/* SKILLS INPUT */}
          <div className="mb-3">
            <label className="form-label">Your Skills</label>
            <input
              type="text"
              className="form-control"
              placeholder="React, JavaScript, Node.js"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
            <small className="text-muted">
              Separate skills using commas
            </small>
          </div>

          {/* RESUME UPLOAD */}
          <div className="mb-3">
            <label className="form-label">Resume (PDF)</label>
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>

          <button className="btn btn-primary w-100">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}

export default ApplyJob;
