import express from "express";
import {
  sendCustomMail,
  sendRejectedTemplateMail,
} from "../controller/mailController.js";
import verifyUser from "../middleware/authMiddleware.js";

const mailRouter = express.Router();

mailRouter.post("/send", verifyUser, sendCustomMail); // For Interview Scheduled & Hired
mailRouter.post("/send-rejected", verifyUser, sendRejectedTemplateMail); // Prebuilt rejection mail

export default mailRouter;
