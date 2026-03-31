import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controller/project.js";   // IMPORTANT: add .js

const project = express.Router();

// Create
project.post("/", createProject);

// Read
project.get("/", getAllProjects);
project.get("/:id", getProjectById);

// Update
project.put("/:id", updateProject);

// Delete
project.delete("/:id", deleteProject);

export default project;
