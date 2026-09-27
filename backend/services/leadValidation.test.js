import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  validatePublicLeadPayload,
  validateLeadUpdatePayload,
  validateNotePayload,
  validateLeadEmailPayload,
} from "./leadValidation.js";

const validDiagnostic = {
  currentSolution: "NONE",
  objective: "LAUNCH_FAST",
  catalogSize: "UNDER_20",
  needs: ["NONE"],
  business: ["BRANDING", "SEGMENTATION", "ACQUISITION", "CONVERSION"],
  budget: "FROM_2K_TO_5K",
  timeline: "FROM_1_TO_3_MONTHS",
};

const validPublicLead = {
  name: "Alice Martin",
  email: "Alice@Acme.fr",
  phone: "+33600000000",
  company: "Acme",
  message: "Besoin d'un devis",
  projectType: "ecommerce",
  source: "diagnostic_ecommerce",
  diagnostic: validDiagnostic,
};

describe("validatePublicLeadPayload", () => {
  it("accepte un payload diagnostic valide et normalise l'email", () => {
    const result = validatePublicLeadPayload(validPublicLead);
    assert.equal(result.error, undefined);
    assert.equal(result.value.email, "alice@acme.fr");
    assert.equal(result.value.projectType, "ecommerce");
    assert.deepEqual(result.value.diagnostic.needs, ["NONE"]);
  });

  it("rejette name / email / diagnostic manquants", () => {
    assert.equal(
      validatePublicLeadPayload({ ...validPublicLead, name: "" }).error,
      "name is required",
    );
    assert.equal(
      validatePublicLeadPayload({
        ...validPublicLead,
        email: "not-an-email",
      }).error,
      "valid email is required",
    );
    assert.equal(
      validatePublicLeadPayload({
        ...validPublicLead,
        diagnostic: null,
      }).error,
      "diagnostic is required",
    );
  });

  it("rejette des enums diagnostic invalides", () => {
    assert.equal(
      validatePublicLeadPayload({
        ...validPublicLead,
        diagnostic: { ...validDiagnostic, budget: "FREE" },
      }).error,
      "invalid budget",
    );
    assert.equal(
      validatePublicLeadPayload({
        ...validPublicLead,
        diagnostic: { ...validDiagnostic, needs: ["UNKNOWN"] },
      }).error,
      "invalid needs",
    );
  });

  it("rejette un projectType non supporté", () => {
    const result = validatePublicLeadPayload({
      ...validPublicLead,
      projectType: "mobile",
    });
    assert.equal(result.error, "unsupported projectType");
  });
});

describe("validateLeadUpdatePayload", () => {
  it("accepte une mise à jour partielle de status et valeurs", () => {
    const result = validateLeadUpdatePayload({
      status: "WON",
      estimatedValue: 5000,
      finalValue: 4500,
    });
    assert.equal(result.error, undefined);
    assert.equal(result.value.status, "WON");
    assert.equal(result.value.estimatedValue, 5000);
    assert.equal(result.value.finalValue, 4500);
  });

  it("permet de vider phone / company / message", () => {
    const result = validateLeadUpdatePayload({
      phone: "",
      company: null,
      message: "",
    });
    assert.equal(result.value.phone, null);
    assert.equal(result.value.company, null);
    assert.equal(result.value.message, null);
  });

  it("rejette status invalide et payload vide", () => {
    assert.equal(
      validateLeadUpdatePayload({ status: "PENDING" }).error,
      "invalid status",
    );
    assert.equal(validateLeadUpdatePayload({}).error, "no updatable fields");
  });

  it("rejette estimatedValue négatif", () => {
    assert.equal(
      validateLeadUpdatePayload({ estimatedValue: -1 }).error,
      "invalid estimatedValue",
    );
  });
});

describe("validateNotePayload", () => {
  it("accepte une note non vide", () => {
    const result = validateNotePayload({ body: "  Appel client  " });
    assert.equal(result.error, undefined);
    assert.equal(result.value, "Appel client");
  });

  it("rejette une note vide", () => {
    assert.equal(validateNotePayload({ body: "" }).error, "note body is required");
    assert.equal(validateNotePayload({}).error, "note body is required");
  });
});

describe("validateLeadEmailPayload", () => {
  it("accepte sujet + message", () => {
    const result = validateLeadEmailPayload({
      subject: "Suite diagnostic",
      body: "Bonjour, voici la suite.",
    });
    assert.equal(result.error, undefined);
    assert.equal(result.value.subject, "Suite diagnostic");
    assert.equal(result.value.toEmail, null);
  });

  it("accepte un toEmail optionnel valide", () => {
    const result = validateLeadEmailPayload({
      subject: "Devis",
      body: "Ci-joint",
      toEmail: "client@acme.fr",
    });
    assert.equal(result.value.toEmail, "client@acme.fr");
  });

  it("rejette sujet / message / toEmail invalides", () => {
    assert.equal(
      validateLeadEmailPayload({ subject: "", body: "x" }).error,
      "sujet requis",
    );
    assert.equal(
      validateLeadEmailPayload({ subject: "Hi", body: "" }).error,
      "message requis",
    );
    assert.equal(
      validateLeadEmailPayload({
        subject: "Hi",
        body: "x",
        toEmail: "bad",
      }).error,
      "toEmail invalide",
    );
  });
});
