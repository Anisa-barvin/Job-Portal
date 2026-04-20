import express from "express";
import upload from "../middleware/upload.js";
import { createJob,
     getMyJobs,
  deleteJob,
  getJobById,
  getAllJobs,
  getRecommendedJobs
 } from "../controllers/jobController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("companyLogo"),
  createJob
);
router.get(
  "/recommended",
  protect,
  getRecommendedJobs
);


router.get("/myjobs", protect, getMyJobs);
router.get("/", getAllJobs);
router.delete("/:id", protect, deleteJob);
router.get("/:id", protect, getJobById);

export default router;
