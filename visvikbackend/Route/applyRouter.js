import express from "express";

import verifyUser from "../middleware/authMiddleware.js";
import {
  addApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
} from "../controller/applyController.js";
import uploadPdf from "../middleware/uploadPdf.js";

const applyRouter = express.Router();

applyRouter.post(
  "/",
  uploadPdf.fields([
    { name: "resume", maxCount: 1 },
    { name: "additionalDocument", maxCount: 1 },
  ]),
  addApplication
);

applyRouter.get("/", verifyUser, getAllApplications);
applyRouter.get("/:id", verifyUser, getApplicationById);
applyRouter.put(
  "/:id",
  verifyUser,
  uploadPdf.fields([
    { name: "resume", maxCount: 1 },
    { name: "additionalDocument", maxCount: 1 },
  ]),
  updateApplication
);
applyRouter.delete("/:id", verifyUser, deleteApplication);
applyRouter.patch("/:id/status", verifyUser, updateApplicationStatus);
export default applyRouter;
