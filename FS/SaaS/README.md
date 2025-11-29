# SaaS Product Usage & Retention Dashboard

This repository contains a small SaaS-style application redesigned into a Product Usage / Retention dashboard. It includes a Node.js + Express backend (MongoDB) and a React + Vite frontend. The project demonstrates event ingestion, session tracking, DAU/MAU metrics, cohort analysis, and feature usage reporting along with a simple admin API-key model for ingestion.

## Features
- Usage event ingestion endpoint for client/service telemetry
- DAU/MAU and stickiness metrics
- Cohort and feature-usage reporting
- DB-backed API keys (with legacy env migration) and JWT auth for users
- Minimal React dashboard with Overview, Retention, Cohorts, and Feature Usage pages
- Seed script to generate demo users and events

## Tech Stack
- Backend: Node.js, Express, Mongoose (MongoDB)
- Frontend: React (Vite), Recharts, Axios
- Auth: JWT for users, DB-backed API keys for ingestion and service access

## Repository Layout

Top-level folders:

- `server/` — Express server, models, controllers, routes, middleware, seed utilities
- `client/` — Vite + React frontend and assets

Key server files:
- `server/server.js` — app bootstrap and conditional route mounting
- `server/models/` — `User`, `Session`, `UsageEvent`, `ApiKey`, etc.
- `server/controllers/` — controllers for auth, usage ingestion, metrics, apikeys
- `server/middleware/` — JWT auth, admin guard, api-key validation
- `server/util/seedDemo.js` — seed demo users and events (30 days)

Key client files:
- `client/src/main.jsx` — app entry
- `client/src/App.jsx` — routes and layout
- `client/src/api/axios.js` — axios instance with token handling
- `client/src/components/PageHeader.jsx` — reusable page header
- `client/src/index.css` — global theme and utilities

## Quick Start (Development)

Prerequisites:
- Node.js (v18+ recommended)
- MongoDB running locally or accessible remotely

1) Clone / open this repo and install dependencies for both server and client.

PowerShell (from repository root):

```powershell
cd d:\FS\SaaS\server
npm install

cd ..\client
npm install
```

2) Configure environment variables.

Create `server/.env` (or set env vars) with at least:

```
MONGO_URI=mongodb://localhost:27017/saas-dashboard
JWT_SECRET=change-me-to-a-secure-secret
INGEST_API_KEY=your-legacy-or-temp-ingest-key
PORT=5000

# Optional: allow admin registration from the web (development only)
# If you want to be able to register an admin account via the Register page,
# set an `ADMIN_REGISTRATION_CODE` here and provide that code in the Register form.
# Example:
# ADMIN_REGISTRATION_CODE=my-local-admin-code-123
```

Client may read a runtime API URL from code or use `http://localhost:5000` by default.

3) Start the backend and frontend (separate terminals):

```powershell
# Terminal 1: start server
cd d:\FS\SaaS\server; node server.js

# Terminal 2: start client dev server
cd d:\FS\SaaS\client; npm run dev
```

4) (Optional) Seed demo data

To populate the DB with sample users and usage events for the demo dashboard:

```powershell
node d:\FS\SaaS\server\util\seedDemo.js
```

5) (Optional) Start the local JSON server for CRUD demos

```powershell
cd d:\FS\SaaS\json-server
npm install
npm start
```

The JSON server runs on `http://localhost:3001`. The client includes a small demo page at `/json-demo` which performs CRUD against this server.

## API Overview

Authentication
- User routes use JWTs (returned on login/register). Client stores JWT in localStorage for the demo.
- Ingestion and metrics endpoints accept either a valid API key via the `x-api-key` header or a valid JWT (middleware `apiKeyOrAuth`).

Important endpoints
- `POST /api/usage/ingest` — send usage events (requires API key or JWT)
- `GET /api/metrics/dau` — daily active users (accepts API key or JWT)
- `GET /api/metrics/mau` — monthly active users
- `GET /api/metrics/feature-usage` — feature usage summary
- `POST /api/auth/register` — register a user
- `POST /api/auth/login` — login and receive a JWT
- `GET /api/apikeys` (admin) — list/manage API keys

API key usage example (HTTP header):

```
x-api-key: <your-api-key>
```

Notes on API keys
- API keys are stored in the DB as hashed secrets with metadata (scopes, owner, disabled). On server startup the legacy `INGEST_API_KEY` (if present) is migrated into the `ApiKey` collection for continuity.

## Development Notes & Troubleshooting

- If you hit 401 responses from the client, ensure that the JWT or `x-api-key` header is correctly set (no extra quotes or brackets). The client sanitizes tokens but verify stored values.

- Developer convenience: to avoid pasting API keys into the browser console, you can set the same ingest key for the frontend using Vite env vars. Create `client/.env` (or copy `client/.env.example`) and set:

```
VITE_INGEST_API_KEY=uG2z47j9hUmBaSbIEdZiNJy5TxWLHvQofe13q8Cr
```

When the dev server starts, the client will seed `localStorage.apiKey` automatically (dev only). **Do not** set this in production — it exposes the key to browser JS.
- If server fails to start due to DB connection issues, ensure MongoDB is reachable at `MONGO_URI`. The server implements a retry rather than exiting immediately.
- Recharts can show size warnings if charts mount before the container has a computed size — pages use `ResponsiveContainer` and explicit card sizing to reduce this.
- If you saw a ReferenceError about `tryMount` in `server.js`, the helper was relocated; ensure you have the latest server file.

## Next Steps / TODOs

- Standardize all pages to use `client/src/components/PageHeader.jsx` (some pages already updated).
- Add an Admin UI to manage API keys in the frontend.
- Add per-key rate limiting and scope enforcement for production readiness.

## Contributing

This project is an internal demo/prototype. If you want improvements, open an issue or create a PR with focused changes (one feature/fix per PR recommended).

## License

This repo currently has no license specified. Add an appropriate `LICENSE` file if you intend to publish or share.

---

