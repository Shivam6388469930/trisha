import express from "express";
import verifyUser from "../middleware/authMiddleware.js";
import {
  createQuery,
  deleteQuery,
  getQueries,
} from "../controller/queryController.js";

const queryRouter = express.Router();

queryRouter.get("/", getQueries);
queryRouter.post("/", createQuery);
queryRouter.delete("/:id", deleteQuery);

export default queryRouter;
