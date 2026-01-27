import JobList from "./JobList";

function BrowseJobs() {
  return (
    <>
      <h2 className="dashboard-title">Browse Jobs</h2>
      <p className="text-muted mb-4">
        Find jobs that match your skills
      </p>

      <JobList />
    </>
  );
}

export default BrowseJobs;
