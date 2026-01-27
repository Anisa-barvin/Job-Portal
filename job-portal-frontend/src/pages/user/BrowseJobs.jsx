// import JobList from "./JobList";

// function BrowseJobs() {
//   return (
//     <>
//       <h2 className="dashboard-title">Browse Jobs</h2>
//       <p className="text-muted mb-4">
//         Find jobs that match your skills
//       </p>

//       <JobList />
//     </>
//   );
// }

// export default BrowseJobs;


import { useState } from "react";
import JobList from "./JobList";

function BrowseJobs() {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
    skills: "",
  });

  return (
    <>
      <h2 className="dashboard-title">Browse Jobs</h2>
      <p className="text-muted mb-4">
        Find jobs that match your skills
      </p>

      {/* FILTER BAR */}
      <div className="card p-3 mb-4 shadow-sm">
        <div className="row g-2">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Search job title"
              onChange={(e) =>
                setFilters({ ...filters, keyword: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <input
              className="form-control"
              placeholder="Location"
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-select"
              onChange={(e) =>
                setFilters({ ...filters, jobType: e.target.value })
              }
            >
              <option value="">Job Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Skills (React, Java)"
              onChange={(e) =>
                setFilters({ ...filters, skills: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <JobList filters={filters} />
    </>
  );
}

export default BrowseJobs;
