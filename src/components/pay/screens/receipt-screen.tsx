"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAY_SESSION, SAVED_CARDS } from "@/lib/mock/payment-session";
import { formatTHB } from "@/lib/utils";

/** 7 — ใบเสร็จอิเล็กทรอนิกส์. */
export function ReceiptScreen() {
  const router = useRouter();
  const session = PAY_SESSION;
  const card = SAVED_CARDS[0];

  return (
    <>
      <section className="overflow-hidden rounded-card bg-bg-paper shadow-z16">
        <header className="border-b border-dashed border-[var(--divider)] px-6 py-6 text-center">
          <p className="text-base font-medium text-grey-800">ใบเสร็จรับเงินอิเล็กทรอนิกส์</p>
          <p className="text-base font-medium text-grey-800">E-Receipt</p>
        </header>

        <div className="px-6 py-5">
          <dl className="space-y-2.5 text-base">
            <ReceiptRow label="เลขที่ใบเสร็จ" value={session.receipt.receiptNo} />
            <ReceiptRow
              label="Transaction ID"
              value={session.receipt.transactionId}
            />
            <ReceiptRow label="วันที่ชำระ" value={session.receipt.paidDate} />
            <ReceiptRow label="เวลา" value={`${session.receipt.paidTime} น.`} />
            <ReceiptRow label="วิธีชำระ" value={`Visa **** ${card?.last4}`} />
            <ReceiptRow
              label="Authorization"
              value={session.receipt.authCode}
            />
          </dl>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <p className="mb-2 font-semibold text-grey-700">ร้านค้า</p>
          <dl className="space-y-2 text-base">
            <ReceiptRow label="ชื่อ" value={session.merchantName} />
            <ReceiptRow label="Merchant ID" value={session.merchantId} />
            <ReceiptRow
              label="เลขประจำตัวผู้เสียภาษี"
              value={session.merchantTaxId}
            />
          </dl>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <p className="mb-2 font-semibold text-grey-700">
            รายการกรมธรรม์ ({session.policies.length})
          </p>
          <ul className="divide-y divide-dashed divide-[var(--divider)] text-base">
            {session.policies.map((policy) => (
              <li key={policy.docNo} className="flex gap-3 py-2 first:pt-0 last:pb-0">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-primary">{policy.insuredName}</p>
                  <p className="text-base text-grey-500">{policy.docType}</p>
                  <p className="mt-1 text-grey-800">{policy.coverage}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold tabular-nums text-grey-800">
                    {formatTHB(policy.amount, 2)}
                  </p>
                  <p className="mt-1 text-grey-800">{policy.docNo}</p>
                </div>
              </li>
            ))}
          </ul>

          <hr className="my-4 border-dashed border-[var(--divider)]" />

          <p className="mb-2 font-semibold text-grey-700">รายการ</p>
          <dl className="space-y-2 text-base">
            {session.breakdown.map((line) => (
              <ReceiptRow
                key={line.label}
                label={line.label}
                value={formatTHB(line.amount, 2)}
              />
            ))}
            <hr className="border-[var(--divider)]" />
            <div className="flex items-baseline justify-between">
              <dt className="text-base font-semibold text-grey-800">รวมทั้งสิ้น</dt>
              <dd className="font-sans text-[22px] font-bold tabular-nums tracking-tight text-grey-800">
                {formatTHB(session.amount, 2)}
              </dd>
            </div>
          </dl>
          <p className="mt-1 text-base text-grey-500">(รวม VAT และ พ.ร.บ. แล้ว)</p>
        </div>

        <footer className="border-t border-dashed border-[var(--divider)] bg-grey-100 px-6 py-4 text-center">
          <p className="mb-1 text-base text-grey-500">
            Reference: {session.invoiceNo}
          </p>
          <p className="text-base text-grey-500">
            เอกสารฉบับนี้ออกโดยระบบอิเล็กทรอนิกส์ · ไม่ต้องลงลายมือชื่อ
          </p>
        </footer>
      </section>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-12">
          <Download className="size-4" />
          ดาวน์โหลด PDF
        </Button>
        <Button variant="outline" className="h-12" onClick={() => window.print()}>
          <Printer className="size-4" />
          พิมพ์ใบเสร็จ
        </Button>
      </div>
      <Button
        variant="ghost"
        onClick={() => router.push("/pay/success")}
        className="mt-3 h-10 w-full text-grey-600"
      >
        <ArrowLeft className="size-4" />
        กลับ
      </Button>
    </>
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
    <div className="flex justify-between gap-4 border-b border-grey-200 py-1.5 last:border-0">
      <dt className="text-grey-600">{label}</dt>
      <dd className="text-right font-sans text-base">
        {value}
      </dd>
    </div>
  );
}
