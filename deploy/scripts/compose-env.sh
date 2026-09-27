#!/usr/bin/env bash
# Wrapper Compose sûr : force -p selon l'env (ignore un COMPOSE_PROJECT_NAME shell).
# Usage:
#   ./deploy/scripts/compose-env.sh preprod up -d
#   ./deploy/scripts/compose-env.sh prod ps
#   ./deploy/scripts/compose-env.sh prod exec backend node scripts/migrate.js

set -euo pipefail

ENV_NAME="${1:?usage: compose-env.sh <preprod|prod> <compose-args...>}"
shift

if [[ "${ENV_NAME}" != "preprod" && "${ENV_NAME}" != "prod" ]]; then
  echo "ENV must be preprod or prod" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
COMPOSE_FILE="${ROOT_DIR}/deploy/docker-compose.yml"
ENV_FILE="${ROOT_DIR}/deploy/.env.${ENV_NAME}"
PROJECT_NAME="portfolio-${ENV_NAME}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "Missing env file: ${ENV_FILE}" >&2
  exit 1
fi

if [[ "$#" -lt 1 ]]; then
  echo "usage: compose-env.sh <preprod|prod> <compose-args...>" >&2
  exit 1
fi

exec docker compose \
  -p "${PROJECT_NAME}" \
  --env-file "${ENV_FILE}" \
  -f "${COMPOSE_FILE}" \
  "$@"
