import type { Metadata } from "next";

import TravelCostCalculator from "./TravelCostCaculator";

export const metadata: Metadata = {
  title: "여행 예산 계산기",
  description:
    "여행에 필요한 예상 비용을 계산해보세요",
};

export default function TravelCostPage() {
  return <TravelCostCalculator />;
}