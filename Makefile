.PHONY: help install test cypress-open cypress-run lint seed start clean docker-build docker-run docker-stop docker-logs docker-clean dev docker local-dev

help:
	@echo "Available commands:"
	@echo "  install      - Install dependencies"
	@echo "  test         - Run unit tests"
	@echo "  cypress-open - Open Cypress test runner"
	@echo "  cypress-run  - Run Cypress tests in headless mode"
	@echo "  lint         - Run linter"
	@echo "  seed         - Seed database (requires Docker)"
	@echo "  start        - Start application (requires Docker)"
	@echo "  dev          - Start with Docker and seed DB (recommended)"
	@echo "  local-dev    - Install deps and start with Docker"
	@echo "  clean        - Clean node_modules and Docker"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run   - Start Docker services"
	@echo "  docker-stop  - Stop Docker services"
	@echo "  docker-logs  - Show Docker logs"
	@echo "  docker-clean - Clean Docker volumes and images"
	@echo "  docker       - Build and run Docker"

install:
	npm install

test:
	npm test

cypress-open:
	npm run cypress:open

cypress-run:
	npm run cypress:run

lint:
	npm run lint

seed:
	docker-compose up -d mariadb
	DB_HOST=localhost DB_USER=root DB_PASSWORD=pass DB_NAME=ticketing DB_PORT=3307 npm run seed

start:
	docker-compose up -d

clean:
	rm -rf node_modules
	rm -rf coverage
	docker-compose down -v

docker-build:
	docker-compose build

docker-run:
	docker-compose up -d

docker-stop:
	docker-compose down

docker-logs:
	docker-compose logs -f

docker-clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

dev: docker-run
	docker exec ticketing_app_1 npm run seed

local-dev: install docker-run 