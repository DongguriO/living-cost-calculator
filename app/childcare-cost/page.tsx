import type { Metadata } from "next";
import ChildcareCostCalculator from "./ChildcareCostCalculator";

export const metadata: Metadata = {
  title: "출산·육아 비용 계산기 | 출산·초기 육아비용 계산",
  description:
    "출산비, 산후조리, 육아용품, 기저귀, 보육비 등 출산과 초기 육아에 필요한 예상 비용을 계산해보세요.",
};

export default function ChildcareCostPage() {
  return <ChildcareCostCalculator />;
}