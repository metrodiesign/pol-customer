import { describe, expect, it } from "vitest";
import { PAY_SESSION } from "@/lib/mock/payment-session";
import { canProceedToPayment, PROCESSING_STEPS } from "./payment-flow";

describe("PAY_SESSION", () => {
  it("ผลรวมเบี้ยของทุกกรมธรรม์ = ยอดชำระ", () => {
    const sum = PAY_SESSION.policies.reduce((acc, p) => acc + p.amount, 0);
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

describe("PROCESSING_STEPS", () => {
  it("เดินจากขั้นแรกถึง 100% ตามลำดับ", () => {
    expect(PROCESSING_STEPS.at(-1)?.percent).toBe(100);
    const percents = PROCESSING_STEPS.map((s) => s.percent);
    expect([...percents].sort((a, b) => a - b)).toEqual(percents);
  });
});
