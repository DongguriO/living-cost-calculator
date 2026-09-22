import type { Metadata } from "next";
import CarPurchaseCostCalculator from "./CarPurchaseCostCalculator";

export const metadata: Metadata = {
  title: "자동차 구매비용 계산기 | 머니머니",
  description:
    "차량 가격, 취등록세, 보험료, 자동차세, 할부금 등을 포함해 자동차 구매에 필요한 비용을 계산해보세요.",
};

export default function CarPurchaseCostPage() {
  return <CarPurchaseCostCalculator />;
}