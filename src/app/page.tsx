import { redirect } from "next/navigation";

// "/" ไม่มี surface ของตัวเอง -> ส่งไป customer pay flow (/pay).
export default function RootPage() {
  redirect("/pay");
}
