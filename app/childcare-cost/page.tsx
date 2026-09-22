import type { Metadata } from "next";
import ChildcareCostCalculator from "./ChildcareCostCalculator";

export const metadata: Metadata = {
  title: "출산·육아 비용 계산기 | 머니머니",
  description:
    "출산비, 병원비, 산후조리 비용과 수유, 기저귀, 보육비, 교육비 등 육아에 필요한 예상 비용을 계산해보세요.",
};

export default function ChildcareCostPage() {
  return <ChildcareCostCalculator />;
}