import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  toggleSaveJob,
  getSavedJobs,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/save/:jobId", protect, toggleSaveJob);
router.get("/saved", protect, getSavedJobs);

export default router;
