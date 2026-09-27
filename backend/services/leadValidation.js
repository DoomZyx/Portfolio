const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STATUSES = new Set([
  "NEW",
  "CONTACTED",
  "MEETING",
  "QUOTE_SENT",
  "WON",
  "LOST",
]);

const ALLOWED_CURRENT = new Set([
  "NONE",
  "SHOPIFY",
  "WOOCOMMERCE",
  "OTHER_SAAS",
  "CUSTOM",
]);
const ALLOWED_OBJECTIVE = new Set([
  "LAUNCH_FAST",
  "BUILD_BRAND",
  "INCREASE_CONVERSIONS",
  "REPLACE_LIMITED",
  "AUTOMATE_PROCESSES",
  "SPECIFIC_EXPERIENCE",
]);
const ALLOWED_CATALOG = new Set([
  "UNDER_20",
  "FROM_20_TO_100",
  "FROM_100_TO_1000",
  "OVER_1000",
]);
const ALLOWED_NEEDS = new Set([
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
]);
const ALLOWED_BUSINESS = new Set([
  "BRANDING",
  "SEGMENTATION",
  "ACQUISITION",
  "CONVERSION",
  "NONE",
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
  if (projectType !== "ecommerce") return { error: "unsupported projectType" };

  const source = asTrimmedString(body.source, 80) || "diagnostic_ecommerce";
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

  const {
    currentSolution,
    objective,
    catalogSize,
    needs,
    business,
    budget,
    timeline,
  } = diagnostic;

  if (!ALLOWED_CURRENT.has(currentSolution)) return { error: "invalid currentSolution" };
  if (!ALLOWED_OBJECTIVE.has(objective)) return { error: "invalid objective" };
  if (!ALLOWED_CATALOG.has(catalogSize)) return { error: "invalid catalogSize" };
  if (!ALLOWED_BUDGET.has(budget)) return { error: "invalid budget" };
  if (!ALLOWED_TIMELINE.has(timeline)) return { error: "invalid timeline" };

  if (!Array.isArray(needs) || needs.some((n) => !ALLOWED_NEEDS.has(n))) {
    return { error: "invalid needs" };
  }
  if (!Array.isArray(business) || business.some((b) => !ALLOWED_BUSINESS.has(b))) {
    return { error: "invalid business" };
  }

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
      diagnostic: {
        currentSolution,
        objective,
        catalogSize,
        needs,
        business,
        budget,
        timeline,
      },
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
