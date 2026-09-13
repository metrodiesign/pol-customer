"use client";

import { useSearchParams } from "next/navigation";
import { PayTopNav } from "./pay-top-nav";

/** โครงหน้าฝั่งลูกค้า — top nav; ?embed=1 ซ่อนเมื่อฝังใน iframe. */
export function PayShell({ children }: { children: React.ReactNode }) {
  const embed = useSearchParams().get("embed") === "1";

  return (
    <>
      {!embed && <PayTopNav />}

      <main className="mx-auto w-full max-w-lg px-4 py-6 md:max-w-[720px] md:px-8 md:py-8 mlg:max-w-[1200px] mlg:px-10 mlg:py-10">{children}</main>
    </>
  );
}
