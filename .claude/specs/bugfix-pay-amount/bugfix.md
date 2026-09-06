# Bugfix: /pay grand total does not match policy line items
> Status: approved 2026-07-13

## Current Behavior (Defect)

WHEN `npm test` runs THEN `src/lib/pay/payment-flow.test.ts` fails:
```
FAIL src/lib/pay/payment-flow.test.ts > PAY_SESSION > ผลรวมเบี้ยของทุกกรมธรรม์ = ยอดชำระ
AssertionError: expected 14073.71 to be 13428.5
```
Σ `PAY_SESSION.policies[].amount` = 14,073.71 THB (12,783.50 + 1,290.21) does not equal
`PAY_SESSION.amount` = 13,428.50 THB — a 645.21 THB discrepancy.

WHEN a customer opens `/pay` (SummaryScreen) or `/pay/receipt` (ReceiptScreen) THEN the
per-policy line items rendered (`policies[].amount`) sum to a different figure than the
grand total and tax breakdown rendered on the same screen (`amount`, `breakdown`) — a
customer-visible inconsistency, not only a test failure.

Root cause (confirmed by bug-investigator subagent): `PAY_SESSION` in
`src/lib/mock/payment-session.ts` originally modeled a single motor policy (`breakdown`
net 12,500 + stamp 50 + VAT 878.5 = `amount` 13,428.50; `receipt.description` = "เบี้ย
ประกันภัยรถยนต์ชั้น 1"). It was later extended with a second พ.ร.บ. (compulsory/CTP)
policy (`policies[1]`, deliberately wired via `ref2` / docNo `CMI-2026-009153`) without
re-totaling `amount` or `breakdown`. `src/types/payment-flow.ts:18`'s own doc comment
defines `amount` as "เท่ากับผลรวม policies" (equal to the sum of policies), confirming
`policies` — not `amount`/`breakdown` — is the authoritative side. The receipt caption
"(รวม VAT และ พ.ร.บ. แล้ว)" already claims the total includes พ.ร.บ.; it is currently
false and becomes true once `amount`/`breakdown` are corrected to match `policies`.

## Expected Behavior

- F1  THE SYSTEM SHALL set `PAY_SESSION.amount` (src/lib/mock/payment-session.ts) equal
      to Σ `PAY_SESSION.policies[].amount` — 14,073.71 THB (12,783.50 + 1,290.21).
- F2  THE SYSTEM SHALL add a `breakdown` line item for the พ.ร.บ. (CTP) premium —
      645.21 THB — such that Σ `PAY_SESSION.breakdown[].amount` equals
      `PAY_SESSION.amount`: 12,500 + 50 + 878.5 + 645.21 = 14,073.71 THB.

## Unchanged Behavior

- B1  WHEN any /pay screen (SummaryScreen, ReceiptScreen, SuccessScreen, FailedScreen,
      LinkExpiredScreen) renders the grand total THE SYSTEM SHALL CONTINUE TO read it
      from `PAY_SESSION.amount` as the single source — no duplicated/hardcoded literal
      introduced elsewhere.
- B2  WHEN ReceiptScreen renders THE SYSTEM SHALL CONTINUE TO show Σ `breakdown[].amount`
      equal to `amount` (the invariant F2 introduces must hold after the fix, not just
      at edit time).
- B3  THE SYSTEM SHALL NOT modify or weaken the existing `payment-flow.test.ts`
      assertion (`Σ policies === amount`) — it is the correctness oracle for this
      bugfix, not the defect. Adding a new, separate `it()` block to the same file
      (for B2's breakdown invariant) is additive and permitted; it must not touch
      the existing assertion.
- B4  THE SYSTEM SHALL NOT modify `receipt.description` — stays
      "เบี้ยประกันภัยรถยนต์ชั้น 1" per explicit confirmation (out of scope; a content
      decision, not part of this defect).
- B5  THE SYSTEM SHALL NOT modify `.github/workflows/ci.yml`, embed-mode query-param
      handling in `src/components/pay/screens/*`, or the `setSaving` error-handling gap
      in `src/components/role/*` — separate bugfix specs, out of scope for this one.
- B6  THE SYSTEM SHALL NOT modify any file in the Docker deployment PR's scope
      (`Dockerfile`, `docker-compose.yml`, `.dockerignore`, `next.config.ts`,
      `.claude/skills/verify/SKILL.md`).
