import Link from "next/link";
import type { Metadata } from "next";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "머니머니",
  description:
    "생활비, 자동차 유지비, 이사 비용 등 일상에서 필요한 다양한 비용을 간편하게 계산해보세요.",
};

const featuredCalculators = [
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
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto w-full max-w-2xl px-4 py-12">
        {/* 로고 */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            💰 머니머니
          </h1>

          <p className="mt-4 text-gray-600">
            생활에 필요한 돈을 쉽고 빠르게 계산해보세요.
          </p>
        </header>

        {/* 대표 계산기 */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            대표 계산기
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {featuredCalculators.map((calculator) => (
              <Link
                key={calculator.href}
                href={calculator.href}
                className="group"
              >
                <div className="flex aspect-square flex-col items-center justify-center rounded-2xl bg-white px-4 py-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:px-6">
                  {/* 아이콘 */}
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-4xl sm:h-20 sm:w-20 sm:text-5xl">
                    {calculator.icon}
                  </div>

                  {/* 제목 */}
                  <h3 className="mt-4 font-semibold leading-6 text-gray-900">
                    {calculator.title}
                  </h3>

                  {/* 설명 */}
                  <p className="mt-2 text-sm leading-5 text-gray-500">
                    {calculator.description}
                  </p>

                  {/* 링크 */}
                  <div className="mt-4 text-sm text-gray-400 transition group-hover:text-gray-700">
                    계산해보기 →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 전체 계산기 */}
        <section className="mt-8">
          <Link
            href="/calculators"
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-4 shadow-sm transition hover:border-gray-300 hover:shadow-md"
          >
            <div>
              <h2 className="font-semibold text-gray-900">
                전체 계산기 보기
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                생활비, 주거, 자동차, 결혼·육아 등 모든 계산기를 확인해보세요.
              </p>
            </div>

            <span className="shrink-0 text-lg text-gray-400">
              →
            </span>
          </Link>
        </section>

        {/* 안내 */}
        <p className="mt-10 text-center text-xs text-gray-400">
          머니머니는 생활에 필요한 다양한 비용을 쉽게 계산할 수 있도록 도와드립니다.
        </p>
      </div>

      <Footer />
    </main>
  );
}