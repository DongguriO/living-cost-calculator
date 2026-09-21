import Link from "next/link";
import type { ReactNode } from "react";

type CalculatorLayoutProps = {
  title: string;
  description: string;
  headerTitle: string;
  children: ReactNode;
};

export default function CalculatorLayout({
  title,
  description,
  headerTitle,
  children,
}: CalculatorLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition hover:opacity-70"
          >
            💰 머니머니
          </Link>

          <span className="text-sm text-gray-500">
            {headerTitle}
          </span>
        </div>
      </header>

      {/* 본문 */}
      <div className="px-4 pt-5 pb-12">
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

      {/* 푸터 */}
      <footer className="border-t bg-white">
        <div className="mx-auto w-full max-w-3xl px-4 py-8">
          <div className="text-center">
            <Link
              href="/"
              className="text-lg font-bold text-gray-900 transition hover:opacity-70"
            >
              💰 머니머니
            </Link>

            <p className="mt-2 text-sm text-gray-500">
              생활에 필요한 다양한 비용을 쉽게 계산해보세요.
            </p>
          </div>

          <nav className="mt-5 flex justify-center gap-4 text-sm text-gray-400">
            <Link
              href="/"
              className="transition hover:text-gray-700"
            >
              계산기
            </Link>

            <span>·</span>

            <Link
              href="/privacy"
              className="transition hover:text-gray-700"
            >
              개인정보처리방침
            </Link>

            <span>·</span>

            <Link
              href="/contact"
              className="transition hover:text-gray-700"
            >
              문의하기
            </Link>
          </nav>

          <p className="mt-5 text-center text-xs text-gray-400">
            © 2026 머니머니. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}