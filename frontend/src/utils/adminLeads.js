import { DIAGNOSTIC_STEPS as ECOMMERCE_STEPS } from "../domain/ecommerce/questions.js";
import { DIAGNOSTIC_STEPS as MVP_STEPS } from "../domain/mvp/questions.js";
import { DIAGNOSTIC_STEPS as VISIBILITY_STEPS } from "../domain/visibility/questions.js";
import { DIAGNOSTIC_STEPS as CHAT_STEPS } from "../domain/chat/questions.js";

export const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "MEETING",
  "QUOTE_SENT",
  "WON",
  "LOST",
];

const STATUS_LABELS = {
  NEW: "Nouveau",
  CONTACTED: "Contacté",
  MEETING: "RDV",
  QUOTE_SENT: "Devis envoyé",
  WON: "Gagné",
  LOST: "Perdu",
};

function stepsForProjectType(projectType) {
  if (projectType === "mvp") return MVP_STEPS;
  if (projectType === "visibility") return VISIBILITY_STEPS;
  if (projectType === "chat") return CHAT_STEPS;
  return ECOMMERCE_STEPS;
}

export function statusLabel(status) {
  return STATUS_LABELS[status] || status;
}

export function statusBadgeClass(status) {
  if (status === "NEW") return "admin-badge admin-badge--new";
  if (status === "WON") return "admin-badge admin-badge--won";
  if (status === "LOST") return "admin-badge admin-badge--lost";
  if (status === "MEETING") return "admin-badge admin-badge--meeting";
  if (status === "QUOTE_SENT") return "admin-badge admin-badge--quote";
  return "admin-badge";
}

export function formatEuro(value) {
  if (value === null || value === undefined || value === "") return "-";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

export function formatDate(value) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("fr-FR");
}

export function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString("fr-FR");
}

function optionLabel(steps, stepId, value) {
  const step = steps.find((item) => item.id === stepId);
  if (!step) return value;
  const option = step.options.find((item) => item.value === value);
  return option ? option.label : value;
}

export function formatDiagnosticRows(diagnostic, projectType = "ecommerce") {
  if (!diagnostic || typeof diagnostic !== "object") return [];
  const steps = stepsForProjectType(projectType);

  return steps.map((step) => {
    const raw = diagnostic[step.id];
    let display = "-";

    if (step.type === "multi") {
      const values = Array.isArray(raw) ? raw : [];
      const cleaned = values.filter((v) => v && v !== "NONE");
      display = cleaned.length
        ? cleaned.map((v) => optionLabel(steps, step.id, v)).join(", ")
        : "Aucun";
    } else if (step.type === "text") {
      display = typeof raw === "string" && raw.trim() ? raw.trim() : "-";
    } else if (raw) {
      display = optionLabel(steps, step.id, raw);
    }

    return {
      id: step.id,
      label: step.title,
      value: display,
    };
  });
}

export function getBudgetLabel(diagnostic, projectType = "ecommerce") {
  if (!diagnostic?.budget) return "-";
  return optionLabel(
    stepsForProjectType(projectType),
    "budget",
    diagnostic.budget,
  );
}

export function formatPercent(value) {
  return `${Math.round((value || 0) * 100)} %`;
}

export function filterLeads(leads, { search = "", statusFilter = "ALL" } = {}) {
  const q = search.trim().toLowerCase();
  return leads.filter((lead) => {
    if (statusFilter !== "ALL" && lead.status !== statusFilter) return false;
    if (!q) return true;
    const haystack = [
      lead.name,
      lead.email,
      lead.company,
      lead.source,
      lead.projectType,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function countLeadsByStatus(leads) {
  const base = { ALL: leads.length };
  LEAD_STATUSES.forEach((status) => {
    base[status] = leads.filter((lead) => lead.status === status).length;
  });
  return base;
}

export function buildDashboardFunnel(stats) {
  if (!stats) return [];
  const total = Math.max(stats.totalLeads, 1);
  return [
    { label: "Nouveaux", value: stats.newLeads, ratio: stats.newLeads / total },
    { label: "RDV", value: stats.meetings, ratio: stats.meetings / total },
    {
      label: "Devis",
      value: stats.quotesSent,
      ratio: stats.quotesSent / total,
    },
    { label: "Gagnés", value: stats.won, ratio: stats.won / total },
  ];
}

export function computeConversionRate(stats) {
  if (!stats || !stats.totalLeads) return 0;
  return stats.won / stats.totalLeads;
}

export function maxSourceCount(leadsBySource) {
  if (!leadsBySource?.length) return 1;
  return Math.max(...leadsBySource.map((row) => row.count), 1);
}
