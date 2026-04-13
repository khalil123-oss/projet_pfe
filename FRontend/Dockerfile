# ────────────────────────────────────────────────
# Stage 1 : Build de l'application React
# ────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .


RUN npm run build

# ────────────────────────────────────────────────
# Stage 2 : Image finale avec nginx
# ────────────────────────────────────────────────
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

# Template nginx avec variable BACKEND_HOST
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Valeur par défaut pour Kubernetes
ENV BACKEND_HOST=backend-service

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]