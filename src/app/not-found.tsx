import type { Metadata } from "next";
import { ErrorScreen } from "@/components/error/error-screen";

export const metadata: Metadata = { title: "ไม่พบหน้า | Central Payment Gateway" };

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      title="ไม่พบหน้าที่ต้องการ"
      message="หน้าที่คุณเรียกอาจถูกย้ายหรือลบไปแล้ว หากมาจากลิงก์ชำระเงิน กรุณาเปิดลิงก์อีกครั้ง"
    />
  );
}
