import mongoose from "mongoose";

const mailSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    signature: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Mail", mailSchema);
