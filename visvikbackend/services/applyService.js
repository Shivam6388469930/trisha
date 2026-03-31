import applyModel from "../models/applyModel.js";
import jobModel from "../models/job.js";

export const addApplicationService = async (data) => {
  return await applyModel.create(data);
};

export const getAllApplicationsService = async (filters = {}) => {
  const query = {};
  if (filters.jobId) query.jobId = filters.jobId;
  if (filters.status) query.status = filters.status;

  const applications = await applyModel.find(query).lean(); // lean() for plain objects

  // Attach job info
  const jobIds = [...new Set(applications.map((a) => a.jobId))];
  const jobs = await jobModel.find({ jobId: { $in: jobIds } }).lean();
  const jobMap = Object.fromEntries(jobs.map((j) => [j.jobId, j]));

  return applications.map((app) => ({
    ...app,
    job: jobMap[app.jobId] || null,
  }));
};

export const getApplicationByIdService = async (id) => {
  const app = await applyModel.findById(id).lean();
  if (!app) return null;

  const job = await jobModel.findOne({ jobId: app.jobId }).lean();
  return {
    ...app,
    job: job || null,
  };
};

export const updateApplicationService = async (id, updates) => {
  return await applyModel.findByIdAndUpdate(id, updates, { new: true });
};

export const deleteApplicationService = async (id) => {
  return await applyModel.findByIdAndDelete(id);
};
