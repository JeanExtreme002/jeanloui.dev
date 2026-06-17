# syntax=docker/dockerfile:1

# ---- Stage 1: Build ----
FROM node:22.12.0-alpine AS builder

WORKDIR /app

# Instala dependências a partir do lockfile (cache eficiente)
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante do código e gera o static export (gera ./out)
COPY . .
RUN npm run build

# ---- Stage 2: Serve ----
FROM nginx:1.27-alpine AS runner

# Configuração do Nginx para um site estático com trailingSlash
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos estáticos gerados pelo Next.js
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
