import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./ApplyJob.css";

function ApplyJob() {
  const { id } = useParams(); // jobId
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      alert("Please upload your resume (PDF)");
      return;
    }

    const data = new FormData();
    data.append("jobId", id);
    data.append("resume", resume);

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
          Upload your resume (PDF only)
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Resume</label>
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
