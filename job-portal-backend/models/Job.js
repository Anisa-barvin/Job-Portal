import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: String,
    companyName: String,
    companyLogo: String,
    location: String,
    experience: String,
    salary: String,
    jobType: String,
    skills: String,
    description: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
