import AI1 from "/public/AIVoiceAssistant/AI1.webp";
import AI2 from "/public/AIVoiceAssistant/AI2.webp";
import AI3 from "/public/AIVoiceAssistant/AI3.webp";
import AI4 from "/public/AIVoiceAssistant/AI4.webp";
import AI5 from "/public/AIVoiceAssistant/AI5.webp";

import MAFRA1 from "/public/MAFRA/MAFRA1.webp";
import MAFRA2 from "/public/MAFRA/MAFRA2.webp";
import MAFRA3 from "/public/MAFRA/MAFRA3.webp";

import WM1 from "/public/WMPerformance/WM1.webp";
import WM2 from "/public/WMPerformance/WM2.webp";
import WM3 from "/public/WMPerformance/WM3.webp";

import portfolioHero from "/public/Portfolio.webp";

/**
 * Schéma étude de cas (champs optionnels selon le projet) :
 * - card.problemOneLiner / card.outcomeChip : surface homepage
 * - summary.problem / approach / objective : récit principal
 * - summary.metaReveal : révélation méta (AxelCella)
 * - decisions[] : jugement produit
 * - workflow[] : flux métier (uniquement si pertinent)
 * - behindTheScenes : profondeur progressive
 * - ctas[] : primary → diagnostic ; secondary → site / contact
 */

