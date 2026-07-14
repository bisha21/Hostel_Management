import nodemailer from "nodemailer";
import { env } from "../config/env.js";

export interface EmailOptions {
  email: string | string[];
  subject: string;
  message: string;
}

function createTransport() {
  return nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: env.EMAIL,
      pass: env.EMAIL_PASSWORD,
    },
  });
}

/** Sends a notification email to one or more recipients. */
export const sendMail = async (options: EmailOptions): Promise<void> => {
  if (!options.email || (Array.isArray(options.email) && options.email.length === 0)) {
    console.error("No recipients defined");
    return;
  }

  const transport = createTransport();
  const recipients = Array.isArray(options.email) ? options.email.join(", ") : options.email;

  await transport.sendMail({
    from: "Bishal Timilsina <timilsina@gmail.com>",
    to: recipients,
    subject: options.subject,
    text: options.message,
  });
};

/** Forwards a complaint/booking notice from the submitter to the admin inbox. */
export const sendComplaintMail = async (options: EmailOptions): Promise<void> => {
  const transport = createTransport();
  const recipients = Array.isArray(options.email) ? options.email.join(", ") : options.email;

  await transport.sendMail({
    from: recipients,
    to: env.EMAIL,
    replyTo: recipients,
    subject: options.subject,
    text: options.message,
  });
};
