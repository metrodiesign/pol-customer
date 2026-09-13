# Requirements: Responsive Customer Payment Layout

> Status: approved 2026-09-13

ปรับปรุง customer payment surface ให้รองรับ Mobile, Tablet และ Desktop โดยคงข้อมูล เส้นทาง และพฤติกรรมการชำระเงินเดิมไว้

## ขอบเขตและคำจำกัดความ

- Mobile: viewport กว้างน้อยกว่า `768px`
- Tablet: viewport กว้างตั้งแต่ `768px` ถึงน้อยกว่า `1200px`
- Desktop: viewport กว้างตั้งแต่ `1200px` ขึ้นไป
- Acceptance viewports: `375px`, `768px` และ `1440px`
- Payment screens ในขอบเขต: summary, opening, processing, redirecting, success, receipt, failed, expired และ invalid

## REQ-1: Viewport-safe payment surface

**User Story:** ในฐานะผู้ชำระเงิน ฉันต้องการเห็นข้อมูลและปุ่มทั้งหมดครบในอุปกรณ์ของฉัน เพื่อให้ชำระเงินหรือตรวจสอบสถานะได้โดยไม่ต้องเลื่อนแนวนอน

**Acceptance Criteria (EARS):**

- 1.1 THE SYSTEM SHALL render every payment screen at `375px`, `768px` และ `1440px` โดยค่า `document.documentElement.scrollWidth` ไม่มากกว่า `document.documentElement.clientWidth`
- 1.2 THE SYSTEM SHALL keep every visible payment action and essential content within the rendered content area โดยไม่ตัดขอบหรือซ่อนพ้น viewport
- 1.3 IF a payment value is longer than the available content column THEN THE SYSTEM SHALL wrap the value or break it at a safe boundary โดยไม่ทำให้เกิด horizontal overflow

## REQ-2: Responsive shell sizing

**User Story:** ในฐานะผู้ชำระเงิน ฉันต้องการให้พื้นที่ใช้งานมีขนาดเหมาะกับหน้าจอ เพื่อให้ข้อมูลไม่แคบเกินไปบน Tablet และไม่ถูกยืดกว้างเกินไปบน Desktop

**Acceptance Criteria (EARS):**

- 2.1 WHEN viewport width is less than `768px` THE SYSTEM SHALL render the payment shell as a single column with horizontal content padding of at least `16px`
- 2.2 WHEN viewport width is from `768px` to less than `1200px` THE SYSTEM SHALL center the payment shell with a maximum content width of `720px` and horizontal content padding of at least `32px`
- 2.3 WHEN viewport width is at least `1200px` THE SYSTEM SHALL center the payment shell with a maximum outer content width of `1200px` and horizontal content padding of at least `40px`
- 2.4 WHEN viewport width is from `768px` to less than `1200px` THE SYSTEM SHALL keep payment content in a single readable column rather than placing sections side by side

## REQ-3: Desktop summary layout

**User Story:** ในฐานะผู้ชำระเงิน ฉันต้องการตรวจสอบรายละเอียดและตัดสินใจชำระเงินได้ง่ายบน Desktop เพื่อให้ไม่ต้องอ่านข้อมูลยาวต่อเนื่องเป็นคอลัมน์เดียว

**Acceptance Criteria (EARS):**

- 3.1 WHEN viewport width is at least `1200px` THE SYSTEM SHALL arrange the summary screen into a detail column and a payment-decision column
- 3.2 WHEN viewport width is at least `1200px` THE SYSTEM SHALL keep the payment-decision column at a usable minimum width of `320px`
- 3.3 WHEN viewport width is less than `1200px` THE SYSTEM SHALL render summary sections, channel selection information, consent and the payment action in one logical vertical order
- 3.4 THE SYSTEM SHALL preserve the existing summary data order and payment action behavior at every supported viewport

## REQ-4: Readable status and receipt screens

**User Story:** ในฐานะผู้ชำระเงิน ฉันต้องการให้หน้าสถานะ ผลลัพธ์ และใบเสร็จอ่านง่ายบนหน้าจอใหญ่ เพื่อให้ข้อมูลสำคัญยังอยู่ในลำดับที่เข้าใจได้

**Acceptance Criteria (EARS):**

- 4.1 WHEN viewport width is at least `768px` THE SYSTEM SHALL keep status and result screens centered within a readable content width no greater than `720px`
- 4.2 WHEN viewport width is at least `768px` THE SYSTEM SHALL render receipt content within a readable document width no greater than `880px`
- 4.3 WHEN viewport width is at least `768px` THE SYSTEM SHALL place receipt action buttons in one horizontal row while keeping each button keyboard accessible
- 4.4 THE SYSTEM SHALL preserve the receipt content hierarchy and print action behavior at every supported viewport

## REQ-5: Responsive brand header

**User Story:** ในฐานะผู้ชำระเงิน ฉันต้องการเห็น branding ของวิริยะชัดเจนและไม่ล้นจอบนอุปกรณ์ทุกขนาด เพื่อให้มั่นใจว่ากำลังใช้งานหน้าชำระเงินที่ถูกต้อง

**Acceptance Criteria (EARS):**

- 5.1 THE SYSTEM SHALL display the Viriyah logo and fairness tagline within the header at every supported viewport
- 5.2 WHEN viewport width is less than `768px` THE SYSTEM SHALL keep the logo and tagline visually centered together without horizontal overflow
- 5.3 WHEN viewport width is at least `768px` THE SYSTEM SHALL align header branding within the same maximum outer content width as the payment shell

## REQ-6: Accessible and backward-compatible responsive behavior

**User Story:** ในฐานะผู้ชำระเงินทุกคน ฉันต้องการใช้หน้าชำระเงินด้วยคีย์บอร์ดและพบพฤติกรรมเดิม เพื่อให้การปรับ responsive ไม่ลดความสามารถในการใช้งาน

**Acceptance Criteria (EARS):**

- 6.1 THE SYSTEM SHALL preserve all existing payment routes, displayed session data and navigation outcomes
- 6.2 THE SYSTEM SHALL keep every interactive payment control reachable by keyboard at every supported viewport
- 6.3 THE SYSTEM SHALL display a visible focus indicator for the currently keyboard-focused interactive control
- 6.4 IF a responsive desktop layout cannot satisfy its minimum column widths THEN THE SYSTEM SHALL fall back to the single-column layout without clipping content

## Edge Cases & Open Questions

- ยืนยันขอบเขตเป็นทุก payment screen และ shared customer header ตามคำขอ
- ยืนยัน breakpoint และ layout strategy ตามคำแนะนำ: Mobile คง single-column, Tablet เป็น single-column กว้างขึ้น และ Desktop ใช้ two-column เฉพาะ summary; receipt ขยายเป็น document width และจัด action เป็นแนวนอน
- ไม่รวมการเปลี่ยน business logic, payment API, session data, copy, route หรือการเพิ่ม dependency ใหม่
- การตรวจ visual ใน target runtime และการวัด viewport จริงจะทำใน design/implementation phase
