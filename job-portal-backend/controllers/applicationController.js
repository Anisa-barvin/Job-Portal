import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyJob = async (req, res) => {
  try {
    const applicationExists = await Application.findOne({
      job: req.body.jobId,
      user: req.user.id,
    });

    if (applicationExists) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    const application = new Application({
      job: req.body.jobId,
      user: req.user.id,
      resume: `/uploads/resumes/${req.file.filename}`,
    });

    await application.save();

    res.status(201).json({
      message: "Job applied successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getApplicantsByJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    res.json({
      message: `Application ${status} successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    })
      .populate("job", "title companyName")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getRecruiterApplications = async (req, res) => {
  try {
    // find jobs posted by recruiter
    const jobs = await Job.find({ postedBy: req.user.id }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    // find applications for those jobs
    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate("user", "name email")
      .populate("job", "title")
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getUserDashboardStats = async (req, res) => {
  try {
    const total = await Application.countDocuments({ user: req.user.id });
    const accepted = await Application.countDocuments({
      user: req.user.id,
      status: "accepted",
    });
    const rejected = await Application.countDocuments({
      user: req.user.id,
      status: "rejected",
    });
    const pending = await Application.countDocuments({
      user: req.user.id,
      status: "pending",
    });

    res.json({
      total,
      accepted,
      rejected,
      pending,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getRecruiterDashboardStats = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    const totalJobs = jobs.length;
    const totalApplications = await Application.countDocuments({
      job: { $in: jobIds },
    });
    const accepted = await Application.countDocuments({
      job: { $in: jobIds },
      status: "accepted",
    });
    const pending = await Application.countDocuments({
      job: { $in: jobIds },
      status: "pending",
    });

    res.json({
      totalJobs,
      totalApplications,
      accepted,
      pending,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
