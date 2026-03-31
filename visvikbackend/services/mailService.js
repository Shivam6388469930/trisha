import Mail from "../models/mailModel.js";
import { transporter } from "../config/mailer.js";

const REJECTED_TEMPLATE = (signature) => `
  <p>Dear Candidate,</p>
  <p>Thank you for applying for the position. Unfortunately, we will not be moving forward with your application at this time.</p>
  <p>We appreciate your interest and wish you the best in your job search.</p>
  ${signature ? `<p>${signature}</p>` : ""}
`;

export const sendMailAndSave = async ({
  userEmail,
  subject,
  description,
  signature,
}) => {
  const htmlContent = `
    ${description}
    ${signature ? `<br><br>${signature}` : ""}
  `;

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: userEmail,
    subject,
    html: htmlContent,
  });

  const mailRecord = await Mail.create({
    userEmail,
    subject,
    description,
    signature: signature || "",
  });

  return { info, mailRecord };
};

export const sendRejectedMail = async ({ userEmail, signature }) => {
  const htmlContent = REJECTED_TEMPLATE(signature);

  const info = await transporter.sendMail({
    from: `"${process.env.FROM_NAME || "HR Team"}" <${process.env.SMTP_USER}>`,
    to: userEmail,
    subject: "Application Update",
    html: htmlContent,
  });

  const mailRecord = await Mail.create({
    userEmail,
    subject: "Application Update",
    description: htmlContent,
    signature: signature || "",
  });

  return { info, mailRecord };
};
