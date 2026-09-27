import PDFDocument from "pdfkit";

const MARGIN = 48;
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const CONTENT_W = PAGE_W - MARGIN * 2;
const FOOTER_Y = PAGE_H - 28;

const COLORS = {
  ink: "#111111",
  muted: "#5c5c5c",
  soft: "#8a8a8a",
  line: "#e6e6e6",
  band: "#f6f6f6",
  accent: "#ecbd00",
  accentDark: "#b38f00",
};

/** Helvetica-safe money (avoid € / narrow spaces that break in PDFKit). */
function money(n) {
  const value = Number(n) || 0;
  const [intRaw, dec] = value.toFixed(2).split(".");
  const intPart = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${intPart},${dec} EUR`;
}

function formatDateFr(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "-";
  }
}

function issuerFromEnv() {
  return {
    name: process.env.ISSUER_NAME || "Axel Cella",
    siret: process.env.ISSUER_SIRET || "",
    address: process.env.ISSUER_ADDRESS || "",
    vat: process.env.ISSUER_VAT || "",
    email: process.env.ISSUER_EMAIL || "",
  };
}

const QUOTE_TERMS_BASE = [
  "Commande : l'acceptation du devis (signature, email de confirmation ou acompte) vaut commande ferme.",
  "Acompte : un acompte de 40 % est exigible a la commande. Le solde est du a la livraison / mise en production, selon les jalons convenus.",
  "Perimetre : seules les prestations et livrables expressement listes sont inclus. Toute demande hors scope (evolutions, contenus supplementaires, integrations non prevues) fait l'objet d'un avenant chiffre.",
  "Delais : les delais annonces dependent de la reactivite du client (retours, validations, fournitures). Tout retard client decale le planning sans penalite pour le prestataire.",
  "Paiement : factures payables a 15 jours. En cas de retard, penalites legales et indemnite forfaitaire de recouvrement applicables.",
  "Annulation : en cas d'annulation apres commande, l'acompte reste acquis ; le travail deja realise est facture au prorata.",
  "Propriete intellectuelle : les livrables restent la propriete du prestataire jusqu'au paiement integral. Apres solde, cession des droits d'usage convenue pour le projet.",
  "Responsabilite : le prestataire ne saurait etre tenu responsable des pertes de chiffre d'affaires, donnees non sauvegardees par le client, ou usages hors recommandations.",
  "Confidentialite : chaque partie s'engage a ne pas divulguer les informations echangees dans le cadre de la mission.",
  "Sous-traitance : le prestataire peut faire appel a des collaborateurs qualifies sous sa responsabilite.",
  "Litiges : droit francais. Tentative de resolution amiable prealable a tout recours.",
];

function buildValidityTerm(document) {
  if (document.valid_until) {
    return `Validite : ce devis est valable jusqu'au ${formatDateFr(document.valid_until)} inclus, date indiquee en en-tete. Au-dela, il est caduc sauf nouvel accord ecrit.`;
  }
  return "Validite : ce devis est valable 30 jours a compter de sa date d'emission, sauf mention contraire.";
}

function quoteTermsFor(document) {
  return [buildValidityTerm(document), ...QUOTE_TERMS_BASE];
}

function drawAccentBar(doc) {
  doc.save();
  doc.rect(0, 0, PAGE_W, 8).fill(COLORS.accent);
  doc.restore();
}

function drawFooter(doc, title, number, page, pageCount) {
  doc.save();
  const prevMargins = { ...doc.page.margins };
  doc.page.margins = { top: 0, left: 0, bottom: 0, right: 0 };

  doc
    .moveTo(MARGIN, FOOTER_Y - 10)
    .lineTo(PAGE_W - MARGIN, FOOTER_Y - 10)
    .strokeColor(COLORS.line)
    .lineWidth(1)
    .stroke();
  doc.fillColor(COLORS.soft).font("Helvetica").fontSize(8);
  doc.text(`${title} ${number}`, MARGIN, FOOTER_Y, {
    width: CONTENT_W * 0.7,
    lineBreak: false,
  });
  doc.text(`${page} / ${pageCount}`, MARGIN, FOOTER_Y, {
    width: CONTENT_W,
    align: "right",
    lineBreak: false,
  });

  doc.page.margins = prevMargins;
  doc.restore();
}

