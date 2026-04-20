// import { useState } from "react";
// import API from "../../services/api";

// function PostJob() {
//   const [formData, setFormData] = useState({
//     title: "",
//     companyName: "",
//     location: "",
//     experience: "",
//     salary: "",
//     jobType: "",
//     skills: "",
//     description: "",
//   });
//   const [logo, setLogo] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });
//     data.append("companyLogo", logo);

//     try {
//       await API.post("/jobs", data);
//       alert("Job posted successfully");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error posting job");
//     }
//   };

//   return (
//     <>
//       <h2 className="dashboard-title">Post a Job</h2>

//       <form
//         className="card p-4 shadow-sm"
//         style={{ maxWidth: "600px" }}
//         onSubmit={handleSubmit}
//       >
//         <input
//           name="title"
//           className="form-control mb-3"
//           placeholder="Job Title"
//           onChange={handleChange}
//         />

//         <input
//           name="companyName"
//           className="form-control mb-3"
//           placeholder="Company Name"
//           onChange={handleChange}
//         />

//         <input
//           type="file"
//           className="form-control mb-3"
//           accept="image/png, image/jpeg"
//           onChange={(e) => setLogo(e.target.files[0])}
//         />

//         <input
//           name="location"
//           className="form-control mb-3"
//           placeholder="Location"
//           onChange={handleChange}
//         />

//         <input
//           name="experience"
//           className="form-control mb-3"
//           placeholder="Experience Required"
//           onChange={handleChange}
//         />

//         <input
//           name="salary"
//           className="form-control mb-3"
//           placeholder="Salary"
//           onChange={handleChange}
//         />

//         <select
//           name="jobType"
//           className="form-select mb-3"
//           onChange={handleChange}
//         >
//           <option value="">Select Job Type</option>
//           <option>Full-time</option>
//           <option>Part-time</option>
//           <option>Internship</option>
//           <option>Remote</option>
//         </select>

//         <input
//           name="skills"
//           className="form-control mb-3"
//           placeholder="Skills Required"
//           onChange={handleChange}
//         />

//         <textarea
//           name="description"
//           className="form-control mb-3"
//           placeholder="Job Description"
//           rows="4"
//           onChange={handleChange}
//         />

//         <button className="btn btn-primary w-100">
//           Post Job
//         </button>
//       </form>
//     </>
//   );
// }

// export default PostJob;


import { useState } from "react";
import API from "../../services/api";
import "./PostJob.css";

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

    if (logo) data.append("companyLogo", logo);

    try {
      await API.post("/jobs", data);
      alert("Job posted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error posting job");
    }
  };

  return (
    <div className="postjob-wrapper">

      <div className="postjob-header">
        <h2>Post New Job</h2>
        <p>Create a job listing and start receiving applications</p>
      </div>

      <form className="postjob-card" onSubmit={handleSubmit}>

        {/* BASIC INFO */}
        <div className="postjob-section">
          <h5>Basic Information</h5>

          <input
            name="title"
            className="form-control postjob-input"
            placeholder="Job Title"
            onChange={handleChange}
          />

          <input
            name="companyName"
            className="form-control postjob-input"
            placeholder="Company Name"
            onChange={handleChange}
          />
        </div>

        {/* LOGO UPLOAD */}
        <div className="postjob-section">
          <h5>Company Logo</h5>

          <div className="postjob-upload-box">
            <input
              type="file"
              className="form-control postjob-file"
              accept="image/png, image/jpeg"
              onChange={(e) => setLogo(e.target.files[0])}
            />

            {logo && (
              <div className="postjob-logo-preview">
                <img
                  src={URL.createObjectURL(logo)}
                  alt="logo preview"
                />
              </div>
            )}
          </div>
        </div>

        {/* JOB DETAILS */}
        <div className="postjob-section">
          <h5>Job Details</h5>

          <input
            name="location"
            className="form-control postjob-input"
            placeholder="Location"
            onChange={handleChange}
          />

          <input
            name="experience"
            className="form-control postjob-input"
            placeholder="Experience Required"
            onChange={handleChange}
          />

          <input
            name="salary"
            className="form-control postjob-input"
            placeholder="Salary Range"
            onChange={handleChange}
          />

          <select
            name="jobType"
            className="form-select postjob-input"
            onChange={handleChange}
          >
            <option value="">Select Job Type</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>

        {/* SKILLS */}
        <div className="postjob-section">
          <h5>Required Skills</h5>

          <input
            name="skills"
            className="form-control postjob-input"
            placeholder="React, Node.js, MongoDB"
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="postjob-section">
          <h5>Job Description</h5>

          <textarea
            name="description"
            className="form-control postjob-textarea"
            rows="5"
            placeholder="Describe responsibilities, requirements, benefits..."
            onChange={handleChange}
          />
        </div>

        {/* SUBMIT */}
        <button className="postjob-submit-btn">
          Post Job
        </button>

      </form>

    </div>
  );
}

export default PostJob;
