import { redirect } from "next/navigation";

// "/" ไม่มี surface ของตัวเอง และไม่มี payment token -> ส่งไปหน้า invalid
// แทน /pay เพื่อไม่เปิดเผยข้อมูลสรุปการชำระเงินโดยไม่มีบริบท.
export default function RootPage() {
  redirect("/pay/invalid");
}
