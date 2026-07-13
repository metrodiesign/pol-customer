"use client";

import { Clock, Headset, Info, Lightbulb, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";
import { PayInfoRow } from "../pay-section-card";

export function LinkExpiredScreen() {
  const session = PAY_SESSION;

  return (
    <>
      <div className="py-8 text-center">
        {/* หมดอายุ = warning ไม่ใช่ error — ส้มทึบ อ่านออกทันทีเหมือนจอไม่สำเร็จ */}
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-warning shadow-warning">
          <Clock className="size-12 text-white" strokeWidth={2.5} />
        </span>
        <h2 className="text-2xl font-bold text-warning-dark">ลิงก์หมดอายุแล้ว</h2>
        <p className="mt-2 text-sm text-grey-600">Payment Link has expired</p>
      </div>

      <section className="mb-6 rounded-card border border-warning/40 bg-bg-paper p-6 shadow-card">
        <div className="mb-4 rounded-control border-l-4 border-warning bg-warning/10 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-warning-dark" />
            <div>
              <p className="text-sm text-warning-dark/80">
                ลิงก์ชำระเงินนี้หมดอายุแล้วเมื่อ
              </p>
              <p className="mt-1 font-semibold text-warning-dark">
                {session.expiredAt}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <PayInfoRow
            label="Link Code"
            value={
              <span className="font-mono text-xs font-semibold text-warning-dark">
                {session.linkCode}
              </span>
            }
          />
          <PayInfoRow label="ร้านค้า" value={session.merchantName} />
          <PayInfoRow label="ยอดชำระ" value={formatTHB(session.amount, 2)} />
        </div>
      </section>

      <div className="mb-6 rounded-control border-l-4 border-warning bg-warning/10 p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-warning-dark" />
          <div className="text-sm text-warning-dark">
            <p className="font-semibold">ต้องการชำระเงิน?</p>
            <p className="mt-1 text-warning-dark/80">
              กรุณาติดต่อร้านค้าเพื่อขอลิงก์ชำระเงินใหม่
              หรือติดต่อฝ่ายสนับสนุนเพื่อขอความช่วยเหลือ
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="h-14 w-full bg-warning text-base font-semibold text-white hover:bg-warning-dark">
          <Store className="size-4" />
          ติดต่อร้านค้า
        </Button>
        <Button variant="outline" className="h-12 w-full">
          <Headset className="size-4" />
          ติดต่อฝ่ายสนับสนุน
        </Button>
      </div>
    </>
  );
}
