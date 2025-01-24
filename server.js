const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// Middleware to serve static files (for React frontend)
app.use(express.static(path.join(__dirname, "build")));

// Configure CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000", // Use environment variable for client URL
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);

// Parse JSON requests
app.use(express.json());
app.use("/", router);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));

// Serve React frontend for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Nodemailer configuration
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Use environment variable for email
    pass: process.env.EMAIL_PASS, // Use environment variable for email password
  },
});

// Verify the email transport
contactEmail.verify((error) => {
  if (error) {
    console.log("Email transport error:", error);
  } else {
    console.log("Ready to Send Emails");
  }
});

// Contact form route
router.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    const name = `${firstName} ${lastName}`;

    const mail = {
      from: name,
      to: process.env.CONTACT_EMAIL || "syuvi0902@gmail.com", // Use environment variable for recipient email
      subject: "Contact Form Submission - Portfolio",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    // Send email
    await contactEmail.sendMail(mail);

    res.status(200).json({
      code: 200,
      status: "Message Sent",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      code: 500,
      status: "Server Error",
      message: "Failed to send email",
    });
  }
});
