#!/bin/bash

echo "🔄 Starting manual deployment..."

# Stop all containers
echo "📦 Stopping existing containers..."
docker compose down

# Remove old containers and images
echo "🧹 Cleaning up..."
docker system prune -f

# Pull latest image
echo "⬇️ Pulling latest image..."
docker pull $DOCKER_USERNAME/ticketing:latest

# Update docker-compose.yml with the new image
echo "📝 Updating docker-compose.yml..."
sed -i "s|image: .*|image: $DOCKER_USERNAME/ticketing:latest|" docker-compose.yml

# Start services
echo "🚀 Starting services..."
ADMIN_USER=$ADMIN_USER ADMIN_PASSWORD=$ADMIN_PASSWORD docker compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check status
echo "📊 Checking service status..."
docker compose ps

# Show logs
echo "📋 Recent logs:"
docker compose logs --tail=20

echo "✅ Deployment complete!" 