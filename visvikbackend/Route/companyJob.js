import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import {
  addJob,
  deleteJob,
  getAllJobs,
  getJobById,
  updateJob,
} from "../controller/jobController.js";

const companyJobRouter = express.Router();

companyJobRouter.post("/", verifyUser, addJob);
companyJobRouter.get("/", getAllJobs);
companyJobRouter.get("/jobid/:jobId", getJobById);
companyJobRouter.put("/:id", verifyUser, updateJob);
companyJobRouter.delete("/:id", verifyUser, deleteJob);

export default companyJobRouter;
