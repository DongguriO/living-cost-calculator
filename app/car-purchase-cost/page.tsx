import type { Metadata } from "next";
import CarPurchaseCostCalculator from "./CarPurchaseCostCalculator";

export const metadata: Metadata = {
  title: "자동차 구매비용 계산기",
  description:
    "차량 가격과 취득세, 옵션, 보험료, 할부 조건 등을 입력해 자동차 구매에 필요한 예상 비용을 계산해보세요.",
};

export default function CarPurchaseCostPage() {
  return <CarPurchaseCostCalculator />;
}