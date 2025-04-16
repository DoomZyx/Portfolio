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

import kasa from "../images/kasa.webp";
import kasa2 from "../images/kasa2.webp";
import kasa3 from "../images/kasa3.webp";
import kasa4 from "../images/kasa4.webp";

import html from "../images/html.webp";
import css from "../images/css.webp";
import scss from "../images/sass.webp";
import js from "../images/js.webp";
import react from "../images/react.webp";
import mongodb from "../images/mongodb.webp";
import node from "../images/node.webp";
import sql from "../images/sqlite.webp";

import lemas1 from "../images/lemas1.webp";
import lemas2 from "../images/lemas2.webp";
import lemas3 from "../images/lemas3.webp";
import lemas4 from "../images/lemas4.webp";
import lemas5 from "../images/lemas5.webp";


const projects = [
  {
    title: {
      fr: "SKG AUTOPARTS",
      en: "SKG AUTOPARTS",
    },
    progression: {
      fr: "(En cours)",
      en: "(In progress)",
    },
    images: [skg, skg2, skg3, skg4, skg5],
    description: {
      fr: "Ce projet est un prototype de site e-commerce spécialisé dans les pièces automobiles. Il permet aux utilisateurs d’entrer un numéro de plaque d’immatriculation pour trouver les pièces compatibles avec le modèle et la motorisation de leur véhicule. Ce projet consiste à améliorer mes compétences sur React et à me familiariser avec node.js",
      en: "This project is a prototype of an e-commerce website specialized in automotive parts. It allows users to enter a license plate number to find compatible parts for their vehicle's model and engine type. This project aims to improve my skills in React and familiarize myself with Node.js",
    },
    technos: [html, css, scss, js, react, node, sql],
    link: "https://github.com/DoomZyx/SKG-AUTOPARTS",
  },

  {
    title: {
      fr: "Ohmyfood",
      en: "Ohmyfood",
    },
    progression: {
      fr: "(En cours)",
      en: "(In progress)",
    },
    images: [ohmyfood, ohmyfood2, ohmyfood3, ohmyfood4, ohmyfood5],
    description: {
      fr: "J'ai décidé de faire une refonte d'un projet que j'ai effectué en formation. Le projet de base consistait à développer une application en mobile-first en se concentrant sur la gestion des composants sass et créer des animations. Quelques mois après, lorsque j'ai su mieux maitriser React je me suis décidé de refaire ce projet mais avec des fonctionnalités complètes et en utlisant Redux. (Créer un compte et se connecter au site, la gestion du panier, ajouter des restaurants). Et j'ai décidé de créer un backend pour me familiariser avec node.js et MangoDB",
      en: "I decided to redesign a project I worked on during my training. The original project involved developing a mobile-first application, focusing on managing Sass components and creating animations. A few months later, when I had a better grasp of React, I decided to redo this project with full features and using Redux. (Creating an account and logging into the site, managing the cart, adding restaurants). I also decided to build a backend to familiarize myself with Node.js and MongoDB",
    },
    technos: [html, css, scss, js, react, node, mongodb],
    link: "https://github.com/DoomZyx/OhMyFood",
  },

  {
    title: {
      fr: "Kasa",
      en: "Kasa",
    },
    progression: {
      fr: "(Terminé)",
      en: "(Completed)",
    },
    images: [kasa, kasa2, kasa3, kasa4,],
    description: {
      fr: "Dans le cadre de ma formation, j’ai développé un site de location de logements entre particuliers en utilisant React. Ce projet m’a permis de me confronter à plusieurs défis techniques, notamment la gestion du routage dynamique avec React Router pour afficher les détails d’un logement en fonction de son ID. J’ai également travaillé sur l’implémentation d’un système de collapse permettant d’afficher ou de masquer des informations supplémentaires, c'est deux points m’ont aidés à mieux comprendre la gestion du state, des props et des événements en React. Ce projet m’a permis de renforcer mes compétences en Front-end et d’améliorer mes compétences sur React.",
      en: "As part of my training, I developed a rental housing website for individuals using React. This project allowed me to face several technical challenges, including managing dynamic routing with React Router to display housing details based on their ID. I also worked on implementing a collapse system to show or hide additional information. These two aspects helped me better understand state management, props, and event handling in React. This project strengthened my front-end skills and improved my proficiency in React.",
    },
    technos: [html, css, scss, js, react],
    link: "https://github.com/DoomZyx/Kasa",
  },
  {
    title: {
      fr: "Le Mas Du Paradis Bleu",
      en: "Le Mas Du Paradis Bleu",
    },
    progression: {
      fr: "(Terminé)",
      en: "(completed)",
    },
    images: [lemas1, lemas2, lemas3, lemas4, lemas5],
    description: {
      fr: "Pour ce projet, j'ai eu l'opportunité de mettre mes compétences au service d'un proche souhaitant valoriser son gîte à travers un site vitrine moderne et épuré. J'ai pris en charge l'intégralité du développement web, de la maquette jusqu'à la mise en ligne, avec un objectif clair :\n\n- Offrir aux visiteurs une expérience fluide, visuelle et rassurante.\n\nÀ travers ce projet, j'ai consolidé plusieurs compétences essentielles : \n\n- Création d'une interface responsive adaptée à tous les supports (ordinateur, tablette, mobile). \n- Optimisation de l'expérience utilisateur en travaillant la navigation et la clarté des informations. \n- Mise en avant du contenu visuel pour valoriser le cadre unique du gîte. \n- Déploiement et gestion de l’hébergement pour un site accessible rapidement et gratuitement via Vercel. \n\nCe projet m’a également permis de renforcer mes capacités en communication client, en comprenant les attentes d’un propriétaire non initié au digital, et en les traduisant en solutions concrètes.",
      en: "For this project, I had the opportunity to put my skills to use by helping someone close to me who wanted to promote their vacation rental through a modern and clean showcase website. I handled the entire web development process, from design to deployment, with a clear goal: \n\n- To provide visitors with a smooth, visual, and reassuring experience. \n\nThrough this project, I strengthened several key skills :\n\n - Building a fully responsive interface adapted to all devices (desktop, tablet, mobile). \n- Enhancing the user experience by improving navigation and information clarity. \n - Highlighting visual content to showcase the unique environment of the rental. \n - Deploying and managing hosting to ensure fast and free access via Vercel.\n\n This project also allowed me to improve my client communication skills by understanding the needs of someone unfamiliar with the digital world and turning them into concrete solutions.",
    },
    technos: [html, css, scss, js, react],
    link: "https://github.com/DoomZyx/Le-Mas-Du-Paradis",
  },
];

export default projects;
