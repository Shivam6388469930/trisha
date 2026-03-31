// // models/Service.js  ← Make sure filename is Service.js (not services.js)
// import mongoose from "mongoose";

// const serviceSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     category: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     icon: { type: String, required: true, default: "Tool" },
//     accentColor: { type: String, default: "#00a8ff" },
//     timeline: { type: String, required: true },
//     revisions: { type: Number, required: true },
//     features: [{ type: String }],
//     technologies: [{ type: String }],
//     image: { type: String }, // stores: /uploads/services/filename.jpg
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Service || mongoose.model("Service", serviceSchema);


// models/Service.js
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  
    timeline: { type: String, required: true },
    revisions: { type: Number, required: true, min: 0 },
    features: [{ type: String }],
    technologies: [{ type: String }],
    image: { type: String },           // Cloudinary URL
    imagePublicId: { type: String },   // For deletion
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", serviceSchema);