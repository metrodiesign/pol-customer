# Handoff: ปรับขนาดการแสดงผล DB Sathorn X

> From: Pi   To: any   Date: 2026-09-08

## Task Summary

แก้ bug ขนาดการแสดงผล DB Sathorn X ที่ดูเล็กบนหน้าเว็บไซต์ โดย normalize x-height, กำหนด base text 18px, บังคับทุกข้อความ/ตัวเลขใต้ `/pay` ให้ใช้ DB Sathorn X และย่อ header ของ `/pay/receipt` ตาม `bugfix.md` (F1–F2, F4–F6, B1–B5)

## Current Status

เสร็จแล้ว: แก้ `src/app/globals.css` และ payment UI/typography, อัปเดต `tasks.md` เป็น `[x]` พร้อม Evidence สำหรับทั้งสี่ task และสร้าง production build สำเร็จ

## Files Changed

- `src/app/globals.css` — เพิ่ม `font-size-adjust: 0.5`, กำหนด base text 18px และกัน monospace ที่ weight 400 ไม่ให้ถูกปรับ
- `src/app/pay/layout.tsx` และ `src/components/pay/screens/*` — บังคับ payment surface ใช้ DB Sathorn X รวม identifiers และตัวเลข โดยไม่มี `font-mono` override
- `src/components/pay/screens/receipt-screen.tsx` — ลบโลโก้, `Central Payment Gateway`, amount summary และ success badge ตาม requirement
- `.claude/specs/bugfix-db-sathorn-scale/bugfix.md` — bugfix spec ที่อนุมัติแล้ว
- `.claude/specs/bugfix-db-sathorn-scale/tasks.md` — implementation task และ Evidence
- `.claude/specs/bugfix-db-sathorn-scale/handoff.md` — handoff state

## Important Decisions

- ใช้ `font-size-adjust: 0.5` แทนการเพิ่ม `text-*` ทุก token เป็น 3 เท่า เพราะแก้ visual x-height โดยไม่ขยาย padding และ layout ทั้งระบบ
- `font-medium` กลับไปใช้ utility behavior ปกติของ Tailwind และ inherited DB Sathorn X family
- base text ใช้ `--text-base: 1.125rem` และ body ใช้ `font-size: var(--text-base)`
- นอก `/pay` ยังคงยกเว้น `.font-mono`, `.text-data`, `code`, `kbd`, `samp`, `pre` ด้วย `font-size-adjust: none` และ `font-weight: 400` เพื่อคง IBM Plex Mono; `/pay` ใช้ DB Sathorn X ทั้งหมดตาม requirement ล่าสุด

## Constraints

- ไม่แก้ไฟล์ font, payment logic, route, spacing token หรือ settings font-size range
- อยู่บน branch `fix/pay-typography-and-receipt`; การ commit และ push จะดำเนินการผ่าน `ship-pr` workflow

## Tests Run

- `npm test` -> Test Files 11 passed, Tests 133 passed, 0 failed
- `npm run lint` -> ผ่าน ไม่มี ESLint errors
- `npm run build` -> production build ผ่าน, สร้าง static pages 107 หน้า
- production CSS จาก `npm run build` -> `--text-base:1.125rem`, line-height `1.75rem`, `font-size:var(--text-base)`, และ CSS มี `font-size-adjust:.5` / `font-size-adjust:none`
- `/pay` source verification -> ไม่พบ `font-mono` หรือ `text-data` ใน payment surface และ `src/app/pay/layout.tsx` ใช้ `font-sans` (DB Sathorn X) เป็น family หลัก
- `/pay/receipt` source verification -> ไม่พบ logo, `Central Payment Gateway`, amount summary หรือ success badge; receipt rows, policy/breakdown sections และ actions ยังคงอยู่
- `npx tsc --noEmit --incremental false` -> มี 13 pre-existing errors ใน `admin-api.test.ts` และ `checkout.test.ts`; แต่ TypeScript phase ของ `npm run build` ผ่าน
- `./.ai/bin/gate-task.sh .claude/specs/bugfix-db-sathorn-scale/tasks.md <tasks-content>` -> ผ่าน
- `git diff --check` -> ผ่าน
- viewports: n/a — Pi ไม่มี browser runtime สำหรับวัด layout จริง

## Known Issues

- ต้องตรวจ visual จริงใน browser ที่ viewport 375, 768 และ 1440 หลัง deploy หรือใน session ที่มี browser verification runtime
- standalone `tsc` errors เป็นปัญหาเดิมนอก scope ของ bugfix นี้

## Next Recommended Agent

human review หรือ agent ที่มี browser runtime สำหรับ visual verification

## Next Steps

1. อ่าน `bugfix.md` และ `tasks.md` เพื่อตรวจ traceability
2. เปิด production runtime และตรวจข้อความบน `/pay` กับหน้า admin ที่ 375, 768, 1440
3. หาก visual scale เหมาะสมแล้วจึง commit ผ่าน git hooks และเปิด PR ตาม workflow
