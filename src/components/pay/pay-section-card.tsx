"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PaySectionCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

/** การ์ดหัวข้อ + เนื้อหา — โครงซ้ำของทุกจอในฝั่ง customer. */
export function PaySectionCard({
  title,
  icon,
  children,
  className,
}: PaySectionCardProps) {
  return (
    <section
      className={cn(
        "mb-4 overflow-hidden rounded-card bg-bg-paper shadow-card md:mb-5",
        className,
      )}
    >
      <header className="flex items-center gap-2 border-b border-[var(--divider)] px-5 py-4 md:px-6 md:py-5">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold text-grey-800">{title}</h3>
      </header>
      <div className="px-5 py-4 md:px-6 md:py-5">{children}</div>
    </section>
  );
}

interface PayInfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

/** แถว label ซ้าย / value ขวา ในการ์ดสรุป. */
export function PayInfoRow({ label, value, className }: PayInfoRowProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 text-base", className)}>
      <span className="min-w-0 flex-1 text-grey-600">{label}</span>
      <span className="min-w-0 max-w-[65%] text-right font-medium text-grey-800 [overflow-wrap:anywhere]">
        {value}
      </span>
    </div>
  );
}

interface PayHeroHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

/** หัวการ์ดไล่เฉดสีน้ำเงิน + ไอคอนวงกลม — ใช้บนจอเลือกรูปแบบ/สรุป/สร้างรายการ. */
export function PayHeroHeader({ icon, title, subtitle }: PayHeroHeaderProps) {
  return (
    <div className="mb-4 overflow-hidden rounded-card bg-bg-paper shadow-card">
      <div className="bg-gradient-to-r from-primary to-primary-darker px-5 py-6 text-center text-white md:px-8 md:py-8">
        <span className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-white/20 md:size-[72px]">
          {icon}
        </span>
        <h2 className="text-xl font-medium md:text-2xl">{title}</h2>
        <p className="mt-1 text-base text-primary-lighter md:text-lg">{subtitle}</p>
      </div>
    </div>
  );
}

/** บรรทัดความปลอดภัยท้ายจอ. */
export function PaySecurityNote() {
  return (
    <p className="mt-4 text-center text-base text-grey-500">
      การชำระเงินถูกเข้ารหัสด้วย TLS 1.3 · PCI-DSS Level 1 Certified
    </p>
  );
}
