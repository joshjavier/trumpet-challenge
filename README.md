# Trumpet Technical Challenge

A simple app where users can add, edit, and persist multiple text widgets. Built with Next.js.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Jest + React Testing Library
- In-memory backend storage

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Run Tests

```bash
npm test
```

## (Optional) Run with Docker

```bash
docker build -t text-widgets .
docker run -p 3000:3000 text-widgets
```

## Notes

- Widgets persist via in-memory backend.
- PUT requests require a non-empty `text` field; otherwise return 400.
- Debounced saves (500ms) prevent redundant API calls.
- DELETE requests are idempotent.
