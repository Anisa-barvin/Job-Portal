import User from "../models/User.js";

export const toggleSaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.jobId;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadySaved = user.savedJobs.includes(jobId);

    if (alreadySaved) {
      user.savedJobs = user.savedJobs.filter(
        (id) => id.toString() !== jobId
      );
    } else {
      user.savedJobs.push(jobId);
    }

    await user.save();

    res.json({
      message: alreadySaved
        ? "Job removed from saved"
        : "Job saved successfully",
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedJobs");

    res.json(user.savedJobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
