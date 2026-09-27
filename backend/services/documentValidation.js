const DOCUMENT_TYPES = new Set(["QUOTE", "INVOICE"]);
const DOCUMENT_STATUSES = new Set([
  "DRAFT",
  "SENT",
  "ACCEPTED",
  "REJECTED",
  "PAID",
  "CANCELLED",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value, max = 500) {
  if (value === undefined || value === null) return null;
  const s = String(value).trim();
  if (!s) return null;
  return s.slice(0, max);
}

function asNumber(value) {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function asDate(value) {
  if (value === undefined || value === null || value === "") return null;
  const s = String(value).trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  return s;
}

function parseLines(raw) {
  if (!Array.isArray(raw) || raw.length === 0) {
    return { error: "Au moins une ligne est requise" };
  }
  if (raw.length > 50) {
    return { error: "Trop de lignes (max 50)" };
  }

  const lines = [];
  for (let i = 0; i < raw.length; i += 1) {
    const item = raw[i] || {};
    const label = asTrimmedString(item.label, 300);
    const quantity = asNumber(item.quantity);
    const unitPriceHt = asNumber(item.unitPriceHt);

    if (!label) {
      return { error: `Ligne ${i + 1}: libelle requis` };
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return { error: `Ligne ${i + 1}: quantite invalide` };
    }
    if (!Number.isFinite(unitPriceHt) || unitPriceHt < 0) {
      return { error: `Ligne ${i + 1}: prix unitaire invalide` };
    }

    lines.push({
      label,
      quantity,
      unitPriceHt,
      position: i,
    });
  }

  return { value: lines };
}

export function validateDocumentCreatePayload(body) {
  const data = body || {};
  const type = String(data.type || "").toUpperCase();
  if (!DOCUMENT_TYPES.has(type)) {
    return { error: "type invalide (QUOTE ou INVOICE)" };
  }

  const clientName = asTrimmedString(data.clientName, 200);
  const clientEmail = asTrimmedString(data.clientEmail, 200);
  if (!clientName) return { error: "clientName requis" };
  if (!clientEmail || !EMAIL_RE.test(clientEmail)) {
    return { error: "clientEmail invalide" };
  }

  const taxRate = asNumber(data.taxRate ?? 20);
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
    return { error: "taxRate invalide" };
  }

  const linesParsed = parseLines(data.lines);
  if (linesParsed.error) return { error: linesParsed.error };

  let leadId = null;
  if (data.leadId !== undefined && data.leadId !== null && data.leadId !== "") {
    leadId = Number(data.leadId);
    if (!Number.isInteger(leadId) || leadId < 1) {
      return { error: "leadId invalide" };
    }
  }

  return {
    value: {
      type,
      leadId,
      clientName,
      clientEmail,
      clientCompany: asTrimmedString(data.clientCompany, 200),
      clientAddress: asTrimmedString(data.clientAddress, 500),
      taxRate,
      currency: "EUR",
      validUntil: asDate(data.validUntil),
      dueDate: asDate(data.dueDate),
      notes: asTrimmedString(data.notes, 2000),
      lines: linesParsed.value,
      status: "DRAFT",
    },
  };
}

export function validateDocumentUpdatePayload(body, { isDraft }) {
  const data = body || {};
  const value = {};

  if (data.status !== undefined) {
    const status = String(data.status).toUpperCase();
    if (!DOCUMENT_STATUSES.has(status)) {
      return { error: "status invalide" };
    }
    value.status = status;
  }

  if (!isDraft) {
    if (
      data.clientName !== undefined ||
      data.clientEmail !== undefined ||
      data.clientCompany !== undefined ||
      data.clientAddress !== undefined ||
      data.taxRate !== undefined ||
      data.validUntil !== undefined ||
      data.dueDate !== undefined ||
      data.notes !== undefined ||
      data.lines !== undefined ||
      data.leadId !== undefined
    ) {
      return {
        error: "Le contenu n'est modifiable qu'en statut DRAFT",
      };
    }
    return { value };
  }

  if (data.clientName !== undefined) {
    const clientName = asTrimmedString(data.clientName, 200);
    if (!clientName) return { error: "clientName requis" };
    value.clientName = clientName;
  }
  if (data.clientEmail !== undefined) {
    const clientEmail = asTrimmedString(data.clientEmail, 200);
    if (!clientEmail || !EMAIL_RE.test(clientEmail)) {
      return { error: "clientEmail invalide" };
    }
    value.clientEmail = clientEmail;
  }
  if (data.clientCompany !== undefined) {
    value.clientCompany = asTrimmedString(data.clientCompany, 200);
  }
  if (data.clientAddress !== undefined) {
    value.clientAddress = asTrimmedString(data.clientAddress, 500);
  }
  if (data.taxRate !== undefined) {
    const taxRate = asNumber(data.taxRate);
    if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) {
      return { error: "taxRate invalide" };
    }
    value.taxRate = taxRate;
  }
  if (data.validUntil !== undefined) {
    value.validUntil = asDate(data.validUntil);
  }
  if (data.dueDate !== undefined) {
    value.dueDate = asDate(data.dueDate);
  }
  if (data.notes !== undefined) {
    value.notes = asTrimmedString(data.notes, 2000);
  }
  if (data.leadId !== undefined) {
    if (data.leadId === null || data.leadId === "") {
      value.leadId = null;
    } else {
      const leadId = Number(data.leadId);
      if (!Number.isInteger(leadId) || leadId < 1) {
        return { error: "leadId invalide" };
      }
      value.leadId = leadId;
    }
  }

  let replaceLines;
  if (data.lines !== undefined) {
    const linesParsed = parseLines(data.lines);
    if (linesParsed.error) return { error: linesParsed.error };
    replaceLines = linesParsed.value;
  }

  return { value, replaceLines };
}

export function validateSendPayload(body) {
  const data = body || {};
  const toEmail = asTrimmedString(data.toEmail, 200);
  if (toEmail && !EMAIL_RE.test(toEmail)) {
    return { error: "toEmail invalide" };
  }
  return {
    value: {
      toEmail: toEmail || null,
      markLeadQuoteSent: Boolean(data.markLeadQuoteSent),
    },
  };
}

export { DOCUMENT_TYPES, DOCUMENT_STATUSES };
