"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export type Calculator = {
  icon: string;
  title: string;
  description: string;
  href: string;
  keywords?: string[];
};

type Props = {
  calculators: Calculator[];
};

export default function CalculatorSearch({ calculators }: Props) {
  const [query, setQuery] = useState("");
  const [displayedCalculators, setDisplayedCalculators] =
    useState<Calculator[]>(calculators);

  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

  const matchedCalculators = useMemo(() => {
    if (!normalizedQuery) {
      return calculators;
    }

    return calculators.filter((calculator) => {
      const searchableText = [
        calculator.title,
        calculator.description,
        ...(calculator.keywords ?? []),
      ]
        .join(" ")
        .toLocaleLowerCase("ko-KR");

      return searchableText.includes(normalizedQuery);
    });
  }, [calculators, normalizedQuery]);

  useEffect(() => {
    if (!normalizedQuery) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayedCalculators(matchedCalculators);
    }, 220);

    return () => window.clearTimeout(timer);
  }, [matchedCalculators, normalizedQuery]);

  const visibleCalculators = normalizedQuery
    ? displayedCalculators
    : calculators;

  const hasNoResults =
    normalizedQuery.length > 0 && matchedCalculators.length === 0;

  return (
    <div>
      {/* 검색창 */}
      <div className="mb-6">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl">
            🔎
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="계산기 이름이나 키워드를 검색해보세요"
            className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-12 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 transition hover:text-gray-700"
              aria-label="검색어 지우기"
            >
              ×
            </button>
          )}
        </div>

        {normalizedQuery && !hasNoResults && (
          <p className="mt-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-900">
              {matchedCalculators.length}개
            </span>
            의 계산기를 찾았습니다.
          </p>
        )}
      </div>

      {/* 검색 결과 */}
      {hasNoResults ? (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
          <div className="mb-3 text-4xl">🔍</div>
          <p className="font-semibold text-gray-900">
            검색 결과가 없습니다.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            다른 계산기 이름이나 키워드로 검색해보세요.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {visibleCalculators.map((calculator) => {
            const isMatch =
              !normalizedQuery ||
              matchedCalculators.some(
                (item) => item.href === calculator.href
              );

            return (
              <div
                key={calculator.href}
                className={`
                  overflow-hidden transition-all duration-300 ease-out
                  ${
                    isMatch
                      ? "max-h-[300px] translate-y-0 scale-100 opacity-100"
                      : "max-h-0 -translate-y-2 scale-95 opacity-0"
                  }
                `}
              >
                <Link
                  href={calculator.href}
                  className="group block rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-2xl">
                      {calculator.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {calculator.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        {calculator.description}
                      </p>
                    </div>

                    <span className="shrink-0 text-lg text-gray-300 transition group-hover:translate-x-1 group-hover:text-gray-600">
                      →
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}