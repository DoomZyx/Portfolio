import "./_contact.scss";
import { useForm, ValidationError } from "@formspree/react";
import { useTranslation } from "react-i18next";
import Observer from "../animation/Observer";

function Contact() {
  const { t } = useTranslation();
  const [ref, isVisible] = Observer();

  const [state, handleSubmit] = useForm("mnnpvggb");

  if (state.succeeded) {
    return <h2 className="msg-rtv">{t("form-success")}</h2>;
  }

  return (
    <>
      <section
        ref={ref}
        className={`layout-contact ${isVisible ? "active" : ""}`}
        id="contact"
      >
        <h2 className="contact-title"> {t("contactme-title")} </h2>
        <h3 className="contact-text"> {t("contactme-text")} </h3>
        <form onSubmit={handleSubmit}>
          <div className="name-field">
            <label className="sr-only" htmlFor="nom">
              Nom
            </label>
            <input
              type="text"
              name="name"
              id="nom"
              placeholder={t("placeholder-name")}
              required
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <label className="sr-only" htmlFor="prenom">
              Prénom
            </label>
            <input
              type="text"
              name="surname"
              id="prenom"
              placeholder={t("placeholder-surname")}
              required
            />
            <ValidationError
              prefix="Surname"
              field="surname"
              errors={state.errors}
            />
          </div>
          <div className="com-field">
            <label className="sr-only" htmlFor="email">
              email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={t("placeholder-mail")}
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <label className="sr-only" htmlFor="phone">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder={t("placeholder-phone")}
              required
            />
            <ValidationError
              prefix="Phone"
              field="phone"
              errors={state.errors}
            />
          </div>
          <label className="sr-only" htmlFor="subject">
            Motif
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder={t("placeholder-object")}
            required
          />
          <ValidationError
            prefix="Subject"
            field="subject"
            errors={state.errors}
          />
          <label className="sr-only" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={15}
            placeholder={t("placeholder-request")}
            required
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <div className="checkbox">
            <input type="checkbox" name="data" id="data" required />
            <label htmlFor="data"> {t("label-form")} </label>
            <ValidationError
              prefix="Consent"
              field="data"
              errors={state.errors}
            />
          </div>
          <input
            aria-label="Envoyer"
            type="submit"
            value={t("send-but")}
            disabled={state.submitting}
          />
        </form>
      </section>
    </>
  );
}

export default Contact;
