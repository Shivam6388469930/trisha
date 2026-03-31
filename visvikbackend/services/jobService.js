import jobModel from "../models/job.js";

// Auto-increment Job ID generator
const generateJobId = async () => {
  const lastJob = await jobModel
    .findOne({}, { jobId: 1 })
    .sort({ jobId: -1 })
    .lean();

  return lastJob ? (parseInt(lastJob.jobId) + 1).toString() : "125730";
};

export const addJobService = async (
  title,
  description,
  salaryRange,
  requirements
) => {
  const jobId = await generateJobId();
  const job = new jobModel({
    jobId,
    title,
    description,
    salaryRange,
    requirements,
  });
  return await job.save();
};

export const getAllJobsService = async () => {
  return await jobModel.find().sort({ createdAt: -1 });
};

export const getJobByJobIdService = async (jobId) => {
  return await jobModel.findOne({ jobId });
};

export const updateJobService = async (jobId, updates) => {
  return await jobModel.findOneAndUpdate({ jobId }, updates, { new: true });
};

export const deleteJobService = async (jobId) => {
  return await jobModel.findOneAndDelete({ jobId });
};
