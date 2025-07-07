# Ticketing App

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

For authentication tests, you can set these environment variables:

```bash
export CYPRESS_AUTH_USERNAME=admin
export CYPRESS_AUTH_PASSWORD=pass
```
