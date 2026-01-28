import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import applicationSubmittedTemplate from "../utils/emailTemplates/applicationSubmitted.js";
import newApplicationTemplate from "../utils/emailTemplates/newApplication.js";
import applicationStatusTemplate from "../utils/emailTemplates/applicationStatus.js";

// export const applyJob = async (req, res) => {
//   try {
//     const applicationExists = await Application.findOne({
//       job: req.body.jobId,
//       user: req.user.id,
//     });

//     if (applicationExists) {
//       return res.status(400).json({
//         message: "You have already applied for this job",
//       });
//     }

//     const application = new Application({
//       job: req.body.jobId,
//       user: req.user.id,
//       resume: `/uploads/resumes/${req.file.filename}`,
//     });

//     await application.save();

//     res.status(201).json({
//       message: "Job applied successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const existing = await Application.findOne({
      job: jobId,
      user: req.user.id,
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = new Application({
      job: jobId,
      user: req.user.id,
      resume: `/uploads/resumes/${req.file.filename}`,
    });

    await application.save();

    // 🔔 EMAIL NOTIFICATIONS
    const user = await User.findById(req.user.id);
    const job = await Job.findById(jobId).populate("postedBy", "email");

    // // Email to User
    // await sendEmail(
    //   user.email,
    //   "Job Application Submitted",
    //   `You have successfully applied for the job: ${job.title}`
    // );

    // // Email to Recruiter
    // await sendEmail(
    //   job.postedBy.email,
    //   "New Job Application",
    //   `A new candidate has applied for your job: ${job.title}`
    // );

    await sendEmail(
  user.email,
  "Application Submitted",
  applicationSubmittedTemplate(user.name, job.title)
);

await sendEmail(
  job.postedBy.email,
  "New Job Application",
  newApplicationTemplate(job.title, user.name)
);
    res.status(201).json({ message: "Applied successfully" });
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


// export const updateApplicationStatus = async (req, res) => {
//   const { status } = req.body;

//   if (!["accepted", "rejected"].includes(status)) {
//     return res.status(400).json({ message: "Invalid status" });
//   }

//   try {
//     const application = await Application.findById(req.params.id);

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     application.status = status;
//     await application.save();

//     res.json({
//       message: `Application ${status} successfully`,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const application = await Application.findById(req.params.id)
      .populate("user", "email name")
      .populate("job", "title");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    await application.save();

    // 🔔 EMAIL TO USER
    const subject =
      status === "accepted"
        ? "🎉 Application Accepted"
        : "❌ Application Rejected";

    const message =
      status === "accepted"
        ? `Congratulations! You have been selected for the job: ${application.job.title}`
        : `Unfortunately, your application for ${application.job.title} was not selected.`;

   await sendEmail(
  application.user.email,
  "Application Status Update",
  applicationStatusTemplate(
    application.user.name,
    application.job.title,
    status
  )
);

    res.json({ message: `Application ${status}` });
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


export const getRecruiterChartStats = async (req, res) => {
  try {
    // Jobs posted by recruiter
    const jobs = await Job.find({ postedBy: req.user.id });

    // Applications per job (bar chart)
    const applicationsPerJob = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ job: job._id });
        return {
          jobTitle: job.title,
          applications: count,
        };
      })
    );

    // Status distribution (pie chart)
    const accepted = await Application.countDocuments({
      status: "accepted",
      job: { $in: jobs.map((j) => j._id) },
    });

    const rejected = await Application.countDocuments({
      status: "rejected",
      job: { $in: jobs.map((j) => j._id) },
    });

    const pending = await Application.countDocuments({
      status: "pending",
      job: { $in: jobs.map((j) => j._id) },
    });

    res.json({
      applicationsPerJob,
      statusDistribution: [
        { name: "Accepted", value: accepted },
        { name: "Rejected", value: rejected },
        { name: "Pending", value: pending },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
