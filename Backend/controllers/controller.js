const sendEmail = require("../nodemailer/nodemailer.config");

exports.contactFormHandler = async (req, res) => {
  const { name, surname, email, phone, subject, message } = req.body;

  if (!name || !surname || !email || !phone || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis !" });
  }

  try {
    await sendEmail({ name, surname, email, phone, subject, message });

    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
};