import type { Metadata } from "next";
import LivingCostCalculator from "./LivingCostCalculator";

export const metadata: Metadata = {
  title: "자취 생활비 계산기 | 월세·식비·교통비 계산",
  description:
    "월세, 관리비, 식비, 교통비, 통신비 등 자취에 필요한 월 생활비를 간편하게 계산해보세요.",
};

export default function LivingCostPage() {
  return <LivingCostCalculator />;
}