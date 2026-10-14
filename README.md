# Prime Success Media

This is the **Prime Success Media** web platform built with [Next.js](https://nextjs.org) (App Router, React 19, Tailwind CSS v4, Turbopack, and standalone production build).

---

## 🚀 Getting Started Locally

First, install dependencies:
```bash
npm install --legacy-peer-deps
```

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

---

## 🛠️ Verification Commands

```bash
npm run lint         # Runs ESLint
npm run typecheck    # Runs TypeScript compiler check (tsc --noEmit)
npm run build        # Compiles Next.js standalone production build
```

---

## 🐳 Docker Deployment

The application is dockerized with an optimized multi-stage build (`node:20-alpine`) utilizing Next.js standalone output for minimal image size and fast boot time.

### Run with Docker Compose:

```bash
# Ensure docker network exists
docker network inspect app-net >/dev/null 2>&1 || docker network create app-net

# Start container in detached mode on port 8087
docker compose up -d --build
```

Container details:
- **Container Name**: `primesuccess-web`
- **Internal Port**: `3000`
- **Host Port**: `8087` (customizable via `PORT` in `.env`)
- **Docker Network**: `app-net` (shared across VPS edge reverse proxy)
- **Persistent Data**: `./data:/app/data` (preserves interviews, career applications, and resumes)

---

## 🔄 Automated CI/CD Pipeline (GitHub Actions)

Workflow file: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### Pipeline Stages:
1. **CI Job (`ci`)**:
   - Triggers on push / PR to `main`.
   - Runs `npm ci`, ESLint (`npm run lint`), TypeScript check (`npm run typecheck`), Next.js production build (`npm run build`).
   - Validates multi-stage Docker build with Docker Buildx.
2. **CD Job (`deploy`)**:
   - Runs automatically on `main` branch after CI passes (or manual trigger).
   - Connects to VPS via SSH (`appleboy/ssh-action`).
   - Pulls latest code into `/var/www/prime-success`.
   - Ensures `data/` permissions and runs `docker compose up -d --build --remove-orphans`.
   - Prunes stale images and verifies container health.

### Required GitHub Secrets

Configure these in **GitHub Repository → Settings → Secrets and variables → Actions**:

| Secret Name | Description | Example |
|---|---|---|
| `VPS_HOST` | Production server IP or hostname | `187.126.120.56` |
| `VPS_USER` | SSH user on VPS | `production` |
| `VPS_SSH_KEY` | Private SSH Key for authentication | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `VPS_PORT` | SSH Port (optional, defaults to 22) | `22` |
