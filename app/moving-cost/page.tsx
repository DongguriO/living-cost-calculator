import type { Metadata } from "next";
import MovingCostCalculator from "./MovingCostCalculator";

export const metadata: Metadata = {
  title: "이사 비용 계산기 | 포장이사·용달·청소비 계산",
  description:
    "포장이사, 용달, 사다리차, 입주청소 등 이사에 필요한 예상 비용을 간편하게 계산해보세요.",
};

export default function CarCostPage() {
  return <MovingCostCalculator />;
}