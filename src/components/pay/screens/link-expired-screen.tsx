"use client";

import { Clock, Headset, Lightbulb, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayScreenFrame } from "@/components/pay/pay-screen-frame";
import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

export function LinkExpiredScreen() {
  const session = PAY_SESSION;

  return (
    <PayScreenFrame>
      <div className="py-8 text-center">
        {/* หมดอายุ = warning ไม่ใช่ error — ส้มทึบ อ่านออกทันทีเหมือนจอไม่สำเร็จ */}
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-warning shadow-warning">
          <Clock className="size-12 text-white" strokeWidth={2.5} />
        </span>
        <h2 className="text-2xl font-medium text-warning-dark">
          ลิงก์ชำระเงินหมดอายุแล้ว
        </h2>
        <p className="mt-2 text-base font-semibold text-warning-dark">
          {session.expiredAt}
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

      <div className="mb-6 rounded-control border-l-4 border-warning bg-warning/10 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning-dark" />
          <div className="text-base text-warning-dark">
            <p className="font-semibold">ต้องการชำระเงินใช่ไหม?</p>
            <p className="mt-1 text-warning-dark/80">
              กรุณาติดต่อตัวแทนเพื่อขอลิงก์ชำระเงินใหม่
              หรือติดต่อฝ่ายสนับสนุนเพื่อขอความช่วยเหลือ
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <Button className="h-14 w-full bg-warning text-base font-semibold text-white hover:bg-warning-dark">
          <Store className="size-4" />
          ติดต่อตัวแทน
        </Button>
        <Button variant="outline" className="h-14 w-full">
          <Headset className="size-4" />
          ติดต่อฝ่ายสนับสนุน
        </Button>
      </div>
    </PayScreenFrame>
  );
}
