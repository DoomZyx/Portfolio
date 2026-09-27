import { documentModel } from "../models/documentModel.js";
import { leadModel } from "../models/leadModel.js";
import {
  DOCUMENT_TYPES,
  DOCUMENT_STATUSES,
  validateDocumentCreatePayload,
  validateDocumentUpdatePayload,
  validateSendPayload,
} from "../services/documentValidation.js";
import { buildDocumentPdf } from "../services/pdfDocumentService.js";
import { sendDocumentEmail } from "../services/mailService.js";
import { buildDocumentEmailTemplate } from "../services/emailTemplateService.js";

function mapLine(row) {
  return {
    id: row.id,
    label: row.label,
    quantity: Number(row.quantity),
    unitPriceHt: Number(row.unit_price_ht),
    position: row.position,
  };
}

function mapDocument(row, { lines, emails } = {}) {
  if (!row) return null;
  const base = {
    id: row.id,
    type: row.type,
    number: row.number,
    leadId: row.lead_id,
    sourceQuoteId: row.source_quote_id,
    status: row.status,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientCompany: row.client_company,
    clientAddress: row.client_address,
    subtotalHt: Number(row.subtotal_ht),
    taxRate: Number(row.tax_rate),
    taxAmount: Number(row.tax_amount),
    totalTtc: Number(row.total_ttc),
    currency: row.currency,
    validUntil: row.valid_until,
    dueDate: row.due_date,
    notes: row.notes,
    sentAt: row.sent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  if (lines) base.lines = lines.map(mapLine);
  if (emails) {
    base.emails = emails.map((e) => ({
      id: e.id,
      toEmail: e.to_email,
      sentAt: e.sent_at,
      ok: e.ok,
      error: e.error,
    }));
  }
  return base;
}

function parseId(raw) {
  const id = Number(raw);
  if (!Number.isInteger(id) || id < 1) return null;
  return id;
}

function csvEscape(value) {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export const adminDocumentController = {
  async list(request, reply) {
    const type = request.query.type
      ? String(request.query.type).toUpperCase()
      : null;
    const status = request.query.status
      ? String(request.query.status).toUpperCase()
      : null;
    const leadId = request.query.lead_id
      ? Number(request.query.lead_id)
      : null;

    if (type && !DOCUMENT_TYPES.has(type)) {
      return reply.code(400).send({ error: "type invalide" });
    }
    if (status && !DOCUMENT_STATUSES.has(status)) {
      return reply.code(400).send({ error: "status invalide" });
    }
    if (
      request.query.lead_id &&
      (!Number.isInteger(leadId) || leadId < 1)
    ) {
      return reply.code(400).send({ error: "lead_id invalide" });
    }

    const rows = await documentModel.findAll({ type, status, leadId });
    return reply.send(rows.map((row) => mapDocument(row)));
  },

  async exportCsv(request, reply) {
    const type = request.query.type
      ? String(request.query.type).toUpperCase()
      : null;
    const status = request.query.status
      ? String(request.query.status).toUpperCase()
      : null;

    if (type && !DOCUMENT_TYPES.has(type)) {
      return reply.code(400).send({ error: "type invalide" });
    }
    if (status && !DOCUMENT_STATUSES.has(status)) {
      return reply.code(400).send({ error: "status invalide" });
    }

    const rows = await documentModel.findAll({ type, status });
    const header = [
      "number",
      "type",
      "status",
      "client_name",
      "client_email",
      "client_company",
      "subtotal_ht",
      "tax_rate",
      "tax_amount",
      "total_ttc",
      "currency",
      "lead_id",
      "created_at",
    ];
    const lines = [header.join(",")];
    for (const row of rows) {
      lines.push(
        [
          row.number,
          row.type,
          row.status,
          row.client_name,
          row.client_email,
          row.client_company,
          row.subtotal_ht,
          row.tax_rate,
          row.tax_amount,
          row.total_ttc,
          row.currency,
          row.lead_id,
          row.created_at?.toISOString?.() || row.created_at,
        ]
          .map(csvEscape)
          .join(","),
      );
    }

    reply.header("Content-Type", "text/csv; charset=utf-8");
    reply.header(
      "Content-Disposition",
      'attachment; filename="documents.csv"',
    );
    return reply.send(lines.join("\n"));
  },

  async create(request, reply) {
    const parsed = validateDocumentCreatePayload(request.body);
    if (parsed.error) return reply.code(400).send({ error: parsed.error });

    if (parsed.value.leadId) {
      const lead = await leadModel.findById(parsed.value.leadId);
      if (!lead) return reply.code(400).send({ error: "lead introuvable" });
    }

    const doc = await documentModel.create(parsed.value);
    const lines = await documentModel.findLines(doc.id);
    return reply.code(201).send(mapDocument(doc, { lines }));
  },

  async getById(request, reply) {
    const id = parseId(request.params.id);
    if (!id) return reply.code(400).send({ error: "invalid id" });

    const doc = await documentModel.findById(id);
    if (!doc) return reply.code(404).send({ error: "Document not found" });

    const [lines, emails] = await Promise.all([
      documentModel.findLines(id),
      documentModel.findEmails(id),
    ]);
    return reply.send(mapDocument(doc, { lines, emails }));
  },

  async update(request, reply) {
    const id = parseId(request.params.id);
    if (!id) return reply.code(400).send({ error: "invalid id" });

    const current = await documentModel.findById(id);
    if (!current) return reply.code(404).send({ error: "Document not found" });

    const parsed = validateDocumentUpdatePayload(request.body, {
      isDraft: current.status === "DRAFT",
    });
    if (parsed.error) return reply.code(400).send({ error: parsed.error });

    if (parsed.value.leadId) {
      const lead = await leadModel.findById(parsed.value.leadId);
      if (!lead) return reply.code(400).send({ error: "lead introuvable" });
    }

    const updated = await documentModel.update(id, parsed.value, {
      replaceLines: parsed.replaceLines,
    });
    const lines = await documentModel.findLines(id);
    return reply.send(mapDocument(updated, { lines }));
  },

  async convert(request, reply) {
    const id = parseId(request.params.id);
    if (!id) return reply.code(400).send({ error: "invalid id" });

    const result = await documentModel.convertQuoteToInvoice(id);
    if (result.error === "quote_not_found") {
      return reply.code(404).send({ error: "Devis introuvable" });
    }

    const lines = await documentModel.findLines(result.invoice.id);
    return reply.code(201).send(mapDocument(result.invoice, { lines }));
  },

  async pdf(request, reply) {
    const id = parseId(request.params.id);
    if (!id) return reply.code(400).send({ error: "invalid id" });

    const doc = await documentModel.findById(id);
    if (!doc) return reply.code(404).send({ error: "Document not found" });

    const lines = await documentModel.findLines(id);
    const pdfBuffer = await buildDocumentPdf({ document: doc, lines });

    reply.header("Content-Type", "application/pdf");
    reply.header(
      "Content-Disposition",
      `attachment; filename="${doc.number}.pdf"`,
    );
    return reply.send(pdfBuffer);
  },

  async send(request, reply) {
    const id = parseId(request.params.id);
    if (!id) return reply.code(400).send({ error: "invalid id" });

    const parsed = validateSendPayload(request.body);
    if (parsed.error) return reply.code(400).send({ error: parsed.error });

    const doc = await documentModel.findById(id);
    if (!doc) return reply.code(404).send({ error: "Document not found" });

    const toEmail = parsed.value.toEmail || doc.client_email;
    const lines = await documentModel.findLines(id);
    const pdfBuffer = await buildDocumentPdf({ document: doc, lines });
    const kind = doc.type === "QUOTE" ? "devis" : "facture";
    const template = buildDocumentEmailTemplate({
      kind,
      number: doc.number,
      clientName: doc.client_name,
      totalTtc: doc.total_ttc,
    });

    try {
      await sendDocumentEmail({
        to: toEmail,
        subject: template.subject,
        text: template.text,
        html: template.html,
        pdfBuffer,
        filename: `${doc.number}.pdf`,
      });
    } catch (err) {
      await documentModel.logEmail({
        documentId: id,
        toEmail,
        ok: false,
        error: err.message || "send failed",
      });
      return reply.code(502).send({
        error: err.message || "Envoi email impossible",
      });
    }

    await documentModel.logEmail({
      documentId: id,
      toEmail,
      ok: true,
    });

    const updated = await documentModel.update(id, {
      status: "SENT",
      sentAt: new Date().toISOString(),
    });

    if (
      parsed.value.markLeadQuoteSent &&
      doc.type === "QUOTE" &&
      doc.lead_id
    ) {
      await leadModel.update(doc.lead_id, { status: "QUOTE_SENT" });
    }

    const emails = await documentModel.findEmails(id);
    return reply.send(
      mapDocument(updated, {
        lines,
        emails,
      }),
    );
  },
};
