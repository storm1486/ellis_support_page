const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {log, error: _error} = require("firebase-functions/logger");

// Import Firebase Admin SDK and initialize the app
const {initializeApp} = require("firebase-admin/app");

// Import Nodemailer for sending emails
const {createTransport} = require("nodemailer");

// Initialize Firebase app
initializeApp();

// For GMail, enable "Allow less secure apps" or create an App Password
const gmailEmail = process.env.GMAIL_EMAIL;
const gmailPassword = process.env.GMAIL_PASSWORD;

const mailTransport = createTransport({
  service: "gmail",
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});

exports.sendEmailOnFormSubmit = onDocumentCreated(
    "/form/{documentId}",
    async (event) => {
      const formData = event.data.data();
      const {name, email, message} = formData;

      log("Processing new form submission:", formData);

      const mailOptions = {
        from: gmailEmail,
        to: email,
        subject: "New Message Received",
        text: `Dear ${name},\n\nYou have submitted: ${message}`,
        html: `<p>Dear ${name},</p><p>You have submitted: ${message}</p>`,
      };

      try {
        await mailTransport.sendMail(mailOptions);
        log("Email sent successfully to:", email);
      } catch (error) {
        _error("Error sending email:", error.toString());
      }
    },
);
