const API_BASE = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/api\/chat\/?$/, "")
  : "";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || `Erreur API: ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

async function downloadBlob(path, fallbackName) {
  const response = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Erreur telechargement: ${response.status}`);
  }
  const blob = await response.blob();
  const disposition = response.headers.get("Content-Disposition") || "";
  const match = disposition.match(/filename="?([^"]+)"?/i);
  const filename = match?.[1] || fallbackName;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function documentsQuery(params = {}) {
  const search = new URLSearchParams();
  if (params.type) search.set("type", params.type);
  if (params.status) search.set("status", params.status);
  if (params.leadId) search.set("lead_id", String(params.leadId));
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const adminApi = {
  login: (email, password) =>
    request("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  logout: () => request("/api/admin/logout", { method: "POST" }),
  me: () => request("/api/admin/me"),
  dashboard: () => request("/api/admin/dashboard"),
  listLeads: () => request("/api/admin/leads"),
  getLead: (id) => request(`/api/admin/leads/${id}`),
  updateLead: (id, payload) =>
    request(`/api/admin/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  addNote: (id, body) =>
    request(`/api/admin/leads/${id}/notes`, {
      method: "POST",
      body: JSON.stringify({ body }),
    }),
  sendLeadEmail: (id, payload) =>
    request(`/api/admin/leads/${encodeURIComponent(id)}/email`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  listDocuments: (params) =>
    request(`/api/admin/documents${documentsQuery(params)}`),
  getDocument: (id) =>
    request(`/api/admin/documents/${encodeURIComponent(id)}`),
  createDocument: (payload) =>
    request("/api/admin/documents", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateDocument: (id, payload) =>
    request(`/api/admin/documents/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  convertDocument: (id) =>
    request(`/api/admin/documents/${encodeURIComponent(id)}/convert`, {
      method: "POST",
    }),
  sendDocument: (id, payload = {}) =>
    request(`/api/admin/documents/${encodeURIComponent(id)}/send`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  downloadDocumentPdf: (id, number) =>
    downloadBlob(
      `/api/admin/documents/${encodeURIComponent(id)}/pdf`,
      `${number || id}.pdf`,
    ),
  exportDocumentsCsv: (params) =>
    downloadBlob(
      `/api/admin/documents/export.csv${documentsQuery(params)}`,
      "documents.csv",
    ),
};
