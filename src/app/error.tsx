"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ErrorScreen } from "@/components/error/error-screen";

// root error boundary — จับ runtime error จากทุก segment ใต้ root layout
export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorScreen title="เกิดข้อผิดพลาด" message="ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง">
      <Button type="button" onClick={reset} className="h-12 w-full">
        ลองอีกครั้ง
      </Button>
    </ErrorScreen>
  );
}
