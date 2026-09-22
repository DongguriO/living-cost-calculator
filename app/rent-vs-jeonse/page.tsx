import type { Metadata } from "next";
import RentVsJeonseCalculator from "./RentVsJeonseCalculator";

export const metadata: Metadata = {
  title: "전세 vs 월세 계산기 | 전세대출 이자·월세 비교",
  description:
    "전세대출 이자와 월세를 비교해 전세와 월세의 예상 주거비를 계산해보세요.",
};

export default function RentVsJeonsePage() {
  return <RentVsJeonseCalculator />;
}