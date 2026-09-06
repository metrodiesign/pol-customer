"use client";

import { useRouter } from "next/navigation";
import { Headset, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayInfoRow } from "../pay-section-card";

/** ลิงก์ไม่ถูกต้อง/หมดสิทธิ์ — ต่างจากหน้าหมดอายุ (เปิดรายการไม่ได้ตั้งแต่ต้น). */
export function LinkInvalidScreen() {
  const router = useRouter();

  return (
    <>
      <div className="py-8 text-center">
        {/* วงจาง ไม่ทึบ — สื่อว่าเปิดไม่ได้ แต่ไม่รุนแรงแบบ error เต็ม */}
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full border border-error-light/60 bg-error-lighter text-error-dark">
          <ShieldAlert className="size-11" strokeWidth={2} />
        </span>
        <h2 className="text-2xl font-bold text-grey-900">
          ไม่สามารถเปิดรายการนี้ได้
        </h2>
        <p className="mt-2 text-sm text-grey-600">Link not available</p>
      </div>

      <section className="mb-6 rounded-card border border-[var(--divider)] bg-bg-paper p-6 shadow-card">
        <div className="mb-4 rounded-control border-l-4 border-error-light bg-error-lighter/50 p-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 size-4 shrink-0 text-error-dark" />
            <div>
              <p className="text-sm text-grey-700">
                ลิงก์ไม่ถูกต้อง หมดอายุ หรือไม่มีสิทธิ์เข้าถึง
              </p>
              <p className="mt-1 font-mono text-xs font-semibold text-grey-500">
                LINK_NOT_AVAILABLE
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <PayInfoRow
            label="รหัสอ้างอิง"
            value={
              <span className="font-mono text-xs font-semibold text-grey-700">
                ERR-LINK-4031
              </span>
            }
          />
        </div>
      </section>

      <div className="mb-6 rounded-control border-l-4 border-grey-300 bg-grey-100 p-4">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 size-4 shrink-0 text-grey-500" />
          <div className="text-sm text-grey-700">
            <p className="font-semibold">เพื่อความปลอดภัย</p>
            <p className="mt-1 text-grey-600">
              กรุณาอย่าส่งต่อหรือเผยแพร่ลิงก์ชำระเงิน
              ลิงก์นี้ใช้ได้เฉพาะผู้รับที่ระบุไว้เท่านั้น
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button className="h-14 w-full text-base font-semibold">
          <Headset className="size-4" />
          ติดต่อผู้ส่งลิงก์
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/pay")}
          className="h-12 w-full"
        >
          กลับไปยังหน้าแรก
        </Button>
      </div>
    </>
  );
}
