import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { senderEmail, input1, input2, input3 } = req.body;

    console.log(senderEmail)

    console.log("USER", process.env.EMAIL_USER);
    console.log("PASS", process.env.EMAIL_PASS);
    console.log("RECEIVER", process.env.EMAIL_RECEIVER);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: process.env.EMAIL_RECEIVER,
      subject: "Form Submission",
      text: `Input1: ${input1}, Input2: ${input2}, Input3: ${input3}`,
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
