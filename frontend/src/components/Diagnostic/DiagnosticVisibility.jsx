import DiagnosticWizard from "./DiagnosticWizard";
import { useVisibilityDiagnostic } from "../../hooks/Diagnostic/useVisibilityDiagnostic";

function DiagnosticVisibility() {
  const diagnostic = useVisibilityDiagnostic();

  return (
    <DiagnosticWizard
      kicker="Diagnostic visibilité"
      title="Orientation présence en ligne"
      lead="Quelques questions pour clarifier si une landing, un site vitrine ou une refonte légère répond le mieux à votre besoin de visibilité."
      diagnostic={diagnostic}
    />
  );
}

export default DiagnosticVisibility;
