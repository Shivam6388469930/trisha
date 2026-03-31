import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
    tls: {
    rejectUnauthorized: false, // <--- this ignores self-signed cert
  },
});

transporter.verify().then(() => {
  console.log("✅ Mail server ready");
}).catch((err) => {
  console.error("❌ Mail server connection failed:", err.message);
});
