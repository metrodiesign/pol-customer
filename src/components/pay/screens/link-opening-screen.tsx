"use client";

import { Lock, ShieldCheck } from "lucide-react";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

/** 0 — จอโหลดแรก: ตรวจสอบลิงก์/ความปลอดภัยก่อนเปิดรายการ. */
export function LinkOpeningScreen() {
  const session = PAY_SESSION;

  return (
    <div className="flex flex-col items-center pt-8 pb-4 text-center">
      {/* spinner */}
      <div className="relative mb-6 flex size-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary-lighter [animation:vring_2s_ease-out_infinite]" />
        <span className="absolute size-[86px] animate-spin rounded-full border-4 border-grey-300 border-t-primary" />
        <span className="flex size-[54px] animate-pulse items-center justify-center rounded-full bg-primary-soft text-primary [animation-duration:1.6s]">
          <ShieldCheck className="size-6" />
        </span>
      </div>

      <h1 className="mb-2 text-xl font-bold tracking-tight text-grey-900">
        กำลังเปิดรายการชำระเงิน
      </h1>
      <p className="mb-5 max-w-[290px] text-sm leading-relaxed text-grey-600">
        ระบบกำลังตรวจสอบลิงก์และความปลอดภัยของรายการ
      </p>

      {/* สรุปยอด */}
      <div className="w-full rounded-card border border-[var(--divider)] bg-bg-paper p-4 shadow-card">
        <div className="flex items-baseline gap-3">
          <span className="flex-1 text-left text-sm text-grey-600">ยอดชำระ</span>
          <span className="text-lg font-bold tabular-nums tracking-tight text-grey-800">
            {formatTHB(session.amount, 2)}
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-3 border-t border-[var(--divider)] pt-2.5">
          <span className="flex-1 text-left text-sm text-grey-600">
            เลขที่รายการ
          </span>
          <span className="text-sm font-semibold text-grey-800">
            {session.invoiceNo}
          </span>
        </div>
      </div>

      {/* progress bar (indeterminate) */}
      <div
        role="progressbar"
        aria-label="กำลังตรวจสอบลิงก์"
        className="my-5 h-1.5 w-[170px] overflow-hidden rounded-full bg-grey-300"
      >
        <div className="h-full w-[34%] rounded-full bg-primary [animation:vbar_1.6s_ease-in-out_infinite]" />
      </div>

      {/* TLS badge */}
      <div className="flex items-center gap-1.5 text-success-dark">
        <Lock className="size-3.5" />
        <span className="text-xs font-semibold">การเชื่อมต่อเข้ารหัสแบบ TLS</span>
      </div>
    </div>
  );
}