const projects = [
  {
    id: 1,
    slug: "mysmartfood",
    title: {
      fr: "MySmartFood",
      en: "MySmartFood",
    },
    progression: "in-progress",
    statusLabel: "En développement : validation de l’infrastructure IA",
    order: 1,
    images: [AI1, AI2, AI3, AI4, AI5],
    url: "https://mysmartfood.fr",
    card: {
      problemOneLiner:
        "Des restaurants peuvent perdre des commandes ou réservations lorsqu’ils ne peuvent pas répondre à tous les appels.",
      outcomeChip: "Objectif : automatiser les appels entrants",
    },
    summary: {
      lead: "Assistant vocal pour la restauration : prendre en charge une partie des appels entrants (commandes, réservations, demandes courantes), conçu pour alléger la charge téléphonique. Le produit est actuellement en développement et en validation d’infrastructure.",
      problemTitle: "Problème",
      problem: [
        "Aux heures d’affluence, une partie des appels peut rester sans réponse. Derrière un appel manqué : une commande non prise, une réservation partie ailleurs, ou une question simple (menu, horaires) qui interrompt le service.",
        "Dans le scénario étudié, environ 4 appels manqués par jour pouvaient représenter un ordre de grandeur d’environ 2 000 € de chiffre d’affaires potentiel non capté sur un mois (hors coût des matières). Il s’agit d’une estimation pour illustrer le problème initial, pas d’un résultat déjà obtenu par le produit.",
      ],
      approachTitle: "Approche",
      approach: [
        "Traiter une partie des appels entrants via un assistant vocal.",
        "Couvrir commandes, réservations, demandes courantes et informations restaurant.",
        "Permettre la configuration des menus et informations via une interface web.",
        "Centraliser le suivi des interactions côté restaurant.",
        "Se connecter au système métier / caisse lorsque l’intégration correspondante est disponible.",
      ],
      objectiveTitle: "Objectif & validation en cours",
      objective: [
        "Objectif produit : réduire la charge téléphonique, limiter les opportunités perdues sur le canal appel, et éviter que le téléphone interrompe en continu le personnel, sans prétendre à un ROI déjà mesuré en production.",
        "Un appel qui fonctionne correctement ne suffit pas à déclarer un système « scalable ». L’étape actuelle consiste à tester une IA hébergée localement sous plusieurs appels concurrents, afin de déterminer combien de conversations peuvent être traitées simultanément sans dégrader la latence, la compréhension ou la qualité vocale perçue.",
        "Ces mesures serviront à dimensionner l’infrastructure et à estimer combien de restaurants un même serveur peut servir avant d’ajouter des ressources. Plus tard, elles permettront aussi de calculer un coût d’infrastructure réel par client. Aucun chiffre de capacité n’est annoncé tant qu’il n’a pas été benchmarké.",
      ],
    },
    decisions: [
      {
        title: "Pourquoi traiter le téléphone en priorité",
        body: "Le canal douloureux identifié est l’appel. Un nouveau site ou un chatbot web ne règle pas les appels auxquels le restaurant n’arrive pas à répondre aux heures de pointe.",
      },
      {
        title: "Pourquoi travailler sur une IA hébergée localement",
        body: "Choix d’architecture en validation : mieux contrôler l’infrastructure, viser une maîtrise des coûts, pouvoir mesurer les ressources réellement nécessaires, et limiter certaines dépendances à des coûts variables externes. Ces bénéfices sont en cours d’évaluation, pas annoncés comme déjà prouvés.",
      },
      {
        title: "Pourquoi benchmarker la simultanéité avant de multiplier les restaurants",
        body: "La capacité commerciale ne se décide pas parce que « ça marche sur une machine ». Elle dépend notamment des appels concurrents, de la consommation de ressources, de la latence, de la qualité STT / LLM / TTS et de la qualité perçue. Mesurer d’abord, dimensionner ensuite.",
      },
    ],
    workflow: {
      title: "Parcours métier cible",
      steps: [
        "Appel entrant",
        "Assistant vocal",
        "Commande / réservation / information",
        "Dashboard restaurant",
        "Système métier / caisse (intégration selon disponibilité)",
      ],
    },
    behindTheScenes: {
      summary:
        "Validation en cours : capacité de l’infrastructure. On mesure combien d’appels peuvent être traités correctement en parallèle avant de décider combien de restaurants un serveur peut servir.",
      details: [
        "Principe des benchmarks de charge : concurrence, latence, qualité conversationnelle, puis dimensionnement.",
        "À mesurer avant toute annonce commerciale : appels simultanés à qualité acceptable, restaurants par serveur, coût d’infrastructure par client.",
        "Philosophie : ne pas annoncer une capacité technique avant de l’avoir mesurée.",
      ],
    },
    ctas: [
      { label: "Diagnostiquer mon projet", to: "/diagnostic", variant: "primary" },
      {
        label: "Voir MySmartFood",
        href: "https://mysmartfood.fr",
        variant: "secondary",
        external: true,
      },
    ],
  },
  {
    id: 2,
    slug: "mafra",
    title: {
      fr: "MAFRA",
      en: "MAFRA",
    },
    progression: "completed",
    statusLabel: "Livré, usage adapté par le client",
    order: 2,
    images: [MAFRA1, MAFRA2, MAFRA3],
    url: "https://mafraest.com",
    card: {
      problemOneLiner:
        "Un e-commerce auto devait servir particuliers et professionnels, avec des règles différentes.",
      outcomeChip: "B2C + B2B sur une même base",
    },
    summary: {
      lead: "Plateforme e-commerce d’entretien automobile conçue pour deux publics : particuliers (achat simple) et professionnels (comptes vérifiés, tarifs dédiés).",
      problemTitle: "Problème",
      problem: [
        "Mélanger B2C et B2B dans un shop classique crée des frictions : tarifs, légitimité des comptes pro, permissions, et risque de traiter tous les clients comme des particuliers.",
        "Le besoin : une architecture fonctionnelle claire. Un parcours fluide pour les particuliers, un espace pro avec règles métier, sans dupliquer tout le produit.",
      ],
      approachTitle: "Approche",
      approach: [
        "Parcours d’achat B2C simple et sécurisé.",
        "Espace professionnel avec règles dédiées.",
        "Vérification automatisée via données INSEE (SIRET, raison sociale, code NAF).",
        "Tarifs personnalisés une fois le compte validé.",
        "Authentification OAuth pour simplifier l’accès sans baisser le niveau de confiance.",
      ],
      objectiveTitle: "Apport",
      objective: [
        "Le produit permet de gérer deux usages dans une même plateforme, avec séparation des rôles et une base évolutive.",
        "La suite envisagée incluait l’automatisation d’expédition et un parcours de paiement de bout en bout. Le client a ensuite privilégié une relation commerciale de proximité ; le digital reste un outil de catalogue, de crédibilité et d’organisation plutôt qu’un tunnel de vente forcé.",
      ],
    },
    decisions: [
      {
        title: "Pourquoi vérifier les pros via l’INSEE",
        body: "Réduire les faux comptes et industrialiser l’accès B2B sans transformer la validation en goulot administratif manuel permanent.",
      },
      {
        title: "Ce qui a été volontairement reporté",
        body: "Expédition automatisée et checkout complet : utiles, mais secondaires tant que le double parcours B2C/B2B et la confiance des comptes n’étaient pas posés.",
      },
      {
        title: "Ce que l’adaptation d’usage a changé",
        body: "Le produit n’a pas « échoué » : l’usage réel a recentré la priorité. Le digital structure l’offre ; la relation de proximité peut reprendre le dernier kilomètre commercial.",
      },
    ],
    workflow: {
      title: "Parcours fonctionnel",
      steps: [
        "Visiteur",
        "Parcours particulier ou demande de compte pro",
        "Vérification INSEE (si pro)",
        "Tarifs et permissions adaptés",
        "Commande / relation commerciale",
      ],
    },
    behindTheScenes: {
      summary:
        "Le cœur du sujet n’était pas « un e-commerce de plus », mais deux métiers dans une même base : rôles, permissions, confiance des comptes pro.",
      details: [
        "Séparation des parcours B2C / B2B.",
        "Vérification d’entreprise via données officielles.",
        "OAuth et gestion des permissions comme briques de confiance, pas comme détail technique isolé.",
      ],
    },
    ctas: [
      { label: "Diagnostiquer mon projet", to: "/diagnostic", variant: "primary" },
      {
        label: "Voir MAFRA",
        href: "https://mafraest.com",
        variant: "secondary",
        external: true,
      },
    ],
  },
  {
    id: 3,
    slug: "wm-performance",
    title: {
      fr: "WM Performance",
      en: "WM Performance",
    },
    progression: "completed",
    statusLabel: "Livré",
    order: 3,
    images: [WM1, WM2, WM3],
    url: "https://wmperformance.fr/",
    card: {
      problemOneLiner:
        "Une expertise moteur exigeante était difficile à comprendre, et encore plus à transformer en contact.",
      outcomeChip: "Crédibilité + prise de contact",
    },
    summary: {
      lead: "Site premium pour un spécialiste de la reprogrammation moteur : rendre une offre technique lisible, immersive, et orientée prise de contact.",
      problemTitle: "Problème",
      problem: [
        "L’offre (diagnostic, cartographie, stages, banc) est riche mais opaque pour un prospect. Sans narration claire, le site devient une brochure : soignée, mais qui ne guide pas vers le contact.",
      ],
      approachTitle: "Approche",
      approach: [
        "Direction artistique sombre et technique alignée sur l’univers performance.",
        "Parcours de services structurés : comprendre, comparer, contacter.",
        "Module 3D pour explorer les stages sur un modèle véhicule (hotspots, fiches, Stage 1 / 2 / 3).",
        "Objectif produit : crédibilité et génération de demandes, sans métrique publique inventée.",
      ],
      objectiveTitle: "Apport",
      objective: [
        "Une offre complexe devient un parcours pédagogique. Le 3D n’est pas un gadget : il sert à expliquer et à différencier, puis à ramener vers le contact.",
      ],
    },
    decisions: [
      {
        title: "Pourquoi du 3D plutôt qu’une liste de stages",
        body: "La clientèle attend du détail ; une liste plate ne porte ni la marque ni la compréhension de l’intervention.",
      },
      {
        title: "Ce qui n’a pas été construit",
        body: "Pas de configurateur métier complet ni de tunnel e-commerce. Le site devait convaincre et qualifier l’intérêt, pas vendre un stage en self-service.",
      },
      {
        title: "Ce que ça change pour l’atelier",
        body: "Le prospect peut arriver déjà un cran plus informé ; le site fait une partie du travail de pédagogie en amont.",
      },
    ],
    workflow: {
      title: "Parcours visiteur",
      steps: [
        "Comprendre l’offre",
        "Explorer les stages",
        "Contacter l’atelier",
      ],
    },
    behindTheScenes: {
      summary:
        "Ici, la différenciation passe par l’expérience et la lisibilité de l’offre, pas par un schéma d’architecture technique.",
      details: [
        "DA et storytelling visuel au service de la marque.",
        "Module 3D comme support pédagogique.",
        "Tunnel volontairement simple jusqu’au contact.",
      ],
    },
    ctas: [
      { label: "Diagnostiquer mon projet", to: "/diagnostic", variant: "primary" },
      {
        label: "Voir WM Performance",
        href: "https://wmperformance.fr/",
        variant: "secondary",
        external: true,
      },
    ],
  },
  {
    id: 4,
    slug: "axelcella",
    title: {
      fr: "Portfolio",
      en: "Portfolio",
    },
    progression: "completed",
    statusLabel: "Produit vivant",
    order: 4,
    images: [portfolioHero],
    url: null,
    card: {
      problemOneLiner:
        "Une vitrine seule ne qualifie pas un besoin, et ne prépare pas un échange utile.",
      outcomeChip: "Du visiteur à une demande exploitable",
      cardTitle: "Portfolio",
    },
    summary: {
      lead: "Ce site n’a pas été conçu uniquement pour montrer des réalisations. Il a été pensé pour accompagner un parcours : comprendre l’approche, clarifier un besoin, puis formuler une demande exploitable.",
      problemTitle: "Problème",
      problem: [
        "Un portfolio classique laisse le prospect seul : il lit, puis remplit souvent un formulaire vide de contexte. Résultat côté indépendant : des messages flous, peu actionnables, et du temps perdu à re-qualifier.",
      ],
      approachTitle: "Approche",
      approach: [
        "Positionnement et services pour expliquer la méthode : cadrer avant de coder.",
        "Études de cas pour montrer le jugement sur des situations réelles.",
        "Diagnostic interactif (e-commerce, MVP, visibilité) pour orienter.",
        "Chatbot pour répondre et qualifier en conversation.",
        "Centralisation des demandes enrichies pour préparer l’échange.",
      ],
      metaReveal:
        "Si vous venez d’utiliser le diagnostic ou le chatbot, vous êtes déjà passé dans ce parcours. Ce n’est pas une démo fictive : c’est le produit en situation réelle.",
      objectiveTitle: "Apport",
      objective: [
        "Une demande n’arrive plus nécessairement « nue » : elle peut arriver avec un contexte (parcours, réponses, intention). Le site travaille avant le rendez-vous.",
      ],
    },
    decisions: [
      {
        title: "Pourquoi un diagnostic plutôt qu’un seul gros formulaire",
        body: "Le besoin n’est pas le même pour une boutique, un MVP ou une landing. Orienter avant de demander le contact.",
      },
      {
        title: "Ce qui a été volontairement gardé simple",
        body: "Le contact classique reste léger pour qui veut juste écrire. La qualification profonde passe par le diagnostic ou la conversation, là où le contexte a de la valeur.",
      },
      {
        title: "Ce que ça change pour l’échange",
        body: "Moins de « bonjour je veux un site » sans détail ; plus de matière pour préparer un vrai cadrage.",
      },
    ],
    workflow: {
      title: "Du clic à une demande exploitable",
      steps: [
        "Attirer",
        "Informer",
        "Diagnostiquer",
        "Qualifier",
        "Suivre",
      ],
      stepHints: [
        "Landing, positionnement, projets",
        "Services, méthode, cas",
        "Parcours e-commerce / MVP / visibilité",
        "Recommandation et conversation",
        "Demande centralisée, contexte conservé",
      ],
    },
    behindTheScenes: {
      summary:
        "Ce qui compte ici, c’est le parcours commercial : attirer, informer, diagnostiquer, qualifier, suivre. Pas l’étalage de la stack.",
      details: [
        "Briques exposées : diagnostic, chatbot, lead enrichi, suivi.",
        "Coulisses : back-office, documents, détails d’infrastructure (volontairement secondaires).",
        "L’architecture suit le parcours commercial, pas l’inverse.",
      ],
    },
    ctas: [
      { label: "Lancer le diagnostic", to: "/diagnostic", variant: "primary" },
      { label: "Écrire un message", href: "/#contact", variant: "secondary" },
    ],
  },
];

export function getProjectsSorted() {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function findProject(idOrSlug) {
  if (idOrSlug == null || idOrSlug === "") return undefined;
  const asNumber = Number.parseInt(String(idOrSlug), 10);
  if (!Number.isNaN(asNumber) && String(asNumber) === String(idOrSlug)) {
    return projects.find((project) => project.id === asNumber);
  }
  return projects.find((project) => project.slug === idOrSlug);
}

export default projects;
