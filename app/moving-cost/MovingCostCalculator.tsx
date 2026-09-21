"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  moving: "",
  packing: "",
  ladder: "",
  cleaning: "",
  disposal: "",
  brokerage: "",
  etc: "",
};

const categories = [
  { key: "moving", label: "이삿짐 운반비" },
  { key: "packing", label: "포장비" },
  { key: "ladder", label: "사다리차 비용" },
  { key: "cleaning", label: "청소비" },
  { key: "disposal", label: "폐기물 처리비" },
  { key: "brokerage", label: "부동산 중개보수" },
  { key: "etc", label: "기타 비용" },
] as const;

export default function MovingCostPage() {
  const [values, setValues] = useState(initialValues);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const updateValue = (
    key: keyof typeof values,
    value: string
  ) => {
    const filteredValue = value.replace(/[^0-9]/g, "");

    setValues((prev) => ({
      ...prev,
      [key]: filteredValue,
    }));
  };

  const fillExampleValues = () => {
    setValues({
      moving: "800000",
      packing: "200000",
      ladder: "150000",
      cleaning: "150000",
      disposal: "50000",
      brokerage: "300000",
      etc: "100000",
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const getAmount = (key: keyof typeof values) => {
    return Number(values[key] || 0);
  };

  const total = Object.keys(values).reduce(
    (sum, key) =>
      sum + getAmount(key as keyof typeof values),
    0
  );

  const categoryData = categories.map((category) => ({
    ...category,
    amount: getAmount(category.key),
  }));

  const topExpense =
    total > 0
      ? [...categoryData].sort(
          (a, b) => b.amount - a.amount
        )[0]
      : null;

  const getPercentage = (amount: number) => {
    if (total === 0) return 0;

    return Math.round((amount / total) * 100);
  };

  const reserve = total * 0.1;
  const recommendedBudget = total + reserve;

  const formatWon = (value: number) =>
    new Intl.NumberFormat("ko-KR").format(value);

  return (
    <CalculatorLayout
      title="📦 이사 비용 계산기"
      description="이사할 때 필요한 비용을 한눈에 계산해보세요."
      headerTitle="이사 비용 계산기"
    >
      {/* 입력 영역 */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          이사 비용 입력
        </h2>

        <div className="space-y-4">
          {categories.map((category) => (
            <InputRow
              key={category.key}
              label={category.label}
              value={values[category.key]}
              onChange={(value) =>
                updateValue(category.key, value)
              }
            />
          ))}
        </div>

        <p className="mt-3 text-center text-sm text-gray-500">
          입력할 값이 없다면 예시 값을 먼저 넣어볼 수 있어요.
        </p>

        <button
          onClick={fillExampleValues}
          className="mt-3 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white transition hover:bg-gray-700"
        >
          예시 금액 넣어보기
        </button>

        <button
          onClick={resetValues}
          className="mt-3 w-full rounded-lg border border-gray-300 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
        >
          입력값 초기화
        </button>
      </div>

      {/* 입력 전 */}
      {total === 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-md">
          <p className="text-2xl">📦</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            내 이사 비용은 얼마일까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            이사에 필요한 비용을 입력하면
            <br />
            예상 총비용을 계산해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {total > 0 && (
        <>
          <div className="mt-6 rounded-2xl bg-black p-6 text-center text-white shadow-md">
            <p className="text-sm text-gray-300">
              예상 이사 비용
            </p>

            <p className="mt-2 text-4xl font-bold">
              {formatWon(total)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              입력한 비용을 모두 합산한 금액이에요.
            </p>

            <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

            <p className="text-sm text-gray-300">
              예비비 포함 예상 비용
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {formatWon(recommendedBudget)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              입력한 비용의 10%를 예비비로 추가했어요.
            </p>
          </div>

          {/* 비용 분석 */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">
              📊 이사 비용 분석
            </h2>

            {/* 가장 큰 지출 */}
            {topExpense && (
              <div className="mt-5 rounded-xl bg-gray-50 p-4">
                <p className="text-sm text-gray-500">
                  가장 큰 지출
                </p>

                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {topExpense.label}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {formatWon(topExpense.amount)}원 · 전체의{" "}
                  {getPercentage(topExpense.amount)}%
                </p>
              </div>
            )}

            {/* 항목별 비용 */}
            <div className="mt-6 space-y-5">
              {categoryData.map((category) => (
                <div key={category.key}>
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="font-medium text-gray-700">
                      {category.label}
                    </span>

                    <span className="shrink-0 text-gray-500">
                      {formatWon(category.amount)}원 ·{" "}
                      {getPercentage(category.amount)}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gray-800"
                      style={{
                        width: `${Math.min(
                          getPercentage(category.amount),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      <div className="mt-8 space-y-3">
        {/* SEO 설명 콘텐츠 */}
            <section className="mt-6 space-y-3">
            {/* 이사 비용 계산기란? */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <button
                type="button"
                onClick={() =>
                    setOpenSection(
                    openSection === "about" ? null : "about"
                    )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                <h2 className="text-lg font-semibold text-gray-900">
                    📦 이사 비용 계산기란?
                </h2>

                <span className="ml-4 text-2xl font-light text-gray-500">
                    {openSection === "about" ? "−" : "+"}
                </span>
                </button>

                {openSection === "about" && (
                <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                    <p className="text-sm leading-7 text-gray-600">
                    이사 비용 계산기는 이사할 때 발생할 수 있는 다양한 비용을
                    한 번에 계산해볼 수 있는 계산기입니다.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                    이삿짐 운반비, 포장비, 사다리차 비용, 청소비,
                    폐기물 처리비, 부동산 중개보수, 기타 비용을 입력하면
                    예상되는 총 이사 비용을 확인할 수 있습니다.
                    </p>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                    실제 이사 비용은 이사 거리, 짐의 양, 작업 조건,
                    계약 조건 등에 따라 달라질 수 있으므로 계산 결과는
                    이사 예산을 계획하기 위한 참고용으로 활용해보세요.
                    </p>
                </div>
                )}
            </div>

            {/* 이사 비용 계산 방법 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <button
                type="button"
                onClick={() =>
                    setOpenSection(
                    openSection === "method" ? null : "method"
                    )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                <h2 className="text-lg font-semibold text-gray-900">
                    이사 비용 계산 방법
                </h2>

                <span className="ml-4 text-2xl font-light text-gray-500">
                    {openSection === "method" ? "−" : "+"}
                </span>
                </button>

                {openSection === "method" && (
                <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                    <p className="text-sm leading-7 text-gray-600">
                    예상 이사 비용은 입력한 각 비용 항목을 모두 더해서
                    계산합니다.
                    </p>

                    <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                    이삿짐 운반비 + 포장비 + 사다리차 비용 + 청소비
                    <br />
                    + 폐기물 처리비 + 부동산 중개보수 + 기타 비용
                    <br />
                    = 예상 이사 비용
                    </div>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                    이 계산기에서는 예상하지 못한 추가 비용에 대비할 수
                    있도록 입력한 비용의 10%를 예비비로 계산합니다.
                    </p>

                    <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                    예상 이사 비용 × 10%
                    <br />
                    = 예비비
                    <br />
                    <br />
                    예상 이사 비용 + 예비비
                    <br />
                    = 예비비 포함 예상 비용
                    </div>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                    예비비 10%는 이 계산기에서 사용하는 참고용 기준이며,
                    실제 이사에서 반드시 필요한 비용을 의미하지는 않습니다.
                    </p>
                </div>
                )}
            </div>

            {/* 어떤 비용을 입력할 수 있나요? */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <button
                type="button"
                onClick={() =>
                    setOpenSection(
                    openSection === "costs" ? null : "costs"
                    )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                <h2 className="text-lg font-semibold text-gray-900">
                    어떤 비용을 입력할 수 있나요?
                </h2>

                <span className="ml-4 text-2xl font-light text-gray-500">
                    {openSection === "costs" ? "−" : "+"}
                </span>
                </button>

                {openSection === "costs" && (
                <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                    <p className="text-sm leading-7 text-gray-600">
                    이사 비용 계산기에서는 이사 과정에서 발생할 수 있는
                    다양한 비용을 직접 입력할 수 있습니다.
                    </p>

                    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-gray-600">
                    <li>이삿짐 운반비</li>
                    <li>포장비</li>
                    <li>사다리차 비용</li>
                    <li>청소비</li>
                    <li>폐기물 처리비</li>
                    <li>부동산 중개보수</li>
                    <li>기타 비용</li>
                    </ul>

                    <p className="mt-4 text-sm leading-7 text-gray-600">
                    실제로 발생하지 않는 비용은 입력하지 않아도 됩니다.
                    해당하지 않는 항목은 비워두거나 0원으로 입력하면
                    됩니다.
                    </p>
                </div>
                )}
            </div>

            {/* 자주 묻는 질문 */}
            <div className="overflow-hidden rounded-2xl bg-white shadow-md">
                <button
                type="button"
                onClick={() =>
                    setOpenSection(
                    openSection === "faq" ? null : "faq"
                    )
                }
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                <h2 className="text-lg font-semibold text-gray-900">
                    자주 묻는 질문
                </h2>

                <span className="ml-4 text-2xl font-light text-gray-500">
                    {openSection === "faq" ? "−" : "+"}
                </span>
                </button>

                {openSection === "faq" && (
                <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                    <div className="space-y-5">
                    <div>
                        <h3 className="font-semibold text-gray-900">
                        Q. 이사 비용에는 어떤 항목이 포함되나요?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-gray-600">
                        이삿짐 운반비, 포장비, 사다리차 비용, 청소비,
                        폐기물 처리비, 부동산 중개보수, 기타 비용을
                        입력해서 계산할 수 있습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                        Q. 모든 항목을 입력해야 하나요?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-gray-600">
                        아닙니다. 실제로 발생하는 비용만 입력하면 됩니다.
                        해당하지 않는 항목은 비워두거나 0원으로 입력할 수
                        있습니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                        Q. 예비비 10%는 꼭 준비해야 하나요?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-gray-600">
                        꼭 필요한 비용이라는 의미는 아닙니다. 이 계산기에서는
                        예상하지 못한 추가 비용을 고려하기 위한 참고용으로
                        입력한 비용의 10%를 예비비로 계산합니다.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-900">
                        Q. 부동산 중개보수는 항상 발생하나요?
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-gray-600">
                        이사 방식이나 주거 형태에 따라 부동산 중개보수가
                        발생하지 않을 수도 있습니다. 해당되는 경우에만
                        예상 비용을 입력해서 계산하면 됩니다.
                        </p>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </section>
        </div>
    </CalculatorLayout>
  );
}

function InputRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const displayValue = value
    ? new Intl.NumberFormat("ko-KR").format(Number(value))
    : "";

  return (
    <div className="flex items-center gap-3">
      <label className="w-32 shrink-0 text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative flex-1">
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-right outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
          placeholder="0"
        />

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          원
        </span>
      </div>
    </div>
  );
}