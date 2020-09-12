import nodemailer from "nodemailer";

class EmailController {
  async send(user) {
    try {
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD // generated ethereal password
        }
      });

      let info = await transporter.sendMail({
        from: `${process.env.EMAIL}`, // sender address
        to: `${user.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `Hello`, // plain text body
        html: `<b> voici la key d'activation</b>` // html body
      });

      console.log("Message sent: %s", info.messageId);

      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (error) {
      console.log(error);
    }
  }
}

export default EmailController;
