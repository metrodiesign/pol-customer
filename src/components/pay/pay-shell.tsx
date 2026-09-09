"use client";

import { useSearchParams } from "next/navigation";
import { PayTopNav } from "./pay-top-nav";

/** โครงหน้าฝั่งลูกค้า — top nav; ?embed=1 ซ่อนเมื่อฝังใน iframe. */
export function PayShell({ children }: { children: React.ReactNode }) {
  const embed = useSearchParams().get("embed") === "1";

  return (
    <>
      {!embed && <PayTopNav />}

      <main className="mx-auto max-w-lg px-4 py-6">{children}</main>
    </>
  );
}
