"use client";

import { useRouter } from "next/navigation";
import { Check, Info, RefreshCw, Search } from "lucide-react";
import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";
import { cn } from "@/lib/utils";

/** ขั้นตอนที่แสดงใน timeline ระหว่างตรวจสอบผล — ขั้นสุดท้ายคือกำลังดำเนินการ. */
const VERIFY_STEPS = [
  { title: "สร้างรายการ", sub: "Payment created" },
  { title: "ไปยังผู้ให้บริการ", sub: "Redirected" },
  { title: "ดำเนินการชำระเงิน", sub: "Provider processing" },
  { title: "ยืนยันผล", sub: "Backend verification · กำลังดำเนินการ" },
] as const;

/** 4 — จอตรวจสอบผลการชำระเงิน: เดิน timeline ทีละขั้นแล้วพาไปหน้าผลลัพธ์. */
export function ProcessingScreen() {
  const router = useRouter();
  const session = PAY_SESSION;
  // ค้างที่ขั้นสุดท้าย (ยืนยันผล) — ไม่เดินหน้าเอง, รอผู้ใช้กด recheck.
  const index = VERIFY_STEPS.length - 1;
  const remaining = 1;

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

      {/* ความคืบหน้า */}
      <div className="mb-3 rounded-card border border-[var(--divider)] bg-bg-paper p-4 shadow-card">
        <p className="mb-3 text-sm font-bold text-grey-800">ความคืบหน้า</p>
        {VERIFY_STEPS.map((step, i) => {
          const done = i < index;
          const active = i === index;
          const last = i === VERIFY_STEPS.length - 1;
          return (
            <div key={step.title} className="flex gap-3">
              <div className="flex flex-none flex-col items-center">
                <span
                  className={cn(
                    "flex size-[22px] items-center justify-center rounded-full",
                    done && "bg-primary text-white",
                    active && "border-[2.5px] border-primary bg-bg-paper",
                    !done && !active && "border-2 border-grey-300 bg-bg-paper",
                  )}
                >
                  {done ? (
                    <Check className="size-3" strokeWidth={3} />
                  ) : active ? (
                    <span className="size-2 animate-pulse rounded-full bg-primary" />
                  ) : null}
                </span>
                {!last && (
                  <span
                    className={cn(
                      "min-h-5 w-0.5 flex-1",
                      done ? "bg-primary" : "bg-grey-300",
                    )}
                  />
                )}
              </div>
              <div className={cn(!last && "pb-3.5")}>
                <p
                  className={cn(
                    "text-sm",
                    active ? "font-bold text-primary" : "font-semibold text-grey-800",
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    "text-[10.5px]",
                    active ? "text-primary" : "text-grey-400",
                  )}
                >
                  {step.sub}
                </p>
              </div>
            </div>
          );
        })}

        <div className="mt-3 flex items-center justify-center gap-2 text-grey-600">
          <span className="block size-3.5 animate-spin rounded-full border-2 border-grey-300 border-t-primary" />
          <span className="text-xs">
            ตรวจสอบอัตโนมัติอีกครั้งใน{" "}
            <span className="font-semibold tabular-nums text-grey-800">
              {remaining}
            </span>{" "}
            วินาที
          </span>
        </div>
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
