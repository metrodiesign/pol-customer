# Handoff: ช่องทางพร้อมเพย์บนหน้าเปิดรายการ
> From: Pi
> To: any
> Date: 2026-09-13

## Task Summary
เพิ่มข้อมูลช่องทางการชำระเงินแบบแสดงอย่างเดียวบนหน้า `/opening` และ `/redirecting` พร้อมปรับ label ในหน้า `/processing` และปรับข้อความหน้า `/invalid`, `/expired`, `/failed` และ `/success` ให้เหมาะกับลูกค้า และใช้ข้อความ `ชื่อตัวแทน` แทน `ผู้ส่งลิงก์` ในหน้า invalid/expired พร้อมใช้ข้อความปุ่ม `ติดต่อตัวแทน` จัดข้อความวันหมดอายุให้อยู่บรรทัดเดียวกันเมื่อมีพื้นที่ ให้หน้า expired/failed แสดงเลขที่รายการ ช่องทางการชำระเงิน และยอดชำระด้วยรูปแบบการ์ดเดียวกับหน้า opening โดยหน้า failed ไม่แสดง alert box ซ้ำ รวมถึงจัดปุ่มติดต่อเป็นแถวเดียวบนจอที่กว้างขึ้นและเรียงแนวตั้งบน mobile โดยใช้ช่องทางพร้อมเพย์ตามที่ผู้ใช้เลือก ไม่เพิ่มการเลือกหรือการเปลี่ยนช่องทาง

## Current Status
เสร็จสมบูรณ์ — หน้า `/opening`, `/processing` และ `/redirecting` ใช้ label `ช่องทางการชำระเงิน`, หน้า `/invalid`, `/expired`, `/failed` และ `/success` ใช้ข้อความสำหรับลูกค้าโดยไม่แสดง technical code/English status โดยหน้า failed ใช้หัวข้อ `การชำระเงินไม่สำเร็จ` และหน้า success ใช้ subtitle ภาษาไทย และหน้า invalid/expired ไม่เหลือข้อความ `ผู้ส่งลิงก์`; หน้า expired แสดงเฉพาะวันหมดอายุใต้หัวข้อ; หน้า expired/failed แสดงข้อมูลสรุป 3 รายการเหมือนหน้า opening/ประมวลผล ใช้ border/padding/row layout เดียวกับหน้า opening, หน้า failed ไม่มี alert box ซ้ำกับหัวข้อ, ไอคอนรายการแนะนำอยู่กึ่งกลางแนวตั้ง และปุ่มรองรับ mobile แบบคอลัมน์เดียว; mock session ใช้ `promptpay` เพื่อให้หน้าที่เกี่ยวข้องแสดงข้อมูลสอดคล้องกัน

## Files Changed

- `src/components/pay/screens/link-opening-screen.tsx` — เพิ่มแถวข้อมูลช่องทางการชำระเงินแบบ read-only
- `src/lib/mock/payment-session.ts` — ตั้งช่องทางของ mock session เป็น `promptpay`
- `src/components/pay/screens/processing-screen.tsx` — เปลี่ยน label เป็นช่องทางการชำระเงิน
- `src/components/pay/screens/link-redirecting-screen.tsx` — เพิ่มแถวข้อมูลช่องทางการชำระเงินแบบ read-only
- `src/components/pay/screens/link-invalid-screen.tsx` — ปรับข้อความให้เป็น customer-facing และนำ error code ออก
- `src/app/(pay)/invalid/page.tsx` — ปรับ title ของหน้า invalid
- `src/components/pay/screens/link-expired-screen.tsx` — ปรับข้อความให้เป็น customer-facing, นำ Link Code ออก และเพิ่มข้อมูลสรุปเลขที่รายการ/ช่องทาง/ยอดชำระ และจัดการ์ดให้เหมือนหน้า opening และจัดปุ่มเป็น responsive grid
- `src/app/(pay)/expired/page.tsx` — ปรับ title ของหน้า expired
- `src/components/pay/screens/failed-screen.tsx` — ปรับข้อความ customer-facing, เพิ่มข้อมูลสรุป, ลบ alert box ที่ซ้ำ, จัดไอคอนรายการแนะนำให้อยู่กึ่งกลาง และจัดปุ่ม responsive
- `src/app/(pay)/failed/page.tsx` — ปรับ title ของหน้า failed
- `src/components/pay/screens/success-screen.tsx` — ปรับข้อความ customer-facing, label ช่องทาง, ลบรหัสยืนยันการชำระเงิน และ responsive action grid
- `.claude/specs/opening-payment-channel/handoff.md` — บันทึก handoff

## Important Decisions

- ใช้ `CHANNEL_DISPLAY[session.channel].label` เป็นแหล่งข้อมูลเดียวกับหน้า `/processing` แทนการ hardcode ข้อความใน component
- คงพฤติกรรม display-only และไม่เพิ่ม interactive control
- ไม่แสดง `LINK_NOT_AVAILABLE`, `ERR-LINK-4031`, `Payment Link has expired`, `Link Code`, `Error Code`, `Reference` หรือข้อความอธิบายวันหมดอายุซ้ำให้ลูกค้าเห็น และหน้า success ใช้ label ภาษาไทยและไม่แสดงรหัสยืนยันการชำระเงิน

## Constraints

- ไม่เพิ่ม dependency และไม่เปลี่ยน route หรือ payment flow
- ห้าม commit หรือ push โดยไม่ได้รับคำสั่งจากผู้ใช้

## Tests Run

- `npm test` -> Test Files 1 passed, Tests 7 passed
- `npx tsc --noEmit --incremental false` -> ผ่าน
- `npm run lint` -> ผ่าน
- `npm run build` -> production build ผ่าน, สร้าง routes ครบ 12 รายการ
- `curl http://localhost:5400/opening` -> พบ `ช่องทางการชำระเงิน` และ `พร้อมเพย์`
- `curl http://localhost:5400/invalid` -> พบข้อความ customer-facing และไม่พบ `Link not available`, `LINK_NOT_AVAILABLE` หรือ `ERR-LINK-4031`
- `curl http://localhost:5400/expired` -> พบวันหมดอายุใต้หัวข้อ, แสดง `เลขที่รายการ`, `ช่องทางการชำระเงิน`, `ยอดชำระ` และไม่พบ `Payment Link has expired` หรือ `Link Code`
- `curl http://localhost:5400/success` -> พบข้อความภาษาไทย, `ช่องทางการชำระเงิน`, ไม่พบ `รหัสยืนยันการชำระเงิน` และพบ action grid แบบ responsive
- `viewports: n/a` — เปลี่ยนข้อความและข้อมูลสรุปแบบ responsive ที่ใช้ layout เดิม

## Known Issues

- ไม่มี

## Next Recommended Agent

human review หรือ agent สำหรับงานถัดไป

## Next Steps

1. ตรวจ diff และทดลองดูหน้า `/invalid`, `/expired`, `/failed` และ `/success` ใน browser หากต้องการ visual sign-off
2. หากผ่าน review ให้ผู้ใช้เป็นผู้สั่ง commit/เปิด PR เพิ่มใน PR เดิมตาม workflow
