#!/bin/sh

# Wait for database to be ready
echo "Waiting for database..."
while ! mariadb-admin ping -h"$DB_HOST" -P"3306" --silent; do
  sleep 1
done

# Seed the database
echo "Seeding database..."
node fixtures/seed.js

# Start the application
echo "Starting application..."
exec node src/app.js 