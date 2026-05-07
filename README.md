<div align="center">
    <img src=".github/assets/logo.png" width="500" height="auto" alt="firefly"/>
</div>

Firefly is a URL shortener backend build with Node.js, Express, TypeScript, MongoDB, Redis, and Docker.

The project is being built step by step with clean backend architecture, proper TypeScript structure, Redis caching, Docker support, and future plans for authentication, analytics, email reports, and an Astro frontend.

---

## Current Features

- Create short URLs
- Optional custom aliases
- Optional expiry date for links
- Redirect short URLs to original URLs
- Track click count
- Fetch basic analytics
- Redis cache-aside support for faster redirects
- MongoDB persistence
- TypeScript + ESM setup
- Centralised error handling
- Constraints, enums, interfaces, and locale ready messages
- Docker development and production like setup

## Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis
- Docker
- Docker Compose

## Project Structure

```txt
src/
├── app.ts
├── server.ts
├── config/
├── constants/
├── controllers/
├── enums/
├── interfaces/
├── locales/
├── middlewares/
├── models/
├── routes/
├── services/
└── utils/
```

## API Endpoints

### Health Check

```http
GET /health
```

Response:

```json
{
    "success": true,
    "message": "server is running"
}
```

---

### Create Short URL

```http
POST /api/urls
Content-Type: application/json
```

Request:

```json
{
    "url": "https://example.com",
    "customAlias": "example",
    "expiresAt": "2026-06-01T00:00:00.000Z"
}
```

`CustomAlias` and `expiresAt` are optional.

Response: 

```json
{
    "success": true,
    "message": "Short URL created successfully",
    "data": {
        "shortUrl": "http://localhost:3000/example",
        "shortId": "example",
        "originalUrl": "https://example.com",
        "expiresAt": "2026-06-01T00:00:00.000Z"
    }
}
```

---

### Redirect Short URL

```http
GET /:shortId
```

Example:

```
http://localhost:3000/example
```

Redirects to the original URL.

---

### Get URL Analytics

```http
GET /api/urls/:shortId/stats
```

Example: 

```http
GET /api/urls/example/stats
```

Response:

```json
{
    "success": true,
    "message": "URL analytics fetched successfully",
    "data": {
        "shortId": "example",
        "shortUrl": "http://localhost:3000/example",
        "originalUrl": "https://example.com",
        "clicks": 5,
        "expiresAt": "2026-06-01T00:00:00.000Z",
        "createdAt": "2026-05-06T00:00:00.000Z"
    }
}
```

---

## Environment Setup

Create Local env files from examples

### Local Development Without Docker API

```bash
cp .env.example .env
```

### Docker Development

```bash
cp .env.docker.dev.example .env.docker.dev
```

### Docker Production

```bash
cp .env.docker.example .env.docker
```

## Installation

```bash
npm install
```

## Run Locally

Make sure mongoDB and Redis are running locally.

```bash
npm run dev
```

## Run with Docker for Development

This runs API, MongoDB, and Redis inside Docker with hot reload.

```bash
npm run docker:dev
```

or directly:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop:

```bash
npm run docker:dev:down
```
## Run Production-like Docker Stack

This builds the TypeScript app and runs Compiled JavaScript.

```Bash
npm run docker:prod
```

or directly:

```bash
docker compose up --build
```

Stop:

```bash
npm run docker:prod:down
```

## Useful Docker Commands

View Containers:

```bash
docker ps
```

View API logs:

```bash
docker compose logs -f api
```

Stop dev stack:

```bash
docker compose -f docker-compose.dev.yml down
```

Stop production-like stack:

```bash
docker compose down
```

Remove containers and volumes:

```bash
docker compose down -v
```


## Current Docker Files

- `Dockerfile` - production-like multi-stage build
- `Dockerfile.dev` - development setup with hot reload
- `docker-compose-yml` - production-like local stack
- `docker-compose.dev.yml` - development stack
- `.dockerignore` - ignores unnecessary files during image build

## Branching Strategy

Recommended branch flow:

```
feature/* -> develop -> main
```

- `main` - production ready code
- `dev` - integration branch
- `feature/*` - induvidual feature branches

Example: 

```bash
git checkout develop
git checkout -b feature/docker-setup
```