const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yuvikasingh17@gmail.com",
    pass: "dipgmokcswgnsvhi",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    const name = `${firstName} ${lastName}`;
    
    const mail = {
      from: name,
      to: "syuvi0902@gmail.com",
      subject: "Contact Form Submission - Portfolio",
      html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `,
    };

    await contactEmail.sendMail(mail);
    
    res.status(200).json({ 
      code: 200, 
      status: "Message Sent" 
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ 
      code: 500, 
      status: "Server Error", 
      message: "Failed to send email" 
    });
  }
});