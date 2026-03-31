import { sendMailAndSave, sendRejectedMail } from "../services/mailService.js";

export const sendCustomMail = async (req, res) => {
  try {
    const { userEmail, subject, description, signature } = req.body;

    if (!userEmail || !subject || !description) {
      return res.status(400).json({
        success: false,
        message: "userEmail, subject, and description are required",
      });
    }

    const { info, mailRecord } = await sendMailAndSave({
      userEmail,
      subject,
      description,
      signature,
    });

    res
      .status(200)
      .json({ success: true, data: mailRecord, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending custom mail:", error);
    res.status(500).json({ success: false, message: "Failed to send mail" });
  }
};

export const sendRejectedTemplateMail = async (req, res) => {
  try {
    const { userEmail, signature } = req.body;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "userEmail is required",
      });
    }

    const { info, mailRecord } = await sendRejectedMail({
      userEmail,
      signature,
    });

    res
      .status(200)
      .json({ success: true, data: mailRecord, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending rejected mail:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send rejected mail" });
  }
};
