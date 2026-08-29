
export const SERVICES = [
{
    step: "01",
    title: "Audit & Cadrage",
    shortDesc: "Analyse des objectifs métier, diagnostic de l'existant et cadrage technique.",
    approach: "Avant d'écrire la moindre ligne de code, je m'imprègne de votre vision business. Si vous avez déjà un prototype (No-Code/IA) ou un existant, j'effectue un diagnostic complet pour identifier les goulots d'étranglement et poser des bases saines.",
    deliverables: [
      "Diagnostic technique du code / produit existant",
      "Cahier des charges fonctionnel et priorisation des features",
      "Feuille de route (Roadmap) de développement"
    ],
    value: "Une vision claire du projet, sans angle mort technique ni surcoût imprévu."
  },
  {
    step: "02",
    title: "Architecture & Design",
    shortDesc: "Conception de la charpente technique, modélisation des données et des API.",
    approach: "Je conçois l'architecture globale pour qu'elle soit scalable, sécurisée et facile à faire évoluer. Chaque choix technologique répond à une contrainte précise de votre produit.",
    deliverables: [
      "Schéma d'architecture & modèle de données (PostgreSQL/SQL ou MongoDB selon le besoin)",
      "Définition de la stack (Backend FastAPI/Node, Frontend React)",
      "Spécifications des API REST / WebSockets et gestion de l'authentification"
    ],
    value: "Une structure solide capable d'encaisser la montée en charge sans nécessiter une refonte au bout de 6 mois."
  },
  {
    step: "03",
    title: "Développement & IA",
    shortDesc: "Implémentation rigoureuse du code métier et intégration des services avancés.",
    approach: "Je développe les fonctionnalités en suivant les bonnes pratiques de clean code. J'intègre les agents vocaux, modèles IA et automatisations directement connectés à votre backend.",
    deliverables: [
      "Développement des modules backend & interfaces frontend",
      "Intégration d'agents téléphoniques / IA (Twilio, LLM, WebSockets)",
      "Connexion aux services tiers (APIs, SIRET, systèmes de paiement)"
    ],
    value: "Un produit totalement fonctionnel, moderne et parfaitement aligné avec l'expérience utilisateur visée."
  },
  {
    step: "04",
    title: "Sécurité & Recette",
    shortDesc: "Audit de sécurité applicative, tests de charge et préparation de la prod.",
    approach: "Aucune application ne part en production sans avoir été éprouvée. Je passe au criblage la sécurité du code, la gestion des accès et les performances de chargement.",
    deliverables: [
      "Audit de sécurité applicative (prévention des failles OWASP, XSS, Injections)",
      "Vérification de la gestion des secrets et des accès (JWT, OAuth)",
      "Optimisation des temps de réponse et des requêtes SQL"
    ],
    value: "Un lancement en production serein avec des données étanches et protégées."
  },
  {
    step: "05",
    title: "Livraison & Formation",
    shortDesc: "Déploiement, transfert de compétences et accompagnement à l'autonomie.",
    approach: "Je ne me contente pas de livrer le projet : je vous forme, vous ou votre équipe, à maintenir et faire évoluer le produit, notamment en exploitant l'IA de façon propre.",
    deliverables: [
      "Déploiement sur infrastructure cloud sécurisée",
      "Documentation technique complète de l'application",
      "Formation au développement assisté par IA (workflows Cursor, prompt engineering)",
      "Formation aux bases du développement"
    ],
    value: "Une autonomie totale sur votre produit et les clés pour continuer à innover sans dépendance."
  }
];