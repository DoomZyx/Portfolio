import "./_contact.scss";
import { useState } from "react";

import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/contact/send-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setResponseMessage("Message envoyé avec succès !");
        setFormData({
          name: "",
          surname: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setResponseMessage("Erreur : " + data.error);
      }
    } catch (error) {
      setResponseMessage("Une erreur est survenue, veuillez réessayer.");
    }

    setLoading(false);
  };

  return (
    <>
      <section className="layout-contact" id="contact">
        <h2 className="contact-title"> {t("contactme-title")} </h2>
        <h3 className="contact-text"> {t("contactme-text")} </h3>

        <form onSubmit={handleSubmit}>
          <div className="name-field">
            <input
              type="text"
              name="name"
              id="nom"
              placeholder={t("placeholder-name")}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="surname"
              id="prenom"
              placeholder={t("placeholder-surname")}
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>

          <div className="com-field">
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("placeholder-mail")}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder={t("placeholder-phone")}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={t("placeholder-object")}
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            id="message"
            rows={15}
            placeholder={t("placeholder-request")}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <div className="checkbox">
            <input type="checkbox" name="data" id="data" required />
            <label htmlFor="data"> {t("label-form")} </label>
          </div>

          <input type="submit" value={t("send-but")} disabled={loading} />
          {loading ? "..." : ""}
        </form>

        {responseMessage && <p>{responseMessage}</p>}
      </section>
    </>
  );
}

export default Contact;
