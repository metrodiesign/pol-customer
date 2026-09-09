import { redirect } from "next/navigation";

// "/" ไม่มี {token} -> ไม่มีรายการให้แสดง ส่งไปหน้า invalid.
// summary เข้าถึงได้ทางเดียวคือ /{token} ที่ resolve เป็น ok.
export default function PayRootPage() {
  redirect("/invalid");
}
