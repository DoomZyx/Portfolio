import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  typeFromPath,
  filterDocumentsByStatus,
  computeLineTotal,
  computeDocTotals,
  buildDocumentCreatePayload,
} from "./adminDocuments.js";

const sampleDocs = [
  { id: 1, status: "DRAFT", type: "QUOTE" },
  { id: 2, status: "SENT", type: "QUOTE" },
  { id: 3, status: "PAID", type: "INVOICE" },
];

describe("typeFromPath", () => {
  it("détecte INVOICE depuis /admin/factures", () => {
    assert.equal(typeFromPath("/admin/factures"), "INVOICE");
    assert.equal(typeFromPath("/admin/factures/12"), "INVOICE");
  });

  it("détecte QUOTE depuis /admin/devis", () => {
    assert.equal(typeFromPath("/admin/devis"), "QUOTE");
    assert.equal(typeFromPath("/admin/devis/new"), "QUOTE");
  });

  it("retourne null pour un chemin inconnu", () => {
    assert.equal(typeFromPath("/admin/leads"), null);
    assert.equal(typeFromPath("/"), null);
  });
});

describe("filterDocumentsByStatus", () => {
  it("retourne tous les documents si ALL", () => {
    assert.equal(filterDocumentsByStatus(sampleDocs).length, 3);
    assert.equal(filterDocumentsByStatus(sampleDocs, "ALL").length, 3);
  });

  it("filtre par statut", () => {
    const drafts = filterDocumentsByStatus(sampleDocs, "DRAFT");
    assert.equal(drafts.length, 1);
    assert.equal(drafts[0].id, 1);
  });
});

describe("computeLineTotal", () => {
  it("multiplie quantity * unitPriceHt", () => {
    assert.equal(computeLineTotal({ quantity: 3, unitPriceHt: 10 }), 30);
  });

  it("tolère valeurs manquantes / non numériques", () => {
    assert.equal(computeLineTotal({ quantity: "", unitPriceHt: 10 }), 0);
    assert.equal(computeLineTotal({ quantity: 2, unitPriceHt: null }), 0);
  });
});

describe("computeDocTotals", () => {
  it("calcule HT, TVA et TTC", () => {
    const lines = [
      { quantity: 2, unitPriceHt: 100 },
      { quantity: 1, unitPriceHt: 50 },
    ];
    const totals = computeDocTotals(lines, 20);
    assert.equal(totals.subtotalHt, 250);
    assert.equal(totals.taxAmount, 50);
    assert.equal(totals.totalTtc, 300);
  });

  it("gère taxRate à 0", () => {
    const totals = computeDocTotals([{ quantity: 1, unitPriceHt: 99.99 }], 0);
    assert.equal(totals.subtotalHt, 99.99);
    assert.equal(totals.taxAmount, 0);
    assert.equal(totals.totalTtc, 99.99);
  });
});

describe("buildDocumentCreatePayload", () => {
  it("construit un payload QUOTE avec validUntil", () => {
    const payload = buildDocumentCreatePayload({
      type: "QUOTE",
      clientName: "Alice",
      clientEmail: "alice@acme.fr",
      clientCompany: "",
      clientAddress: "",
      taxRate: "20",
      validUntil: "2026-12-31",
      dueDate: "2026-11-01",
      notes: "",
      leadId: "5",
      lines: [{ label: "Audit", quantity: "1", unitPriceHt: "500" }],
    });

    assert.equal(payload.type, "QUOTE");
    assert.equal(payload.clientCompany, null);
    assert.equal(payload.clientAddress, null);
    assert.equal(payload.notes, null);
    assert.equal(payload.taxRate, 20);
    assert.equal(payload.validUntil, "2026-12-31");
    assert.equal(payload.dueDate, null);
    assert.equal(payload.leadId, 5);
    assert.deepEqual(payload.lines, [
      { label: "Audit", quantity: 1, unitPriceHt: 500 },
    ]);
  });

  it("construit un payload INVOICE avec dueDate", () => {
    const payload = buildDocumentCreatePayload({
      type: "INVOICE",
      clientName: "Bob",
      clientEmail: "bob@beta.io",
      clientCompany: "Beta",
      clientAddress: "1 rue Test",
      taxRate: 10,
      validUntil: "2026-12-31",
      dueDate: "2026-10-15",
      notes: "Net 30",
      leadId: "",
      lines: [{ label: "Dev", quantity: 2, unitPriceHt: 400 }],
    });

    assert.equal(payload.type, "INVOICE");
    assert.equal(payload.validUntil, null);
    assert.equal(payload.dueDate, "2026-10-15");
    assert.equal(payload.leadId, null);
    assert.equal(payload.clientCompany, "Beta");
    assert.equal(payload.notes, "Net 30");
  });
});
