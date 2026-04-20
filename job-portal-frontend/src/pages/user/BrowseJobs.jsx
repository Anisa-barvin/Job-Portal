

// import { useState } from "react";
// import JobList from "./JobList";

// function BrowseJobs() {
//   const [filters, setFilters] = useState({
//     keyword: "",
//     location: "",
//     jobType: "",
//     skills: "",
//   });

//   return (
//     <>
//       <h2 className="dashboard-title">Browse Jobs</h2>
//       <p className="text-muted mb-4">
//         Find jobs that match your skills
//       </p>

//       {/* FILTER BAR */}
//       <div className="card p-3 mb-4 shadow-sm">
//         <div className="row g-2">
//           <div className="col-md-3">
//             <input
//               className="form-control"
//               placeholder="Search job title"
//               onChange={(e) =>
//                 setFilters({ ...filters, keyword: e.target.value })
//               }
//             />
//           </div>

//           <div className="col-md-2">
//             <input
//               className="form-control"
//               placeholder="Location"
//               onChange={(e) =>
//                 setFilters({ ...filters, location: e.target.value })
//               }
//             />
//           </div>

//           <div className="col-md-2">
//             <select
//               className="form-select"
//               onChange={(e) =>
//                 setFilters({ ...filters, jobType: e.target.value })
//               }
//             >
//               <option value="">Job Type</option>
//               <option>Full-time</option>
//               <option>Part-time</option>
//               <option>Internship</option>
//               <option>Remote</option>
//             </select>
//           </div>

//           <div className="col-md-3">
//             <input
//               className="form-control"
//               placeholder="Skills (React, Java)"
//               onChange={(e) =>
//                 setFilters({ ...filters, skills: e.target.value })
//               }
//             />
//           </div>
//         </div>
//       </div>

//       <JobList filters={filters} />
//     </>
//   );
// }

// export default BrowseJobs;




import { useState } from "react";
import JobList from "./JobList";
import "./BrowseJobs.css";

function BrowseJobs() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    skills: "",
  });

  return (
    <>
      {/* ⭐ HEADER */}
      <div className="browse-header mb-4">
        <h2 className="fw-bold">🔎 Browse Jobs</h2>
        <p className="text-muted mb-0">
          Find opportunities that match your skills and career goals
        </p>
      </div>

      {/* ⭐ FILTER PANEL */}
      <div className="browse-filter-card mb-4">

        <div className="row g-3">

          {/* SEARCH TITLE */}
          <div className="col-md-3">
            <label className="filter-label">Job Title</label>
            <input
              className="form-control filter-input"
              placeholder="Frontend Developer"
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value })
              }
            />
          </div>

          {/* LOCATION */}
          <div className="col-md-2">
            <label className="filter-label">Location</label>
            <input
              className="form-control filter-input"
              placeholder="Chennai"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </div>

          {/* JOB TYPE */}
          <div className="col-md-2">
            <label className="filter-label">Job Type</label>
            <select
              className="form-select filter-input"
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
            >
              <option value="">All Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          {/* SKILLS */}
          <div className="col-md-3">
            <label className="filter-label">Skills</label>
            <input
              className="form-control filter-input"
              placeholder="React, Node, Java"
              onChange={(e) =>
                setFilters({ ...filters, skills: e.target.value })
              }
            />
          </div>

        </div>

      </div>

      {/* ⭐ RESULTS SECTION */}
      <div className="browse-results-card">
        <JobList filters={filters} />
      </div>
    </>
  );
}

export default BrowseJobs;
