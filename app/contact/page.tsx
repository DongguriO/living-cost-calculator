import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "문의하기",
  description: "머니머니 서비스 이용 및 기타 문의사항을 남겨주세요.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 transition hover:opacity-70"
          >
            💰 머니머니
          </Link>
        </div>
      </header>

      <div className="px-4 py-8">
        <div className="mx-auto w-full max-w-3xl">
          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
            <h1 className="text-2xl font-bold text-gray-900">
              문의하기
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              머니머니 이용 중 궁금한 점이나 불편한 점,
              서비스에 대한 의견이 있다면 문의해주세요.
            </p>

            <div className="mt-8 space-y-6">
              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  서비스 이용 문의
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  계산기 이용 중 오류가 발생했거나 정상적으로 작동하지
                  않는 경우 문의 내용을 보내주세요.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  서비스 개선 의견
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  추가되었으면 하는 계산기나 기능, 사용하면서 불편했던
                  점 등을 알려주시면 서비스 개선에 참고하겠습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  문의 방법
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  아래 버튼을 눌러 이메일을 통해 문의 내용을 보내주세요.
                </p>

                <a
                  href="mailto:moneymoney.qna@gmail.com"
                  className="mt-5 inline-flex rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700"
                >
                  이메일로 문의하기
                </a>

              </section>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-6">
              <Link
                href="/"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ← 머니머니 홈으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}