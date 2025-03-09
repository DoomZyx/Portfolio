import skg from "../images/skg.webp";
import skg2 from "../images/skg2.webp";
import skg3 from "../images/skg3.webp";
import skg4 from "../images/skg4.webp";
import skg5 from "../images/skg5.webp";

import ohmyfood from "../images/ohmyfood.webp";
import ohmyfood2 from "../images/ohmyfood2.webp";
import ohmyfood3 from "../images/ohmyfood3.webp";
import ohmyfood4 from "../images/ohmyfood4.webp";
import ohmyfood5 from "../images/ohmyfood5.webp";

const projects = [
  {
    title: {
      fr: "SKG AUTOPARTS",
      en: "SKG AUTOPARTS",
    },
    images: [skg, skg2, skg3, skg4, skg5],
    description: {
      fr: "Ce projet est un prototype de site e-commerce spécialisé dans les pièces automobiles. Il permet aux utilisateurs d’entrer un numéro de plaque d’immatriculation pour trouver les pièces compatibles avec le modèle et la motorisation de leur véhicule. Ce projet consiste à améliorer mes compétences sur React et à me familiariser avec node.js ",
      en: "This project is a prototype of an e-commerce site specializing in automotive parts...",
    },
  },
  {
    title: {
      fr: "Ohmyfood",
      en: "Ohmyfood",
    },
    images: [ohmyfood, ohmyfood2, ohmyfood3, ohmyfood4, ohmyfood5],
    description: {
      fr: "J'ai décidé de faire une refonte d'un projet que j'ai effectué en formation. Le projet de base consistait à développer une application en mobile-first en se concentrant sur la gestion des composants sass et créer des animations. Quelques mois après, lorsque j'ai su mieux maitriser React je me suis décidé de refaire ce projet mais avec des fonctionnalités complètes et en utlisant Redux. (Créer un compte et se connecter au site, la gestion du panier, ajouter des restaurants). Et j'ai décidé de créer un backend pour me familiariser avec node.js et MangoDB.",
      en: "I decided to redo a project I worked on during training",
    },
  },
];

export default projects;
