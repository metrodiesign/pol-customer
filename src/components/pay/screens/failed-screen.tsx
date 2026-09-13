"use client";

import {
  CheckCircle2,
  Headset,
  Lightbulb,
  RotateCw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PayScreenFrame } from "@/components/pay/pay-screen-frame";
import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

const TIPS = [
  "ตรวจสอบยอดเงินหรือวงเงินที่ใช้ชำระ",
  "ตรวจสอบข้อมูลการชำระเงินอีกครั้ง",
  "ลองใช้ช่องทางการชำระเงินอื่น",
  "ติดต่อธนาคารหรือฝ่ายสนับสนุนเพื่อขอความช่วยเหลือ",
];

/** 6 — ผลลัพธ์ไม่สำเร็จ. */
export function FailedScreen() {
  const router = useRouter();
  const session = PAY_SESSION;

  return (
    <PayScreenFrame>
      <div className="py-8 text-center">
        {/* วงกลมแดงทึบ — error-lighter (#ffe9d5) เป็นโทนพีช อ่านเหมือน warning จึงไม่ใช้ */}
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-error shadow-error">
          <X className="size-12 text-white" strokeWidth={3} />
        </span>
        <h2 className="text-2xl font-medium text-error-dark">
          การชำระเงินไม่สำเร็จ
        </h2>
        <p className="mt-2 text-base text-grey-600">
          กรุณาตรวจสอบข้อมูลแล้วลองใหม่อีกครั้ง
        </p>
      </div>

      <section className="mb-6 w-full rounded-card border border-[var(--divider)] bg-bg-paper p-4 shadow-card">
        <div className="flex gap-3 border-b border-[var(--divider)] pb-3">
          <span className="flex-1 text-base text-grey-600">เลขที่รายการ</span>
          <span className="text-base font-semibold text-grey-800">
            {session.invoiceNo}
          </span>
        </div>
        <div className="flex gap-3 border-b border-[var(--divider)] py-2.5">
          <span className="flex-1 text-base text-grey-600">
            ช่องทางการชำระเงิน
          </span>
          <span className="text-base font-semibold text-grey-800">
            {CHANNEL_DISPLAY[session.channel].label}
          </span>
        </div>
        <div className="flex items-baseline gap-3 pt-2.5">
          <span className="flex-1 text-base font-semibold text-grey-800">ยอดชำระ</span>
          <span className="font-sans text-xl font-bold tabular-nums tracking-tight text-grey-800">
            {formatTHB(session.amount, 2)}
          </span>
        </div>
      </section>

      <section className="mb-6 rounded-card bg-bg-paper p-5 shadow-card">
        <h4 className="mb-3 flex items-center gap-1 font-semibold text-grey-700">
          <Lightbulb className="size-4 text-warning" />
          แนะนำ
        </h4>
        <ul className="space-y-2 text-base text-grey-600">
          {TIPS.map((tip) => (
            <li key={tip} className="flex items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-grey-400" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <Button
          onClick={() => router.push("/")}
          className="h-14 w-full bg-error text-base font-semibold text-white hover:bg-error-dark"
        >
          <RotateCw className="size-4" />
          ลองใหม่อีกครั้ง
        </Button>
        <Button variant="outline" className="h-14 w-full">
          <Headset className="size-4" />
          ติดต่อฝ่ายสนับสนุน
        </Button>
      </div>
    </PayScreenFrame>
  );
}
