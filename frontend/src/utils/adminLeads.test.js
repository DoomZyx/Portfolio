import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  filterLeads,
  countLeadsByStatus,
  computeConversionRate,
  buildDashboardFunnel,
  maxSourceCount,
} from "./adminLeads.js";

const sampleLeads = [
  {
    name: "Alice Martin",
    email: "alice@acme.fr",
    company: "Acme",
    source: "diagnostic_ecommerce",
    projectType: "ecommerce",
    status: "NEW",
  },
  {
    name: "Bob Dupont",
    email: "bob@beta.io",
    company: "Beta",
    source: "contact",
    projectType: "ecommerce",
    status: "WON",
  },
  {
    name: "Carla Moreau",
    email: "carla@gamma.com",
    company: "Gamma",
    source: "diagnostic_ecommerce",
    projectType: "ecommerce",
    status: "LOST",
  },
];

describe("filterLeads", () => {
  it("retourne tous les leads sans filtre", () => {
    assert.equal(filterLeads(sampleLeads).length, 3);
  });

  it("filtre par statut", () => {
    const result = filterLeads(sampleLeads, { statusFilter: "WON" });
    assert.equal(result.length, 1);
    assert.equal(result[0].name, "Bob Dupont");
  });

  it("filtre par recherche textuelle (nom, email, company)", () => {
    const byName = filterLeads(sampleLeads, { search: "alice" });
    assert.equal(byName.length, 1);
    assert.equal(byName[0].email, "alice@acme.fr");

    const byCompany = filterLeads(sampleLeads, { search: "Gamma" });
    assert.equal(byCompany.length, 1);
    assert.equal(byCompany[0].name, "Carla Moreau");
  });

  it("combine recherche et statut", () => {
    const result = filterLeads(sampleLeads, {
      search: "diagnostic",
      statusFilter: "NEW",
    });
    assert.equal(result.length, 1);
    assert.equal(result[0].name, "Alice Martin");
  });
});

describe("countLeadsByStatus", () => {
  it("compte ALL et chaque statut", () => {
    const counts = countLeadsByStatus(sampleLeads);
    assert.equal(counts.ALL, 3);
    assert.equal(counts.NEW, 1);
    assert.equal(counts.WON, 1);
    assert.equal(counts.LOST, 1);
    assert.equal(counts.CONTACTED, 0);
    assert.equal(counts.MEETING, 0);
    assert.equal(counts.QUOTE_SENT, 0);
  });

  it("retourne zéro pour une liste vide", () => {
    const counts = countLeadsByStatus([]);
    assert.equal(counts.ALL, 0);
    assert.equal(counts.NEW, 0);
  });
});

describe("computeConversionRate", () => {
  it("calcule won / totalLeads", () => {
    assert.equal(computeConversionRate({ totalLeads: 10, won: 2 }), 0.2);
  });

  it("retourne 0 si stats absentes ou totalLeads à 0", () => {
    assert.equal(computeConversionRate(null), 0);
    assert.equal(computeConversionRate({ totalLeads: 0, won: 1 }), 0);
  });
});

describe("buildDashboardFunnel", () => {
  it("retourne [] si stats absentes", () => {
    assert.deepEqual(buildDashboardFunnel(null), []);
  });

  it("construit le funnel avec ratios", () => {
    const funnel = buildDashboardFunnel({
      totalLeads: 10,
      newLeads: 4,
      meetings: 2,
      quotesSent: 1,
      won: 1,
    });
    assert.equal(funnel.length, 4);
    assert.equal(funnel[0].label, "Nouveaux");
    assert.equal(funnel[0].value, 4);
    assert.equal(funnel[0].ratio, 0.4);
    assert.equal(funnel[3].label, "Gagnés");
    assert.equal(funnel[3].ratio, 0.1);
  });

  it("évite la division par zéro (total minimum 1)", () => {
    const funnel = buildDashboardFunnel({
      totalLeads: 0,
      newLeads: 0,
      meetings: 0,
      quotesSent: 0,
      won: 0,
    });
    assert.equal(funnel[0].ratio, 0);
  });
});

describe("maxSourceCount", () => {
  it("retourne 1 si liste vide ou absente", () => {
    assert.equal(maxSourceCount(null), 1);
    assert.equal(maxSourceCount([]), 1);
  });

  it("retourne le max des counts (au moins 1)", () => {
    assert.equal(
      maxSourceCount([{ count: 3 }, { count: 7 }, { count: 2 }]),
      7,
    );
    assert.equal(maxSourceCount([{ count: 0 }]), 1);
  });
});
