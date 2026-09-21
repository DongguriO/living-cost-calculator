import type { Metadata } from "next";
import MovingCostCalculator from "./MovingCostCalculator";

export const metadata: Metadata = {
  title: "이사 비용 계산기",
  description:
    "운반비, 포장비, 사다리차 비용, 청소비 등을 입력해 이사 비용을 계산해보세요.",
};

export default function CarCostPage() {
  return <MovingCostCalculator />;
}