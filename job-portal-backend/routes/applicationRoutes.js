import express from "express";
import { applyJob,getApplicantsByJob,updateApplicationStatus, getMyApplications,getRecruiterApplications,getUserDashboardStats,getRecruiterDashboardStats, } from "../controllers/applicationController.js";
import protect from "../middleware/authMiddleware.js";
import resumeUpload from "../middleware/resumeUpload.js";

const router = express.Router();

router.post("/", protect, resumeUpload.single("resume"), applyJob);
router.get("/job/:jobId", protect, getApplicantsByJob);
router.put("/:id/status", protect, updateApplicationStatus);
router.get("/my", protect, getMyApplications);
router.get("/recruiter", protect, getRecruiterApplications);
router.get("/stats/user", protect, getUserDashboardStats);
router.get("/stats/recruiter", protect, getRecruiterDashboardStats);


export default router;
