# Implementation Tasks: Responsive Customer Payment Layout

> Status: approved 2026-09-13

> แต่ละ task เป็น vertical slice ที่ตรวจสอบได้แยกกัน และต้องบันทึก `Evidence:` เมื่อทำเสร็จ

- [x] 1. สร้าง responsive shell และ shared layout primitives — ปรับ `PayShell`, `PayTopNav`, `PayInfoRow` และเพิ่ม `PayScreenFrame` ให้รองรับความกว้าง Mobile, Tablet, Desktop และการ wrap ข้อมูลยาว
  Satisfies: REQ-1.1, REQ-1.2, REQ-1.3, REQ-2.1, REQ-2.2, REQ-2.3, REQ-2.4, REQ-5.1, REQ-5.2, REQ-5.3. Verify: `npx tsc --noEmit`, `npm run lint`
  Evidence: shared responsive shell and wrapping verified
    - test: `npx tsc --noEmit` -> passed
    - test: `npm run lint` -> passed
    - viewports: 375 OK (clientWidth=375, scrollWidth=375) | 768 OK (clientWidth=768, scrollWidth=768) | 1440 OK (clientWidth=1440, scrollWidth=1440)
    - deviations: none

- [x] 2. ปรับ Summary สำหรับ Desktop — จัด detail column และ payment-decision column ที่ Desktop พร้อม fallback เป็นลำดับแนวตั้งบน Mobile/Tablet โดยคงข้อมูล consent และ action เดิม
  Satisfies: REQ-3.1, REQ-3.2, REQ-3.3, REQ-3.4, REQ-6.4. Depends on: 1. Verify: `npx tsc --noEmit`, `npm test`
  Evidence: Summary breakpoint and payment-decision layout verified
    - test: `npx tsc --noEmit` -> passed
    - test: `npm test` -> 1 file, 7 tests passed
    - test: `python3 /tmp/assert_sticky.py` -> Desktop payment-decision column stayed sticky at top 24px; Tablet/Mobile remained non-sticky
    - test: `python3 /tmp/assert_consent_card.py` -> consent area rendered as a visible card with white surface, border, radius and shadow at all acceptance viewports
    - viewports: 375 OK (clientWidth=375, Summary single-column) | 768 OK (clientWidth=768, Summary single-column) | 1440 OK (clientWidth=1440, Summary two-column)
    - deviations: none

- [x] 3. ปรับ status, result, receipt และ error screens — ใช้ readable frame ตามประเภทหน้า ปรับ receipt document width และจัด action buttons แนวนอนตั้งแต่ Tablet โดยไม่เปลี่ยน route หรือ behavior
  Satisfies: REQ-4.1, REQ-4.2, REQ-4.3, REQ-4.4, REQ-6.1, REQ-6.2, REQ-6.3. Depends on: 1. Verify: `npx tsc --noEmit`, `npm test`
  Evidence: status, receipt and error screen layouts verified
    - test: `npx tsc --noEmit` -> passed
    - test: `npm test` -> 1 file, 7 tests passed
    - viewports: 375 OK (clientWidth=375, receipt actions grid) | 768 OK (clientWidth=768, receipt actions horizontal) | 1440 OK (clientWidth=1440, receipt document width 880px)
    - deviations: none

- [x] 4. ตรวจ responsive และประกอบ regression ทั้ง flow — สร้าง production build ตรวจทุก acceptance viewport, overflow, layout breakpoint, keyboard focus และ route/action หลัก แล้วแก้เฉพาะ regression ในขอบเขตนี้
  Satisfies: REQ-1.1, REQ-1.2, REQ-2.1, REQ-2.2, REQ-3.4, REQ-4.4, REQ-6.1, REQ-6.2, REQ-6.3. Depends on: 2, 3. Verify: `npm test`, `npx tsc --noEmit`, `npm run lint`, `npm run build` และ browser verification ที่ `375`, `768`, `1440px`
  Evidence: full responsive and regression gate verified
    - test: `npm run build` -> production build compiled successfully and generated all 12 routes
    - test: `python3 /tmp/assert_cdp.py` -> UI verification passed for 27 route/viewport cases including Summary navigation to `/processing`
    - test: `scripts/spec-trace.sh responsive-pay-layout` -> 22 criteria traced, EARS lint passed
    - viewports: 375 OK (clientWidth=375, scrollWidth=375) | 768 OK (clientWidth=768, scrollWidth=768) | 1440 OK (clientWidth=1440, scrollWidth=1440)
    - deviations: none

## Suggested execution batches

- Task 1 ต้องทำก่อนเพราะเป็น shared responsive foundation
- Task 2 และ Task 3 เป็นคนละ screen boundary แต่ใช้ foundation เดียวกัน จึงควรทำต่อเนื่องใน session เดียว
- Task 4 เป็น assembly task และต้องรัน requirement trace ก่อน mark เสร็จ
