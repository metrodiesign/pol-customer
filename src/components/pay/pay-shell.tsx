"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { PayTopNav } from "./pay-top-nav";

/** ลิงก์ของแต่ละหน้าใน flow — เปิดตรง ๆ ได้ทุกหน้า. */
const PAY_LINKS = [
  { href: "/pay/opening", label: "0.กำลังเปิด" },
  { href: "/pay", label: "1B.สรุป+ชำระ" },
  { href: "/pay/redirecting", label: "6.เชื่อมต่อ PSP" },
  { href: "/pay/processing", label: "4.Processing" },
  { href: "/pay/success", label: "5.สำเร็จ" },
  { href: "/pay/failed", label: "6.ไม่สำเร็จ" },
  { href: "/pay/receipt", label: "7.ใบเสร็จ" },
  { href: "/pay/expired", label: "8.หมดอายุ" },
  { href: "/pay/invalid", label: "9.ลิงก์ไม่ถูกต้อง" },
];

/** โครงหน้าฝั่งลูกค้า — top nav + demo nav; ?embed=1 ซ่อนทั้งสอง (ฝังใน iframe). */
export function PayShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const embed = useSearchParams().get("embed") === "1";

  return (
    <>
      {!embed && <PayTopNav />}

      <main className={cn("mx-auto max-w-lg px-4 py-6", !embed && "pb-32")}>
        {children}
      </main>

      {!embed && (
        <nav className="fixed inset-x-0 bottom-0 z-50 bg-grey-900 px-4 py-2.5 text-white">
          <p className="mb-1.5 text-center text-base text-grey-500">
            Demo Navigation — Customer Payment Flow ({PAY_LINKS.length} หน้า)
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {PAY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={cn(
                  "rounded px-2.5 py-1 text-base transition-colors",
                  pathname === link.href
                    ? "bg-primary text-white"
                    : "bg-grey-700 text-grey-100 hover:bg-grey-600",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
