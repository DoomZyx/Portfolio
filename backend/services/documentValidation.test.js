import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  validateDocumentCreatePayload,
  validateDocumentUpdatePayload,
  validateSendPayload,
} from "./documentValidation.js";

const validLine = { label: "Prestation", quantity: 1, unitPriceHt: 100 };

const validCreate = {
  type: "QUOTE",
  clientName: "Alice Martin",
  clientEmail: "alice@acme.fr",
  taxRate: 20,
  lines: [validLine],
};

describe("validateDocumentCreatePayload", () => {
  it("accepte un payload QUOTE valide", () => {
    const result = validateDocumentCreatePayload(validCreate);
    assert.equal(result.error, undefined);
    assert.equal(result.value.type, "QUOTE");
    assert.equal(result.value.status, "DRAFT");
    assert.equal(result.value.currency, "EUR");
    assert.equal(result.value.lines.length, 1);
  });

  it("rejette un type invalide", () => {
    const result = validateDocumentCreatePayload({
      ...validCreate,
      type: "OTHER",
    });
    assert.equal(result.error, "type invalide (QUOTE ou INVOICE)");
  });

  it("rejette clientName manquant et email invalide", () => {
    assert.equal(
      validateDocumentCreatePayload({ ...validCreate, clientName: "" }).error,
      "clientName requis",
    );
    assert.equal(
      validateDocumentCreatePayload({
        ...validCreate,
        clientEmail: "pas-un-email",
      }).error,
      "clientEmail invalide",
    );
  });

  it("rejette lignes vides ou quantité invalide", () => {
    assert.equal(
      validateDocumentCreatePayload({ ...validCreate, lines: [] }).error,
      "Au moins une ligne est requise",
    );
    assert.equal(
      validateDocumentCreatePayload({
        ...validCreate,
        lines: [{ label: "X", quantity: 0, unitPriceHt: 10 }],
      }).error,
      "Ligne 1: quantite invalide",
    );
  });

  it("valide leadId optionnel", () => {
    const ok = validateDocumentCreatePayload({ ...validCreate, leadId: 3 });
    assert.equal(ok.value.leadId, 3);

    const bad = validateDocumentCreatePayload({ ...validCreate, leadId: 0 });
    assert.equal(bad.error, "leadId invalide");
  });
});

describe("validateDocumentUpdatePayload", () => {
  it("autorise un changement de status hors DRAFT", () => {
    const result = validateDocumentUpdatePayload(
      { status: "SENT" },
      { isDraft: false },
    );
    assert.equal(result.error, undefined);
    assert.equal(result.value.status, "SENT");
  });

  it("refuse la modification du contenu hors DRAFT", () => {
    const result = validateDocumentUpdatePayload(
      { clientName: "Hack" },
      { isDraft: false },
    );
    assert.equal(result.error, "Le contenu n'est modifiable qu'en statut DRAFT");
  });

  it("autorise la mise à jour du contenu en DRAFT", () => {
    const result = validateDocumentUpdatePayload(
      {
        clientName: "Bob",
        clientEmail: "bob@beta.io",
        taxRate: 10,
        lines: [validLine],
      },
      { isDraft: true },
    );
    assert.equal(result.error, undefined);
    assert.equal(result.value.clientName, "Bob");
    assert.equal(result.value.taxRate, 10);
    assert.equal(result.replaceLines.length, 1);
  });

  it("rejette un status invalide", () => {
    const result = validateDocumentUpdatePayload(
      { status: "UNKNOWN" },
      { isDraft: true },
    );
    assert.equal(result.error, "status invalide");
  });
});

describe("validateSendPayload", () => {
  it("accepte un payload vide (toEmail null)", () => {
    const result = validateSendPayload({});
    assert.equal(result.error, undefined);
    assert.equal(result.value.toEmail, null);
    assert.equal(result.value.markLeadQuoteSent, false);
  });

  it("accepte un toEmail valide et markLeadQuoteSent", () => {
    const result = validateSendPayload({
      toEmail: "client@acme.fr",
      markLeadQuoteSent: true,
    });
    assert.equal(result.value.toEmail, "client@acme.fr");
    assert.equal(result.value.markLeadQuoteSent, true);
  });

  it("rejette un toEmail invalide", () => {
    const result = validateSendPayload({ toEmail: "bad" });
    assert.equal(result.error, "toEmail invalide");
  });
});
