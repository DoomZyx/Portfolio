/* eslint-disable react/prop-types -- pas de PropTypes dans ce projet */
import { Link } from "react-router-dom";

function CaseStudyCta({ ctas }) {
  if (!ctas?.length) return null;

  return (
    <div className="case-study-cta project-actions">
      {ctas.map((cta) => {
        const className =
          cta.variant === "primary"
            ? "project-link project-link-primary"
            : "project-link project-link-secondary";

        if (cta.to) {
          return (
            <Link key={cta.label} className={className} to={cta.to}>
              {cta.label}
            </Link>
          );
        }

        return (
          <a
            key={cta.label}
            className={className}
            href={cta.href}
            {...(cta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {cta.label}
          </a>
        );
      })}
    </div>
  );
}

export default CaseStudyCta;
