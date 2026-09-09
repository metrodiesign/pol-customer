// Pure domain logic ของ customer payment flow — ไม่มี React, test ได้ตรง ๆ.
// แยกจาก presentation ตาม ARCHITECTURE.md (formatter/สูตร ห้ามฝังใน view).

/** ขั้นตอนหลอกตอน processing — 1 ขั้น/วินาที แล้วจบที่หน้าสำเร็จ. */
export const PROCESSING_STEPS = [
  { message: "กำลังตรวจสอบข้อมูลบัตร...", percent: 20 },
  { message: "กำลังตรวจสอบ Fraud...", percent: 40 },
  { message: "กำลังเชื่อมต่อกับธนาคาร...", percent: 60 },
  { message: "กำลังดำเนินการชำระเงิน...", percent: 80 },
  { message: "กำลังยืนยันผลการชำระเงิน...", percent: 100 },
] as const;

/** จ่ายได้ต่อเมื่อ: ยอด > 0 + ยอมรับเงื่อนไข (ช่องทางมากับลิงก์แล้ว ไม่ต้องเลือก). */
export function canProceedToPayment(input: {
  amount: number;
  acceptedTerms: boolean;
}): boolean {
  return input.amount > 0 && input.acceptedTerms;
}

/** สถานะของ payment link ที่ resolve จาก token ใน /pay/{token}. */
export type PayTokenStatus = "ok" | "invalid" | "expired" | "failed";

// token = UUID/GUID ที่เป็น PK ของ SQL Server (uniqueidentifier) — case-insensitive.
const UUID_FORMAT =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

// mock link store — seam สำหรับต่อ BFF จริงทีหลัง (แทนที่ตารางนี้ด้วยการ lookup ตาม PK).
// UUID demo ที่ map ไปสถานะพิเศษ; UUID รูปแบบถูกต้องอื่น ๆ ถือว่า ok.
const SEEDED_TOKEN_STATUS: Record<string, PayTokenStatus> = {
  "00000000-0000-0000-0000-000000000e11": "expired",
  "00000000-0000-0000-0000-0000000fa11e": "failed",
};

/** resolve token (UUID) ของ payment link เป็นสถานะ; ไม่ใช่ UUID -> "invalid". */
export function resolvePayTokenStatus(token: string): PayTokenStatus {
  const t = (token ?? "").trim().toLowerCase();
  if (!UUID_FORMAT.test(t)) return "invalid";
  return SEEDED_TOKEN_STATUS[t] ?? "ok";
}
