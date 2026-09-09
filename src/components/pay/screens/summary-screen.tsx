"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calculator,
  FileText,
  ReceiptText,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { canProceedToPayment } from "@/lib/pay/payment-flow";
import { formatTHB } from "@/lib/utils";
import { PayChannelCard } from "../pay-channel-card";
import {
  PayHeroHeader,
  PayInfoRow,
  PaySecurityNote,
  PaySectionCard,
} from "../pay-section-card";

/** 1B — สรุปรายการจาก payment link. ยอดและช่องทางถูกกำหนดมาแล้ว. */
export function SummaryScreen() {
  const router = useRouter();
  const session = PAY_SESSION;

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const ready = canProceedToPayment({
    amount: session.amount,
    acceptedTerms,
  });

  return (
    <>
      <PayHeroHeader
        icon={<ReceiptText className="size-8" />}
        title="สรุปรายการชำระเงิน"
        subtitle="กรุณาตรวจสอบรายละเอียดก่อนชำระเงิน"
      />

      <PaySectionCard
        title="ข้อมูลธุรกรรม"
        icon={<FileText className="size-4" />}
      >
        <div className="divide-y divide-dashed divide-[var(--divider)]">
          <PayInfoRow label="เลขที่รายการ" value={session.invoiceNo} className="py-3 first:pt-0 last:pb-0" />
          <PayInfoRow label="ประเภทบริการ" value={session.serviceType} className="py-3 first:pt-0 last:pb-0" />
          <PayInfoRow label="หมายเลขอ้างอิง 1" value={session.ref1} className="py-3 first:pt-0 last:pb-0" />
          <PayInfoRow label="หมายเลขอ้างอิง 2" value={session.ref2} className="py-3 first:pt-0 last:pb-0" />
        </div>
      </PaySectionCard>

      <PaySectionCard
        title="ข้อมูลลูกค้า"
        icon={<User className="size-4" />}
      >
        <div className="divide-y divide-dashed divide-[var(--divider)]">
          <PayInfoRow label="ชื่อ - นามสกุล" value={session.payer.name} className="py-3 first:pt-0 last:pb-0" />
          <PayInfoRow label="โทรศัพท์" value={session.payer.phone} className="py-3 first:pt-0 last:pb-0" />
          <PayInfoRow label="อีเมล" value={session.payer.email} className="py-3 first:pt-0 last:pb-0" />
        </div>
      </PaySectionCard>

      <PaySectionCard
        title={`รายการกรมธรรม์ (${session.policies.length})`}
        icon={<ShieldCheck className="size-4" />}
      >
        <ul className="divide-y divide-dashed divide-[var(--divider)]">
          {session.policies.map((policy) => (
            <li key={policy.docNo} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-primary">
                  {policy.insuredName}
                </p>
                <p className="text-base text-grey-500">{policy.docType}</p>
                <p className="mt-1 text-base text-grey-800">{policy.coverage}</p>
              </div>
              <div className="shrink-0 text-right text-base">
                <p className="font-semibold tabular-nums text-grey-800">
                  {formatTHB(policy.amount, 2)}
                </p>
                <p className="mt-1 text-grey-800">{policy.docNo}</p>
              </div>
            </li>
          ))}
        </ul>
      </PaySectionCard>

      <PaySectionCard
        title="สรุปค่าใช้จ่าย"
        icon={<Calculator className="size-4" />}
      >
        <div className="flex items-baseline justify-between">
          <span className="text-base font-semibold text-grey-800">ยอดชำระ</span>
          <span className="font-sans text-[22px] font-bold tabular-nums tracking-tight text-grey-800">
            {formatTHB(session.amount, 2)}
          </span>
        </div>
      </PaySectionCard>

      <PayChannelCard channel={session.channel} />

      <div className="mb-4 flex items-start gap-2 rounded-control bg-grey-200 p-3">
        <Checkbox
          checked={acceptedTerms}
          onChange={setAcceptedTerms}
          aria-label="ยอมรับเงื่อนไขและนโยบายความเป็นส่วนตัว"
        />
        <p className="pt-2 text-base text-grey-600">
          ข้าพเจ้ายอมรับ{" "}
          <span className="text-primary underline">เงื่อนไขกรมธรรม์</span> และ{" "}
          <span className="text-primary underline">ข้อกำหนดการใช้บริการ</span>{" "}
          รวมถึงยินยอมให้เก็บรวบรวมและใช้ข้อมูลส่วนบุคคลตาม{" "}
          <span className="text-primary underline">นโยบายความเป็นส่วนตัว</span>
        </p>
      </div>

      <Button
        onClick={() => router.push("/processing")}
        disabled={!ready}
        className="h-14 w-full text-base font-semibold"
      >
        ดำเนินการชำระเงิน
      </Button>
      <PaySecurityNote />
    </>
  );
}
