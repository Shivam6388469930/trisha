import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salaryRange: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.models.Job || mongoose.model("Job", jobSchema);

export default jobModel;
