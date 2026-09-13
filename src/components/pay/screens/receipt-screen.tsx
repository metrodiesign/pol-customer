"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayScreenFrame } from "@/components/pay/pay-screen-frame";
import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

/** 7 — ใบเสร็จอิเล็กทรอนิกส์. */
export function ReceiptScreen() {
  const router = useRouter();
  const session = PAY_SESSION;

  return (
    <PayScreenFrame variant="document">
      <section className="overflow-hidden rounded-card bg-bg-paper shadow-z16">
        <header className="border-b border-dashed border-[var(--divider)] px-6 py-6 text-center">
          <p className="text-base font-medium text-grey-800">
            ใบเสร็จรับเงินอิเล็กทรอนิกส์
          </p>
          <p className="mt-1 text-base text-grey-600">
            รายการชำระเงินของคุณเสร็จสมบูรณ์
          </p>
        </header>

        <div className="px-6 py-5">
          <p className="mb-2 font-semibold text-grey-700">ข้อมูลธุรกรรม</p>
          <dl className="space-y-2.5 text-base">
            <ReceiptRow label="เลขที่รายการ" value={session.invoiceNo} />
            <ReceiptRow label="ประเภทบริการ" value={session.serviceType} />
            <ReceiptRow label="หมายเลขอ้างอิง 1" value={session.ref1} />
            <ReceiptRow label="หมายเลขอ้างอิง 2" value={session.ref2} />
            <ReceiptRow label="วันที่ชำระ" value={session.receipt.paidDate} />
            <ReceiptRow label="เวลา" value={`${session.receipt.paidTime} น.`} />
            <ReceiptRow
              label="ช่องทางการชำระเงิน"
              value={CHANNEL_DISPLAY[session.channel].label}
            />
            <ReceiptRow
              label="เลขที่อ้างอิงการชำระเงิน"
              value={session.receipt.transactionId}
            />
          </dl>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <p className="mb-2 font-semibold text-grey-700">ข้อมูลตัวแทน</p>
          <dl className="space-y-2 text-base">
            <ReceiptRow label="รหัสตัวแทน" value={session.agentCode} />
            <ReceiptRow label="ชื่อตัวแทน" value={session.merchantName} />
            <ReceiptRow label="โทรศัพท์" value={session.merchantPhone} />
            <ReceiptRow label="อีเมล" value={session.merchantEmail} />
            <ReceiptRow
              label="เลขประจำตัวผู้เสียภาษี"
              value={session.merchantTaxId}
            />
          </dl>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <p className="mb-2 font-semibold text-grey-700">ข้อมูลลูกค้า</p>
          <dl className="space-y-2 text-base">
            <ReceiptRow label="ชื่อ - นามสกุล" value={session.payer.name} />
            <ReceiptRow label="โทรศัพท์" value={session.payer.phone} />
            <ReceiptRow label="อีเมล" value={session.payer.email} />
          </dl>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <p className="mb-2 font-semibold text-grey-700">
            รายการกรมธรรม์ ({session.policies.length})
          </p>
          <ul className="divide-y divide-dashed divide-[var(--divider)]">
            {session.policies.map((policy) => (
              <li key={policy.docNo} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 font-semibold text-primary">
                    {policy.insuredName}
                  </p>
                  <p className="shrink-0 text-base font-semibold tabular-nums text-grey-800">
                    {formatTHB(policy.amount, 2)}
                  </p>
                </div>
                <p className="mt-1 text-base">
                  <span className="text-grey-800">{policy.docNo}</span>{" "}
                  <span className="text-grey-500">({policy.docType})</span>
                </p>
                <p className="mt-1 text-base text-grey-800">{policy.coverage}</p>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <div className="flex items-baseline justify-between">
            <span className="text-base font-semibold text-grey-800">ยอดชำระ</span>
            <span className="font-sans text-xl font-bold tabular-nums tracking-tight text-grey-800">
              {formatTHB(session.amount, 2)}
            </span>
          </div>
        </div>

        <footer className="border-t border-dashed border-[var(--divider)] bg-grey-100 px-6 py-4 text-center">
          <p className="text-base text-grey-500">
            เอกสารฉบับนี้ออกโดยระบบอิเล็กทรอนิกส์ · ไม่ต้องลงลายมือชื่อ
          </p>
        </footer>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3 md:flex">
        <Button variant="outline" className="h-12 w-full md:flex-1">
          <Download className="size-4" />
          ดาวน์โหลด PDF
        </Button>
        <Button variant="outline" className="h-12 w-full md:flex-1" onClick={() => window.print()}>
          <Printer className="size-4" />
          พิมพ์ใบเสร็จ
        </Button>
      </div>
      <Button
        variant="ghost"
        onClick={() => router.push("/success")}
        className="mt-3 h-10 w-full text-grey-600"
      >
        <ArrowLeft className="size-4" />
        กลับ
      </Button>
    </PayScreenFrame>
  );
}

function ReceiptRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-grey-200 py-1.5 last:border-0">
      <dt className="min-w-0 flex-1 text-grey-600">{label}</dt>
      <dd className="min-w-0 max-w-[65%] text-right font-sans text-base [overflow-wrap:anywhere]">
        {value}
      </dd>
    </div>
  );
}
