import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../services/adminApi";

export function useAdminDocumentDetail(id) {
  const navigate = useNavigate();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [busy, setBusy] = useState(false);
  const [toEmail, setToEmail] = useState("");
  const [markLeadQuoteSent, setMarkLeadQuoteSent] = useState(true);
  const cancelledRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    cancelledRef.current = false;
    setLoading(true);
    setError("");
    setDoc(null);

    async function run() {
      try {
        const data = await adminApi.getDocument(id);
        if (cancelled) return;
        setDoc(data);
        setToEmail(data.clientEmail || "");
      } catch (err) {
        if (!cancelled) {
          setDoc(null);
          setError(err.message || "Erreur document");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
      cancelledRef.current = true;
    };
  }, [id]);

  async function refreshDocument() {
    const data = await adminApi.getDocument(id);
    if (cancelledRef.current) return;
    setDoc(data);
    setToEmail(data.clientEmail || "");
  }

  async function handleStatus(nextStatus) {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const updated = await adminApi.updateDocument(id, { status: nextStatus });
      setDoc((prev) => ({
        ...prev,
        ...updated,
        lines: prev.lines,
        emails: prev.emails,
      }));
      setSuccess("Statut mis a jour");
    } catch (err) {
      setError(err.message || "Mise a jour impossible");
    } finally {
      setBusy(false);
    }
  }

  async function handlePdf() {
    setBusy(true);
    setError("");
    try {
      await adminApi.downloadDocumentPdf(id, doc?.number);
    } catch (err) {
      setError(err.message || "PDF impossible");
    } finally {
      setBusy(false);
    }
  }

  async function handleSend(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const updated = await adminApi.sendDocument(id, {
        toEmail: toEmail || undefined,
        markLeadQuoteSent:
          doc?.type === "QUOTE" && doc?.leadId ? markLeadQuoteSent : false,
      });
      setDoc(updated);
      setSuccess("Document envoye par email");
    } catch (err) {
      setError(err.message || "Envoi impossible");
      try {
        await refreshDocument();
      } catch {
        // ignore
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleConvert() {
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      const invoice = await adminApi.convertDocument(id);
      setSuccess(`Facture ${invoice.number} creee`);
      navigate(`/admin/documents/${invoice.id}`);
    } catch (err) {
      setError(err.message || "Conversion impossible");
    } finally {
      setBusy(false);
    }
  }

  return {
    doc,
    loading,
    error,
    success,
    busy,
    toEmail,
    setToEmail,
    markLeadQuoteSent,
    setMarkLeadQuoteSent,
    handleStatus,
    handlePdf,
    handleSend,
    handleConvert,
  };
}