function textBlock(doc, lines, x, y, width, opts = {}) {
  let cursor = y;
  const align = opts.align || "left";
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line) continue;
    const isFirst = i === 0;
    doc
      .fillColor(COLORS.ink)
      .font(isFirst && opts.boldFirst ? "Helvetica-Bold" : "Helvetica")
      .fontSize(isFirst && opts.boldFirst ? 11 : 9)
      .text(line, x, cursor, { width, align, lineBreak: false });
    cursor += isFirst && opts.boldFirst ? 16 : 14;
  }
  return cursor;
}

/**
 * Build a polished single-document PDF for a quote/invoice.
 */
export function buildDocumentPdf({ document, lines }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: MARGIN, left: MARGIN, right: MARGIN, bottom: 48 },
      bufferPages: true,
      autoFirstPage: true,
      info: {
        Title: `${document.type === "QUOTE" ? "Devis" : "Facture"} ${document.number}`,
        Author: process.env.ISSUER_NAME || "Axel Cella",
      },
    });

    const chunks = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const issuer = issuerFromEnv();
    const isQuote = document.type === "QUOTE";
    const title = isQuote ? "DEVIS" : "FACTURE";
    const left = MARGIN;
    const right = PAGE_W - MARGIN;

    const startPageContent = (yStart = MARGIN) => {
      drawAccentBar(doc);
      return yStart;
    };

    let y = startPageContent(MARGIN);

    doc.fillColor(COLORS.ink).font("Helvetica-Bold").fontSize(18);
    doc.text(issuer.name, left, y, {
      width: CONTENT_W * 0.58,
      lineBreak: false,
    });

    const badgeW = 120;
    const badgeH = 28;
    const badgeX = right - badgeW;
    doc.save();
    doc.roundedRect(badgeX, y, badgeW, badgeH, 4).fill(COLORS.ink);
    doc.fillColor(COLORS.accent).font("Helvetica-Bold").fontSize(12);
    doc.text(title, badgeX, y + 8, {
      width: badgeW,
      align: "center",
      lineBreak: false,
    });
    doc.restore();

    doc
      .fillColor(COLORS.muted)
      .font("Helvetica")
      .fontSize(9)
      .text("Developpeur & architecte de produits digitaux", left, y + 24, {
        width: CONTENT_W * 0.58,
        lineBreak: false,
      });

    y += 52;

    const metaH = 56;
    doc.save();
    doc.roundedRect(left, y, CONTENT_W, metaH, 6).fill(COLORS.band);
    doc.restore();

    const colW = CONTENT_W / 3;
    const metaItems = [
      ["Numero", document.number],
      ["Date", formatDateFr(document.created_at)],
      [
        isQuote ? "Valable jusqu'au" : "Echeance",
        formatDateFr(isQuote ? document.valid_until : document.due_date),
      ],
    ];
    metaItems.forEach(([label, value], i) => {
      const x = left + 16 + i * colW;
      doc
        .fillColor(COLORS.soft)
        .font("Helvetica")
        .fontSize(8)
        .text(label.toUpperCase(), x, y + 14, {
          width: colW - 20,
          lineBreak: false,
        });
      doc
        .fillColor(COLORS.ink)
        .font("Helvetica-Bold")
        .fontSize(11)
        .text(value, x, y + 30, { width: colW - 20, lineBreak: false });
    });
    y += metaH + 20;

    const gap = 20;
    const partyW = (CONTENT_W - gap) / 2;
    const padX = 24;
    const padY = 20;
    const headerH = 34;
    const lineH = 15;

    const issuerLines = [
      issuer.name,
      issuer.address,
      issuer.email,
      issuer.siret ? `SIRET ${issuer.siret}` : "",
      issuer.vat ? `TVA ${issuer.vat}` : "",
    ].filter(Boolean);
    const clientLines = [
      "Madame, Monsieur",
      document.client_name,
      document.client_company,
      document.client_address,
      document.client_email,
    ].filter(Boolean);

    const maxLines = Math.max(issuerLines.length, clientLines.length, 4);
    const bodyH = padY * 2 + maxLines * lineH;
    const partyH = headerH + bodyH;

    const drawParty = (x, heading, bodyLines) => {
      doc.save();
      doc
        .roundedRect(x, y, partyW, partyH, 8)
        .strokeColor(COLORS.line)
        .lineWidth(1)
        .stroke();
      doc
        .moveTo(x, y + headerH)
        .lineTo(x + partyW, y + headerH)
        .strokeColor(COLORS.line)
        .stroke();
      doc.restore();

      doc
        .fillColor(COLORS.accentDark)
        .font("Helvetica-Bold")
        .fontSize(8)
        .text(heading.toUpperCase(), x + padX, y + 12, {
          width: partyW - padX * 2,
          align: "center",
          lineBreak: false,
        });

      // Center body block vertically inside the card body.
      const usedH = bodyLines.length * lineH;
      const bodyTop = y + headerH + Math.max(padY, (bodyH - usedH) / 2);
      textBlock(doc, bodyLines, x + padX, bodyTop, partyW - padX * 2, {
        boldFirst: true,
        align: "center",
      });
    };

    drawParty(left, "Emetteur", issuerLines);
    drawParty(left + partyW + gap, "Client", clientLines);
    y += partyH + 28;

    doc
      .fillColor(COLORS.ink)
      .font("Helvetica-Bold")
      .fontSize(11)
      .text("Detail des prestations", left, y, { lineBreak: false });
    y += 18;

    const cols = {
      label: { x: left, w: CONTENT_W * 0.48 },
      qty: { x: left + CONTENT_W * 0.5, w: CONTENT_W * 0.1 },
      price: { x: left + CONTENT_W * 0.62, w: CONTENT_W * 0.16 },
      total: { x: left + CONTENT_W * 0.8, w: CONTENT_W * 0.2 },
    };

    const drawTableHeader = () => {
      doc.save();
      doc.rect(left, y, CONTENT_W, 24).fill(COLORS.ink);
      doc.fillColor(COLORS.accent).font("Helvetica-Bold").fontSize(8);
      doc.text("PRESTATION", cols.label.x + 10, y + 8, {
        width: cols.label.w - 12,
        lineBreak: false,
      });
      doc.text("QTE", cols.qty.x, y + 8, {
        width: cols.qty.w,
        align: "right",
        lineBreak: false,
      });
      doc.text("PU HT", cols.price.x, y + 8, {
        width: cols.price.w,
        align: "right",
        lineBreak: false,
      });
      doc.text("TOTAL HT", cols.total.x, y + 8, {
        width: cols.total.w - 10,
        align: "right",
        lineBreak: false,
      });
      doc.restore();
      y += 24;
    };

    drawTableHeader();

    const bottomLimit = PAGE_H - 100;

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const qty = Number(line.quantity);
      const price = Number(line.unit_price_ht);
      const lineTotal = qty * price;
      const labelH = doc.heightOfString(String(line.label || ""), {
        width: cols.label.w - 16,
      });
      const rowH = Math.max(28, labelH + 12);

      if (y + rowH > bottomLimit) {
        doc.addPage();
        y = startPageContent(MARGIN);
        drawTableHeader();
      }

      if (index % 2 === 1) {
        doc.save();
        doc.rect(left, y, CONTENT_W, rowH).fill(COLORS.band);
        doc.restore();
      }

      doc
        .fillColor(COLORS.ink)
        .font("Helvetica")
        .fontSize(9)
        .text(String(line.label || ""), cols.label.x + 10, y + 8, {
          width: cols.label.w - 16,
        });

      const textY = y + 8;
      doc.text(String(qty), cols.qty.x, textY, {
        width: cols.qty.w,
        align: "right",
        lineBreak: false,
      });
      doc.text(money(price), cols.price.x, textY, {
        width: cols.price.w,
        align: "right",
        lineBreak: false,
      });
      doc.font("Helvetica-Bold").text(money(lineTotal), cols.total.x, textY, {
        width: cols.total.w - 10,
        align: "right",
        lineBreak: false,
      });

      y += rowH;
      doc
        .moveTo(left, y)
        .lineTo(right, y)
        .strokeColor(COLORS.line)
        .lineWidth(0.5)
        .stroke();
    }

    if (y + 110 > PAGE_H - 56) {
      doc.addPage();
      y = startPageContent(MARGIN);
    } else {
      y += 16;
    }

    const totalsW = 230;
    const totalsX = right - totalsW;
    const totalsH = 92;

    doc.save();
    doc.roundedRect(totalsX, y, totalsW, totalsH, 6).fill(COLORS.band);
    doc
      .moveTo(totalsX, y + totalsH - 32)
      .lineTo(totalsX + totalsW, y + totalsH - 32)
      .strokeColor(COLORS.accent)
      .lineWidth(1.5)
      .stroke();
    doc.restore();

    const drawTotalRow = (label, value, top, bold = false) => {
      doc
        .fillColor(COLORS.muted)
        .font("Helvetica")
        .fontSize(9)
        .text(label, totalsX + 14, top, { width: 110, lineBreak: false });
      doc
        .fillColor(COLORS.ink)
        .font(bold ? "Helvetica-Bold" : "Helvetica")
        .fontSize(bold ? 12 : 9)
        .text(value, totalsX + 14, top, {
          width: totalsW - 28,
          align: "right",
          lineBreak: false,
        });
    };

    drawTotalRow("Sous-total HT", money(document.subtotal_ht), y + 14);
    drawTotalRow(
      `TVA (${Number(document.tax_rate)} %)`,
      money(document.tax_amount),
      y + 34,
    );
    drawTotalRow("Total TTC", money(document.total_ttc), y + totalsH - 22, true);

    y += totalsH + 18;

    if (document.notes) {
      if (y + 60 > PAGE_H - 56) {
        doc.addPage();
        y = startPageContent(MARGIN);
      }
      doc
        .fillColor(COLORS.ink)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("Notes", left, y, { lineBreak: false });
      y += 14;
      doc
        .fillColor(COLORS.muted)
        .font("Helvetica")
        .fontSize(9)
        .text(document.notes, left, y, { width: CONTENT_W });
      y = doc.y + 14;
    }

    if (isQuote) {
      if (y + 120 > PAGE_H - 56) {
        doc.addPage();
        y = startPageContent(MARGIN);
      }
      doc
        .fillColor(COLORS.ink)
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("Conditions generales du devis", left, y, { lineBreak: false });
      y += 14;

      const terms = quoteTermsFor(document);
      for (let i = 0; i < terms.length; i += 1) {
        const term = `${i + 1}. ${terms[i]}`;
        const h = doc.heightOfString(term, { width: CONTENT_W });
        if (y + h + 8 > PAGE_H - 56) {
          doc.addPage();
          y = startPageContent(MARGIN);
        }
        doc
          .fillColor(COLORS.muted)
          .font("Helvetica")
          .fontSize(7.5)
          .text(term, left, y, { width: CONTENT_W, align: "left" });
        y = doc.y + 5;
      }
    } else {
      if (y + 40 > PAGE_H - 56) {
        doc.addPage();
        y = startPageContent(MARGIN);
      }
      doc
        .fillColor(COLORS.soft)
        .font("Helvetica")
        .fontSize(8)
        .text(
          "Paiement a 15 jours. Penalites de retard et indemnite forfaitaire de recouvrement applicables selon la legislation en vigueur.",
          left,
          y,
          { width: CONTENT_W },
        );
    }

    const range = doc.bufferedPageRange();
    for (let i = 0; i < range.count; i += 1) {
      doc.switchToPage(range.start + i);
      drawFooter(doc, title, document.number, i + 1, range.count);
    }

    doc.end();
  });
}
