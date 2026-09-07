"use client";

import {
  AlertCircle,
  CheckCircle2,
  Headset,
  Lightbulb,
  RotateCw,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { PayInfoRow } from "../pay-section-card";

const TIPS = [
  "ตรวจสอบวงเงินคงเหลือในบัตร",
  "ลองชำระด้วยบัตรใบอื่น",
  "ชำระผ่าน PromptPay QR แทน",
  "ติดต่อธนาคารผู้ออกบัตรเพื่อตรวจสอบ",
];

/** 6 — ผลลัพธ์ไม่สำเร็จ. */
export function FailedScreen() {
  const router = useRouter();
  const session = PAY_SESSION;

  return (
    <>
      <div className="py-8 text-center">
        {/* วงกลมแดงทึบ — error-lighter (#ffe9d5) เป็นโทนพีช อ่านเหมือน warning จึงไม่ใช้ */}
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-error shadow-error">
          <X className="size-12 text-white" strokeWidth={3} />
        </span>
        <h2 className="text-2xl font-bold text-error-dark">ชำระเงินไม่สำเร็จ</h2>
        <p className="mt-2 text-base text-grey-600">Transaction failed</p>
      </div>

      <section className="mb-4 rounded-card border border-error/30 bg-bg-paper p-6 shadow-card">
        <div className="mb-4 rounded-control border-l-4 border-error bg-error/10 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-error" />
            <div>
              <p className="font-semibold text-error-dark">
                สาเหตุ: วงเงินไม่เพียงพอ
              </p>
              <p className="mt-1 text-base text-error-dark/80">
                กรุณาตรวจสอบวงเงินในบัตรของท่าน หรือติดต่อธนาคารผู้ออกบัตร
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <PayInfoRow
            label="Error Code"
            value={
              <span className="font-mono text-base font-semibold text-error">
                INSUFFICIENT_FUNDS
              </span>
            }
          />
          <PayInfoRow label="Reference" value="ERR-20260218-XYZ" />
          <PayInfoRow
            label="เวลา"
            value={`${session.receipt.paidDate}, 14:32:18`}
          />
        </div>
      </section>

      <section className="mb-6 rounded-card bg-bg-paper p-5 shadow-card">
        <h4 className="mb-3 flex items-center gap-1 font-semibold text-grey-700">
          <Lightbulb className="size-4 text-warning" />
          แนะนำ
        </h4>
        <ul className="space-y-2 text-base text-grey-600">
          {TIPS.map((tip) => (
            <li key={tip} className="flex gap-2">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-grey-400" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-3">
        <Button
          onClick={() => router.push("/pay")}
          className="h-14 w-full bg-error text-base font-semibold text-white hover:bg-error-dark"
        >
          <RotateCw className="size-4" />
          ลองใหม่อีกครั้ง
        </Button>
        <Button variant="outline" className="h-12 w-full">
          <Headset className="size-4" />
          ติดต่อฝ่ายสนับสนุน
        </Button>
      </div>
    </>
  );
}
