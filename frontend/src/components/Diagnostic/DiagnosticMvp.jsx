import DiagnosticWizard from "./DiagnosticWizard";
import { useMvpDiagnostic } from "../../hooks/Diagnostic/useMvpDiagnostic";

function DiagnosticMvp() {
  const diagnostic = useMvpDiagnostic();

  return (
    <DiagnosticWizard
      kicker="Diagnostic produit / MVP"
      title="Orientation conception MVP"
      lead="Quelques questions pour clarifier si votre projet est prêt pour une conception MVP, s'il faut d'abord cadrer le périmètre, ou si une découverte courte est préférable."
      diagnostic={diagnostic}
    />
  );
}

export default DiagnosticMvp;
