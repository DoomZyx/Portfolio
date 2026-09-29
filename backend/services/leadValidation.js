const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATUSES = new Set([
  "NEW",
  "CONTACTED",
  "MEETING",
  "QUOTE_SENT",
  "WON",
  "LOST",
]);

const ALLOWED_PROJECT_TYPES = new Set([
  "ecommerce",
  "mvp",
  "visibility",
  "chat",
]);

const ALLOWED_BUDGET = new Set([
  "UNDER_2K",
  "FROM_2K_TO_5K",
  "FROM_5K_TO_10K",
  "FROM_10K_TO_20K",
  "OVER_20K",
]);
const ALLOWED_TIMELINE = new Set([
  "UNDER_1_MONTH",
  "FROM_1_TO_3_MONTHS",
  "FROM_3_TO_6_MONTHS",
  "OVER_6_MONTHS",
]);

const ECOMMERCE = {
  currentSolution: new Set([
    "NONE",
    "SHOPIFY",
    "WOOCOMMERCE",
    "OTHER_SAAS",
    "CUSTOM",
  ]),
  objective: new Set([
    "LAUNCH_FAST",
    "BUILD_BRAND",
    "INCREASE_CONVERSIONS",
    "REPLACE_LIMITED",
    "AUTOMATE_PROCESSES",
    "SPECIFIC_EXPERIENCE",
  ]),
  catalogSize: new Set([
    "UNDER_20",
    "FROM_20_TO_100",
    "FROM_100_TO_1000",
    "OVER_1000",
  ]),
  needs: new Set([
    "SUBSCRIPTION",
    "B2B_PRICING",
    "MARKETPLACE",
    "ADVANCED_ACCOUNT",
    "CONFIGURATOR",
    "INTERNATIONAL",
    "ERP_CRM_API",
    "SPECIAL_LOGISTICS",
    "OTHER_SPECIFIC",
    "NONE",
  ]),
  business: new Set([
    "BRANDING",
    "SEGMENTATION",
    "ACQUISITION",
    "CONVERSION",
    "NONE",
  ]),
};

const MVP = {
  productStage: new Set(["IDEA", "PROTOTYPE", "EARLY_USERS", "REVENUE"]),
  objective: new Set([
    "VALIDATE_MARKET",
    "BUILD_MVP",
    "EXTEND_PRODUCT",
    "REBUILD",
  ]),
  maturity: new Set([
    "BUSINESS_MODEL",
    "GO_TO_MARKET",
    "PRICING",
    "TARGET_USERS",
    "COMPETITORS",
    "NONE",
  ]),
  scopeClarity: new Set(["CLEAR_CORE", "PARTIAL", "UNCLEAR"]),
  constraints: new Set([
    "AUTH_ROLES",
    "PAYMENTS",
    "INTEGRATIONS",
    "REALTIME",
    "MOBILE",
    "DATA_HEAVY",
    "OTHER_SPECIFIC",
    "NONE",
  ]),
};

const VISIBILITY = {
  currentPresence: new Set([
    "NONE",
    "SOCIAL_ONLY",
    "OUTDATED_SITE",
    "ACTIVE_SITE",
  ]),
  objective: new Set([
    "CREDIBILITY",
    "GENERATE_LEADS",
    "BRAND_IMAGE",
    "ANNOUNCE",
  ]),
  contentReady: new Set([
    "TEXTS",
    "VISUALS",
    "OFFER_CLEAR",
    "REFERENCES",
    "NONE",
  ]),
  pagesNeeded: new Set(["LANDING", "MULTI_PAGE", "REDESIGN", "UNSURE"]),
};

const CHAT = {
  intent: new Set(["create", "improve", "services", "general", "unknown"]),
};

function asTrimmedString(value, max) {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.length > max) return undefined;
  return trimmed;
}

function sanitizeText(value, max) {
  const s = asTrimmedString(value, max);
  if (s === undefined) return { error: "invalid" };
  return { value: s };
}

function validateEnum(value, allowed, field) {
  if (!allowed.has(value)) return { error: `invalid ${field}` };
  return { value };
}

function validateMulti(values, allowed, field) {
  if (!Array.isArray(values) || values.some((item) => !allowed.has(item))) {
    return { error: `invalid ${field}` };
  }
  return { value: values };
}

