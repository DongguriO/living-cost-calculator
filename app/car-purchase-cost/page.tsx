import type { Metadata } from "next";
import CarPurchaseCostCalculator from "./CarPurchaseCostCalculator";

export const metadata: Metadata = {
  title: "자동차 구매비용 계산기 | 취등록세·보험료·할부 계산",
  description:
    "차량 가격, 취등록세, 보험료, 선수금과 할부 등을 포함한 자동차 구매 비용을 계산해보세요.",
};

export default function CarPurchaseCostPage() {
  return <CarPurchaseCostCalculator />;
}