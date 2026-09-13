import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PayScreenFrameProps {
  variant?: "narrow" | "document";
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<PayScreenFrameProps["variant"]>, string> = {
  narrow: "max-w-[720px]",
  document: "max-w-[880px]",
};

/** จำกัดความกว้างของหน้าจอที่ควรอ่านเป็นคอลัมน์เดียวบนจอใหญ่. */
export function PayScreenFrame({
  variant = "narrow",
  children,
  className,
}: PayScreenFrameProps) {
  return (
    <div className={cn("mx-auto w-full", VARIANT_CLASSES[variant], className)}>
      {children}
    </div>
  );
}
