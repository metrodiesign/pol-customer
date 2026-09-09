import { describe, expect, it } from "vitest";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import {
  canProceedToPayment,
  PROCESSING_STEPS,
  resolvePayTokenStatus,
} from "./payment-flow";

describe("PAY_SESSION", () => {
  it("ผลรวมเบี้ยของทุกกรมธรรม์ = ยอดชำระ", () => {
    const sum = PAY_SESSION.policies.reduce((acc, p) => acc + p.amount, 0);
    expect(Math.round(sum * 100) / 100).toBe(PAY_SESSION.amount);
  });

  it("ผลรวม breakdown = ยอดชำระ", () => {
    const sum = PAY_SESSION.breakdown.reduce((acc, b) => acc + b.amount, 0);
    expect(Math.round(sum * 100) / 100).toBe(PAY_SESSION.amount);
  });
});

describe("canProceedToPayment", () => {
  it("ต้องมียอด > 0 และยอมรับเงื่อนไข", () => {
    expect(canProceedToPayment({ amount: 100, acceptedTerms: true })).toBe(true);
    expect(canProceedToPayment({ amount: 0, acceptedTerms: true })).toBe(false);
    expect(canProceedToPayment({ amount: 100, acceptedTerms: false })).toBe(false);
  });
});

describe("resolvePayTokenStatus", () => {
  it("UUID ถูกต้อง -> ok (case-insensitive)", () => {
    expect(resolvePayTokenStatus("3F2504E0-4F89-41D3-9A0C-0305E82C3301")).toBe("ok");
    expect(resolvePayTokenStatus("3f2504e0-4f89-41d3-9a0c-0305e82c3301")).toBe("ok");
  });

  it("ไม่ใช่ UUID (ว่าง/สั้น/มั่ว) -> invalid", () => {
    expect(resolvePayTokenStatus("")).toBe("invalid");
    expect(resolvePayTokenStatus("abc")).toBe("invalid");
    expect(resolvePayTokenStatus("not-a-uuid")).toBe("invalid");
    expect(resolvePayTokenStatus("3f2504e0-4f89-41d3-9a0c-0305e82c33")).toBe("invalid");
  });

  it("seeded UUID -> สถานะพิเศษ", () => {
    expect(resolvePayTokenStatus("00000000-0000-0000-0000-000000000e11")).toBe("expired");
    expect(resolvePayTokenStatus("00000000-0000-0000-0000-0000000fa11e")).toBe("failed");
  });
});

describe("PROCESSING_STEPS", () => {
  it("เดินจากขั้นแรกถึง 100% ตามลำดับ", () => {
    expect(PROCESSING_STEPS.at(-1)?.percent).toBe(100);
    const percents = PROCESSING_STEPS.map((s) => s.percent);
    expect([...percents].sort((a, b) => a - b)).toEqual(percents);
  });
});
