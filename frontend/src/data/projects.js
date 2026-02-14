

import ohmyfood from "/public/ohmyfood/ohmyfood.webp";
import ohmyfood3 from "/public/ohmyfood/ohmyfood3.webp";
import ohmyfood4 from "/public/ohmyfood/ohmyfood4.webp";
import ohmyfood2 from "/public/ohmyfood/ohmyfood2.webp";
import ohmyfood5 from "/public/ohmyfood/ohmyfood5.webp";

import kasa from "/public/kasa/kasa.webp";
import kasa2 from "/public/kasa/kasa2.webp";
import kasa3 from "/public/kasa/kasa3.webp";
import kasa4 from "/public/kasa/kasa4.webp";

import lemas1 from "/public/lemas/lemas1.webp";
import lemas2 from "/public/lemas/lemas2.webp";
import lemas3 from "/public/lemas/lemas3.webp";
import lemas4 from "/public/lemas/lemas4.webp";
import lemas5 from "/public/lemas/lemas5.webp";

import AI1 from "/public/AIVoiceAssistant/AI1.webp";
import AI2 from "/public/AIVoiceAssistant/AI2.webp";
import AI3 from "/public/AIVoiceAssistant/AI3.webp";
import AI4 from "/public/AIVoiceAssistant/AI4.webp";
import AI5 from "/public/AIVoiceAssistant/AI5.webp";
import AI6 from "/public/AIVoiceAssistant/AI6.webp";
import AI7 from "/public/AIVoiceAssistant/AI7.webp";
import AI8 from "/public/AIVoiceAssistant/AI8.webp";

import MAFRA1 from "/public/MAFRA/MAFRA1.webp";
import MAFRA2 from "/public/MAFRA/MAFRA2.webp";
import MAFRA3 from "/public/MAFRA/MAFRA3.webp";

import js from "/public/stack/js.webp";
import node from "/public/stack/node.webp";
import mongodb from "/public/stack/mongodb.webp";
import react from "/public/stack/react.webp";
import sass from "/public/stack/sass.webp";
import figma from "/public/stack/figma.webp";

