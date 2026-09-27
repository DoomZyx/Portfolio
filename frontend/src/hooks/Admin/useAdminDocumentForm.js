import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../services/adminApi";
import {
  buildDocumentCreatePayload,
  computeDocTotals,
  emptyLine,
} from "../../utils/adminDocuments";

function defaultValidUntil() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export function useAdminDocumentForm({ initialType, leadIdParam }) {
  const navigate = useNavigate();
  const [type, setType] = useState(initialType);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [taxRate, setTaxRate] = useState(20);
  const [validUntil, setValidUntil] = useState(defaultValidUntil);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [leadId, setLeadId] = useState(leadIdParam || "");
  const [lines, setLines] = useState([emptyLine()]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  useEffect(() => {
    setLeadId(leadIdParam || "");
  }, [leadIdParam]);

  useEffect(() => {
    if (!leadIdParam) return undefined;
    let cancelled = false;
    async function preloadLead() {
      try {
        const lead = await adminApi.getLead(leadIdParam);
        if (cancelled) return;
        setClientName(lead.name || "");
        setClientEmail(lead.email || "");
        setClientCompany(lead.company || "");
        setLeadId(String(lead.id));
        if (lead.estimatedValue) {
          setLines([
            {
              id: crypto.randomUUID(),
              label: "Prestation e-commerce (estimation)",
              quantity: 1,
              unitPriceHt: Number(lead.estimatedValue) || 0,
            },
          ]);
        }
      } catch {
        // lead optionnel
      }
    }
    preloadLead();
    return () => {
      cancelled = true;
    };
  }, [leadIdParam]);

  const totals = useMemo(
    () => computeDocTotals(lines, taxRate),
    [lines, taxRate],
  );

  function updateLine(index, patch) {
    setLines((prev) =>
      prev.map((line, i) => (i === index ? { ...line, ...patch } : line)),
    );
  }

  function addLine() {
    setLines((prev) => [...prev, emptyLine()]);
  }

  function removeLine(index) {
    setLines((prev) =>
      prev.length <= 1 ? prev : prev.filter((_, i) => i !== index),
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const payload = buildDocumentCreatePayload({
        type,
        clientName,
        clientEmail,
        clientCompany,
        clientAddress,
        taxRate,
        validUntil,
        dueDate,
        notes,
        leadId,
        lines,
      });
      const created = await adminApi.createDocument(payload);
      navigate(`/admin/documents/${created.id}`);
    } catch (err) {
      setError(err.message || "Creation impossible");
    } finally {
      setSaving(false);
    }
  }

  return {
    type,
    setType,
    clientName,
    setClientName,
    clientEmail,
    setClientEmail,
    clientCompany,
    setClientCompany,
    clientAddress,
    setClientAddress,
    taxRate,
    setTaxRate,
    validUntil,
    setValidUntil,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    leadId,
    setLeadId,
    lines,
    totals,
    error,
    saving,
    updateLine,
    addLine,
    removeLine,
    handleSubmit,
  };
}
