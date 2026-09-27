import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../services/adminApi";

export function useAdminSession({ redirectIfMissing = true } = {}) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const me = await adminApi.me();
        if (!cancelled) setUser(me);
      } catch (err) {
        if (!cancelled) {
          setUser(null);
          if (redirectIfMissing) navigate("/admin/login", { replace: true });
          else setError(err.message || "Non authentifié");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [navigate, redirectIfMissing]);

  async function logout() {
    try {
      await adminApi.logout();
    } catch {
      // cookie peut être déjà invalide : on force la sortie UI
    } finally {
      setUser(null);
      navigate("/admin/login", { replace: true });
    }
  }

  return { user, loading, error, logout };
}
