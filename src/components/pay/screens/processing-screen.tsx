"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PROCESSING_STEPS } from "@/lib/pay/payment-flow";

/** 4 — จอประมวลผล: เดินทีละขั้นวินาทีละครั้ง แล้วพาไปหน้าผลลัพธ์. */
export function ProcessingScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      if (i >= PROCESSING_STEPS.length) {
        clearInterval(id);
        router.push("/pay/success");
        return;
      }
      setIndex(i);
    }, 1000);
    return () => clearInterval(id);
  }, [router]);

  const current = PROCESSING_STEPS[index];

  return (
    <div className="py-16 text-center">
      <div className="relative mb-6 inline-block">
        <div className="size-20 rounded-full border-4 border-primary-lighter" />
        <div className="absolute top-0 left-0 size-20 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-grey-800">
        กำลังดำเนินการ...
      </h3>
      <p className="mb-4 text-sm text-grey-600">กรุณาอย่าปิดหน้านี้</p>
      <p className="mb-6 text-xs text-grey-500" aria-live="polite">
        {current?.message}
      </p>

      <div className="mx-auto max-w-xs">
        <div className="h-2 w-full overflow-hidden rounded-full bg-grey-300">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-1000"
            style={{ width: `${current?.percent ?? 0}%` }}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-grey-500">
          <span>ตรวจสอบ</span>
          <span>เชื่อมต่อ</span>
          <span>ดำเนินการ</span>
          <span>ยืนยัน</span>
        </div>
      </div>
    </div>
  );
}
