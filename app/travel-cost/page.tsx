import type { Metadata } from "next";

import TravelCostCalculator from "./TravelCostCaculator";

export const metadata: Metadata = {
  title: "여행 예산 계산기 | 교통·숙박·식비 계산",
  description:
    "교통비, 숙박비, 식비, 관광·체험비, 쇼핑비 등을 포함한 여행 예상 예산을 계산해보세요.",
};

export default function TravelCostPage() {
  return <TravelCostCalculator />;
}