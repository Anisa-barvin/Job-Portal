import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../auth/Login";
import Register from "../auth/Register";
import UserDashboard from "../user/UserDashboard";
import RecruiterDashboard from "../recruiter/RecruiterDashboard";
import ApplyJob from "../user/ApplyJob";
import JobDetails from "../recruiter/JobDetails";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword"; 

import ProtectedRoute from "../../components/ProtectedRoute";
import Unauthorized from "../Unauthorized";
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        
       <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute allowedRoles={["recruiter"]}>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />
      <Route path="/user/apply/:id" element={<ApplyJob />} />
      <Route path="/recruiter/jobs/:id" element={<JobDetails />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

    </Routes>
  );
}

export default AppRoutes;