function validateEcommerceDiagnostic(diagnostic) {
  const currentSolution = validateEnum(
    diagnostic.currentSolution,
    ECOMMERCE.currentSolution,
    "currentSolution",
  );
  if (currentSolution.error) return currentSolution;
  const objective = validateEnum(
    diagnostic.objective,
    ECOMMERCE.objective,
    "objective",
  );
  if (objective.error) return objective;
  const catalogSize = validateEnum(
    diagnostic.catalogSize,
    ECOMMERCE.catalogSize,
    "catalogSize",
  );
  if (catalogSize.error) return catalogSize;
  const budget = validateEnum(diagnostic.budget, ALLOWED_BUDGET, "budget");
  if (budget.error) return budget;
  const timeline = validateEnum(
    diagnostic.timeline,
    ALLOWED_TIMELINE,
    "timeline",
  );
  if (timeline.error) return timeline;
  const needs = validateMulti(diagnostic.needs, ECOMMERCE.needs, "needs");
  if (needs.error) return needs;
  const business = validateMulti(
    diagnostic.business,
    ECOMMERCE.business,
    "business",
  );
  if (business.error) return business;

  return {
    value: {
      currentSolution: currentSolution.value,
      objective: objective.value,
      catalogSize: catalogSize.value,
      needs: needs.value,
      business: business.value,
      budget: budget.value,
      timeline: timeline.value,
    },
  };
}

function validateMvpDiagnostic(diagnostic) {
  const productStage = validateEnum(
    diagnostic.productStage,
    MVP.productStage,
    "productStage",
  );
  if (productStage.error) return productStage;
  const objective = validateEnum(diagnostic.objective, MVP.objective, "objective");
  if (objective.error) return objective;
  const scopeClarity = validateEnum(
    diagnostic.scopeClarity,
    MVP.scopeClarity,
    "scopeClarity",
  );
  if (scopeClarity.error) return scopeClarity;
  const budget = validateEnum(diagnostic.budget, ALLOWED_BUDGET, "budget");
  if (budget.error) return budget;
  const timeline = validateEnum(
    diagnostic.timeline,
    ALLOWED_TIMELINE,
    "timeline",
  );
  if (timeline.error) return timeline;
  const maturity = validateMulti(diagnostic.maturity, MVP.maturity, "maturity");
  if (maturity.error) return maturity;
  const constraints = validateMulti(
    diagnostic.constraints,
    MVP.constraints,
    "constraints",
  );
  if (constraints.error) return constraints;

  return {
    value: {
      productStage: productStage.value,
      objective: objective.value,
      maturity: maturity.value,
      scopeClarity: scopeClarity.value,
      constraints: constraints.value,
      budget: budget.value,
      timeline: timeline.value,
    },
  };
}

function validateVisibilityDiagnostic(diagnostic) {
  const currentPresence = validateEnum(
    diagnostic.currentPresence,
    VISIBILITY.currentPresence,
    "currentPresence",
  );
  if (currentPresence.error) return currentPresence;
  const objective = validateEnum(
    diagnostic.objective,
    VISIBILITY.objective,
    "objective",
  );
  if (objective.error) return objective;
  const pagesNeeded = validateEnum(
    diagnostic.pagesNeeded,
    VISIBILITY.pagesNeeded,
    "pagesNeeded",
  );
  if (pagesNeeded.error) return pagesNeeded;
  const budget = validateEnum(diagnostic.budget, ALLOWED_BUDGET, "budget");
  if (budget.error) return budget;
  const timeline = validateEnum(
    diagnostic.timeline,
    ALLOWED_TIMELINE,
    "timeline",
  );
  if (timeline.error) return timeline;
  const contentReady = validateMulti(
    diagnostic.contentReady,
    VISIBILITY.contentReady,
    "contentReady",
  );
  if (contentReady.error) return contentReady;

  return {
    value: {
      currentPresence: currentPresence.value,
      objective: objective.value,
      contentReady: contentReady.value,
      pagesNeeded: pagesNeeded.value,
      budget: budget.value,
      timeline: timeline.value,
    },
  };
}

function validateChatDiagnostic(diagnostic) {
  const intent = validateEnum(diagnostic.intent, CHAT.intent, "intent");
  if (intent.error) return intent;

  const summaryRaw = diagnostic.projectSummary;
  if (typeof summaryRaw !== "string") {
    return { error: "invalid projectSummary" };
  }
  const projectSummary = summaryRaw.trim().slice(0, 2000);

  return {
    value: {
      intent: intent.value,
      projectSummary,
    },
  };
}

function validateDiagnosticByProjectType(projectType, diagnostic) {
  if (projectType === "mvp") return validateMvpDiagnostic(diagnostic);
  if (projectType === "visibility") {
    return validateVisibilityDiagnostic(diagnostic);
  }
  if (projectType === "chat") return validateChatDiagnostic(diagnostic);
  return validateEcommerceDiagnostic(diagnostic);
}

function defaultSourceFor(projectType) {
  if (projectType === "mvp") return "diagnostic_mvp";
  if (projectType === "visibility") return "diagnostic_visibility";
  if (projectType === "chat") return "chatbot";
  return "diagnostic_ecommerce";
}

