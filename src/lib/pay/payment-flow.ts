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
