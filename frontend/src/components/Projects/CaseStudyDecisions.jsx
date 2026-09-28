/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
function CaseStudyDecisions({ decisions }) {
  if (!decisions?.length) return null;

  return (
    <section className="case-study-section" aria-labelledby="case-decisions-title">
      <h2 id="case-decisions-title" className="case-study-section-title">
        Décisions structurantes
      </h2>
      <ol className="case-study-decisions">
        {decisions.map((decision, index) => (
          <li key={decision.title} className="case-study-decision">
            <p className="case-study-decision-index">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <h3 className="case-study-decision-title">{decision.title}</h3>
              <p className="case-study-decision-body">{decision.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default CaseStudyDecisions;
