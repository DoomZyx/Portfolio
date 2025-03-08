const sendEmail = require("../nodemailer/nodemailer.config");

exports.contactFormHandler = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs sont requis !" });
  }

  try {
    await sendEmail(
      process.env.ALERT_EMAIL, 
      "Nouveau message de contact",
      `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`
    );
    
    res.status(200).json({ message: "Email envoyé avec succès !" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
  }
};
