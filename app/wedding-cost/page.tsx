import type { Metadata } from "next";
import WeddingCostCalculator from "./WeddingCostCalculator";

export const metadata: Metadata = {
  title: "결혼 비용 계산기 | 예식장·스드메·신혼여행 계산",
  description:
    "예식장, 식사비, 스드메, 예물, 답례품, 신혼여행 등 결혼에 필요한 예상 비용을 계산해보세요.",
};

export default function WeddingCostPage() {
  return <WeddingCostCalculator />;
}