export function validatePublicLeadPayload(body) {
  if (!body || typeof body !== "object") {
    return { error: "Invalid payload" };
  }

  const name = asTrimmedString(body.name, 120);
  if (!name) return { error: "name is required" };

  const email = asTrimmedString(body.email, 254);
  if (!email || !EMAIL_RE.test(email)) return { error: "valid email is required" };

  const phone = asTrimmedString(body.phone, 40);
  if (phone === undefined) return { error: "invalid phone" };

  const company = asTrimmedString(body.company, 160);
  if (company === undefined) return { error: "invalid company" };

  const message = asTrimmedString(body.message, 5000);
  if (message === undefined) return { error: "invalid message" };

  const projectType = asTrimmedString(body.projectType, 40) || "ecommerce";
  if (!ALLOWED_PROJECT_TYPES.has(projectType)) {
    return { error: "unsupported projectType" };
  }

  // Diagnostic : téléphone obligatoire. Chatbot : optionnel (souvent absent).
  if (!phone && projectType !== "chat") {
    return { error: "phone is required" };
  }

  const source =
    asTrimmedString(body.source, 80) || defaultSourceFor(projectType);
  const utmSource = asTrimmedString(body.utmSource, 120);
  const utmMedium = asTrimmedString(body.utmMedium, 120);
  const utmCampaign = asTrimmedString(body.utmCampaign, 120);
  const landingPage = asTrimmedString(body.landingPage, 500);
  const referrer = asTrimmedString(body.referrer, 500);
  if ([utmSource, utmMedium, utmCampaign, landingPage, referrer].includes(undefined)) {
    return { error: "invalid tracking fields" };
  }

  const diagnostic = body.diagnostic;
  if (!diagnostic || typeof diagnostic !== "object") {
    return { error: "diagnostic is required" };
  }

  const parsedDiagnostic = validateDiagnosticByProjectType(
    projectType,
    diagnostic,
  );
  if (parsedDiagnostic.error) return parsedDiagnostic;

  return {
    value: {
      name,
      email: email.toLowerCase(),
      phone,
      company,
      message,
      projectType,
      source,
      utmSource,
      utmMedium,
      utmCampaign,
      landingPage,
      referrer,
      diagnostic: parsedDiagnostic.value,
    },
  };
}

export function validateLeadUpdatePayload(body) {
  if (!body || typeof body !== "object") return { error: "Invalid payload" };

  const out = {};

  if (body.status !== undefined) {
    if (!STATUSES.has(body.status)) return { error: "invalid status" };
    out.status = body.status;
  }

  if (body.name !== undefined) {
    const name = asTrimmedString(body.name, 120);
    if (!name) return { error: "name is required" };
    out.name = name;
  }

  if (body.email !== undefined) {
    const email = asTrimmedString(body.email, 254);
    if (!email || !EMAIL_RE.test(email)) return { error: "valid email is required" };
    out.email = email.toLowerCase();
  }

  if (body.phone !== undefined) {
    if (body.phone === null || body.phone === "") {
      out.phone = null;
    } else {
      const phone = asTrimmedString(body.phone, 40);
      if (phone === undefined) return { error: "invalid phone" };
      out.phone = phone;
    }
  }

  if (body.company !== undefined) {
    if (body.company === null || body.company === "") {
      out.company = null;
    } else {
      const company = asTrimmedString(body.company, 160);
      if (company === undefined) return { error: "invalid company" };
      out.company = company;
    }
  }

  if (body.message !== undefined) {
    if (body.message === null || body.message === "") {
      out.message = null;
    } else {
      const message = asTrimmedString(body.message, 5000);
      if (message === undefined) return { error: "invalid message" };
      out.message = message;
    }
  }

  if (body.estimatedValue !== undefined) {
    if (body.estimatedValue === null) {
      out.estimatedValue = null;
    } else {
      const n = Number(body.estimatedValue);
      if (!Number.isFinite(n) || n < 0 || n > 1_000_000_000) {
        return { error: "invalid estimatedValue" };
      }
      out.estimatedValue = n;
    }
  }

  if (body.finalValue !== undefined) {
    if (body.finalValue === null) {
      out.finalValue = null;
    } else {
      const n = Number(body.finalValue);
      if (!Number.isFinite(n) || n < 0 || n > 1_000_000_000) {
        return { error: "invalid finalValue" };
      }
      out.finalValue = n;
    }
  }

  if (Object.keys(out).length === 0) return { error: "no updatable fields" };
  return { value: out };
}

export function validateNotePayload(body) {
  const note = sanitizeText(body?.body, 5000);
  if (note.error || !note.value) return { error: "note body is required" };
  return { value: note.value };
}

export function validateLeadEmailPayload(body) {
  if (!body || typeof body !== "object") return { error: "Invalid payload" };

  const subject = asTrimmedString(body.subject, 200);
  if (!subject) return { error: "sujet requis" };

  const text = asTrimmedString(body.body, 10000);
  if (!text) return { error: "message requis" };

  let toEmail = null;
  if (body.toEmail !== undefined && body.toEmail !== null && body.toEmail !== "") {
    toEmail = asTrimmedString(body.toEmail, 254);
    if (!toEmail || !EMAIL_RE.test(toEmail)) {
      return { error: "toEmail invalide" };
    }
  }

  return {
    value: {
      subject,
      body: text,
      toEmail,
    },
  };
}

export { STATUSES };
