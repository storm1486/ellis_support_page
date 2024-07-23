const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {log, error: _error} = require("firebase-functions/logger");

// Import Firebase Admin SDK and initialize the app
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

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

exports.addmessage = onRequest(async (req, res) => {
  const original = req.query.text;
  const writeResult = await getFirestore()
      .collection("form")
      .add({original: original});
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.sendEmailOnFormSubmit = onDocumentCreated(
    "/form/{documentId}",
    async (event) => {
      const original = event.data.data().original;
      log("Processing new message:", original);

      const mailOptions = {
        from: gmailEmail,
        to: "patelmit8292@gmail.com",
        subject: "New Message Received",
        text: `You have submitted: ${original}`,
        html: `<strong>You have submitted: ${original}</strong>`,
      };

      try {
        await mailTransport.sendMail(mailOptions);
        log("Email sent successfully");
      } catch (error) {
        _error("Error sending email:", error.toString());
      }
    },
);
