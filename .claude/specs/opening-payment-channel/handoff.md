# Handoff: ช่องทางพร้อมเพย์บนหน้าเปิดรายการ
> From: Pi
> To: any
> Date: 2026-09-13

## Task Summary
เพิ่มข้อมูลช่องทางการชำระเงินแบบแสดงอย่างเดียวบนหน้า `/opening` และ `/redirecting` พร้อมปรับ label ในหน้า `/processing` โดยใช้ช่องทางพร้อมเพย์ตามที่ผู้ใช้เลือก ไม่เพิ่มการเลือกหรือการเปลี่ยนช่องทาง

## Current Status
เสร็จสมบูรณ์ — หน้า `/opening`, `/processing` และ `/redirecting` ใช้ label `ช่องทางการชำระเงิน` และ mock session ใช้ `promptpay` เพื่อให้หน้าที่เกี่ยวข้องแสดงข้อมูลสอดคล้องกัน

## Files Changed

- `src/components/pay/screens/link-opening-screen.tsx` — เพิ่มแถวข้อมูลช่องทางการชำระเงินแบบ read-only
- `src/lib/mock/payment-session.ts` — ตั้งช่องทางของ mock session เป็น `promptpay`
- `src/components/pay/screens/processing-screen.tsx` — เปลี่ยน label เป็นช่องทางการชำระเงิน
- `src/components/pay/screens/link-redirecting-screen.tsx` — เพิ่มแถวข้อมูลช่องทางการชำระเงินแบบ read-only
- `.claude/specs/opening-payment-channel/handoff.md` — บันทึก handoff

## Important Decisions

- ใช้ `CHANNEL_DISPLAY[session.channel].label` เป็นแหล่งข้อมูลเดียวกับหน้า `/processing` แทนการ hardcode ข้อความใน component
- คงพฤติกรรม display-only และไม่เพิ่ม interactive control

## Constraints

- ไม่เพิ่ม dependency และไม่เปลี่ยน route หรือ payment flow
- ห้าม commit หรือ push โดยไม่ได้รับคำสั่งจากผู้ใช้

## Tests Run

- `npm test` -> Test Files 1 passed, Tests 7 passed
- `npx tsc --noEmit --incremental false` -> ผ่าน
- `npm run lint` -> ผ่าน
- `npm run build` -> production build ผ่าน, สร้าง routes ครบ 12 รายการ
- `curl http://localhost:5400/opening` -> พบ `ช่องทางการชำระเงิน` และ `พร้อมเพย์`
- viewports: n/a — เปลี่ยนแถวข้อมูลแบบ responsive ที่ใช้ layout เดิม

## Known Issues

- ไม่มี

## Next Recommended Agent

human review หรือ agent สำหรับงานถัดไป

## Next Steps

1. ตรวจ diff และทดลองดูหน้า `/opening` ใน browser หากต้องการ visual sign-off
2. หากผ่าน review ให้ผู้ใช้เป็นผู้สั่ง commit/เปิด PR ตาม workflow
