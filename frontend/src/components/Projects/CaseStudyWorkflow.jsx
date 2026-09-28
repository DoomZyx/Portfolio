/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
function CaseStudyWorkflow({ workflow }) {
  if (!workflow?.steps?.length) return null;

  return (
    <section className="case-study-section" aria-labelledby="case-workflow-title">
      <h2 id="case-workflow-title" className="case-study-section-title">
        {workflow.title || "Parcours"}
      </h2>
      <ol className="case-study-workflow">
        {workflow.steps.map((step, index) => (
          <li key={step} className="case-study-workflow-step">
            <span className="case-study-workflow-label">{step}</span>
            {workflow.stepHints?.[index] ? (
              <span className="case-study-workflow-hint">
                {workflow.stepHints[index]}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
}

export default CaseStudyWorkflow;
