import { Suspense } from "react";
import { PayShell } from "@/components/pay/pay-shell";

// Standalone shell — หน้านี้เป็น public customer surface ที่เปิดจาก payment link
// จึงไม่ผ่าน MinimalsLayout (ไม่มี sidebar/topbar ของ back-office).
export default function PayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-svh bg-grey-200 font-sans">
      <Suspense>
        <PayShell>{children}</PayShell>
      </Suspense>
    </div>
  );
}
