# Sharing Vision Editorial Dashboard

A client-side Next.js dashboard for creating, editing, publishing, drafting, trashing, and permanently deleting articles. The public preview is available at `/preview`.

## Requirements

- Node.js 20+
- A running Sharing Vision API

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
copy .env.example .env.local
```

Set the backend URL in `.env.local`:

```env
API_BASE_URL=http://localhost:8080
```

The browser calls the same-origin `/api-proxy` route. Next.js rewrites that route to `API_BASE_URL`, which avoids browser CORS restrictions while keeping the UI client-side.

The frontend expects these existing API routes:

- `GET /article/:limit/:offset`
- `POST /article`
- `GET /article/:id`
- `PUT /article/:id`
- `DELETE /article/:id`

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

- `/posts` — All posts with Published, Drafts, and Trashed tabs
- `/posts/new` — Create an article
- `/posts/:id/edit` — Edit an article
- `/preview` — Public feed of published articles with pagination

## Architecture

The code is organized by feature and responsibility:

- `src/lib/http` — shared Axios client
- `next.config.ts` — same-origin proxy from `/api-proxy` to `API_BASE_URL`
- `src/features/articles/model` — article schemas and types
- `src/features/articles/api` — article endpoint contracts and response parsing
- `src/features/articles/hooks` — TanStack React Query reads and mutations
- `src/features/articles/components` — article screens and presentation components
- `src/features/preview` — public preview components
- `src/components/layout` — shared application layout
- `src/providers` — application-level providers

Components do not call Axios directly. They use feature hooks, and the API module is the only place that knows endpoint paths and backend response envelopes.

Trash is a status transition. Moving an article to trash first fetches the complete article and sends a full `PUT` with `status: "thrash"`. The Trashed tab exposes a separate confirmed permanent-delete action that calls `DELETE /article/:id`.

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
