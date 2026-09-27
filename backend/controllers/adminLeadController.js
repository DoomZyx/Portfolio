import { leadModel } from "../models/leadModel.js";
import { leadNoteModel } from "../models/leadNoteModel.js";
import {
  validateLeadUpdatePayload,
  validateNotePayload,
  validateLeadEmailPayload,
} from "../services/leadValidation.js";
import { sendPlainEmail } from "../services/mailService.js";
import { buildLeadEmailTemplate } from "../services/emailTemplateService.js";

function mapLead(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    company: row.company,
    message: row.message,
    projectType: row.project_type,
    source: row.source,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    landingPage: row.landing_page,
    referrer: row.referrer,
    diagnostic: row.diagnostic,
    recommendation: {
      technical: row.recommendation_technical,
      strategicSupportRecommended: row.strategic_support_recommended,
    },
    status: row.status,
    estimatedValue:
      row.estimated_value !== null ? Number(row.estimated_value) : null,
    finalValue: row.final_value !== null ? Number(row.final_value) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export const adminLeadController = {
  async list(_request, reply) {
    const rows = await leadModel.findAll();
    return reply.send(rows.map(mapLead));
  },

  async getById(request, reply) {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return reply.code(400).send({ error: "invalid id" });
    }

    const lead = await leadModel.findById(id);
    if (!lead) return reply.code(404).send({ error: "Lead not found" });

    const notes = await leadNoteModel.findByLeadId(id);
    return reply.send({
      ...mapLead(lead),
      notes: notes.map((n) => ({
        id: n.id,
        body: n.body,
        createdAt: n.created_at,
      })),
    });
  },

  async update(request, reply) {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return reply.code(400).send({ error: "invalid id" });
    }

    const parsed = validateLeadUpdatePayload(request.body);
    if (parsed.error) return reply.code(400).send({ error: parsed.error });

    const updated = await leadModel.update(id, parsed.value);
    if (!updated) return reply.code(404).send({ error: "Lead not found" });
    return reply.send(mapLead(updated));
  },

  async addNote(request, reply) {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return reply.code(400).send({ error: "invalid id" });
    }

    const lead = await leadModel.findById(id);
    if (!lead) return reply.code(404).send({ error: "Lead not found" });

    const parsed = validateNotePayload(request.body);
    if (parsed.error) return reply.code(400).send({ error: parsed.error });

    const note = await leadNoteModel.create(id, parsed.value);
    return reply.code(201).send({
      id: note.id,
      body: note.body,
      createdAt: note.created_at,
    });
  },

  async sendEmail(request, reply) {
    const id = Number(request.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return reply.code(400).send({ error: "invalid id" });
    }

    const lead = await leadModel.findById(id);
    if (!lead) return reply.code(404).send({ error: "Lead not found" });

    const parsed = validateLeadEmailPayload(request.body);
    if (parsed.error) return reply.code(400).send({ error: parsed.error });

    const toEmail = parsed.value.toEmail || lead.email;
    if (!toEmail) {
      return reply
        .code(400)
        .send({ error: "aucune adresse email pour ce lead" });
    }

    try {
      const template = buildLeadEmailTemplate({
        subject: parsed.value.subject,
        body: parsed.value.body,
        clientName: lead.name,
      });
      await sendPlainEmail({
        to: toEmail,
        subject: template.subject,
        text: template.text,
        html: template.html,
      });
    } catch (err) {
      return reply.code(502).send({
        error: err.message || "Envoi email impossible",
      });
    }

    const note = await leadNoteModel.create(
      id,
      `Email envoye a ${toEmail} : ${parsed.value.subject}`,
    );

    return reply.send({
      ok: true,
      toEmail,
      note: {
        id: note.id,
        body: note.body,
        createdAt: note.created_at,
      },
    });
  },
};
