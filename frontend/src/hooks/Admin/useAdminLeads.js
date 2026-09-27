import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../services/adminApi";
import { countLeadsByStatus, filterLeads } from "../../utils/adminLeads";

export function useAdminLeads() {
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    adminApi
      .listLeads()
      .then((data) => {
        if (!cancelled) setLeads(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Erreur leads");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredLeads = useMemo(
    () => filterLeads(leads, { search, statusFilter }),
    [leads, search, statusFilter],
  );

  const counts = useMemo(() => countLeadsByStatus(leads), [leads]);

  async function handleQuickStatus(leadId, nextStatus) {
    setError("");
    setSuccess("");
    setUpdatingId(leadId);
    try {
      const updated = await adminApi.updateLead(leadId, { status: nextStatus });
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === leadId ? { ...lead, ...updated } : lead,
        ),
      );
      setSuccess("Statut mis a jour");
    } catch (err) {
      setError(err.message || "Mise a jour impossible");
    } finally {
      setUpdatingId(null);
    }
  }

  return {
    error,
    success,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    updatingId,
    filteredLeads,
    counts,
    handleQuickStatus,
  };
}
