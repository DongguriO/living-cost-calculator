import type { Metadata } from "next";
import RentVsJeonseCalculator from "./RentVsJeonseCalculator";

export const metadata: Metadata = {
  title: "전세 vs 월세 계산기",
  description:
    "계약기간과 전세보증금, 전세대출, 월세, 관리비를 입력해 전세와 월세의 예상 주거비를 비교해보세요.",
};

export default function RentVsJeonsePage() {
  return <RentVsJeonseCalculator />;
}