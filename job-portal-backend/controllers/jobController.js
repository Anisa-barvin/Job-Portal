import Job from "../models/Job.js";
import User from "../models/User.js";
import { calculateMatch } from "../utils/resumeMatcher.js";


export const getRecommendedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobs = await Job.find();

    const recommended = jobs.map((job) => {
      const match = calculateMatch(job.skills, user.skills);
      return {
        ...job.toObject(),
        matchPercentage: match.percentage,
      };
    });

    // Sort by match %
    recommended.sort(
      (a, b) => b.matchPercentage - a.matchPercentage
    );

    res.json(recommended);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const job = new Job({
      title: req.body.title,
      companyName: req.body.companyName,
      companyLogo: req.file ? `/uploads/${req.file.filename}` : "",
      location: req.body.location,
      experience: req.body.experience,
      salary: req.body.salary,
      jobType: req.body.jobType,
      skills: req.body.skills,
      description: req.body.description,
      postedBy: req.user.id,
    });

    await job.save();
    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // allow only owner (recruiter) to delete
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const {
      keyword,
      location,
      jobType,
      skills,
      page = 1,
      limit = 5,
    } = req.query;

    let query = {};

    if (keyword) {
      query.title = { $regex: keyword, $options: "i" };
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (jobType) {
      query.jobType = jobType;
    }

    if (skills) {
      query.skills = { $regex: skills, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const totalJobs = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      jobs,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
