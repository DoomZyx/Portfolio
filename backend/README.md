# Backend Server - Fastify

## Configuration

Le serveur backend fait le proxy vers l'API OpenAI pour éviter les problèmes CORS et sécuriser la clé API.

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```env
# Clé API OpenAI (requis)
OPENAI_API_KEY=your_openai_api_key_here

# URL de l'API OpenAI (optionnel, par défaut: https://api.openai.com/v1/chat/completions)
OPENAI_API_URL=https://api.openai.com/v1/chat/completions

# Modèle GPT à utiliser (optionnel, par défaut: gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Port du serveur backend (optionnel, par défaut: 3001)
PORT=3001
```

## Démarrage

### Installation des dépendances

Dans le dossier `backend/` :
```bash
cd backend
pnpm install
```

### Développement

#### Option 1 : Avec PM2 (recommandé)

Installer PM2 globalement :
```bash
npm install -g pm2
```

Démarrer le backend avec PM2 :
```bash
# Depuis la racine du projet
pm2 start ecosystem.config.js

# Ou depuis le dossier backend
pnpm pm2:start
```

Commandes PM2 utiles :
```bash
# Voir les logs
pnpm pm2:logs
# ou
pm2 logs portfolio-backend

# Redémarrer
pnpm pm2:restart
# ou
pm2 restart portfolio-backend

# Arrêter
pnpm pm2:stop
# ou
pm2 stop portfolio-backend

# Voir le statut
pm2 status

# Arrêter et supprimer
pm2 delete portfolio-backend
```

#### Option 2 : Mode développement classique

Pour lancer le backend seul :
```bash
cd backend
pnpm dev
```

Le serveur backend sera accessible sur `http://localhost:3001`

### Configuration PM2

Le fichier `ecosystem.config.js` à la racine du projet configure PM2 pour :
- Charger automatiquement les variables d'environnement depuis `backend/.env`
- Gérer les logs dans le dossier `logs/`
- Redémarrer automatiquement en cas d'erreur
- Limiter la mémoire à 500MB

## Endpoints

### POST /api/chat

Endpoint pour envoyer des messages au chatbot.

**Request Body:**
```json
{
  "messages": [
    {
      "id": 1,
      "sender": "user",
      "text": "Bonjour"
    }
  ]
}
```

**Response:**
```json
{
  "message": "Réponse du chatbot"
}
```

## Architecture MVC

Le backend suit une architecture MVC propre :

- **server.js** : Point d'entrée du serveur Fastify
- **routes/chatRoutes.js** : Définition des routes
- **controllers/chatController.js** : Logique métier et orchestration
- **services/openaiService.js** : Service pour communiquer avec l'API OpenAI
- **config/constants.js** : Constantes et configuration (prompt système, etc.)

### Séparation des responsabilités

- **Routes** : Gèrent uniquement le routing et la validation basique
- **Contrôleurs** : Contiennent la logique métier et orchestrent les appels aux services
- **Services** : Gèrent l'accès aux APIs externes (OpenAI)
- **Config** : Contient les constantes et configurations

