# Implementation Tasks: ปรับขนาดการแสดงผล DB Sathorn X

> Status: approved 2026-09-08

- [x] 1. Normalize DB Sathorn X visual size in the shared typography layer — เพิ่ม x-height normalization ที่ `src/app/globals.css` สำหรับข้อความปกติทั้งเว็บไซต์ รวม `/pay` โดยคงค่า `font-size` tokens, layout spacing, IBM Plex Mono, settings font-size range และไฟล์ font เดิมไว้
  Satisfies: F1, F2, B1, B2, B3, B4, B5
  Verify: `npm test`, `npx tsc --noEmit --incremental false`, `npm run build`, ตรวจ production CSS ว่ามี `font-size-adjust: 0.5` ใน shared body rule และตรวจ diff ว่าแตะเฉพาะ typography CSS กับ bugfix artifacts

  Evidence: `npm test` -> Test Files 11 passed (11), Tests 133 passed (133), 0 failed; viewports: n/a — Pi has no browser runtime; deviations: standalone `npx tsc --noEmit --incremental false` has pre-existing errors while `npm run build` passes
    - test: `npm test` -> Test Files 11 passed (11), Tests 133 passed (133), 0 failed
    - lint: `npm run lint` -> passed with no ESLint errors
    - build: `npm run build` -> production build completed successfully; 107 static pages generated
    - production: `node_modules/.bin/next start -p 5401` + `curl http://127.0.0.1:5401/pay` -> HTML uses DB Sathorn X variable class and served CSS contains `font-size-adjust:.5` and `font-size-adjust:none`
    - typecheck: `npx tsc --noEmit --incremental false` -> failed on 13 pre-existing errors in `src/lib/api/admin-api.test.ts` and `src/lib/policy/checkout.test.ts`; `npm run build` TypeScript phase passed
    - viewports: n/a — Pi has no browser runtime; production HTML/CSS output was verified instead
    - deviations: no UI browser measurement available in this harness; no application logic, font files, layout tokens, or payment flow files changed

- [x] 2. Set shared base typography to 18px — change `--text-base` and the body base size to 18px at the default root size, with matching 28px line-height; preserve the existing font family, weight mappings, monospace exceptions, and responsive settings
  Satisfies: F4, B1, B2, B3, B4, B5
  Verify: `npm test`, `npm run lint`, `npm run build`, inspect production CSS for `--text-base:1.125rem`, `font-size:var(--text-base)`, and `--text-base--line-height:1.75rem`

  Evidence: `npm test` -> Test Files 11 passed (11), Tests 133 passed (133), 0 failed; viewports: n/a — Pi has no browser runtime; deviations: no browser visual measurement available
    - lint: `npm run lint` -> passed with no ESLint errors
    - build: `npm run build` -> production build completed successfully; 107 static pages generated
    - production CSS: `npm run build` + `rg` -> `--text-base:1.125rem`, `--text-base--line-height:1.75rem`, and `font-size:var(--text-base)` are present

- [x] 3. Use DB Sathorn X for every `/pay` value — remove IBM Plex Mono overrides from payment identifiers, references, dates, and numbers while keeping the shared monospace behavior outside `/pay`
  Satisfies: F5, B1, B2, B4, B5
  Verify: `npm test`, `npm run lint`, `npm run build`, inspect `/pay` source for no `font-mono` or `text-data` usage and confirm the payment layout applies `font-sans`

  Evidence: `npm test` -> Test Files 11 passed (11), Tests 133 passed (133), 0 failed; viewports: n/a — Pi has no browser runtime; deviations: no browser visual measurement available
    - lint: `npm run lint` -> passed with no ESLint errors
    - build: `npm run build` -> production build completed successfully; 107 static pages generated
    - source: `rg 'font-mono|text-data' src/app/pay src/components/pay` -> no matches; `src/app/pay/layout.tsx` applies `font-sans` (DB Sathorn X) to the complete payment surface

- [x] 4. Simplify the `/pay/receipt` header — remove the logo, `Central Payment Gateway`, amount summary, and success badge while preserving receipt detail sections and actions
  Satisfies: F6, B1, B2, B4, B5
  Verify: `npm test`, `npm run lint`, `npm run build`, inspect `receipt-screen.tsx` for retained receipt rows and removed header/amount elements

  Evidence: `npm test` -> Test Files 11 passed (11), Tests 133 passed (133), 0 failed; viewports: screenshot supplied by user; deviations: no browser runtime in Pi
    - lint: `npm run lint` -> passed with no ESLint errors
    - build: `npm run build` -> production build completed successfully; 107 static pages generated
    - source: `receipt-screen.tsx` retains receipt details, policy/breakdown sections, and actions while removing the logo, `Central Payment Gateway`, amount summary, and success badge
