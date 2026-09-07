"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

/** 6 — กำลัง redirect ออกไปหน้าผู้ให้บริการ (PSP). */
export function LinkRedirectingScreen() {
  const router = useRouter();
  const session = PAY_SESSION;

  return (
    <div className="flex flex-col items-center pt-8 pb-4 text-center">
      {/* spinner */}
      <div className="relative mb-6 flex size-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-lighter [animation:vring_1.8s_ease-out_infinite]" />
        <span className="absolute size-[84px] animate-spin rounded-full border-4 border-grey-300 border-t-primary [animation-duration:0.85s]" />
        <span className="flex size-[58px] items-center justify-center rounded-full bg-primary text-white">
          <ArrowRight className="size-6" strokeWidth={2.2} />
        </span>
      </div>

      <h1 className="mb-2 text-xl font-bold tracking-tight text-grey-900">
        กำลังเชื่อมต่อผู้ให้บริการชำระเงิน
      </h1>
      <p className="mb-5 text-base font-semibold text-warning-dark">
        กรุณาอย่าปิดหน้าจอนี้
      </p>

      {/* สรุปยอด */}
      <div className="w-full rounded-card border border-[var(--divider)] bg-bg-paper p-4 shadow-card">
        <div className="flex items-baseline gap-3">
          <span className="flex-1 text-left text-base text-grey-600">ยอดชำระ</span>
          <span className="text-lg font-bold tabular-nums tracking-tight text-grey-800">
            {formatTHB(session.amount, 2)}
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-3 border-t border-[var(--divider)] pt-2.5">
          <span className="flex-1 text-left text-base text-grey-600">
            เลขที่รายการ
          </span>
          <span className="text-base font-semibold text-grey-800">
            {session.invoiceNo}
          </span>
        </div>
      </div>

      {/* progress bar (indeterminate) */}
      <div
        role="progressbar"
        aria-label="กำลังเชื่อมต่อ"
        className="my-5 h-1.5 w-[170px] overflow-hidden rounded-full bg-grey-300"
      >
        <div className="h-full w-[34%] rounded-full bg-primary [animation:vbar_1.4s_ease-in-out_infinite]" />
      </div>

      {/* TLS badge */}
      <div className="mb-5 flex items-center gap-1.5 text-success-dark">
        <Lock className="size-3.5" />
        <span className="text-base font-semibold">การเชื่อมต่อเข้ารหัสแบบ TLS</span>
      </div>

      <p className="mb-3 max-w-[300px] text-base leading-relaxed text-grey-500">
        หากหน้าไม่เปิดภายในไม่กี่วินาที กรุณากดปุ่มด้านล่าง
      </p>

      <div className="w-full max-w-[330px]">
        <Button variant="outline" className="h-12 w-full font-semibold">
          เปิดหน้าผู้ให้บริการอีกครั้ง
        </Button>
        <button
          type="button"
          onClick={() => router.push("/pay")}
          className="mt-3 min-h-11 text-base font-semibold text-grey-600 underline"
        >
          ยกเลิกและกลับไปตรวจสอบข้อมูล
        </button>
      </div>
    </div>
  );
}
