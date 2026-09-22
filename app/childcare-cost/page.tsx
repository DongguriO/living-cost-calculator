import type { Metadata } from "next";
import ChildcareCostCalculator from "./ChildcareCostCalculator";

export const metadata: Metadata = {
  title: "출산·육아 비용 계산기",
  description:
    "출산과 초기 육아에 필요한 비용을 입력해 예상 지출을 계산해보세요.",
};

export default function ChildcareCostPage() {
  return <ChildcareCostCalculator />;
}