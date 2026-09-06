"use client";

import { useRouter } from "next/navigation";
import { Info, Lock, RefreshCw, Search } from "lucide-react";
import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

/** 4 — จอตรวจสอบผลการชำระเงิน: ค้างที่ขั้นยืนยันผล, รอผู้ใช้กด recheck. */
export function ProcessingScreen() {
  const router = useRouter();
  const session = PAY_SESSION;

  return (
    <div className="pt-8 pb-4">
      {/* hero spinner */}
      <div className="mb-4 flex justify-center">
        <div className="relative flex size-24 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-primary-lighter [animation:vring_2s_ease-out_infinite]" />
          <span className="absolute size-[86px] animate-spin rounded-full border-4 border-grey-300 border-t-primary" />
          <span className="flex size-[54px] animate-pulse items-center justify-center rounded-full bg-primary-soft text-primary [animation-duration:1.6s]">
            <Search className="size-6" />
          </span>
        </div>
      </div>

      <h1 className="mb-2 text-center text-xl font-bold tracking-tight text-grey-800">
        กำลังตรวจสอบผลการชำระเงิน
      </h1>
      <p className="mx-auto mb-4 max-w-[315px] text-center text-sm leading-relaxed text-grey-600">
        เราได้รับข้อมูลจากหน้าชำระเงินแล้ว และกำลังยืนยันสถานะกับผู้ให้บริการ
      </p>

      {/* caution — ห้ามจ่ายซ้ำ */}
      <div className="mb-3 flex items-center gap-2.5 rounded-control border border-warning-light bg-warning-lighter p-3">
        <Info className="size-4 shrink-0 text-warning-dark" />
        <p className="text-sm font-semibold leading-relaxed text-warning-darker">
          กรุณาอย่าชำระเงินซ้ำในระหว่างการตรวจสอบ
        </p>
      </div>

      {/* สรุปยอด */}
      <div className="mb-3 rounded-card border border-[var(--divider)] bg-bg-paper p-4 shadow-card">
        <div className="flex items-baseline gap-3 border-b border-[var(--divider)] pb-3">
          <span className="flex-1 text-sm text-grey-600">ยอดชำระ</span>
          <span className="text-lg font-bold tabular-nums tracking-tight text-grey-800">
            {formatTHB(session.amount, 2)}
          </span>
        </div>
        <div className="flex gap-3 border-b border-[var(--divider)] py-2.5">
          <span className="flex-1 text-sm text-grey-600">เลขที่รายการ</span>
          <span className="text-sm font-semibold text-grey-800">
            {session.invoiceNo}
          </span>
        </div>
        <div className="flex gap-3 pt-2.5">
          <span className="flex-1 text-sm text-grey-600">วิธีชำระเงิน</span>
          <span className="text-sm font-semibold text-grey-800">
            {CHANNEL_DISPLAY[session.channel].label}
          </span>
        </div>
      </div>

      {/* progress bar (indeterminate) */}
      <div
        role="progressbar"
        aria-label="กำลังตรวจสอบผลการชำระเงิน"
        className="mx-auto my-5 h-1.5 w-[170px] overflow-hidden rounded-full bg-grey-300"
      >
        <div className="h-full w-[34%] rounded-full bg-primary [animation:vbar_1.6s_ease-in-out_infinite]" />
      </div>

      {/* TLS badge */}
      <div className="mb-5 flex items-center justify-center gap-1.5 text-success-dark">
        <Lock className="size-3.5" />
        <span className="text-xs font-semibold">การเชื่อมต่อเข้ารหัสแบบ TLS</span>
      </div>

      <button
        type="button"
        onClick={() => router.push("/pay/success")}
        className="flex min-h-13 w-full items-center justify-center gap-2 rounded-control border-[1.5px] border-primary bg-bg-paper text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        <RefreshCw className="size-4" />
        ตรวจสอบสถานะอีกครั้ง
      </button>
    </div>
  );
}
