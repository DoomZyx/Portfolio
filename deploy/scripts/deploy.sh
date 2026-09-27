#!/usr/bin/env bash
# Déploiement d'une stack (preprod|prod) sur le VPS
# Usage: ./deploy/scripts/deploy.sh preprod|prod <backend_image> <web_image>

set -euo pipefail

ENV_NAME="${1:?usage: deploy.sh <preprod|prod> <backend_image> <web_image>}"
BACKEND_IMAGE="${2:?backend image required}"
WEB_IMAGE="${3:?web image required}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/deploy/docker-compose.yml"
ENV_FILE="${ROOT_DIR}/deploy/.env.${ENV_NAME}"
PROJECT_NAME="portfolio-${ENV_NAME}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing env file: ${ENV_FILE}" >&2
  exit 1
fi

if [[ "${ENV_NAME}" != "preprod" && "${ENV_NAME}" != "prod" ]]; then
  echo "ENV must be preprod or prod" >&2
  exit 1
fi

export COMPOSE_PROJECT_NAME="${PROJECT_NAME}"
export BACKEND_IMAGE WEB_IMAGE

tmp_env="$(mktemp)"
sed \
  -e "s|^BACKEND_IMAGE=.*|BACKEND_IMAGE=${BACKEND_IMAGE}|" \
  -e "s|^WEB_IMAGE=.*|WEB_IMAGE=${WEB_IMAGE}|" \
  "${ENV_FILE}" > "${tmp_env}"
mv "${tmp_env}" "${ENV_FILE}"

echo "==> Pull images"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" pull

echo "==> Up ${PROJECT_NAME}"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" up -d --remove-orphans

echo "==> Prune dangling images (safe)"
docker image prune -f

echo "==> Status"
docker compose --env-file "${ENV_FILE}" -f "${COMPOSE_FILE}" ps

echo "Deploy ${ENV_NAME} OK"
