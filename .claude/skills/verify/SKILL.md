---
name: verify
description: Build and run pol-customer's Docker image end-to-end before calling a change done. Use before committing nontrivial changes to Dockerfile, docker-compose.yml, or next.config.ts.
---

# Verify (pol-customer)

Single-package repo (Next.js 16 App Router, port 5400) — verify at repo root.

## Gotcha: port 5400 is usually already taken

Local dev (`npm run dev`) binds 5400 and is often left running. Don't collide
with it — check first, then verify on an alternate host port under an
isolated compose project name so teardown can't touch anyone else's containers:

```bash
lsof -nP -iTCP:5400 -sTCP:LISTEN
PORT=15400 docker compose -p pol-customer-verify up -d --build
```

## Gotcha: `npm ci` fails inside `node:22-alpine`

`package-lock.json` gets written by whatever npm the host has (11.x here);
`node:22-alpine` bundles npm 10.9.3, which rejects that lock file (`picomatch`
optional-peer mismatch under `npm ci`'s strict check). The Dockerfile's `deps`
stage runs `npm install -g npm@11` before `npm ci` to align the versions —
this is a build-tool skew, not a broken lock file; don't "fix" it by touching
`package.json`/`package-lock.json`.

## Drive it

```bash
curl -sI http://localhost:15400/                        # 307 -> /main is expected (pre-existing app routing)
curl -s http://localhost:15400/pay                       # customer payment page — 200
curl -s -o /dev/null -w '%{http_code}\n' \
  http://localhost:15400/_next/static/chunks/<one-from-html>.js  # confirm .next/static was copied (200, not 404)
docker inspect --format='{{json .State.Health}}' pol-customer-verify-web-1
```

## Teardown

```bash
docker compose -p pol-customer-verify down
```
