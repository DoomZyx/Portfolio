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
      fr: "Ce projet est un prototype de site e-commerce spécialisé dans les pièces automobiles. Il permet aux utilisateurs d’entrer un numéro de plaque d’immatriculation pour trouver les pièces compatibles avec le modèle et la motorisation de leur véhicule. Ce projet consiste à améliorer mes compétences sur React et à me familiariser avec node.js",
      en: "This project is a prototype of an e-commerce website specialized in automotive parts. It allows users to enter a license plate number to find compatible parts for their vehicle's model and engine type. This project aims to improve my skills in React and familiarize myself with Node.js",
    },
    link: "https://github.com/DoomZyx/SKG-AUTOPARTS"
  },
  {
    title: {
      fr: "Ohmyfood",
      en: "Ohmyfood",
    },
    images: [ohmyfood, ohmyfood2, ohmyfood3, ohmyfood4, ohmyfood5],
    description: {
      fr: "J'ai décidé de faire une refonte d'un projet que j'ai effectué en formation. Le projet de base consistait à développer une application en mobile-first en se concentrant sur la gestion des composants sass et créer des animations. Quelques mois après, lorsque j'ai su mieux maitriser React je me suis décidé de refaire ce projet mais avec des fonctionnalités complètes et en utlisant Redux. (Créer un compte et se connecter au site, la gestion du panier, ajouter des restaurants). Et j'ai décidé de créer un backend pour me familiariser avec node.js et MangoDB",
      en: "I decided to redesign a project I worked on during my training. The original project involved developing a mobile-first application, focusing on managing Sass components and creating animations. A few months later, when I had a better grasp of React, I decided to redo this project with full features and using Redux. (Creating an account and logging into the site, managing the cart, adding restaurants). I also decided to build a backend to familiarize myself with Node.js and MongoDB",
    },
    link: "https://github.com/DoomZyx/OhMyFood"
  },
];

export default projects;
