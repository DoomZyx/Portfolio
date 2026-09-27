import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../services/adminApi";
import { filterDocumentsByStatus } from "../../utils/adminDocuments";

export function useAdminDocuments(typeFilter) {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!typeFilter) return undefined;
    let cancelled = false;
    setDocuments([]);
    setStatusFilter("ALL");
    setError("");
    async function load() {
      try {
        const data = await adminApi.listDocuments({ type: typeFilter });
        if (!cancelled) setDocuments(data);
      } catch (err) {
        if (!cancelled) setError(err.message || "Erreur documents");
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [typeFilter]);

  const filtered = useMemo(
    () => filterDocumentsByStatus(documents, statusFilter),
    [documents, statusFilter],
  );

  async function handleExport() {
    setBusy(true);
    setError("");
    try {
      await adminApi.exportDocumentsCsv({
        type: typeFilter,
        status: statusFilter === "ALL" ? undefined : statusFilter,
      });
    } catch (err) {
      setError(err.message || "Export impossible");
    } finally {
      setBusy(false);
    }
  }

  async function handlePdf(doc) {
    setBusy(true);
    setError("");
    try {
      await adminApi.downloadDocumentPdf(doc.id, doc.number);
    } catch (err) {
      setError(err.message || "PDF impossible");
    } finally {
      setBusy(false);
    }
  }

  return {
    statusFilter,
    setStatusFilter,
    filtered,
    error,
    busy,
    handleExport,
    handlePdf,
  };
}
