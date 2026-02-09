import "./_catchphrase2.scss"

import image11 from "/image11.webp";

function Catchphrase2() {
  return (
    <div className="layout-catchprase2">
      <img src={image11} alt="MacBook" width={200} height={200} loading="lazy" />
      <h4>
        Je développe, je design, je structure. Tout est fait sur mesure, avec
        les bons outils pour chaque mission <br />
        Je conçois chaque projet de A à Z. Aucun outil n’est choisi au hasard :
        chacun répond à un besoin précis, fonctionnel et stratégique
      </h4>
    </div>
  );
}

export default Catchphrase2;
