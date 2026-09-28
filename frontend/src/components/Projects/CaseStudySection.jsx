/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
function CaseStudySection({ title, paragraphs, items, children }) {
  if (!title && !paragraphs?.length && !items?.length && !children) {
    return null;
  }

  return (
    <section className="case-study-section">
      {title ? <h2 className="case-study-section-title">{title}</h2> : null}
      {paragraphs?.map((paragraph, index) => (
        <p key={`p-${index}`} className="case-study-paragraph">
          {paragraph}
        </p>
      ))}
      {items?.length ? (
        <ul className="case-study-list">
          {items.map((item, index) => (
            <li key={`i-${index}`}>{item}</li>
          ))}
        </ul>
      ) : null}
      {children}
    </section>
  );
}

export default CaseStudySection;
