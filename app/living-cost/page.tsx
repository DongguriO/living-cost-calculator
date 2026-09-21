import type { Metadata } from "next";
import LivingCostCalculator from "./LivingCostCalculator";

export const metadata: Metadata = {
  title: "자취 생활비 계산기",
  description:
    "월세, 관리비, 전기요금, 가스요금, 통신비, 식비, 교통비를 입력해 자취 생활비를 계산해보세요.",
};

export default function LivingCostPage() {
  return <LivingCostCalculator />;
}