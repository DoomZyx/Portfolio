const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmail = async ({ name, surname, email, phone, subject, message }) => {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL,
      subject: `📩 Nouveau message de : ${subject}`,
      text: `
       Nouveau message reçu :

        Nom : ${name} ${surname}
        Email : ${email}
        Téléphone : ${phone}
        Objet : ${subject}
        
        Message :
        ${message}
      `,
    });

    console.log("Email envoyé avec succès !");
  } catch (error) {
    console.error("Erreur d'envoi d'email :", error);
  }
};

module.exports = sendEmail;
