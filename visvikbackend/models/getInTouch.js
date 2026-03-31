import mongoose from "mongoose";

const getInTouchSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      require: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const getInTouchModel =
  mongoose.models.GetInTouch || mongoose.model("GetInTouch", getInTouchSchema);

export default getInTouchModel;
