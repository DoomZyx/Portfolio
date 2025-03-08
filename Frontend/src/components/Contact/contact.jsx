import "./_contact.scss";

function Contact() {
  return (
    <>
      <section className="layout-contact" id="contact">
        <h2 className="contact-title">ME CONTACTER</h2>
        <h3 className="contact-text">
          N’hésitez pas à me contacter, je vous répondrais dans les plus brefs
          délais
        </h3>

        <form>
          <div className="name-field">
            <input type="text" name="nom" id="nom" placeholder="Nom" required />
            <input type="text" name="prenom" id="prenom" placeholder="Prénom" required />
          </div>

          <div className="com-field">
            <input type="email" name="mail" id="mail" placeholder="E-mail" required />
            <input
              type="tel"
              name="number"
              id="number"
              placeholder="Téléphone"
              required
            />
          </div>

          <input type="text" name="objet" id="objet" placeholder="Objet" required />

          <textarea
            name="message"
            id="message"
            rows={15}
            placeholder="Écrivez votre demande"
            required
          ></textarea>

          <div className="checkbox">
          <input type="checkbox" name="data" id="data" required />
          <label htmlFor="data">
            En soumettant ce formulaire, j'accepte que mes données personnelles
            soient utilisées pour me recontacter. Aucun autre traitement ne sera
            effectué avec mes informations. Pour connaître et exercer vos
            droits, veuillez consultez la Politique de confidentialité.
          </label>
         </div>

          <input type="submit" value="Envoyer" />
        </form>
      </section>
    </>
  );
}

export default Contact;
