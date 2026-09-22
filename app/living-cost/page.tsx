import type { Metadata } from "next";
import LivingCostCalculator from "./LivingCostCalculator";

export const metadata: Metadata = {
  title: "자취 생활비 계산기 | 머니머니",
  description:
    "월세, 관리비, 식비, 교통비, 통신비 등 자취에 필요한 월 생활비와 연간 비용을 계산해보세요.",
};

export default function LivingCostPage() {
  return <LivingCostCalculator />;
}