// Contract ของ customer payment flow (/pay) — ฝั่งลูกค้าที่เปิดจาก payment link.
// แยกจาก types/order-payment.ts (มุม back-office) เพราะคนละ surface และคนละ lifecycle.

import type { PaymentChannel } from "@/types/order-payment";

/** รายละเอียดรายการที่ลูกค้ากำลังจะจ่าย — มาจาก payment link. */
export interface PaySession {
  /** ช่องทางชำระเงินถูกกำหนดมากับลิงก์แล้ว ลูกค้าเลือกเองไม่ได้. */
  channel: PaymentChannel;
  merchantName: string;
  merchantId: string;
  merchantTaxId: string;
  serviceType: string;
  invoiceNo: string;
  ref1: string;
  ref2: string;
  dueAt: string;          // แสดงตรง ๆ เช่น "25 มี.ค. 2026 23:59"
  amount: number;         // ยอดชำระรวม (บาท) — เท่ากับผลรวม policies
  policies: PolicyLine[];
  linkCode: string;
  expiredAt: string;
  payer: PayerInfo;
  breakdown: ReceiptLine[];
  receipt: ReceiptInfo;
}

/** กรมธรรม์หนึ่งใบในลิงก์ชำระเงิน (ลิงก์เดียวจ่ายได้หลายใบ). */
export interface PolicyLine {
  docNo: string;          // "VMI-2026-004821"
  docType: string;        // "เลขกรมธรรม์" / "เลขรับแจ้ง"
  insuredName: string;
  coverage: string;       // "ประกันภัยรถยนต์ชั้น 1"
  amount: number;         // เบี้ยรวมของกรมธรรม์ใบนี้
}

export interface PayerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface ReceiptLine {
  label: string;
  amount: number;
}

export interface ReceiptInfo {
  receiptNo: string;
  transactionId: string;
  authCode: string;
  paidDate: string;       // "18 กุมภาพันธ์ 2026"
  paidTime: string;       // "14:32:15"
  description: string;
}

export interface SavedCard {
  id: string;
  brand: "visa" | "mastercard";
  last4: string;
  expiry: string;         // "08/28"
  bank: string;
}
