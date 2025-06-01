require("dotenv").config();
const express = require("express")
const nodemailer = require("nodemailer");
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/send-email", async(req, res) => {
        const { name, email, message } = req.body;
        //Email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: `New Contact Form Submission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: "Email sent successfully!" })
        } catch (error) {
            console.log("Error sending Email:", error);
            res.status(500).json({ success: false, message: "Failed to send Email." })
        }
    })
    //start server here
app.listen(PORT, () =>
    console.log(`Server is running on the PORT ${process.env.PORT}`)
)