# Implementation Tasks: /pay grand total does not match policy line items

> Status: approved 2026-07-13

> Single cohesive slice — one data reconciliation + its guard test, same commit.

- [x] 1. Reconcile `PAY_SESSION.amount`/`breakdown` with `policies` total — in
      `src/lib/mock/payment-session.ts`: set `amount` 13428.5 → 14073.71 (Σ
      `policies[].amount`); add a `breakdown` line item "เบี้ยประกันภัย พ.ร.บ." =
      645.21 so Σ `breakdown[].amount` = 14073.71, matching `amount`. In
      `src/lib/pay/payment-flow.test.ts`: add one new `it()` asserting Σ
      `breakdown[].amount` === `amount` — additive only, do not touch the existing
      `Σ policies === amount` assertion. Do not touch `receipt.description`,
      `.github/workflows/ci.yml`, `src/components/pay/screens/*` embed handling,
      `src/components/role/*`, or any Docker-PR file
      (`Dockerfile`/`docker-compose.yml`/`.dockerignore`/`next.config.ts`/
      `.claude/skills/verify/SKILL.md`).
      Done = the pre-existing failing assertion goes green, the new breakdown
      assertion is green, and `git diff --stat` shows only
      `payment-session.ts` + `payment-flow.test.ts` changed.
      Satisfies: F1, F2, B1, B2, B3, B4, B5, B6.
      Verify: `npm test` — `src/lib/pay/payment-flow.test.ts` fully green (both the
      existing and the new assertion), 0 failures overall, test count 132 → 133.
      `git diff --stat` confirms only the two named files changed.
      Evidence: `npm test` -> Test Files 11 passed (11), Tests 133 passed (133), 0 failed (was 132 passed/1 failed before this task, F1/F2/B2 confirmed green); `git diff --stat` -> only `src/lib/mock/payment-session.ts` (3 ++-, 1 deletion) + `src/lib/pay/payment-flow.test.ts` (5 ++) changed, nothing else touched (B1, B4, B5, B6); `npx tsc --noEmit --incremental false` -> same 11 pre-existing errors in 2 unrelated files as before this task (admin-api.test.ts, checkout.test.ts — out of scope, separate CI-hardening bugfix), 0 new errors introduced; `scripts/spec-trace.sh bugfix-pay-amount` -> skipped (bugfix spec, no requirements.md — expected); viewports: n/a — logic/data-only, no UI changed; deviations: none
