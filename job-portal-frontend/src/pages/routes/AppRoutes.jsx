import { Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import UserDashboard from "../user/UserDashboard";
import RecruiterDashboard from "../recruiter/RecruiterDashboard";
import ApplyJob from "../user/ApplyJob";
import JobDetails from "../recruiter/JobDetails";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
      <Route path="/user/apply/:id" element={<ApplyJob />} />
      <Route path="/recruiter/jobs/:id" element={<JobDetails />} />

    </Routes>
  );
}

export default AppRoutes;
