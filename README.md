# Portfolio - Axel Cella

Ce projet est organisé en deux dépôts Git séparés :

- **backend/** : API Fastify avec architecture MVC
- **frontend/** : Application React avec Vite

## Structure

```
NewPortfolio/
├── backend/          # Dépôt Git séparé pour l'API
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── server.js
│
└── frontend/         # Dépôt Git séparé pour l'application React
    ├── src/
    ├── public/
    └── vite.config.js
```

## Configuration des dépôts GitHub

### Backend

1. Créez un nouveau dépôt GitHub pour le backend (ex: `portfolio-backend`)
2. Ajoutez le remote :
```bash
cd backend
git remote add origin https://github.com/VOTRE_USERNAME/portfolio-backend.git
git push -u origin master
```

### Frontend

1. Créez un nouveau dépôt GitHub pour le frontend (ex: `portfolio-frontend`)
2. Ajoutez le remote :
```bash
cd frontend
git remote add origin https://github.com/VOTRE_USERNAME/portfolio-frontend.git
git push -u origin master
```

## Démarrage

### Backend

```bash
cd backend
pnpm install
pnpm dev
```

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

## Configuration

### Backend

Créez un fichier `backend/.env` :
```env
OPENAI_API_KEY=your_api_key_here
OPENAI_API_URL=https://api.openai.com/v1/chat/completions
OPENAI_MODEL=gpt-4o-mini
PORT=3001
```

### Frontend

Le frontend communique avec le backend via le proxy Vite configuré dans `vite.config.js`.

