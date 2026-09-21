import type { Metadata } from "next";
import CarCostCalculator from "./CarCostCalculator";

export const metadata: Metadata = {
  title: "자동차 유지비 계산기",
  description:
    "월 주행거리, 연비, 연료비, 보험료, 자동차세 등을 입력해 자동차 유지비를 계산해보세요.",
};

export default function CarCostPage() {
  return <CarCostCalculator />;
}