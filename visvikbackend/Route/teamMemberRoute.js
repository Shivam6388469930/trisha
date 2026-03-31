import express from "express";
import upload from "../middleware/upload.js";
import {
  addTeamMember,
  deleteTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
} from "../controller/teamMemberController.js";
import verifyUser from "../middleware/authMiddleware.js";

const teamMemberRouter = express.Router();

teamMemberRouter.post("/", upload.single("image"), addTeamMember);
teamMemberRouter.get("/", getAllTeamMembers);
teamMemberRouter.get("/:id", getTeamMemberById);
teamMemberRouter.put(
  "/:id",
 
  upload.single("image"),
  updateTeamMember
);
teamMemberRouter.delete("/:id", deleteTeamMember);

export default teamMemberRouter;
