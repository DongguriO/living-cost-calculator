import Link from "next/link";
import type { Metadata } from "next";
import CalculatorSearch, {
  type Calculator,
} from "./components/CalculatorSearch";

export const metadata: Metadata = {
  title: "머니머니",
  description:
    "생활비, 자동차 유지비, 이사 비용 등 일상에서 필요한 다양한 비용을 간편하게 계산해보세요.",
};

const availableCalculators: Calculator[] = [
  {
    icon: "🏠",
    title: "자취 생활비 계산기",
    description: "월세, 식비, 교통비 등 자취에 필요한 생활비를 계산해보세요.",
    href: "/living-cost",
    keywords: [
      "월세", "관리비", "공과금", "식비", "교통비", "통신비", "생활비",
    ],
  },

  {
    icon: "🚗",
    title: "자동차 유지비 계산기",
    description: "연료비, 보험료, 자동차세, 주차비 등 자동차 유지비를 계산해보세요.",
    href: "/car-cost",
    keywords: [
      "주유비", "기름값", "연료비", "자동차세", "보험료", "주차비", "통행료", "정비비", "유지비",
    ],
  },

  {
    icon: "📦",
    title: "이사 비용 계산기",
    description: "포장이사, 운반비, 사다리차 등 이사에 필요한 비용을 계산해보세요.",
    href: "/moving-cost",
    keywords: [
      "포장이사", "이사비", "운반비", "사다리차", "청소비", "용달",
    ],
  },

  {
    icon: "✈️",
    title: "여행 예산 계산기",
    description: "교통, 숙박, 식비, 관광, 쇼핑 등을 포함한 여행 예산을 계산해보세요.",
    href: "/travel-cost",
    keywords: [
      "여행", "교통", "숙박", "호텔", "식비", "관광", "체험", "쇼핑", "예비비",
    ],
  },

  {
    icon: "🏠",
    title: "전세 vs 월세 계산기",
    description: "전세대출 이자와 월세를 비교해 주거비용을 계산해보세요.",
    href: "/rent-vs-jeonse",
    keywords: [
      "전세", "월세", "보증금", "전세대출", "대출금리", "관리비", "계약기간", "주거비",
    ],
  },

  {
    icon: "🚙",
    title: "자동차 구매비용 계산기",
    description: "차량 가격, 취등록세, 보험료, 할부 등을 포함한 자동차 구매비용을 계산해보세요.",
    href: "/car-purchase-cost",
    keywords: [
      "자동차", "차량", "차값", "차량가격", "취등록세", "등록비", "자동차세", "보험료", "할부", "대출", "선납금", "월납입금",
    ],
  },

  {
    icon: "💍",
    title: "결혼/웨딩 비용 계산기",
    description: "예식장, 식사, 스드메, 신혼여행 등 결혼에 필요한 비용을 계산해보세요.",
    href: "/wedding-cost",
    keywords: [
      "결혼", "웨딩", "예식장", "식사비", "하객", "스튜디오", "드레스", "메이크업", "스드메", "사진", "영상", "신혼여행", "예물", "반지", "답례품",
    ],
  },

  {
    icon: "👶",
    title: "출산·육아 비용 계산기",
    description: "출산과 초기 육아에 필요한 예상 지출을 계산해보세요.",
    href: "/childcare-cost",
    keywords: [
      "출산", "육아", "병원", "진료비", "산후조리", "육아용품", "수유", "식비", "기저귀", "의류", "보육비", "교육비", "의료비",
    ],
  },
].sort((a, b) => a.title.localeCompare(b.title, "ko-KR"));

const upcomingCalculators = [
    {},
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* 로고 */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            💰 머니머니
          </h1>

          <p className="mt-4 text-gray-600">
            생활에 필요한 돈을 쉽고 빠르게 계산해보세요.
          </p>
        </header>

        {/* 계산기 목록 */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            계산기
          </h2>

          <div className="space-y-3">
            <CalculatorSearch calculators={availableCalculators} />
          </div>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              준비 중인 계산기
            </h2>

            {/* <div className="space-y-3">
              {upcomingCalculators.map((calculator) => (
                <div
                  key={calculator.title}
                  className="flex items-center gap-4 rounded-2xl bg-white p-5 opacity-60 shadow-sm"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                    {calculator.icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {calculator.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {calculator.description}
                    </p>
                  </div>

                  <div className="shrink-0 text-sm text-gray-400">
                    준비 중
                  </div>
                </div>
              ))}
            </div> */}
          </section>

        {/* 안내 */}
        <p className="mt-10 text-center text-xs text-gray-400">
          머니머니는 생활에 필요한 다양한 비용을 쉽게 계산할 수 있도록 도와드립니다.
        </p>
      </div>
    </main>
  );
}