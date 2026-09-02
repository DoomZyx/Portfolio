import "./_catchPhrasesCards.scss";
import { catchPhrases } from "../../data/catchphrase";

function CatchPhrasesCards() {
  return (
      <div className="catch-layout">
        {catchPhrases.map((catchPhrase) => (
          <div className="catchphrase-content" key={catchPhrase.id}>
            <h3>{catchPhrase.content}</h3>
          </div>
        ))}
      </div>
  );
}

export default CatchPhrasesCards;
