import type { PaymentChannel } from "@/types/order-payment";

/** โลโก้ + ชื่อ + คำอธิบายของแต่ละช่องทาง — ใช้ร่วมทั้งหน้า order/read และหน้า /pay ฝั่งลูกค้า. */
export const CHANNEL_DISPLAY: Record<
  PaymentChannel,
  { img: string; label: string; caption: string }
> = {
  card: {
    img: "/payment/credit-card-v2.png",
    label: "บัตรเครดิต/เดบิต",
    caption: "Visa, Mastercard, JCB ทุกธนาคาร",
  },
  promptpay: {
    img: "/payment/promptpay-qr-v2.png",
    label: "พร้อมเพย์",
    caption: "สแกน QR จ่ายผ่านแอปธนาคาร",
  },
  installment: {
    img: "/payment/installment-v2.png",
    label: "ผ่อนชำระ",
    caption: "ผ่อน 0% สูงสุด 10 เดือน",
  },
};
