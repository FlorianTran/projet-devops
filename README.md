# Ticketing App
[![CI/CD Pipeline](https://github.com/FlorianTran/projet-devops/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/FlorianTran/projet-devops/actions/workflows/ci-cd.yml)

Simple Express.js ticketing application with MariaDB.

## Quick Start (Recommended)

```bash
# Start with Docker (includes MariaDB)
make dev

# Or install dependencies first
make local-dev
```

The application will be available at `http://localhost:3000`

## Development

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)

### Setup Options

#### Option 1: Docker (Recommended)

```bash
# Start everything with Docker
make dev

# View logs
make docker-logs

# Stop services
make docker-stop
```

#### Option 2: Local Development

```bash
# Install dependencies
npm install

# Start MariaDB with Docker
docker-compose up -d mariadb

# Seed database
make seed

# Start application
npm start
```

## Environment Variables

- `DB_HOST` - MariaDB host (default: localhost)
- `DB_USER` - Database user (default: root)
- `DB_PASSWORD` - Database password (default: pass)
- `DB_NAME` - Database name (default: ticketing)
- `ADMIN_USER` - Admin username for /tickets (default: admin)
- `ADMIN_PASSWORD` - Admin password for /tickets (default: pass)
- `PORT` - Application port (default: 3000)

## API Endpoints

- `POST /` - Submit ticket (type_id, email, message)
- `GET /tickets` - List tickets (HTTP Basic Auth required)
- `GET /types` - Get ticket types

## Testing

```bash
# Unit tests
make test

# Cypress E2E tests
make cypress-open  # Open Cypress test runner
make cypress-run   # Run Cypress tests in headless mode

# Lint code
make lint
```

## Docker Commands

```bash
# Build and run
make docker

# Build only
make docker-build

# Run only
make docker-run

# View logs
make docker-logs

# Stop services
make docker-stop

# Clean everything
make docker-clean
```

## Makefile Commands

```bash
# Show all available commands
make help

# Development workflow
make dev

# Local development with deps
make local-dev

# Testing
make test          # Unit tests
make cypress-open  # Open Cypress test runner
make cypress-run   # Run Cypress tests in headless mode

# Clean everything
make clean
```

## Database

The application uses MariaDB with these default credentials:

- **Host**: localhost (when using Docker)
- **User**: root
- **Password**: pass
- **Database**: ticketing

Admin credentials for `/tickets` endpoint:

- **Username**: admin
- **Password**: pass

## Cypress E2E Testing

The application includes comprehensive Cypress E2E tests that cover:

- **Form Display**: Verifies the ticket submission form loads correctly
- **Ticket Submission**: Tests successful ticket creation with all fields
- **Form Validation**: Ensures required fields are validated
- **Authentication**: Tests protected routes with HTTP Basic Auth
- **Dynamic Content**: Verifies ticket types are loaded dynamically

### Running Cypress Tests

```bash
# Open Cypress test runner (interactive)
make cypress-open

# Run tests in headless mode (CI/CD)
make cypress-run
```

### Test Environment Variables

For authentication tests, set these environment variables:

```bash
export CYPRESS_AUTH_USERNAME=admin
export CYPRESS_AUTH_PASSWORD=pass
```

## CI/CD Pipeline

The project includes a complete GitHub Actions CI/CD pipeline that:

1. **Tests**: Runs unit tests and E2E tests
2. **Builds**: Creates Docker image with multi-stage build
3. **Pushes**: Uploads image to Docker Hub
4. **Deploys**: Deploys to remote server via SSH

### Required GitHub Secrets

Configure these secrets in your GitHub repository:

#### Docker Registry Secrets
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub password/token

#### Server Deployment Secrets
- `SERVER_HOST` - IP address or hostname of your deployment server
- `SERVER_USER` - SSH username for the server
- `SSH_PRIVATE_KEY` - Private SSH key for server access

#### Database Secrets (for deployment)
- `DB_HOST` - Database host for production
- `DB_USER` - Database username for production
- `DB_PASSWORD` - Database password for production
- `DB_NAME` - Database name for production
- `ADMIN_USER` - Admin username for production
- `ADMIN_PASSWORD` - Admin password for production

### Pipeline Steps

1. **Test Phase**:
   - Install dependencies
   - Run linting
   - Start MariaDB container
   - Setup database schema
   - Run unit tests
   - Run Cypress E2E tests

2. **Build & Deploy Phase** (only on main branch):
   - Build Docker image with Buildx
   - Push to Docker Hub
   - Deploy to server via SSH
   - Update running container

### Deployment Server Requirements

Your deployment server should have:
- Docker installed
- SSH access configured
- Port 3000 available (or configure reverse proxy)
- MariaDB/MySQL server running
