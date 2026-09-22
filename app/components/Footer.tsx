import Link from "next/link";

export default function Footer() {
  return (
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
  );
}