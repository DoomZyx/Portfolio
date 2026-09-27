/**
 * Atomic sequential numbering: D-2026-0001 / F-2026-0001
 */
export async function nextDocumentNumber(client, type) {
  const year = new Date().getFullYear();
  const prefix = type === "INVOICE" ? "F" : "D";

  await client.query(
    `INSERT INTO document_counters (year, type, last_number)
     VALUES ($1, $2, 0)
     ON CONFLICT (year, type) DO NOTHING`,
    [year, type],
  );

  const result = await client.query(
    `UPDATE document_counters
     SET last_number = last_number + 1
     WHERE year = $1 AND type = $2
     RETURNING last_number`,
    [year, type],
  );

  const n = result.rows[0].last_number;
  return `${prefix}-${year}-${String(n).padStart(4, "0")}`;
}
