"use client";

import { useRouter } from "next/navigation";
import { Headset, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayScreenFrame } from "@/components/pay/pay-screen-frame";

/** ลิงก์ไม่พร้อมใช้งาน — ใช้ข้อความที่เข้าใจง่ายสำหรับลูกค้า. */
export function LinkInvalidScreen() {
  const router = useRouter();

  return (
    <PayScreenFrame>
      <div className="py-8 text-center">
        {/* วงจาง ไม่ทึบ — สื่อว่าเปิดไม่ได้ แต่ไม่รุนแรงแบบ error เต็ม */}
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full border border-error-light/60 bg-error-lighter text-error-dark">
          <ShieldAlert className="size-11" strokeWidth={2} />
        </span>
        <h2 className="text-2xl font-medium text-grey-900">
          ขออภัย ไม่พบรายการชำระเงิน
        </h2>
        <p className="mt-2 text-base text-grey-600">
          กรุณาตรวจสอบลิงก์ชำระเงินอีกครั้ง
        </p>
      </div>

      <section className="mb-6 rounded-card border border-[var(--divider)] bg-bg-paper p-6 shadow-card">
        <div className="rounded-control border-l-4 border-error-light bg-error-lighter/50 p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-error-dark" />
            <div>
              <p className="text-base text-grey-700">
                ไม่สามารถเปิดรายการชำระเงินจากลิงก์นี้ได้
              </p>
              <p className="mt-1 text-base text-grey-600">
                กรุณาตรวจสอบลิงก์อีกครั้ง หรือติดต่อผู้ส่งเพื่อขอลิงก์ใหม่
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mb-6 rounded-control border-l-4 border-grey-300 bg-grey-100 p-4">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 size-4 shrink-0 text-grey-500" />
          <div className="text-base text-grey-700">
            <p className="font-semibold">คำแนะนำเพื่อความปลอดภัย</p>
            <p className="mt-1 text-grey-600">
              โปรดเปิดลิงก์ที่ได้รับจากผู้ส่งโดยตรง และอย่าเผยแพร่ลิงก์ชำระเงิน
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="h-14 w-full text-base font-semibold">
          <Headset className="size-4" />
          ติดต่อตัวแทน
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="h-12 w-full"
        >
          กลับไปยังหน้าแรก
        </Button>
      </div>
    </PayScreenFrame>
  );
}
