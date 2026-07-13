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
        "mb-4 overflow-hidden rounded-card bg-bg-paper shadow-card",
        className,
      )}
    >
      <header className="flex items-center gap-2 border-b border-[var(--divider)] px-5 py-4">
        <span className="text-primary">{icon}</span>
        <h3 className="font-semibold text-grey-800">{title}</h3>
      </header>
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

interface PayInfoRowProps {
  label: string;
  value: ReactNode;
}

/** แถว label ซ้าย / value ขวา ในการ์ดสรุป. */
export function PayInfoRow({ label, value }: PayInfoRowProps) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <span className="text-grey-600">{label}</span>
      <span className="text-right font-medium text-grey-800">{value}</span>
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
      <div className="bg-gradient-to-r from-primary to-primary-darker px-6 py-6 text-center text-white">
        <span className="mx-auto mb-3 flex size-16 items-center justify-center rounded-full bg-white/20">
          {icon}
        </span>
        <h2 className="text-xl font-bold">{title}</h2>
        <p className="mt-1 text-sm text-primary-lighter">{subtitle}</p>
      </div>
    </div>
  );
}

/** บรรทัดความปลอดภัยท้ายจอ. */
export function PaySecurityNote() {
  return (
    <p className="mt-4 text-center text-xs text-grey-500">
      การชำระเงินถูกเข้ารหัสด้วย TLS 1.3 · PCI-DSS Level 1 Certified
    </p>
  );
}
