import type { Metadata } from "next";

import TravelCostCalculator from "./TravelCostCaculator";

export const metadata: Metadata = {
  title: "여행 예산 계산기 | 머니머니",
  description:
    "교통비, 숙박비, 식비, 관광·체험비, 쇼핑비 등을 입력해 여행에 필요한 총 예산을 계산해보세요.",
};

export default function TravelCostPage() {
  return <TravelCostCalculator />;
}