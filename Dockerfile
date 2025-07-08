FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
# Install mariadb-client for health checks
RUN apk add --no-cache mariadb-client
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
COPY fixtures ./fixtures
COPY start.sh ./start.sh
RUN chmod +x start.sh
EXPOSE 3000
CMD ["./start.sh"] 