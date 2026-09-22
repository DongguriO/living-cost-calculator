import Link from "next/link";
import type { Metadata } from "next";
import Footer from "../components/Footer";
import CalculatorSearch, {
  type Calculator,
} from "../components/CalculatorSearch";

export const metadata: Metadata = {
  title: "전체 계산기 | 머니머니",
  description:
    "생활비, 자동차, 이사, 여행, 주거, 결혼, 육아 등 다양한 비용 계산기를 한곳에서 확인해보세요.",
};

const calculators: Calculator[] = [
  {
    icon: "🏠",
    title: "자취 생활비 계산기",
    description: "월세, 관리비, 식비, 교통비 등 자취 생활비를 계산해보세요.",
    href: "/living-cost",
    keywords: [
      "자취", "생활비", "월세", "관리비", "식비", "교통비", "공과금",
    ],
  },
  {
    icon: "🚗",
    title: "자동차 유지비 계산기",
    description: "연료비, 보험료, 자동차세 등 차량 유지비를 계산해보세요.",
    href: "/car-cost",
    keywords: [
      "자동차", "차량", "유지비", "주유비", "기름값", "연료비", "보험료", "자동차세", "주차비", "통행료", "정비비",
    ],
  },
  {
    icon: "📦",
    title: "이사 비용 계산기",
    description: "포장이사, 운반비 등 이사에 필요한 비용을 계산해보세요.",
    href: "/moving-cost",
    keywords: [ 
        "이사", "이사비", "포장이사", "운반비", "사다리차", "청소비", "용달",
    ],
  },
  {
    icon: "✈️",
    title: "여행 예산 계산기",
    description: "교통, 숙박, 식비 등을 포함한 여행 예산을 계산해보세요.",
    href: "/travel-cost",
    keywords: [
      "여행", "여행비", "여행예산", "교통", "숙박", "호텔", "식비", "관광", "체험", "쇼핑", "예비비",
    ],
  },
  {
    icon: "🏘️",
    title: "전세 vs 월세 계산기",
    description: "전세대출 이자와 월세를 비교해보세요.",
    href: "/rent-vs-jeonse",
    keywords: [ 
        "전세", "월세", "전세대출", "대출금리", "보증금", "관리비", "주거비",
    ],
  },
  {
    icon: "🚘",
    title: "자동차 구매비용 계산기",
    description: "차량 가격, 취등록세, 보험료 등을 계산해보세요.",
    href: "/car-purchase-cost",
    keywords: [
      "자동차", "차량", "차값", "차량가격","자동차구매", "취등록세", "등록비", "보험료", "할부", "대출", "선납금", "월납입금",
    ],
  },
  {
    icon: "💍",
    title: "결혼/웨딩 비용 계산기",
    description: "예식장, 식사, 스드메, 신혼여행 비용을 계산해보세요.",
    href: "/wedding-cost",
    keywords: [
      "결혼", "웨딩", "결혼비용", "예식장", "식사비", "하객", "스튜디오", "드레스", "메이크업", "스드메", "신혼여행", "예물", "반지", "답례품",
    ],
  },
  {
    icon: "👶",
    title: "출산·육아 비용 계산기",
    description: "출산과 초기 육아에 필요한 예상 비용을 계산해보세요.",
    href: "/childcare-cost",
    keywords: [
      "출산", "육아", "출산비용", "병원", "진료비", "산후조리", "육아용품", "수유", "기저귀", "보육비", "교육비", "의료비",
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex h-16 w-full max-w-3xl items-center justify-between px-4">
          <Link
            href="/"
            className="text-lg font-bold text-gray-900 transition hover:opacity-70"
          >
            💰 머니머니
          </Link>

          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            홈
          </Link>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-4 py-10">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            전체 계산기
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            필요한 계산기를 찾아 간편하게 계산해보세요.
          </p>
        </header>

        <CalculatorSearch calculators={calculators} />
      </div>

      <Footer />
    </main>
  );
}