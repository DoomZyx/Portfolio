# ChatBot - Assistant virtuel

## Configuration

Le chatbot utilise un backend Fastify qui fait le proxy vers l'API OpenAI. Cela évite les problèmes CORS et sécurise la clé API.

### Variables d'environnement

Créez un fichier `.env` à la racine du projet avec :

```env
# Clé API OpenAI (requis - côté serveur)
OPENAI_API_KEY=your_openai_api_key_here

# URL de l'API OpenAI (optionnel, par défaut: https://api.openai.com/v1/chat/completions)
OPENAI_API_URL=https://api.openai.com/v1/chat/completions

# Modèle GPT à utiliser (optionnel, par défaut: gpt-4o-mini)
OPENAI_MODEL=gpt-4o-mini

# Port du serveur backend (optionnel, par défaut: 3001)
PORT=3001
```

**Important :** La clé API doit être `OPENAI_API_KEY` (sans le préfixe `VITE_`) car elle est utilisée côté serveur.

### Obtenir une clé API OpenAI

1. Créez un compte sur [OpenAI Platform](https://platform.openai.com/)
2. Allez dans [API Keys](https://platform.openai.com/api-keys)
3. Créez une nouvelle clé API
4. Copiez-la dans votre fichier `.env` avec la variable `OPENAI_API_KEY`

### Démarrage

Pour lancer le backend et le frontend :
```bash
pnpm dev:all
```

Ou séparément :
```bash
# Terminal 1 - Backend
pnpm dev:backend

# Terminal 2 - Frontend
pnpm dev
```

## Fonctionnalités

- **Identification du profil du visiteur** : Détecte automatiquement si le visiteur souhaite créer, améliorer ou comprendre les services
- **Réponses contextuelles** : Utilise GPT pour générer des réponses adaptées au contexte
- **Call-to-action intelligent** : Propose automatiquement le formulaire de contact quand approprié
- **Navigation fluide** : Permet de naviguer vers le formulaire de contact ou le portfolio

## Structure

- `ChatBot.jsx` : Composant principal du chatbot
- `useChatBot.js` : Hook personnalisé gérant la logique métier
- `chatbotApi.js` : Service API pour communiquer avec le backend
- `_chatbot.scss` : Styles du composant
- `server/index.js` : Serveur Fastify qui fait le proxy vers OpenAI

## Personnalisation

Le prompt système est défini dans `server/index.js`. Vous pouvez le modifier pour adapter le comportement du chatbot selon vos besoins.

