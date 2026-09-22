import type { Metadata } from "next";
import CarCostCalculator from "./CarCostCalculator";

export const metadata: Metadata = {
  title: "자동차 유지비 계산기 | 머니머니",
  description:
    "연료비, 자동차 보험료, 자동차세, 주차비, 통행료, 정비비 등을 포함한 자동차 유지비를 계산해보세요.",
};

export default function CarCostPage() {
  return <CarCostCalculator />;
}