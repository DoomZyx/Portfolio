export const DOCUMENT_TYPES = ["QUOTE", "INVOICE"];

export const DOCUMENT_STATUSES = [
  "DRAFT",
  "SENT",
  "ACCEPTED",
  "REJECTED",
  "PAID",
  "CANCELLED",
];

export function documentTypeLabel(type) {
  if (type === "QUOTE") return "Devis";
  if (type === "INVOICE") return "Facture";
  return type;
}

/** Liste UI separee : /admin/devis | /admin/factures */
export function documentsListPath(type) {
  return type === "INVOICE" ? "/admin/factures" : "/admin/devis";
}

export function documentStatusLabel(status) {
  const map = {
    DRAFT: "Brouillon",
    SENT: "Envoye",
    ACCEPTED: "Accepte",
    REJECTED: "Refuse",
    PAID: "Paye",
    CANCELLED: "Annule",
  };
  return map[status] || status;
}

export function documentStatusBadgeClass(status) {
  const map = {
    DRAFT: "admin-badge admin-badge--new",
    SENT: "admin-badge admin-badge--quote",
    ACCEPTED: "admin-badge admin-badge--meeting",
    REJECTED: "admin-badge admin-badge--lost",
    PAID: "admin-badge admin-badge--won",
    CANCELLED: "admin-badge admin-badge--lost",
  };
  return map[status] || "admin-badge";
}

export function formatEuro(value) {
  if (value === null || value === undefined || value === "") return "-";
  const n = Number(value);
  if (!Number.isFinite(n)) return "-";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString("fr-FR");
  } catch {
    return "-";
  }
}

export function emptyLine() {
  return {
    id: crypto.randomUUID(),
    label: "",
    quantity: 1,
    unitPriceHt: 0,
  };
}

export function computeLineTotal(line) {
  return (Number(line.quantity) || 0) * (Number(line.unitPriceHt) || 0);
}

export function computeDocTotals(lines, taxRate) {
  const subtotalHt = lines.reduce((sum, line) => sum + computeLineTotal(line), 0);
  const rate = Number(taxRate) || 0;
  const taxAmount = Math.round(subtotalHt * rate) / 100;
  const totalTtc = Math.round((subtotalHt + taxAmount) * 100) / 100;
  return {
    subtotalHt: Math.round(subtotalHt * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalTtc,
  };
}

export function typeFromPath(pathname) {
  if (pathname.startsWith("/admin/factures")) return "INVOICE";
  if (pathname.startsWith("/admin/devis")) return "QUOTE";
  return null;
}

export function filterDocumentsByStatus(documents, statusFilter = "ALL") {
  if (statusFilter === "ALL") return documents;
  return documents.filter((doc) => doc.status === statusFilter);
}

export function buildDocumentCreatePayload({
  type,
  clientName,
  clientEmail,
  clientCompany,
  clientAddress,
  taxRate,
  validUntil,
  dueDate,
  notes,
  leadId,
  lines,
}) {
  return {
    type,
    clientName,
    clientEmail,
    clientCompany: clientCompany || null,
    clientAddress: clientAddress || null,
    taxRate: Number(taxRate),
    validUntil: type === "QUOTE" ? validUntil || null : null,
    dueDate: type === "INVOICE" ? dueDate || null : null,
    notes: notes || null,
    leadId: leadId ? Number(leadId) : null,
    lines: lines.map((line) => ({
      label: line.label,
      quantity: Number(line.quantity),
      unitPriceHt: Number(line.unitPriceHt),
    })),
  };
}
