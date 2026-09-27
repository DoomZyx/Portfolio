# Frontend — build Vite puis nginx (SPA + reverse-proxy /api)
FROM node:20-alpine AS build
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9.15.4 --activate

COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY frontend/ ./

# Même origine via nginx : /api/chat → API_BASE vide après strip côté services
ARG VITE_API_URL=/api/chat
ENV VITE_API_URL=$VITE_API_URL

RUN pnpm run build

FROM nginx:1.27-alpine AS runtime

RUN apk add --no-cache wget \
  && rm -rf /usr/share/nginx/html/*

COPY deploy/nginx/frontend.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
