import type { Metadata } from "next";
import RentVsJeonseCalculator from "./RentVsJeonseCalculator";

export const metadata: Metadata = {
  title: "전세 vs 월세 계산기 | 머니머니",
  description:
    "전세대출 이자와 월세, 관리비를 비교해 계약기간 동안 예상되는 주거비용을 계산해보세요.",
};

export default function RentVsJeonsePage() {
  return <RentVsJeonseCalculator />;
}