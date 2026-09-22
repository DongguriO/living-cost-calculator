import type { Metadata } from "next";
import CarCostCalculator from "./CarCostCalculator";

export const metadata: Metadata = {
  title: "자동차 유지비 계산기 | 주유비·보험료·자동차세 계산",
  description:
    "주유비, 자동차 보험료, 자동차세, 정비비, 주차비 등을 포함한 자동차 월 유지비를 계산해보세요.",
};

export default function CarCostPage() {
  return <CarCostCalculator />;
}