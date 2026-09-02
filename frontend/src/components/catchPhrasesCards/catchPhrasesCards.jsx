import "./_catchPhrasesCards.scss";
import { catchPhrases } from "../../data/catchphrase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CatchPhrasesCards() {
  return (
    <div className="catch-layout">
      {catchPhrases.map((catchPhrase) => (
        <div className="catchphrase-content" key={catchPhrase.id}>
          <div className="fontIcons">
            <FontAwesomeIcon
              icon={catchPhrase.icon}
              style={{ color: "rgb(236, 189, 0, 1)" }}
            />
          </div>
          <h3>{catchPhrase.content}</h3>
        </div>
      ))}
    </div>
  );
}

export default CatchPhrasesCards;
