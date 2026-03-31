import mongoose from "mongoose";

const applySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },

    jobId: {
      type: String, 
      required: true,
    },

    expectedSalary: {
      type: String,
      minlength: 1,
      maxlength: 2,
      trim: true,
      required: true,
    },
    experience: {
      type: String,
      minlength: 1,
      maxlength: 2,
      trim: true,
      required: true,
    },
    noticePeriod: {
      type: Number,
      required: true,
      min: [0, "Notice period cannot be negative"],
      max: [30, "Notice period cannot exceed 30 days"],
    },

    resume: { type: String, required: true },
    additionalDocument: { type: String },

    resumePublicId: { type: String },
    additionalDocumentPublicId: { type: String },

    status: {
      type: String,
      enum: [
        "Pending",
        "Reviewed",
        "Interview Scheduled",
        "Rejected",
        "Hired",
      ],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const applyModel =
  mongoose.models.Applied || mongoose.model("Applied", applySchema);

export default applyModel;
