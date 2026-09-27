import { query, getClient } from "../config/db.js";
import { nextDocumentNumber } from "../services/documentNumbering.js";

function computeTotals(lines, taxRate) {
  const subtotalHt = lines.reduce((sum, line) => {
    const qty = Number(line.quantity) || 0;
    const price = Number(line.unitPriceHt) || 0;
    return sum + qty * price;
  }, 0);
  const rate = Number(taxRate) || 0;
  const taxAmount = Math.round(subtotalHt * rate) / 100;
  const totalTtc = Math.round((subtotalHt + taxAmount) * 100) / 100;
  return {
    subtotalHt: Math.round(subtotalHt * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    totalTtc,
  };
}

async function insertLines(client, documentId, lines) {
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    await client.query(
      `INSERT INTO document_lines (document_id, label, quantity, unit_price_ht, position)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        documentId,
        line.label,
        line.quantity,
        line.unitPriceHt,
        line.position !== undefined ? line.position : i,
      ],
    );
  }
}

export const documentModel = {
  computeTotals,

  async findAll({ type, status, leadId } = {}) {
    const clauses = [];
    const params = [];
    let i = 1;

    if (type) {
      clauses.push(`type = $${i++}`);
      params.push(type);
    }
    if (status) {
      clauses.push(`status = $${i++}`);
      params.push(status);
    }
    if (leadId) {
      clauses.push(`lead_id = $${i++}`);
      params.push(leadId);
    }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
    const result = await query(
      `SELECT id, type, number, lead_id, source_quote_id, status,
              client_name, client_email, client_company, client_address,
              subtotal_ht, tax_rate, tax_amount, total_ttc, currency,
              valid_until, due_date, notes, sent_at, created_at, updated_at
       FROM documents
       ${where}
       ORDER BY created_at DESC`,
      params,
    );
    return result.rows;
  },

  async findById(id) {
    const result = await query(`SELECT * FROM documents WHERE id = $1`, [id]);
    return result.rows[0] || null;
  },

  async findLines(documentId) {
    const result = await query(
      `SELECT id, document_id, label, quantity, unit_price_ht, position
       FROM document_lines
       WHERE document_id = $1
       ORDER BY position ASC, id ASC`,
      [documentId],
    );
    return result.rows;
  },

  async findEmails(documentId) {
    const result = await query(
      `SELECT id, document_id, to_email, sent_at, ok, error
       FROM document_emails
       WHERE document_id = $1
       ORDER BY sent_at DESC`,
      [documentId],
    );
    return result.rows;
  },

  async create(payload) {
    const client = await getClient();
    try {
      await client.query("BEGIN");
      const number = await nextDocumentNumber(client, payload.type);
      const totals = computeTotals(payload.lines, payload.taxRate);

      const docResult = await client.query(
        `INSERT INTO documents (
          type, number, lead_id, status,
          client_name, client_email, client_company, client_address,
          subtotal_ht, tax_rate, tax_amount, total_ttc, currency,
          valid_until, due_date, notes
        ) VALUES (
          $1,$2,$3,$4,
          $5,$6,$7,$8,
          $9,$10,$11,$12,$13,
          $14,$15,$16
        )
        RETURNING *`,
        [
          payload.type,
          number,
          payload.leadId || null,
          payload.status || "DRAFT",
          payload.clientName,
          payload.clientEmail,
          payload.clientCompany || null,
          payload.clientAddress || null,
          totals.subtotalHt,
          payload.taxRate,
          totals.taxAmount,
          totals.totalTtc,
          payload.currency || "EUR",
          payload.validUntil || null,
          payload.dueDate || null,
          payload.notes || null,
        ],
      );

      const doc = docResult.rows[0];
      await insertLines(client, doc.id, payload.lines);
      await client.query("COMMIT");
      return doc;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async update(id, fields, { replaceLines } = {}) {
    const client = await getClient();
    try {
      await client.query("BEGIN");

      const currentResult = await client.query(
        `SELECT * FROM documents WHERE id = $1 FOR UPDATE`,
        [id],
      );
      const current = currentResult.rows[0];
      if (!current) {
        await client.query("ROLLBACK");
        return null;
      }

      let totals = {
        subtotalHt: Number(current.subtotal_ht),
        taxAmount: Number(current.tax_amount),
        totalTtc: Number(current.total_ttc),
      };
      const taxRate =
        fields.taxRate !== undefined ? fields.taxRate : Number(current.tax_rate);

      if (replaceLines) {
        totals = computeTotals(replaceLines, taxRate);
        await client.query(`DELETE FROM document_lines WHERE document_id = $1`, [
          id,
        ]);
        await insertLines(client, id, replaceLines);
      }

      const sets = [];
      const params = [id];
      let i = 2;

      const map = {
        status: "status",
        clientName: "client_name",
        clientEmail: "client_email",
        clientCompany: "client_company",
        clientAddress: "client_address",
        validUntil: "valid_until",
        dueDate: "due_date",
        notes: "notes",
        leadId: "lead_id",
        sentAt: "sent_at",
      };

      for (const [key, column] of Object.entries(map)) {
        if (fields[key] !== undefined) {
          sets.push(`${column} = $${i++}`);
          params.push(fields[key]);
        }
      }

      if (fields.taxRate !== undefined || replaceLines) {
        sets.push(`tax_rate = $${i++}`);
        params.push(taxRate);
        sets.push(`subtotal_ht = $${i++}`);
        params.push(totals.subtotalHt);
        sets.push(`tax_amount = $${i++}`);
        params.push(totals.taxAmount);
        sets.push(`total_ttc = $${i++}`);
        params.push(totals.totalTtc);
      }

      if (sets.length === 0) {
        await client.query("COMMIT");
        return current;
      }

      sets.push("updated_at = NOW()");
      const result = await client.query(
        `UPDATE documents SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
        params,
      );
      await client.query("COMMIT");
      return result.rows[0] || null;
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async convertQuoteToInvoice(quoteId) {
    const client = await getClient();
    try {
      await client.query("BEGIN");

      const quoteResult = await client.query(
        `SELECT * FROM documents WHERE id = $1 FOR UPDATE`,
        [quoteId],
      );
      const quote = quoteResult.rows[0];
      if (!quote || quote.type !== "QUOTE") {
        await client.query("ROLLBACK");
        return { error: "quote_not_found" };
      }

      const linesResult = await client.query(
        `SELECT label, quantity, unit_price_ht, position
         FROM document_lines
         WHERE document_id = $1
         ORDER BY position ASC, id ASC`,
        [quoteId],
      );

      const number = await nextDocumentNumber(client, "INVOICE");
      const due = new Date();
      due.setDate(due.getDate() + 30);

      const invoiceResult = await client.query(
        `INSERT INTO documents (
          type, number, lead_id, source_quote_id, status,
          client_name, client_email, client_company, client_address,
          subtotal_ht, tax_rate, tax_amount, total_ttc, currency,
          due_date, notes
        ) VALUES (
          'INVOICE', $1, $2, $3, 'DRAFT',
          $4, $5, $6, $7,
          $8, $9, $10, $11, $12,
          $13, $14
        )
        RETURNING *`,
        [
          number,
          quote.lead_id,
          quote.id,
          quote.client_name,
          quote.client_email,
          quote.client_company,
          quote.client_address,
          quote.subtotal_ht,
          quote.tax_rate,
          quote.tax_amount,
          quote.total_ttc,
          quote.currency,
          due.toISOString().slice(0, 10),
          quote.notes,
        ],
      );

      const invoice = invoiceResult.rows[0];
      await insertLines(
        client,
        invoice.id,
        linesResult.rows.map((row) => ({
          label: row.label,
          quantity: Number(row.quantity),
          unitPriceHt: Number(row.unit_price_ht),
          position: row.position,
        })),
      );

      await client.query(
        `UPDATE documents SET status = 'ACCEPTED', updated_at = NOW() WHERE id = $1`,
        [quoteId],
      );

      await client.query("COMMIT");
      return { invoice };
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  },

  async logEmail({ documentId, toEmail, ok, error }) {
    const result = await query(
      `INSERT INTO document_emails (document_id, to_email, ok, error)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [documentId, toEmail, ok, error || null],
    );
    return result.rows[0];
  },
};
