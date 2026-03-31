import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import {
  createGetInTouch,
  getGetInTouchEntries,
  deleteGetInTouchEntry,
} from "../controller/getInTouchController.js";

const getInTouchRouter = express.Router();

getInTouchRouter.post("/", createGetInTouch);

getInTouchRouter.get("/", getGetInTouchEntries);

getInTouchRouter.delete("/:id", verifyUser, deleteGetInTouchEntry);

export default getInTouchRouter;
