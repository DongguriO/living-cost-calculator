import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "머니머니",
  description:
    "생활비, 자동차 유지비, 이사 비용 등 일상에서 필요한 다양한 비용을 간편하게 계산해보세요.",
};

const availableCalculators = [
  {
    icon: "🏠",
    title: "자취 생활비 계산기",
    description: "한 달 생활비와 지출 비중을 계산해보세요.",
    href: "/living-cost",
  },
  {
    icon: "🚗",
    title: "자동차 유지비 계산기",
    description: "자동차의 월 유지비를 계산해보세요.",
    href: "/car-cost",
  },
  {
    icon: "📦",
    title: "이사 비용 계산기",
    description: "이사할 때 필요한 비용을 계산해보세요.",
    href: "/moving-cost",
  },
  {
    icon: "✈️",
    title: "여행 예산 계산기",
    description: "여행에 필요한 예상 비용을 계산해보세요.",
    href: "/travel-cost",
  },
  {
    icon: "🏘️",
    title: "전세 vs 월세 계산기",
    description: "전세와 월세의 예상 주거비를 비교해보세요.",
    href: "/rent-vs-jeonse",
    
  },
  {
    icon: "🚘",
    title: "자동차 구매비용 계산기",
    description: "차량 가격과 취득세, 할부 등을 입력해 구매비용을 계산해보세요.",
    href: "/car-purchase-cost",
  },
].sort((a, b) =>
  a.title.localeCompare(b.title, "ko-KR")
);

const upcomingCalculators = [
  {
    icon: "🚗",
    title: "자동차 구매비용 계산기",
    description: "차량 구매에 필요한 초기 비용과 유지비를 계산해보세요.",
  },
  {
    icon: "💍",
    title: "결혼·웨딩 비용 계산기",
    description: "결혼식과 신혼 준비에 필요한 예상 비용을 계산해보세요.",
  },
  {
    icon: "👶",
    title: "출산·육아 비용 계산기",
    description: "출산과 육아에 필요한 예상 비용을 계산해보세요.",
  },
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
            {availableCalculators.map((calculator) => {
              return (
                <Link
                  key={calculator.title}
                  href={calculator.href}
                  className="block"
                >
                  <div className="flex h-24 items-center gap-4 rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                      {calculator.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {calculator.title}
                      </h3>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {calculator.description}
                      </p>
                    </div>

                    <div className="shrink-0 text-sm text-gray-400">
                      →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          </section>

          <section className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              준비 중인 계산기
            </h2>

            <div className="space-y-3">
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
            </div>
          </section>

        {/* 안내 */}
        <p className="mt-10 text-center text-xs text-gray-400">
          머니머니는 생활에 필요한 다양한 비용을 쉽게 계산할 수 있도록 도와드립니다.
        </p>
      </div>
    </main>
  );
}