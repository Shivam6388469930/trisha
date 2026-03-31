import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      enum: ["founder", "developer", "business","designer"],
      required: true,
    },
    image: {
      type: String,
    },
    imagePublicId: { type: String },
  },
  { timestamps: true }
);

const teamMemberModel =
  mongoose.models.Team || mongoose.model("Team", teamMemberSchema);

export default teamMemberModel;
