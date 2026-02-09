import { Suspense, lazy } from "react";
const PorscheViewer = lazy(() => import("../../animation/models/porsche"));
import { useForm, ValidationError } from "@formspree/react";
import "./_contact.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function ContactMe() {
  const [state, handleSubmit] = useForm("mjkrdkog");
  if (state.succeeded) {
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          marginTop: "7rem",
          marginBottom: "7rem",
        }}
      >
        Votre demande est bien soumise ! <br /> Axel vous contactera bientôt
      </p>
    );
  }
  return (
    <>
      <div className="layout-contact" id="contact">
        <div className="contact-form">
          <h3>Connectons-nous</h3>
          <form onSubmit={handleSubmit} action="">
            <div className="row">
              <div className="input-group">
                <label htmlFor="firstname">Prénom</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Votre prénom"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="input-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Votre nom"
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label htmlFor="mail">Email</label>
                <input
                  type="email"
                  name="email"
                  id="mail"
                  placeholder="exemple@email.com"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="06 12 34 56 78"
                />
                <ValidationError
                  prefix="Phone"
                  field="phone"
                  errors={state.errors}
                />
              </div>
            </div>

            <div className="input-group-full">
              <label htmlFor="message">Votre message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Écrivez votre message ici..."
              ></textarea>
              <ValidationError
                prefix="Message"
                field="message"
                errors={state.errors}
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="submit-btn"
            >
              Envoyer
            </button>
          </form>
        </div>

        <div className="porsche">
          <Suspense
            fallback={
              <div
                className="3d-loader"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width:"100%",
                  height:"100%"
                }}
              >
                <FontAwesomeIcon icon={faSpinner} spin/>
              </div>
            }
          >
            <PorscheViewer />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default ContactMe;
