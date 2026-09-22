"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "./Footer";

type CalculatorLayoutProps = {
  title: string;
  description: string;
  headerTitle: string;
  children: ReactNode;
};

const calculators = [
  {
    icon: "🏠",
    title: "자취 생활비 계산기",
    href: "/living-cost",
  },
  {
    icon: "🚗",
    title: "자동차 유지비 계산기",
    href: "/car-cost",
  },
  {
    icon: "📦",
    title: "이사 비용 계산기",
    href: "/moving-cost",
  },
  {
    icon: "✈️",
    title: "여행 예산 계산기",
    href: "/travel-cost",
  },
  {
    icon: "🏘️",
    title: "전세 vs 월세 계산기",
    href: "/rent-vs-jeonse",
  },
  {
    icon: "🚘",
    title: "자동차 구매비용 계산기",
    href: "/car-purchase-cost",
  },
  {
    icon: "💍",
    title: "결혼/웨딩 비용 계산기",
    href: "/wedding-cost",
  },
  {
    icon: "👶",
    title: "출산·육아 비용 계산기",
    href: "/childcare-cost",
  },
].sort((a, b) =>
  a.title.localeCompare(b.title, "ko-KR")
);

export default function CalculatorLayout({
  title,
  description,
  headerTitle,
  children,
}: CalculatorLayoutProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // 메뉴가 열려 있을 때 배경 스크롤 방지
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 최상단에서는 항상 표시
      if (currentScrollY <= 10) {
        setIsHeaderVisible(true);
        lastScrollY = currentScrollY;
        return;
      }

      // 위로 스크롤
      if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true);
      }

      // 아래로 스크롤
      else if (currentScrollY > lastScrollY + 5) {
        setIsHeaderVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header
        className={`fixed inset-x-0 top-0 z-30 border-b bg-white transition-transform duration-300 ease-out ${
          isHeaderVisible
            ? "translate-y-0"
            : "-translate-y-full"
        }`}
      >
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition hover:opacity-70"
          >
            💰 머니머니
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gray-500 sm:inline">
              {headerTitle}
            </span>

            {/* 메뉴 버튼 */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="다른 계산기 메뉴 열기"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-xl text-gray-700 shadow-sm transition hover:bg-gray-50"
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {/* 본문 */}
      <div className="px-4 pt-24 pb-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              {title}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>

      <Footer />

      {/* 메뉴 바깥쪽 오버레이 */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 오른쪽 슬라이드 메뉴 */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-[min(86vw,360px)] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="다른 계산기 메뉴"
      >
        <div className="flex h-full flex-col">
          {/* 메뉴 헤더 */}
          <div className="flex items-center justify-between border-b px-5 py-5">
            <div>
              <p className="text-xs font-medium text-gray-400">
                MONEY MONEY
              </p>

              <h2 className="mt-1 text-xl font-bold text-gray-900">
                다른 계산기
              </h2>
            </div>

            {/* X 버튼 */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="메뉴 닫기"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            >
              ×
            </button>
          </div>

          {/* 계산기 목록 */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {calculators.map((calculator) => {
                const isCurrentPage =
                  pathname === calculator.href;

                return (
                  <Link
                    key={calculator.href}
                    href={calculator.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-4 rounded-2xl p-4 transition ${
                      isCurrentPage
                        ? "bg-gray-100"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-2xl">
                      {calculator.icon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-gray-900">
                        {calculator.title}
                      </p>

                      {isCurrentPage && (
                        <p className="mt-1 text-xs text-gray-400">
                          현재 페이지
                        </p>
                      )}
                    </div>

                    <span className="text-gray-300">
                      ›
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* 메뉴 하단 */}
          <div className="border-t px-5 py-4">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-xl bg-gray-100 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-200"
            >
              🏠 머니머니 홈으로
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}