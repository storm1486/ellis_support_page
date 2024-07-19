import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { senderEmail, name, content } = req.body;

    console.log("API Route Hit");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${senderEmail}" <${process.env.EMAIL_USER}>`, // Show sender's email in the display name
      replyTo: senderEmail, // Ensure replies go to the sender's email
      to: process.env.EMAIL_RECEIVER,
      subject: "Ellis Test Help Submission",
      text: `Name: ${name}\nRequest:\n${content}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to send email" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
