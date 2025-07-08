#!/bin/bash

set -e  # Exit on any error

echo "Starting deployment..."

# Stop everything
echo "Stopping existing containers..."
docker compose down || true
docker stop ticketing-app mariadb || true
docker rm ticketing-app mariadb || true

# Pull latest image
echo "Pulling latest image..."
docker pull $DOCKER_USERNAME/ticketing:latest

# Start MariaDB first
echo "Starting MariaDB..."
docker run -d \
  --name mariadb \
  -e MYSQL_ROOT_PASSWORD=pass \
  -e MYSQL_DATABASE=ticketing \
  -p 3306:3306 \
  --restart unless-stopped \
  mariadb:10.5

# Wait for MariaDB to be ready
echo "Waiting for MariaDB to be ready..."
for i in {1..30}; do
  if docker exec mariadb mysqladmin ping -h localhost --silent; then
    echo "MariaDB is ready!"
    break
  fi
  echo "Waiting... ($i/30)"
  sleep 2
done

# Seed the database
echo "Seeding database..."
docker run --rm \
  --link mariadb:mariadb \
  -e DB_HOST=mariadb \
  -e DB_USER=root \
  -e DB_PASSWORD=pass \
  -e DB_NAME=ticketing \
  $DOCKER_USERNAME/ticketing:latest \
  node fixtures/seed.js

# Start the application
echo "Starting application..."
docker run -d \
  --name ticketing-app \
  --link mariadb:mariadb \
  -p 3000:3000 \
  -e DB_HOST=mariadb \
  -e DB_USER=root \
  -e DB_PASSWORD=pass \
  -e DB_NAME=ticketing \
  -e ADMIN_USER=$ADMIN_USER \
  -e ADMIN_PASSWORD=$ADMIN_PASSWORD \
  --restart unless-stopped \
  $DOCKER_USERNAME/ticketing:latest

# Wait for app to be ready
echo "Waiting for application to be ready..."
sleep 10

# Check status
echo "Checking deployment status..."
docker ps

echo "Deployment complete!"
echo "Application is available on port 3000"
echo "Use your VM's public IP to access: http://YOUR-VM-PUBLIC-IP:3000" 