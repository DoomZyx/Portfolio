import { useEffect, useMemo, useState } from "react";
import { adminApi } from "../../services/adminApi";
import {
  buildDashboardFunnel,
  computeConversionRate,
  maxSourceCount,
} from "../../utils/adminLeads";

export function useAdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    Promise.all([adminApi.dashboard(), adminApi.listLeads()])
      .then(([dashboard, leads]) => {
        if (cancelled) return;
        setStats(dashboard);
        setRecentLeads(leads.slice(0, 5));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Erreur dashboard");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const conversionRate = useMemo(
    () => computeConversionRate(stats),
    [stats],
  );
  const funnel = useMemo(() => buildDashboardFunnel(stats), [stats]);
  const maxSource = useMemo(
    () => maxSourceCount(stats?.leadsBySource),
    [stats],
  );

  return {
    stats,
    recentLeads,
    error,
    conversionRate,
    funnel,
    maxSource,
  };
}
