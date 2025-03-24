import nodemailer from 'nodemailer';
import { env } from './env.js';
import { ENV_VARS } from '../constants/index.js';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = ENV_VARS.BREVO;

console.log("📧 SMTP Login:", env(SMTP_USER));
console.log("🔑 SMTP Password:", env(SMTP_PASSWORD));

const transporter = nodemailer.createTransport({
  host: env(SMTP_HOST),
  port: Number(env(SMTP_PORT)),
  auth: {
    user: env(SMTP_USER),
    pass: env(SMTP_PASSWORD),
  },
});

export const sendEmail = async (options) => {
  try {
    const info = await transporter.sendMail(options);
    console.log("✅ Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Failed to send the email, please try again later.");
  }
};

