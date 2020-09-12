const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

//getAllCategories
exports.getAllContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createContact = async (req, res) => {
  const { email, message } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL, // ethereal user
        pass: process.env.PASSWORD // ethereal password
      }
    });

    const msg = {
      from: `${email}`, // sender address
      to: `${process.env.EMAIL}`, // list of receivers
      subject: "Sup", // Subject line
      text: `${message}` // plain text body
    };

    const info = await transporter.sendMail(msg);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send("Email Sent!");
  } catch (error) {
    res.status(500).json(error);
  }
};
