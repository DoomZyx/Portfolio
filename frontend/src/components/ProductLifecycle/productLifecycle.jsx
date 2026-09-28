import { Link } from "react-router-dom";
import {
  PRODUCT_LIFECYCLE_INTRO,
  PRODUCT_LIFECYCLE_STEPS,
  PRODUCT_LIFECYCLE_COSTS,
  PRODUCT_LIFECYCLE_CTA,
} from "../../data/productLifecycle";
import "./_productLifecycle.scss";

function ProductLifecycle() {
  return (
    <section
      className="lifecycle-section"
      id="pedagogie"
      aria-labelledby="lifecycle-title"
    >
      <header className="lifecycle-intro">
        <h2 id="lifecycle-title" className="lifecycle-title">
          {PRODUCT_LIFECYCLE_INTRO.title}
        </h2>
        {PRODUCT_LIFECYCLE_INTRO.paragraphs.map((paragraph) => (
          <p key={paragraph} className="lifecycle-lead">
            {paragraph}
          </p>
        ))}
      </header>

      <ol className="lifecycle-steps">
        {PRODUCT_LIFECYCLE_STEPS.map((item) => (
          <li key={item.step} className="lifecycle-step">
            <span className="lifecycle-step-number">
              {item.step}
            </span>
            <div className="lifecycle-step-body">
              <h3 className="lifecycle-step-title">{item.title}</h3>
              <p className="lifecycle-step-house">
                <span className="lifecycle-label">Maison</span>
                {item.house}
              </p>
              <p className="lifecycle-step-product">
                <span className="lifecycle-label">Produit</span>
                {item.product}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <aside className="lifecycle-costs" aria-labelledby="lifecycle-costs-title">
        <h3 id="lifecycle-costs-title" className="lifecycle-costs-title">
          {PRODUCT_LIFECYCLE_COSTS.title}
        </h3>
        {PRODUCT_LIFECYCLE_COSTS.paragraphs.map((paragraph) => (
          <p key={paragraph} className="lifecycle-costs-text">
            {paragraph}
          </p>
        ))}
        <ul className="lifecycle-cost-categories">
          {PRODUCT_LIFECYCLE_COSTS.categories.map((category) => (
            <li key={category.title} className="lifecycle-cost-category">
              <h4>{category.title}</h4>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
      </aside>

      <div className="lifecycle-cta-wrap">
        <article className="lifecycle-cta">
          <div className="lifecycle-cta-content">
            <h3>{PRODUCT_LIFECYCLE_CTA.title}</h3>
            <p>{PRODUCT_LIFECYCLE_CTA.description}</p>
          </div>
          <Link className="lifecycle-cta-link" to={PRODUCT_LIFECYCLE_CTA.to}>
            {PRODUCT_LIFECYCLE_CTA.label}
          </Link>
        </article>
      </div>
    </section>
  );
}

export default ProductLifecycle;
