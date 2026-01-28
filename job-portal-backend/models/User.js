import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "recruiter"],
      required: true,
    },
    companyName: {
      type: String,
    },
    savedJobs: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
],
resetPasswordToken: String,
resetPasswordExpire: Date,


  },
  
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
