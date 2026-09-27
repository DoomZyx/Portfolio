/**
 * Branded HTML email templates (Axel Cella: noir + or #ecbd00).
 */

const ACCENT = "#ecbd00";
const BG = "#0a0a0a";
const CARD = "#161616";
const TEXT = "#ffffff";
const MUTED = "#a3a3a3";
const BORDER = "#2e2e2e";

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Formule neutre quand la civilite n'est pas connue. */
export function formalClientGreeting() {
  return "Madame, Monsieur,";
}

function nl2br(value) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function issuerName() {
  return process.env.ISSUER_NAME || "Axel Cella";
}

function wrapLayout({ preheader, title, bodyHtml, footerNote }) {
  const brand = escapeHtml(issuerName());
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${BG};color:${TEXT};font-family:Sora,Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader || "")}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BG};padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:${CARD};border:1px solid ${BORDER};border-radius:14px;overflow:hidden;">
          <tr>
            <td style="height:4px;background:${ACCENT};font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px 28px 12px 28px;">
              <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:${ACCENT};">${brand}</p>
              <p style="margin:0;font-size:13px;color:${MUTED};">Architecte de produits digitaux</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 28px 28px;">
              <h1 style="margin:0 0 18px 0;font-size:22px;font-weight:500;line-height:1.3;color:${TEXT};">${escapeHtml(title)}</h1>
              <div style="font-size:15px;line-height:1.65;color:${MUTED};">${bodyHtml}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 28px 28px;">
              <div style="border-top:1px solid ${BORDER};padding-top:18px;font-size:12px;line-height:1.5;color:${MUTED};">
                ${escapeHtml(footerNote || `Cordialement,\n${issuerName()}`).replace(/\n/g, "<br />")}
              </div>
            </td>
          </tr>
        </table>
        <p style="margin:18px 0 0 0;font-size:11px;color:#666666;">Message envoye depuis le back-office ${brand}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildLeadEmailTemplate({ subject, body, clientName }) {
  const safeSubject = String(subject || "").replace(/[\r\n]+/g, " ").trim();
  const greeting = clientName ? `Bonjour ${escapeHtml(clientName)},` : null;
  const bodyHtml = [
    greeting ? `<p style="margin:0 0 14px 0;color:${TEXT};">${greeting}</p>` : "",
    `<div style="margin:0;color:${MUTED};">${nl2br(body)}</div>`,
  ].join("");

  return {
    subject: safeSubject,
    text: body,
    html: wrapLayout({
      preheader: safeSubject,
      title: safeSubject,
      bodyHtml,
      footerNote: `Cordialement,\n${issuerName()}`,
    }),
  };
}

export function buildDocumentEmailTemplate({
  kind,
  number,
  clientName: _clientName,
  totalTtc,
}) {
  const label = kind === "facture" ? "facture" : "devis";
  const titleLabel = kind === "facture" ? "Facture" : "Devis";
  const subject = `${titleLabel} ${number}`;
  // Same ASCII format as PDF (avoid € / nbsp issues in some clients).
  const value = Number(totalTtc || 0);
  const [intRaw, dec] = value.toFixed(2).split(".");
  const intPart = intRaw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const amount = `${intPart},${dec}`;

  const greeting = formalClientGreeting();
  const text = [
    greeting,
    "",
    `Veuillez trouver ci-joint votre ${label} ${number}.`,
    `Montant TTC : ${amount} EUR`,
    "",
    "Cordialement,",
    issuerName(),
  ].join("\n");

  const bodyHtml = `
    <p style="margin:0 0 14px 0;color:${TEXT};">${escapeHtml(greeting)}</p>
    <p style="margin:0 0 14px 0;">Veuillez trouver ci-joint votre <strong style="color:${TEXT};">${escapeHtml(label)} ${escapeHtml(number)}</strong>.</p>
    <table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;margin:18px 0;background:${BG};border:1px solid ${BORDER};border-radius:10px;">
      <tr>
        <td style="padding:16px 18px;">
          <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:${ACCENT};">Montant TTC</p>
          <p style="margin:0;font-size:22px;color:${TEXT};font-weight:500;">${escapeHtml(amount)} EUR</p>
        </td>
      </tr>
    </table>
    <p style="margin:0;">Le PDF est joint a cet email.</p>
  `;

  return {
    subject,
    text,
    html: wrapLayout({
      preheader: `${titleLabel} ${number} - ${amount} EUR`,
      title: `${titleLabel} ${number}`,
      bodyHtml,
      footerNote: `Cordialement,\n${issuerName()}`,
    }),
  };
}
