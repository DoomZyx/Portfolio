import "./_backgroundabout.scss";
import "../AboutMe/_aboutMe.scss";

import image1 from "/background/image1.webp";
import image2 from "/background/image2.webp";
import image3 from "/background/image3.webp";
import image4 from "/background/image4.webp";
import image5 from "/background/image5.webp";
import image6 from "/background/image6.webp";
import image7 from "/background/image7.webp";
import image8 from "/background/image8.webp";
import image9 from "/background/image9.webp";
import image10 from "/background/image10.webp";

function BackgroundABout() {
  return (
    <section className="about-section">
      <div className="background">
        <div className="thirstrange">
          <img className="img1" src={image1} alt="PC Portable" width={500} height={320} loading="lazy" />
          <img className="img2" src={image2} alt="Mobile" width={500} height={320} loading="lazy" />
          <img className="img3" src={image3} alt="Clavier" width={500} height={320} loading="lazy" />
          <img className="img4" src={image4} alt="PC Portable" width={500} height={320} loading="lazy" />
          <img className="img5" src={image5} alt="PC sur le lit + vue" width={500} height={320} loading="lazy" />
          <img className="img6" src={image6} alt="Office atmosphere" width={500} height={320} loading="lazy" />
        </div>
        <div className="secondrange">
          <img className="img7" src={image7} alt="PC portable sur un bureau" width={500} height={300} loading="lazy" />
          <img className="img8" src={image8} alt="lightning office atmosphere" width={500} height={300} loading="lazy" />
          <img className="img9" src={image9} alt="Trading" width={500} height={300} loading="lazy" />
          <img className="img10" src={image10} alt="Code Javascript" width={500} height={300} loading="lazy" />
        </div>
      </div>
      <div className="aboutMeContainer">
        <div className="aboutMeSec" id="about">
          <h2>A propos de moi</h2>
          <h4>
            Développeur d'architecture de produits digitaux,
            je combine expertise technique et vision stratégique pour concevoir des
            solutions durables et performantes. <br /> Mon approche allie l'expérience
            du développement à la réflexion stratégique : je ne me contente pas de
            coder, j'architecte. Chaque décision technique est pensée en fonction des
            enjeux business, de la scalabilité, de la maintenabilité et de l'expérience
            utilisateur. <br /> Aujourd'hui, j'accompagne les entreprises dans la
            conception, l'audit et la refonte de leurs produits digitaux, en apportant
            une vision globale qui transforme les défis techniques en opportunités
            stratégiques.
          </h4>
        </div>
      </div>
    </section>
  );
}

export default BackgroundABout;