const projects = [
  {
    id: 1,
    title: {
      fr: "SmartCRM",
      en: "SmartCRM",
    },
    progression: "in-progress",
    images: [AI1, AI2, AI3, AI4, AI5, AI6, AI7, AI8],
    description: {
      fr: "Beaucoup de restaurateurs perdent des commandes parce qu’ils ne peuvent pas répondre à tous les appels entrants, surtout aux heures de forte affluence. \n Cet assistant automatise ces appels : il prend les commandes, enregistre les réservations et répond aux questions fréquentes sur les menus, horaires et coordonnées, sans mobiliser le personnel. \n Les menus et informations sont configurables via une interface web intuitive, et toutes les interactions sont centralisées sur un tableau de bord accessible en temps réel et une intégration au logiciel de gestion de caisse, permettant au restaurateur de suivre facilement son activité. \n \n En phase de test, 4 appels manqués par jour représentent environ 2 000 € de chiffre d’affaires perdu par mois (sans compter le coût des matières premières). L’assistant permet de récupérer cette valeur et d’augmenter le CA sans effort supplémentaire, tout en simplifiant la gestion quotidienne des appels.",
      en: "This project provides an AI-powered voice assistant designed for restaurants, snack bars, and fast-food establishments. The assistant automatically handles incoming calls: it takes orders, records reservations, and answers customer questions regarding menus, opening hours, and the restaurant’s contact details. Menus and restaurant information can be configured by the restaurateur through a web interface. All orders and reservations handled by the assistant are centralized and displayed in real time on a web dashboard, enabling simple and efficient management without requiring staff to handle phone calls",
    },
    technos: [sass, js, react, mongodb, node],
    url: "https://restaurant-app-lilac-five.vercel.app/"
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
      fr: "Mafra est une plateforme e-commerce conçue pour répondre aux besoins distincts des particuliers et des professionnels de l’entretien automobile. L’objectif du projet était de bâtir un produit digital robuste, scalable et orienté performance, capable de gérer des usages B2C et B2B au sein d’une même architecture. \n Le cœur du projet repose sur une architecture fonctionnelle claire : un parcours d’achat fluide et sécurisé pour les particuliers, un espace professionnel dédié intégrant des règles métiers spécifiques. Pour les professionnels, Mafra intègre un système de vérification automatisé basé sur les données officielles de l’INSEE (SIRET, raison sociale, code NAF), garantissant la légitimité des comptes et la conformité B2B. Une fois validés, les professionnels bénéficient de tarifs personnalisés. \n L’authentification repose sur une stratégie OAuth sécurisée, pensée pour simplifier l’accès tout en garantissant un haut niveau de fiabilité et de protection des données. \n L’ensemble de la plateforme a été conçu avec une attention particulière portée à la séparation des rôles, à la gestion des permissions et à l’évolutivité du produit. Mafra illustre une approche complète de l’architecture de produit digital : de la définition des besoins métiers à la structuration technique, en passant par l’expérience utilisateur, la sécurité et la performance. Le projet a été pensé non comme un simple site e-commerce, mais comme une solution digitale durable, capable d’évoluer avec les usages et la croissance de l’activité.",
      en: "Mafra is an e-commerce platform specialized in automotive care products, designed for both individual customers and professionals. The website offers a curated catalog of products for vehicle care and maintenance, providing a simple, secure, and efficient shopping experience. For professionals, Mafra provides a dedicated space with tailored pricing and a company verification system based on official INSEE data (SIRET number, registered company name, and NAF code). Access to professional accounts is secured through OAuth authentication, ensuring a reliable environment aligned with B2B standards. Mafra was designed to meet the needs of both individual customers and automotive professionals by combining speed, reliability, and streamlined order management",
    },
    technos: [sass, react, mongodb, node],
    url: "https://mafraest.com",
  },

{
  id: 3,
  title: {
    fr: "Le Mas Du Paradis Bleu",
    en: "Le Mas Du Paradis Bleu",
  },
  progression: "completed",
  images: [lemas1, lemas2, lemas3, lemas4, lemas5],
  description: {
    fr: "Pour ce premier projet, j’ai mis mes compétences au service d’un client souhaitant valoriser son gîte à travers un site vitrine moderne et épuré. J’ai pris en charge l’intégralité du développement web, de la conception des maquettes jusqu’au déploiement d’une version fonctionnelle, avec pour objectif : <br><br> • Offrir aux visiteurs une expérience fluide, visuelle et rassurante.<br>• Créer une interface responsive adaptée à tous les supports (ordinateur, tablette, mobile).<br>• Optimiser l’expérience utilisateur grâce à une navigation claire et un contenu visuel attractif. <br><br> Ce projet m’a également permis d’affiner mes capacités en communication, en traduisant des besoins clients en solutions concrètes et en gérant l’ensemble des aspects techniques jusqu’à la mise en ligne d’une version démo.",
    en: "For this project, I had the opportunity to put my skills to use by helping someone close to me who wanted to promote their vacation rental through a modern and clean showcase website. I handled the entire web development process, from design to deployment, with a clear goal: \n\n• To provide visitors with a smooth, visual, and reassuring experience. \n\nThrough this project, I strengthened several key skills :\n\n • Building a fully responsive interface adapted to all devices (desktop, tablet, mobile). \n• Enhancing the user experience by improving navigation and information clarity. \n • Highlighting visual content to showcase the unique environment of the rental. \n • Deploying and managing hosting to ensure fast and free access via Vercel.\n This project also allowed me to improve my client communication skills by understanding the needs of someone unfamiliar with the digital world and turning them into concrete solutions.",
  },
  technos: [sass, js, react, figma],
  url: "https://le-mas-du-paradis.vercel.app",
},
];

export default projects;
