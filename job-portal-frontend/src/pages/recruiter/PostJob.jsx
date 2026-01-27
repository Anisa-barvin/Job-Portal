import { useState } from "react";
import API from "../../services/api";

function PostJob() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    experience: "",
    salary: "",
    jobType: "",
    skills: "",
    description: "",
  });
  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    data.append("companyLogo", logo);

    try {
      await API.post("/jobs", data);
      alert("Job posted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <>
      <h2 className="dashboard-title">Post a Job</h2>

      <form
        className="card p-4 shadow-sm"
        style={{ maxWidth: "600px" }}
        onSubmit={handleSubmit}
      >
        <input
          name="title"
          className="form-control mb-3"
          placeholder="Job Title"
          onChange={handleChange}
        />

        <input
          name="companyName"
          className="form-control mb-3"
          placeholder="Company Name"
          onChange={handleChange}
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/png, image/jpeg"
          onChange={(e) => setLogo(e.target.files[0])}
        />

        <input
          name="location"
          className="form-control mb-3"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          name="experience"
          className="form-control mb-3"
          placeholder="Experience Required"
          onChange={handleChange}
        />

        <input
          name="salary"
          className="form-control mb-3"
          placeholder="Salary"
          onChange={handleChange}
        />

        <select
          name="jobType"
          className="form-select mb-3"
          onChange={handleChange}
        >
          <option value="">Select Job Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <input
          name="skills"
          className="form-control mb-3"
          placeholder="Skills Required"
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Job Description"
          rows="4"
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">
          Post Job
        </button>
      </form>
    </>
  );
}

export default PostJob;
