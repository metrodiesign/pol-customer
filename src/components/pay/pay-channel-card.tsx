import { CHANNEL_DISPLAY } from "@/lib/payment-channel";
import type { PaymentChannel } from "@/types/order-payment";

/** ช่องทางชำระเงินที่ระบบกำหนดมากับลิงก์ — แสดงอย่างเดียว เลือกเปลี่ยนไม่ได้. */
export function PayChannelCard({ channel }: { channel: PaymentChannel }) {
  const display = CHANNEL_DISPLAY[channel];

  return (
    <div className="mb-6">
      <h3 className="mb-3 px-1 font-semibold text-grey-700">ช่องทางการชำระเงิน</h3>
      <div className="rounded-control border-2 border-primary bg-bg-paper p-4">
        <div className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={display.img}
            alt={display.label}
            className="size-20 shrink-0 object-contain"
          />
          <span className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="text-sm font-bold text-grey-800">{display.label}</span>
            <span className="text-xs leading-relaxed text-grey-500">
              {display.caption}
            </span>
          </span>
        </div>
      </div>
      <p className="mt-2 px-1 text-xs text-grey-500">
        ช่องทางนี้ถูกกำหนดมากับลิงก์ชำระเงินแล้ว
      </p>
    </div>
  );
}
