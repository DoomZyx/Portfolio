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

    
const projects = [
  {
    id: 1,
    title: {
      fr: "MySmartFood",
      en: "MySmartFood",
    },
    progression: "in-progress",
    images: [AI1, AI2, AI3, AI4, AI5  ],
    description: {
      fr: "Beaucoup de restaurateurs perdent des commandes parce qu’ils ne peuvent pas répondre à tous les appels entrants, surtout aux heures de forte affluence. \n Cet assistant automatise ces appels : il prend les commandes, enregistre les réservations et répond aux questions fréquentes sur les menus, horaires et coordonnées, sans mobiliser le personnel. \n Les menus et informations sont configurables via une interface web intuitive, et toutes les interactions sont centralisées sur un tableau de bord accessible en temps réel et une intégration au logiciel de gestion de caisse, permettant au restaurateur de suivre facilement son activité. \n \n En phase de test, 4 appels manqués par jour représentent environ 2 000 € de chiffre d’affaires perdu par mois (sans compter le coût des matières premières). L’assistant permet de récupérer cette valeur et d’augmenter le CA sans effort supplémentaire, tout en simplifiant la gestion quotidienne des appels.",
      en: "This project provides an AI-powered voice assistant designed for restaurants, snack bars, and fast-food establishments. The assistant automatically handles incoming calls: it takes orders, records reservations, and answers customer questions regarding menus, opening hours, and the restaurant’s contact details. Menus and restaurant information can be configured by the restaurateur through a web interface. All orders and reservations handled by the assistant are centralized and displayed in real time on a web dashboard, enabling simple and efficient management without requiring staff to handle phone calls",
    },
    url: "https://mysmartfood.fr",
  },
  {
    id: 2,
    title: {
      fr: "MAFRA",
      en: "MAFRA",
    },
    progression: "in-progress",
    images: [MAFRA1, MAFRA2, MAFRA3],
    description: {
      fr: "Mafra est une plateforme e-commerce conçue pour répondre aux besoins distincts des particuliers et des professionnels de l’entretien automobile. L’objectif du projet était de bâtir un produit digital robuste, scalable et orienté performance, capable de gérer des usages B2C et B2B au sein d’une même architecture. \n Le cœur du projet repose sur une architecture fonctionnelle claire : un parcours d’achat fluide et sécurisé pour les particuliers, un espace professionnel dédié intégrant des règles métiers spécifiques. Pour les professionnels, Mafra intègre un système de vérification automatisé basé sur les données officielles de l’INSEE (SIRET, raison sociale, code NAF), garantissant la légitimité des comptes et la conformité B2B. Une fois validés, les professionnels bénéficient de tarifs personnalisés. \n L’authentification repose sur une stratégie OAuth sécurisée, pensée pour simplifier l’accès tout en garantissant un haut niveau de fiabilité et de protection des données. \n L’ensemble de la plateforme a été conçu avec une attention particulière portée à la séparation des rôles, à la gestion des permissions et à l’évolutivité du produit. Mafra illustre une approche complète de l’architecture de produit digital : de la définition des besoins métiers à la structuration technique, en passant par l’expérience utilisateur, la sécurité et la performance. Le projet a été pensé non comme un simple site e-commerce, mais comme une solution digitale durable, capable d’évoluer avec les usages et la croissance de l’activité. \n La suite prévoyait d’automatiser l’expédition via Boxtal et d’intégrer le parcours de paiement de bout en bout. Le client a finalement préféré gérer ses ventes par téléphone et en proximité, pour rester au plus près de sa relation client au quotidien.",
      en: "Mafra is an e-commerce platform specialized in automotive care products, designed for both individual customers and professionals. The website offers a curated catalog of products for vehicle care and maintenance, providing a simple, secure, and efficient shopping experience. For professionals, Mafra provides a dedicated space with tailored pricing and a company verification system based on official INSEE data (SIRET number, registered company name, and NAF code). Access to professional accounts is secured through OAuth authentication, ensuring a reliable environment aligned with B2B standards. Mafra was designed to meet the needs of both individual customers and automotive professionals by combining speed, reliability, and streamlined order management. \n The next step was to automate shipping through Boxtal and complete the end-to-end payment flow. The client ultimately preferred to manage sales by phone and in person, staying closer to their day-to-day customer relationships.",
    },
    url: "https://mafraest.com",
  },
  {
    id: 3,
    title: {
      fr: "WM Performance",
      en: "WM Performance",
    },
    progression: "completed",
    images: [WM1, WM2, WM3],
    description: {
      fr: "WM Performance est un spécialiste de la reprogrammation moteur et de l’entretien automobile haute performance. L’objectif du projet était de concevoir une présence digitale premium, capable de traduire une expertise mécanique et électronique exigeante en une expérience web claire, immersive et orientée conversion. \n Le site s’appuie sur une direction artistique sombre et technique, photographies cockpit, accents racing, pour ancrer immédiatement la marque dans l’univers de la performance. Les parcours de service (diagnostic, développement cartographique, validation sur banc) sont structurés pour guider le client de la compréhension métier jusqu’à la prise de contact. \n Un module 3D interactif permet d’explorer les stages d’intervention directement sur un modèle véhicule : hotspots techniques, fiches explicatives et bascule Stage 1 / 2 / 3. Cette brique transforme une offre complexe en parcours pédagogique, sans sacrifier le niveau de détail attendu par une clientèle passionnée. \n Le produit digital a été pensé comme un outil de crédibilité et de génération de leads : storytelling visuel fort, lisibilité des prestations, et expérience technique différenciante au service de la conversion.",
      en: "WM Performance is a specialist in engine remapping and high-performance automotive maintenance. The project aimed to build a premium digital presence that translates demanding mechanical and electronic expertise into a clear, immersive, conversion-oriented web experience. \n The site relies on a dark, technical art direction, cockpit photography, racing accents, to immediately place the brand in the performance universe. Service journeys (diagnostics, mapping development, dyno validation) are structured to guide clients from understanding the offer to contacting the workshop. \n An interactive 3D module lets visitors explore intervention stages on a vehicle model: technical hotspots, detail cards, and Stage 1 / 2 / 3 switching. This turns a complex offer into an educational journey without losing the depth expected by enthusiasts. \n The digital product was designed as both a credibility and lead-generation tool: strong visual storytelling, clear services, and a differentiating technical experience focused on conversion.",
    },
    url: "https://wmperformance.fr/",
  },
];

export default projects;
