import { useEffect, useState } from "react";
import { adminApi } from "../../services/adminApi";
import { formatDiagnosticRows } from "../../utils/adminLeads";

function emptyFormFields() {
  return {
    status: "NEW",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    estimatedValue: "",
    finalValue: "",
    note: "",
  };
}

function hydrateFromLead(data) {
  return {
    status: data.status,
    name: data.name || "",
    email: data.email || "",
    phone: data.phone || "",
    company: data.company || "",
    message: data.message || "",
    estimatedValue:
      data.estimatedValue === null || data.estimatedValue === undefined
        ? ""
        : String(data.estimatedValue),
    finalValue:
      data.finalValue === null || data.finalValue === undefined
        ? ""
        : String(data.finalValue),
    note: "",
  };
}

export function useAdminLeadDetail(id) {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [status, setStatus] = useState("NEW");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [mailOpen, setMailOpen] = useState(false);
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [mailError, setMailError] = useState("");
  const [sendingMail, setSendingMail] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLead(null);
    setError("");
    setSuccess("");
    setMailOpen(false);
    const empty = emptyFormFields();
    setStatus(empty.status);
    setName(empty.name);
    setEmail(empty.email);
    setPhone(empty.phone);
    setCompany(empty.company);
    setMessage(empty.message);
    setEstimatedValue(empty.estimatedValue);
    setFinalValue(empty.finalValue);
    setNote(empty.note);

    async function load() {
      try {
        const data = await adminApi.getLead(id);
        if (cancelled) return;
        const fields = hydrateFromLead(data);
        setLead(data);
        setStatus(fields.status);
        setName(fields.name);
        setEmail(fields.email);
        setPhone(fields.phone);
        setCompany(fields.company);
        setMessage(fields.message);
        setEstimatedValue(fields.estimatedValue);
        setFinalValue(fields.finalValue);
        setError("");
      } catch (err) {
        if (!cancelled) {
          setLead(null);
          setError(err.message || "Erreur lead");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!mailOpen) return undefined;
    function onKeyDown(event) {
      if (event.key === "Escape" && !sendingMail) {
        setMailOpen(false);
        setMailError("");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mailOpen, sendingMail]);

  async function persistLead(next) {
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const updated = await adminApi.updateLead(id, next);
      setLead((prev) => ({ ...prev, ...updated, notes: prev.notes }));
      if (next.status !== undefined) setStatus(updated.status);
      if (next.name !== undefined) setName(updated.name || "");
      if (next.email !== undefined) setEmail(updated.email || "");
      if (next.phone !== undefined) setPhone(updated.phone || "");
      if (next.company !== undefined) setCompany(updated.company || "");
      if (next.message !== undefined) setMessage(updated.message || "");
      setSuccess("Lead mis a jour");
      return true;
    } catch (err) {
      setError(err.message || "Mise a jour impossible");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveContact(event) {
    event.preventDefault();
    await persistLead({
      name,
      email,
      phone: phone === "" ? null : phone,
      company: company === "" ? null : company,
      message: message === "" ? null : message,
    });
  }

  async function handleSave(event) {
    event.preventDefault();
    const estimated =
      estimatedValue === "" ? null : Number(estimatedValue);
    const final = finalValue === "" ? null : Number(finalValue);
    if (
      (estimatedValue !== "" && !Number.isFinite(estimated)) ||
      (finalValue !== "" && !Number.isFinite(final))
    ) {
      setError("Valeurs numeriques invalides");
      return;
    }
    await persistLead({
      status,
      estimatedValue: estimated,
      finalValue: final,
    });
  }

  async function handlePipelineClick(nextStatus) {
    const previous = status;
    setStatus(nextStatus);
    const ok = await persistLead({ status: nextStatus });
    if (!ok) setStatus(previous);
  }

  async function handleAddNote(event) {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const created = await adminApi.addNote(id, note);
      setLead((prev) => ({
        ...prev,
        notes: [created, ...(prev.notes || [])],
      }));
      setNote("");
      setSuccess("Note ajoutee");
    } catch (err) {
      setError(err.message || "Note impossible");
    }
  }

  function openMailModal() {
    setMailError("");
    setMailSubject("");
    setMailBody(lead?.name ? `Bonjour ${lead.name},\n\n` : "Bonjour,\n\n");
    setMailOpen(true);
  }

  function closeMailModal() {
    if (sendingMail) return;
    setMailOpen(false);
    setMailError("");
  }

  async function handleSendEmail(event) {
    event.preventDefault();
    setMailError("");
    setError("");
    setSuccess("");
    setSendingMail(true);
    try {
      const result = await adminApi.sendLeadEmail(id, {
        subject: mailSubject,
        body: mailBody,
        toEmail: lead?.email,
      });
      if (result.note) {
        setLead((prev) => ({
          ...prev,
          notes: [result.note, ...(prev.notes || [])],
        }));
      }
      setMailOpen(false);
      setMailSubject("");
      setMailBody("");
      setSuccess(`Email envoye a ${result.toEmail}`);
    } catch (err) {
      setMailError(err.message || "Envoi email impossible");
    } finally {
      setSendingMail(false);
    }
  }

  const diagnosticRows = lead ? formatDiagnosticRows(lead.diagnostic) : [];

  return {
    lead,
    loading,
    error,
    success,
    status,
    setStatus,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    company,
    setCompany,
    message,
    setMessage,
    estimatedValue,
    setEstimatedValue,
    finalValue,
    setFinalValue,
    note,
    setNote,
    saving,
    mailOpen,
    mailSubject,
    setMailSubject,
    mailBody,
    setMailBody,
    mailError,
    sendingMail,
    diagnosticRows,
    handleSaveContact,
    handleSave,
    handlePipelineClick,
    handleAddNote,
    openMailModal,
    closeMailModal,
    handleSendEmail,
  };
}
