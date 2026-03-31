// controllers/jobController.js
import {
  addJobService,
  getAllJobsService,
  updateJobService,
  deleteJobService,
  getJobByJobIdService,
} from "../services/jobService.js";

export const addJob = async (req, res) => {
  try {
    const { title, description, salaryRange, requirements } = req.body;

    if (!title || !description || !salaryRange) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and salaryRange are required",
      });
    }

    // Optional: Validate requirements as an array of strings
    let reqArray = [];
    if (requirements) {
      if (!Array.isArray(requirements)) {
        return res.status(400).json({
          success: false,
          message: "Requirements must be an array of strings",
        });
      }
      reqArray = requirements.filter(
        (r) => typeof r === "string" && r.trim() !== ""
      );
    }

    const job = await addJobService(title, description, salaryRange, reqArray);
    res.status(201).json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding job" });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsService();
    res.json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching jobs" });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await getJobByJobIdService(req.params.jobId);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching job" });
  }
};

export const updateJob = async (req, res) => {
  try {
    // Allow requirements update
    const updates = { ...req.body };
    if (updates.requirements && !Array.isArray(updates.requirements)) {
      return res
        .status(400)
        .json({ success: false, message: "Requirements must be an array" });
    }

    const job = await updateJobService(req.params.id, updates);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.json({ success: true, data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating job" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await deleteJobService(req.params.id);
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting job" });
  }
};
