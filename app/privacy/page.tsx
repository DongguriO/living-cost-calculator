import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "머니머니 개인정보처리방침",
};

export default function PrivacyPage() {
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
              개인정보처리방침
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500">
              머니머니는 이용자의 개인정보를 중요하게 생각하며,
              개인정보 보호를 위해 최선을 다하고 있습니다.
            </p>

            <div className="mt-8 space-y-8">
              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  1. 개인정보의 수집
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  머니머니는 별도의 회원가입 없이 생활비, 자동차 유지비,
                  이사 비용 등의 계산 서비스를 이용할 수 있습니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  현재 머니머니는 계산기 이용을 위해 이름, 전화번호,
                  주소 등의 개인정보를 직접 수집하지 않습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  2. 계산기 입력 정보
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  이용자가 계산기에 입력하는 생활비, 자동차 유지비,
                  이사 비용 등의 정보는 계산 결과를 제공하기 위한
                  목적으로 사용됩니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  계산기에 입력하는 정보에는 개인정보를 입력하지
                  않도록 주의해 주세요.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  3. 쿠키 및 광고
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  머니머니는 서비스 개선 및 광고 제공을 위해 쿠키 또는
                  이와 유사한 기술을 사용할 수 있습니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  향후 Google AdSense 등 외부 광고 서비스를 이용할 경우
                  해당 서비스의 쿠키 및 개인정보 처리 방식이 적용될 수
                  있습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  4. 개인정보의 제3자 제공
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  머니머니는 이용자의 개인정보를 직접 수집하지 않으며,
                  법령에 특별한 규정이 있는 경우를 제외하고 개인정보를
                  제3자에게 제공하지 않습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  5. 개인정보의 보관 및 파기
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  머니머니는 현재 회원가입이나 개인정보를 직접 수집하는
                  기능을 제공하지 않으므로 별도의 개인정보 데이터베이스를
                  운영하지 않습니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  6. 개인정보처리방침의 변경
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  서비스의 기능이나 운영 방식이 변경될 경우 개인정보처리방침의
                  내용이 변경될 수 있습니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  변경된 내용은 본 페이지를 통해 안내합니다.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-gray-900">
                  7. 문의
                </h2>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  개인정보처리방침과 관련하여 문의사항이 있는 경우
                  문의하기 페이지를 이용해 주세요.
                </p>
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