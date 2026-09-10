"use client";

import { useRouter } from "next/navigation";
import {
  Check,
  Download,
  Mail,
  ReceiptText,
  Share2,
} from "lucide-react";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import { formatTHB } from "@/lib/utils";
import { PayInfoRow } from "../pay-section-card";

/** 5 — ผลลัพธ์สำเร็จ. */
export function SuccessScreen() {
  const router = useRouter();
  const session = PAY_SESSION;
  const amount = session.amount;

  return (
    <>
      <div className="py-8 text-center">
        <span className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-success-lighter">
          <Check className="size-12 text-success-dark" strokeWidth={3} />
        </span>
        <h2 className="text-2xl font-medium text-grey-900">ชำระเงินสำเร็จ!</h2>
        <p className="mt-1 text-base text-grey-600">
          Transaction completed successfully
        </p>
      </div>

      <section className="overflow-hidden rounded-card bg-bg-paper shadow-card">
        <div className="bg-gradient-to-r from-success to-success-dark px-6 py-6 text-center text-white">
          <p className="text-base text-success-lighter">ยอดที่ชำระ</p>
          <p className="mt-1 text-3xl font-bold">{formatTHB(amount, 2)}</p>
        </div>

        <div className="space-y-3 px-6 py-5">
          <PayInfoRow label="เลขที่รายการ" value={session.invoiceNo} />
          <PayInfoRow
            label="วันที่/เวลา"
            value={`${session.receipt.paidDate}, ${session.receipt.paidTime}`}
          />
          <PayInfoRow
            label="วิธีชำระ"
            value={CHANNEL_DISPLAY[session.channel].label}
          />
          <PayInfoRow label="ตัวแทน" value={session.merchantName} />
          <PayInfoRow label="ชื่อผู้ชำระ" value={session.payer.name} />
          <PayInfoRow label="รายละเอียด" value={session.serviceType} />
          <PayInfoRow label="Reference" value={session.receipt.transactionId} />
          <PayInfoRow label="หมายเลขอ้างอิง 1" value={session.ref1} />
          <PayInfoRow label="หมายเลขอ้างอิง 2" value={session.ref2} />
          <PayInfoRow
            label="Authorization Code"
            value={session.receipt.authCode}
          />
        </div>

        <div className="grid grid-cols-4 gap-2 border-t border-[var(--divider)] bg-grey-100 px-6 py-4">
          <ActionButton
            icon={ReceiptText}
            label="ใบเสร็จ"
            onClick={() => router.push("/receipt")}
          />
          <ActionButton icon={Download} label="ดาวน์โหลด" />
          <ActionButton icon={Mail} label="ส่งอีเมล" />
          <ActionButton icon={Share2} label="แชร์" />
        </div>
      </section>

      <p className="mt-6 text-center text-base text-grey-500">
        ใบเสร็จจะถูกส่งไปที่อีเมลที่ท่านระบุภายใน 5 นาที
      </p>
    </>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Download;
  label: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1 rounded-lg py-2 text-primary transition-colors hover:bg-primary-lighter/40"
    >
      <Icon className="size-4" />
      <span className="text-base">{label}</span>
    </button>
  );
}
