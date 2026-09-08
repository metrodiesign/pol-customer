# Bugfix: ปรับขนาดการแสดงผล DB Sathorn X

> Status: approved 2026-09-08

แก้การแสดงผล DB Sathorn X ให้มีขนาดตัวอักษรที่อ่านได้สม่ำเสมอทั่วทั้งเว็บไซต์ รวมหน้า `/pay` และหน้า admin โดยไม่ขยาย spacing ของ layout แบบเหมารวม

## Current Behavior (Defect)

WHEN หน้าเว็บไซต์ที่ใช้ DB Sathorn X แสดงข้อความปกติที่ `font-size` เดิม THEN ตัวอักษรมีขนาดที่มองเห็นเล็กกว่าฟอนต์ sans-serif มาตรฐานอย่างชัดเจน แม้ CSS token จะถูกขยายเป็นช่วง 16–20px แล้ว

Root cause ที่ยืนยันแล้วคือ DB Sathorn X มี `x-height` ประมาณ `292/1000 = 29.2%` ของ `em` แต่ `src/app/globals.css` ยังไม่มีการปรับขนาดตาม x-height จึงใช้ขนาด glyph ที่เล็กเมื่อเทียบกับฟอนต์ทั่วไป

## Expected Behavior

- F1  WHEN ข้อความปกติบนหน้าใด ๆ รวม `/pay` ใช้ DB Sathorn X THE SYSTEM SHALL normalize ขนาดการแสดงผลตาม x-height ที่ `0.5` เพื่อให้ความสูงตัวอักษรที่มองเห็นเหมาะสมกับขนาด CSS เดิม
- F2  THE SYSTEM SHALL apply the normalization globally through the shared typography layer so all current and future DB Sathorn X text receives the same adjustment

- F4  WHEN the root font size is at its default 16px THE SYSTEM SHALL render shared base text at 18px through the `text-base` typography token
- F5  WHEN any text, identifier, or number renders under `/pay` THE SYSTEM SHALL use DB Sathorn X, including values that were previously assigned a monospace face
- F6  WHEN `/pay/receipt` renders THE SYSTEM SHALL omit the logo, `Central Payment Gateway`, payment amount summary, and success badge while retaining receipt details and actions

## Unchanged Behavior

- B1  WHEN หน้าใด ๆ แสดงข้อความปกติ THE SYSTEM SHALL CONTINUE to use DB Sathorn X เป็น font family หลัก
- B2  WHEN ข้อความนอก `/pay` ใช้ `text-data` หรือ font แบบ monospace THE SYSTEM SHALL CONTINUE to use IBM Plex Mono สำหรับ machine identifiers และข้อมูลเชิงเทคนิค
- B3  WHEN ผู้ใช้ปรับ font-size ใน settings THE SYSTEM SHALL CONTINUE to apply and persist the selected root font size from 14px through 20px
- B4  WHEN ผู้ใช้เปิดหน้า `/pay` THE SYSTEM SHALL CONTINUE to render payment content, flow, spacing structure, and actions โดยไม่เปลี่ยน business logic
- B5  THE SYSTEM SHALL NOT restore the removed Google body-font switcher or alter the shipped DB Sathorn X font files
