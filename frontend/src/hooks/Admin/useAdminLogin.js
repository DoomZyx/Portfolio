import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../../services/adminApi";

export function useAdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await adminApi.login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Connexion impossible");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    email,
    password,
    error,
    submitting,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
