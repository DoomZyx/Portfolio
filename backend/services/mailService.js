import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  if (!host) {
    throw new Error("SMTP_HOST non configure");
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const user = (process.env.SMTP_USER || "").trim();
  // Gmail app passwords are often copied with spaces: "abcd efgh ijkl mnop"
  const pass = (process.env.SMTP_PASS || "").replace(/\s+/g, "").trim();

  return nodemailer.createTransport({
    host: host.trim(),
    port,
    secure: port === 465,
    auth: user && pass ? { user, pass } : undefined,
  });
}

export async function sendDocumentEmail({
  to,
  subject,
  text,
  html,
  pdfBuffer,
  filename,
}) {
  const from =
    process.env.SMTP_FROM ||
    process.env.ISSUER_EMAIL ||
    process.env.SMTP_USER;

  if (!from) {
    throw new Error("SMTP_FROM (ou ISSUER_EMAIL / SMTP_USER) requis");
  }

  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });

  return info;
}

export async function sendPlainEmail({ to, subject, text, html }) {
  const from =
    process.env.SMTP_FROM ||
    process.env.ISSUER_EMAIL ||
    process.env.SMTP_USER;

  if (!from) {
    throw new Error("SMTP_FROM (ou ISSUER_EMAIL / SMTP_USER) requis");
  }

  const transporter = getTransporter();
  return transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
}
