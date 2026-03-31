import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    features: [{ type: String }],
    status: { type: String, enum: ["Completed", "In Progress", "Planned"], default: "Planned" },
    year: { type: String, required: true },
    icon: { type: String, default: "📌" },
    accentColor: { type: String, default: "#00a8ff" },
    liveUrl: { type: String },
    githubUrl: { type: String },
  },
  { timestamps: true }
);

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;
