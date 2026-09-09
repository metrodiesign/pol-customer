import { redirect } from "next/navigation";
import { SummaryScreen } from "@/components/pay/screens/summary-screen";
import { resolvePayTokenStatus } from "@/lib/pay/payment-flow";

export const metadata = { title: "สรุปรายการชำระเงิน | Central Payment Gateway" };

// entry จริงของ payment link — /pay/{token} (token = UUID PK). resolve แล้ว:
// ok -> summary, expired/failed/invalid -> หน้า error ที่ตรงกัน.
export default async function PayTokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const status = resolvePayTokenStatus(decodeURIComponent(token));

  if (status === "expired") redirect("/expired");
  if (status === "failed") redirect("/failed");
  if (status === "invalid") redirect("/invalid");

  return <SummaryScreen />;
}
