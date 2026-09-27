import DiagnosticWizard from "./DiagnosticWizard";
import { useEcommerceDiagnostic } from "../../hooks/Diagnostic/useEcommerceDiagnostic";

function DiagnosticEcommerce() {
  const diagnostic = useEcommerceDiagnostic();

  return (
    <DiagnosticWizard
      kicker="Diagnostic e-commerce"
      title="Orientation projet e-commerce"
      lead="Quelques questions pour clarifier si une plateforme existante suffit, si un accompagnement stratégique est utile, ou si une étude d'architecture se justifie. Le choix technique dépend du besoin business, pas l'inverse."
      diagnostic={diagnostic}
    />
  );
}

export default DiagnosticEcommerce;
