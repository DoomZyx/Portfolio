export const PRODUCT_LIFECYCLE_INTRO = {
  title: "Construire un produit digital, c’est un peu comme construire une maison.",
  paragraphs: [
    "Aujourd’hui, l’IA et les outils modernes permettent de construire beaucoup plus vite. Mais aller vite ne suffit pas : encore faut-il partir du bon besoin, poser les bonnes fondations et savoir ce que le produit coûtera à faire fonctionner dans le temps.",
    "Mon rôle est de vous accompagner de la réflexion à la mise en production : déterminer ce qu’il est pertinent de construire, choisir une architecture adaptée, développer la solution et anticiper son exploitation et ses évolutions.",
  ],
};

export const PRODUCT_LIFECYCLE_STEPS = [
  {
    step: "01",
    title: "Les plans",
    house: "On ne pose pas la première brique sans savoir à quoi servira le lieu.",
    product:
      "Vision, besoin métier, périmètre. On clarifie ce qu’il faut vraiment construire, et ce qu’on peut laisser de côté.",
  },
  {
    step: "02",
    title: "Les fondations",
    house: "La solidité dépend de ce qu’on ne voit pas.",
    product:
      "Architecture, données, choix techniques. Des bases adaptées au projet, ni trop légères ni surdimensionnées.",
  },
  {
    step: "03",
    title: "La construction",
    house: "C’est là que le projet devient visible.",
    product:
      "Développement de la solution. L’IA accélère la pose des briques ; encore faut-il savoir lesquelles poser, où, et sur quelles fondations.",
  },
  {
    step: "04",
    title: "Les réseaux",
    house: "Eau, électricité, raccordements : sans eux, la maison ne vit pas.",
    product:
      "Hébergement, base de données, emails, paiements, APIs, IA… tout ce qui fait tourner le produit au quotidien.",
  },
  {
    step: "05",
    title: "L’entretien",
    house: "Une maison inhabitée sans entretien se dégrade.",
    product:
      "Corrections, mises à jour, sécurité, suivi. Ce qui permet au produit de rester fiable dans le temps.",
  },
  {
    step: "06",
    title: "Les extensions",
    house: "On agrandit quand le besoin évolue.",
    product:
      "Nouvelles fonctionnalités, refontes ciblées, montée en charge. On fait évoluer ce qui a de la valeur, pas tout, tout le temps.",
  },
];

export const PRODUCT_LIFECYCLE_COSTS = {
  title: "Construire est un investissement. Faire fonctionner le produit a aussi un coût.",
  paragraphs: [
    "Comme une maison utilise de l’eau, de l’électricité et des services, un produit digital peut nécessiter de l’hébergement, du stockage, des emails, des APIs, de l’IA ou d’autres services.",
    "Ces coûts sont identifiés pendant le cadrage afin que vous sachiez ce qu’il faudra prévoir après la livraison.",
  ],
  categories: [
    {
      title: "Infrastructure",
      description: "Ce qui permet au produit de fonctionner.",
    },
    {
      title: "Maintenance",
      description: "Ce qui permet de le garder fiable et sécurisé.",
    },
    {
      title: "Évolutions",
      description: "Ce que vous décidez d’améliorer ou d’ajouter ensuite.",
    },
  ],
};

export const PRODUCT_LIFECYCLE_CTA = {
  title: "Chaque projet n’a pas besoin des mêmes fondations.",
  description:
    "Certaines idées demandent une structure légère. D’autres doivent être pensées pour évoluer. Voyons ce dont votre projet a réellement besoin.",
  label: "Diagnostiquer mon projet",
  to: "/diagnostic",
};
