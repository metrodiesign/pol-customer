import type { PaySession, SavedCard } from "@/types/payment-flow";

/** รายการที่ลูกค้าเปิดจาก payment link — จำลอง session เดียวทั้ง flow. */
export const PAY_SESSION: PaySession = {
  channel: "card",
  agentCode: "00098",
  merchantName: "บริษัท ตัวแทน วิริยะประกันภัย จำกัด (มหาชน)",
  merchantId: "MCH-2025-001234",
  merchantTaxId: "0105563001234",
  merchantPhone: "02-129-8888",
  merchantEmail: "contact@viriyah-agent.example",
  serviceType: "ชำระค่าเบี้ยประกันภัย",
  // เลขที่คำสั่งซื้อฝั่ง pol-admin (order ORD6900000002)
  orderNo: "ORD6900000002",
  // รูปแบบเลขที่รายการ: VCP + ปี พ.ศ. 2 หลัก + running 8 หลัก
  invoiceNo: "VCP6900000002",
  // Generate ตามกฎเดียวกับ pol-admin จากกรมธรรม์รายการแรก 00098-69100/กธ/044845-10 (VMI, เลขกรมธรรม์)
  // Ref1 = ตัวแทน(00098)+ปี(69)+สาขา(100)+running(044845)+PolicyType(10) = 18 หลัก
  ref1: "000986910004484510",
  // Ref2 = หน่วยงาน(1)+ประเภทกรมธรรม์ใหม่(02)+ประกันภัยสมัครใจ(2)+สาขา(100)+ตัวแทน(00098)+ผลิตภัณฑ์(000) = 15 หลัก
  ref2: "102210000098000",
  dueAt: "25 มี.ค. 2026 23:59",
  // รายการเดียวกับตะกร้าใน pol-admin (order ORD6900000002) — 4 กรมธรรม์ VMI
  amount: 59871.1,
  policies: [
    {
      docNo: "00098-69100/กธ/044845-10",
      docType: "เลขกรมธรรม์",
      insuredName: "พิมพ์ลภัส เจริญพงษ์",
      coverage: "ประกันภัยรถยนต์ (ภาคสมัครใจ) · 5ขล 3975 กท",
      amount: 25915.01,
    },
    {
      docNo: "00098-69100/กธ/043864-10",
      docType: "เลขกรมธรรม์",
      insuredName: "บริษัท กรีนฟิลด์ อินดัสทรี จำกัด",
      coverage: "ประกันภัยรถยนต์ (ภาคสมัครใจ) · กน 9103 รย",
      amount: 9601.87,
    },
    {
      docNo: "00098-69100/กธ/043863-10",
      docType: "เลขกรมธรรม์",
      insuredName: "Vertex Solutions (Thailand) Co., Ltd.",
      coverage: "ประกันภัยรถยนต์ (ภาคสมัครใจ) · กร 1445 รย",
      amount: 10204.85,
    },
    {
      docNo: "00098-69100/กธ/043861-10",
      docType: "เลขกรมธรรม์",
      insuredName: "บริษัท เมทริกซ์ แคปปิตอล จำกัด",
      coverage: "ประกันภัยรถยนต์ (ภาคสมัครใจ) · กน 9101 รย",
      amount: 14149.37,
    },
  ],
  linkCode: "LNK-A1B2C3",
  expiredAt: "20 ก.พ. 2026, 23:59:59 น.",
  payer: {
    name: "พิมพ์ลภัส เจริญพงษ์",
    phone: "083-043-2701",
    email: "insured14@mail.example",
  },
  // net/อากร/VAT รวมจาก 4 กรมธรรม์ (ตรงกับ Motor-mockup-data.md)
  breakdown: [
    { label: "เบี้ยประกันภัยสุทธิ", amount: 55730.3 },
    { label: "อากรแสตมป์", amount: 224 },
    { label: "ภาษีมูลค่าเพิ่ม (VAT 7%)", amount: 3916.8 },
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
