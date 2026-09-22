import type { Metadata } from "next";
import MovingCostCalculator from "./MovingCostCalculator";

export const metadata: Metadata = {
  title: "이사 비용 계산기 | 머니머니",
  description:
    "포장이사, 운반비, 사다리차, 청소비 등 이사에 필요한 예상 비용을 간편하게 계산해보세요.",
};

export default function CarCostPage() {
  return <MovingCostCalculator />;
}