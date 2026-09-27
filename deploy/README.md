# Déploiement OVH — preprod & prod

Monorepo Docker + nginx. Backend et PostgreSQL sur le VPS. Frontend servi par nginx (image `web`).

## Architecture

```
Internet
   │
   ▼
Nginx hôte (TLS, domaines)     ← deploy/host-nginx/*.conf
   │
   ├─ preprod.axelcella.com  → 127.0.0.1:50121  → stack portfolio-preprod
   └─ axelcella.com          → 127.0.0.1:50122  → stack portfolio-prod
                                    │
                         ┌──────────┼──────────┐
                         ▼          ▼          ▼
                       web        backend      db
                    (nginx+SPA)  (Fastify)  (Postgres)
                         │
                         └─ /api → backend:3001 (réseau Docker interne)
```

Deux stacks Compose isolées (réseaux, volumes, credentials distincts).

## Ports (bind localhost uniquement)

| Env | Port hôte | Upstream nginx hôte |
|-----|-----------|---------------------|
| preprod | `127.0.0.1:50121` | `portfolio_preprod` |
| prod | `127.0.0.1:50122` | `portfolio_prod` |

Choisis hors des plages courantes (`80`/`443`, `3000`/`3001`, `5432`, `8080`/`8081`, `9000`). Backend et Postgres restent internes au réseau Docker (pas de publish).

## Branches Git (convention)

| Branche | Environnement | Workflow |
|---------|---------------|----------|
| `dev` | local / CI uniquement (pas de deploy OVH) | `.github/workflows/ci.yml` |
| `preprod` | preprod OVH (backend + Postgres + web) | `.github/workflows/deploy-preprod.yml` |
| `prod` | prod OVH (backend + Postgres + web) | `.github/workflows/deploy-prod.yml` |

CI commune : `.github/workflows/ci.yml` sur PR/`push` vers `dev`, `preprod` et `prod`.

## Fichiers

| Fichier | Rôle |
|---------|------|
| `backend/Dockerfile` | Image API |
| `frontend/Dockerfile` | Build Vite + nginx SPA + proxy `/api` |
| `deploy/docker-compose.yml` | Stack web + backend + db |
| `deploy/.env.*.example` | Modèles secrets (copier sur le VPS) |
| `deploy/nginx/frontend.conf` | Config nginx **dans** l’image web |
| `deploy/host-nginx/*.conf` | TLS / domaines sur l’hôte OVH |
| `deploy/scripts/deploy.sh` | Pull images + `compose up` |

## Setup VPS (une fois)

1. Docker + Docker Compose plugin + nginx + certbot.
2. Clone du monorepo (chemin = secret `VPS_APP_PATH`).
3. Branches `dev`, `preprod` et `prod` présentes.
4. Secrets locaux (ne pas committer) :
   ```bash
   cp deploy/.env.preprod.example deploy/.env.preprod
   cp deploy/.env.prod.example deploy/.env.prod
   # Éditer mots de passe, JWT, SMTP, images OWNER…
   ```
5. Installer les vhosts hôte :
   ```bash
   sudo cp deploy/host-nginx/preprod.conf /etc/nginx/sites-available/
   sudo cp deploy/host-nginx/prod.conf /etc/nginx/sites-available/
   sudo ln -s /etc/nginx/sites-available/preprod.conf /etc/nginx/sites-enabled/
   sudo ln -s /etc/nginx/sites-available/prod.conf /etc/nginx/sites-enabled/
   sudo nginx -t && sudo systemctl reload nginx
   sudo certbot --nginx -d preprod.axelcella.com
   sudo certbot --nginx -d axelcella.com -d www.axelcella.com
   ```
6. Premier démarrage manuel (après build/push ou images locales) :
   ```bash
   ./deploy/scripts/deploy.sh preprod ghcr.io/<owner>/portfolio-backend:preprod ghcr.io/<owner>/portfolio-web:preprod
   ./deploy/scripts/deploy.sh prod    ghcr.io/<owner>/portfolio-backend:prod    ghcr.io/<owner>/portfolio-web:prod
   ```
7. Migrations BDD (une fois par env, depuis le conteneur backend) :
   ```bash
   docker compose --env-file deploy/.env.preprod -f deploy/docker-compose.yml exec backend node scripts/migrate.js
   docker compose --env-file deploy/.env.preprod -f deploy/docker-compose.yml exec backend node scripts/seedAdmin.js
   # idem pour prod avec .env.prod
   ```

## Secrets GitHub

Créer les **Environments** `preprod` et `prod` (protection manuelle recommandée sur `prod`).

Secrets par environment (ou repository) :

| Secret | Description | Valeur attendue |
|--------|-------------|-----------------|
| `VPS_HOST` | IP / hostname OVH | `54.37.231.243` |
| `VPS_USER` | User SSH | `deploy` |
| `VPS_SSH_KEY` | Clé privée SSH (contenu PEM) | clé du user `deploy` |
| `VPS_APP_PATH` | Chemin clone monorepo sur le VPS | `/home/deploy/portfolio` |

Connexion manuelle : `ssh deploy@54.37.231.243`

> `GHCR_USER` / `GHCR_TOKEN` ne sont **pas** nécessaires : le workflow se connecte à GHCR avec `GITHUB_TOKEN` le temps du deploy.

Packages GHCR : rendre les images privées ; le push CI utilise `GITHUB_TOKEN`.

## Flux CI/CD

1. Travail sur `dev` → PR vers `preprod` → CI.
2. Merge / push `preprod` → build images `:preprod` → SSH → `deploy.sh preprod` (backend + BDD OVH).
3. Merge / push `prod` → build images `:prod` → SSH → `deploy.sh prod` (idéalement avec approbation Environment).

## Local (`dev`)

Branche `dev` : développement local. Le `docker-compose.yml` à la racine sert au **dev local** (db + backend). Ne pas l’utiliser pour preprod/prod OVH.

## Hors scope (à préparer plus tard)

Environnements **feature** (branche `feature/x` → sous-domaine éphémère, stack Compose isolée, cleanup automatique). Les dossiers `deploy/` et les conventions de branches laissent la place ; pas d’implémentation dans ce livrable.

## Sécurité

- Postgres et backend non exposés publiquement (localhost + réseau Docker).
- TLS uniquement sur nginx hôte.
- Secrets uniquement dans `deploy/.env.*` sur le VPS + GitHub Environments.
- Ne jamais committer `deploy/.env.preprod` / `deploy/.env.prod`.
