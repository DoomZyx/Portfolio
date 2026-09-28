/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
function CaseStudyBehindTheScenes({ behindTheScenes }) {
  if (!behindTheScenes?.summary) return null;

  return (
    <section className="case-study-section case-study-behind">
      <details className="case-study-details">
        <summary className="case-study-details-summary">Coulisses</summary>
        <p className="case-study-paragraph">{behindTheScenes.summary}</p>
        {behindTheScenes.details?.length ? (
          <ul className="case-study-list">
            {behindTheScenes.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        ) : null}
      </details>
    </section>
  );
}

export default CaseStudyBehindTheScenes;
