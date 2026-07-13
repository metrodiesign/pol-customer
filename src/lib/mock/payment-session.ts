import type { PaySession, SavedCard } from "@/types/payment-flow";

/** รายการที่ลูกค้าเปิดจาก payment link — จำลอง session เดียวทั้ง flow. */
export const PAY_SESSION: PaySession = {
  channel: "card",
  merchantName: "บริษัท ตัวแทน วิริยะประกันภัย จำกัด (มหาชน)",
  merchantId: "MCH-2025-001234",
  merchantTaxId: "0105563001234",
  serviceType: "ชำระค่าเบี้ยประกันภัย",
  // รูปแบบเลขที่รายการ: VCP + ปี พ.ศ. 2 หลัก + running 8 หลัก
  invoiceNo: "VCP6900000891",
  ref1: "REF1-2026-04821",
  ref2: "REF2-2026-09153",
  dueAt: "25 มี.ค. 2026 23:59",
  amount: 13428.5,
  policies: [
    {
      docNo: "VMI-2026-004821",
      docType: "เลขกรมธรรม์",
      insuredName: "นายสมชาย รักดี",
      coverage: "ประกันภัยรถยนต์ชั้น 1 · กบ 8891 กรุงเทพมหานคร",
      amount: 12783.5,
    },
    {
      docNo: "CMI-2026-009153",
      docType: "เลขกรมธรรม์",
      insuredName: "นายสมชาย รักดี",
      coverage: "พ.ร.บ. คุ้มครองผู้ประสบภัยจากรถ",
      amount: 1290.21,
    },
  ],
  linkCode: "LNK-A1B2C3",
  expiredAt: "20 ก.พ. 2026, 23:59:59 น.",
  payer: {
    name: "นายสมชาย รักดี",
    phone: "098-765-4321",
    email: "somchai@email.com",
  },
  breakdown: [
    { label: "เบี้ยประกันภัยสุทธิ", amount: 12500 },
    { label: "อากรแสตมป์", amount: 50 },
    { label: "ภาษีมูลค่าเพิ่ม (VAT 7%)", amount: 878.5 },
  ],
  receipt: {
    receiptNo: "RCP-20260218-001",
    transactionId: "TXN-20260218-ABC123",
    authCode: "AUTH-839201",
    paidDate: "18 กุมภาพันธ์ 2026",
    paidTime: "14:32:15",
    description: "เบี้ยประกันภัยรถยนต์ชั้น 1",
  },
};

export const SAVED_CARDS: SavedCard[] = [
  {
    id: "card-1",
    brand: "visa",
    last4: "4532",
    expiry: "08/28",
    bank: "ธ.กสิกรไทย",
  },
  {
    id: "card-2",
    brand: "mastercard",
    last4: "8901",
    expiry: "12/27",
    bank: "ธ.ไทยพาณิชย์",
  },
];
