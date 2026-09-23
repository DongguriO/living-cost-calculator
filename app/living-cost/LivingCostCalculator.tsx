"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  income: "",
  rent: "",
  maintenance: "",
  electricity: "",
  gas: "",
  phone: "",
  food: "",
  transport: "",
  etc: "",
};

type ExpenseGroup = "주거비" | "공과금" | "생활비";

const categories: {
  key: string;
  label: string;
  group: ExpenseGroup;
}[] = [
  { key: "rent", label: "월세", group: "주거비" },
  { key: "maintenance", label: "관리비", group: "주거비" },
  { key: "electricity", label: "전기요금", group: "공과금" },
  { key: "gas", label: "가스요금", group: "공과금" },
  { key: "phone", label: "통신비", group: "공과금" },
  { key: "food", label: "식비", group: "생활비" },
  { key: "transport", label: "교통비", group: "생활비" },
  { key: "etc", label: "기타", group: "생활비" },
];

const groupStyles = {
  주거비: {
    text: "text-blue-600",
    bar: "bg-blue-500",
  },
  공과금: {
    text: "text-orange-600",
    bar: "bg-orange-500",
  },
  생활비: {
    text: "text-emerald-600",
    bar: "bg-emerald-500",
  },
} as const;

export default function Home() {
  const [values, setValues] = useState(initialValues);

  const income = Number(values.income || 0);

  const total = Object.entries(values).reduce(
    (sum, [key, value]) =>
      key === "income" ? sum : sum + Number(value || 0),
    0
  );

  const yearlyTotal = total * 12;
  const remainingMoney = income - total;
  const savingRate =
    income > 0 ? Math.round((remainingMoney / income) * 1000) / 10 : 0;

  const updateValue = (key: keyof typeof values, value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, "");

    setValues((prev) => ({
      ...prev,
      [key]: onlyNumbers,
    }));
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const fillExampleValues = () => {
    setValues({
      income: "2500000",
      rent: "500000",
      maintenance: "100000",
      electricity: "50000",
      gas: "50000",
      phone: "60000",
      food: "400000",
      transport: "100000",
      etc: "100000",
    });
  };

  const formatWon = (value: number) =>
    new Intl.NumberFormat("ko-KR").format(value);

  const getPercentage = (value: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 1000) / 10;
  };

  const expenseData = categories
    .map((category) => ({
      ...category,
      amount: Number(values[category.key as keyof typeof values] || 0),
    }))
    .filter((category) => category.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const housingCost =
    Number(values.rent || 0) + Number(values.maintenance || 0);

  const housingPercentage = getPercentage(housingCost);

  const utilityCost =
    Number(values.electricity || 0) +
    Number(values.gas || 0) +
    Number(values.phone || 0);

  const livingCost =
    Number(values.food || 0) +
    Number(values.transport || 0) +
    Number(values.etc || 0);

  const utilityPercentage = getPercentage(utilityCost);
  const livingPercentage = getPercentage(livingCost);

  const topExpense = expenseData[0];

  return (
    <CalculatorLayout
      title="🏠 자취 생활비 계산기"
      description="한 달 생활비를 계산하고 지출 비중도 확인해보세요"
      headerTitle="생활비 계산기"
    >
      {/* 입력 영역 */}
      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <h2 className="mb-5 text-xl font-semibold text-gray-900">
          월 생활비 입력
        </h2>

        <div className="space-y-4">
          <InputRow
            label="월 수입"
            value={values.income}
            onChange={(value) => updateValue("income", value)}
          />

          <InputRow
            label="월세"
            value={values.rent}
            onChange={(value) => updateValue("rent", value)}
          />

          <InputRow
            label="관리비"
            value={values.maintenance}
            onChange={(value) => updateValue("maintenance", value)}
          />

          <InputRow
            label="전기요금"
            value={values.electricity}
            onChange={(value) => updateValue("electricity", value)}
          />

          <InputRow
            label="가스요금"
            value={values.gas}
            onChange={(value) => updateValue("gas", value)}
          />

          <InputRow
            label="통신비"
            value={values.phone}
            onChange={(value) => updateValue("phone", value)}
          />

          <InputRow
            label="식비"
            value={values.food}
            onChange={(value) => updateValue("food", value)}
          />

          <InputRow
            label="교통비"
            value={values.transport}
            onChange={(value) => updateValue("transport", value)}
          />

          <InputRow
            label="기타"
            value={values.etc}
            onChange={(value) => updateValue("etc", value)}
          />
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

      {/* 총액 */}
      {/* 입력 전 */}
      {total === 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-md">
          <p className="text-2xl">🏠</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            내 월 생활비는 얼마일까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            위의 생활비 정보를 입력하면
            <br />
            예상 월 생활비를 계산해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {total > 0 && (
        <div className="mt-6 rounded-2xl bg-black p-4 text-white shadow-md sm:p-6">
          <div className="text-center">
            <p className="text-sm text-gray-300">
              예상 월 생활비
            </p>

            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {formatWon(total)}원
            </p>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 sm:gap-3">
            <div className="rounded-xl bg-gray-900 px-1 py-4 text-center">
              <p className="text-xs text-gray-400">
                연간 생활비
              </p>

              <p className="mt-2 text-sm font-semibold sm:text-base">
                {formatWon(yearlyTotal)}원
              </p>
            </div>

            <div className="rounded-xl bg-gray-900 px-1 py-4 text-center">
              <p className="text-xs text-gray-400">
                {remainingMoney < 0 ? "초과 지출" : "남는 돈"}
              </p>

              <p
                className={`mt-2 text-sm font-semibold sm:text-base ${
                  remainingMoney < 0 ? "text-red-400" : "text-white"
                }`}
              >
                {remainingMoney < 0 ? "-" : ""}
                {formatWon(Math.abs(remainingMoney))}원
              </p>
            </div>

            <div className="rounded-xl bg-gray-900 px-1 py-4 text-center">
              <p className="text-xs text-gray-400">
                저축률
              </p>

              <p
                className={`mt-2 text-sm font-semibold sm:text-base ${
                  savingRate < 0 ? "text-red-400" : "text-white"
                }`}
              >
                {savingRate}%
              </p>
            </div>
          </div>
          {remainingMoney < 0 && (
            <div className="mt-4 rounded-xl bg-red-950/40 px-4 py-3 text-center">
              <p className="text-sm font-medium text-red-300">
                입력한 생활비가 월 수입보다 많아요.
              </p>

              <p className="mt-1 text-xs leading-5 text-red-200/70">
                지출 항목을 다시 확인하거나 생활비를 줄여보세요.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 분석 */}
      {total > 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">
            📊 생활비 분석
          </h2>

          {/* 가장 큰 지출 */}
          {topExpense && (
            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                가장 큰 지출
              </p>

              <div className="mt-2 flex items-end justify-between gap-3">
                <p className="text-lg font-semibold text-gray-900">
                  {topExpense.label}
                </p>

                <p className="shrink-0 text-sm font-medium text-gray-700">
                  {getPercentage(topExpense.amount)}%
                </p>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {formatWon(topExpense.amount)}원
              </p>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-black"
                  style={{
                    width: `${Math.min(
                      getPercentage(topExpense.amount),
                      100
                    )}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-gray-400">
                전체 생활비에서 차지하는 비중
              </p>
            </div>
          )}

          {/* 주거비 / 공과금 / 생활비 */}
          <div className="mt-5 space-y-3 sm:grid sm:grid-cols-3 sm:gap-3 sm:space-y-0">
            <div className="rounded-xl bg-gray-50 px-4 py-3 sm:p-4 sm:text-center">
              <div className="flex items-center justify-between sm:block">
                <p className="text-base font-semibold text-gray-800">
                  주거비
                </p>

                <p className="font-semibold text-blue-600 sm:mt-1">
                  {formatWon(housingCost)}원
                </p>
              </div>

              <p className="mt-1 text-right text-xs text-gray-500 sm:text-center">
                {housingPercentage}%
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 sm:p-4 sm:text-center">
              <div className="flex items-center justify-between sm:block">
                <p className="text-base font-semibold text-gray-800">
                  공과금
                </p>

                <p className="font-semibold text-orange-600 sm:mt-1">
                  {formatWon(utilityCost)}원
                </p>
              </div>

              <p className="mt-1 text-right text-xs text-gray-500 sm:text-center">
                {utilityPercentage}%
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 px-4 py-3 sm:p-4 sm:text-center">
              <div className="flex items-center justify-between sm:block">
                <p className="text-base font-semibold text-gray-800">
                  생활비
                </p>

                <p className="font-semibold text-emerald-600 sm:mt-1">
                  {formatWon(livingCost)}원
                </p>
              </div>

              <p className="mt-1 text-right text-xs text-gray-500 sm:text-center">
                {livingPercentage}%
              </p>
            </div>
          </div>


          {/* 항목별 지출 */}
          <div className="mt-6 space-y-4">
            {expenseData.map((expense) => {
              const style = groupStyles[expense.group];

              return (
                <div key={expense.key}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">
                      {expense.label}
                    </span>

                    <span className={`font-medium ${style.text}`}>
                      {formatWon(expense.amount)}원 ·{" "}
                      {getPercentage(expense.amount)}%
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className={`h-full rounded-full ${style.bar}`}
                      style={{
                        width: `${Math.min(
                          getPercentage(expense.amount),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SEO 설명 콘텐츠 */}
      <section className="mt-6 space-y-3">
        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            자취 생활비 계산기란?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
            <p className="text-sm leading-7 text-gray-600">
              자취를 시작하면 월세뿐만 아니라 관리비, 전기요금, 가스요금,
              통신비, 식비, 교통비 등 다양한 생활비가 발생합니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              자취 생활비 계산기는 매달 발생하는 지출을 직접 입력해서 예상 월
              생활비와 연간 생활비를 계산해볼 수 있는 계산기입니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              월 수입을 함께 입력하면 생활비를 제외하고 매달 얼마가 남는지와
              저축률도 함께 확인할 수 있습니다.
            </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            자취 생활비 계산 방법
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
            <p className="text-sm leading-7 text-gray-600">
              예상 월 생활비는 입력한 월 지출 항목을 모두 더해서 계산합니다.
            </p>

            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
              월세 + 관리비 + 전기요금 + 가스요금 + 통신비 + 식비 + 교통비 + 기타 비용
              <br />
              = 예상 월 생활비
            </div>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              예상 연간 생활비는 예상 월 생활비에 12개월을 곱해서 계산합니다.
            </p>

            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
              예상 월 생활비 × 12
              <br />
              = 예상 연간 생활비
            </div>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              월 수입을 입력하면 월 수입에서 생활비를 제외하고 남는 금액과
              저축률도 확인할 수 있습니다.
            </p>

            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
              월 수입 - 예상 월 생활비
              <br />
              = 월 수입에서 남는 돈
              <br />
              <br />
              (월 수입에서 남는 돈 ÷ 월 수입) × 100
              <br />
              = 저축률
            </div>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            어떤 비용을 입력할 수 있나요?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
            <p className="text-sm leading-7 text-gray-600">
              월세와 관리비 같은 주거비, 전기요금·가스요금·통신비 같은 공과금,
              식비·교통비·기타 비용을 각각 입력할 수 있습니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              본인의 실제 지출 금액을 입력하면 현재 생활 패턴에 맞는 월 생활비를
              확인할 수 있습니다.
            </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            자주 묻는 질문
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 자취 생활비에는 어떤 비용이 포함되나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  월세, 관리비, 전기요금, 가스요금, 통신비, 식비, 교통비,
                  기타 비용을 입력해서 계산할 수 있습니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 월세가 없어도 계산할 수 있나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  네. 사용하지 않는 항목은 0원으로 두고 필요한 비용만 입력하면
                  됩니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 월 수입을 입력하지 않아도 되나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  네. 월 수입을 입력하지 않아도 예상 월 생활비와 연간 생활비를
                  계산할 수 있습니다. 다만 월 수입에서 남는 돈과 저축률을
                  확인하려면 월 수입을 입력해야 합니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 자취 생활비는 사람마다 다른가요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  네. 주거 형태, 식사 습관, 교통수단, 통신비 등 개인의 생활
                  방식에 따라 실제 생활비는 달라질 수 있습니다. 이 계산기는
                  직접 입력한 금액을 기준으로 계산합니다.
                </p>
              </div>
            </div>
          </div>
        </details>
      </section>
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
    <div className="flex items-center gap-2 sm:gap-4">
      <label className="w-[104px] shrink-0 whitespace-nowrap text-sm font-medium text-gray-700 sm:w-24">
        {label}
      </label>

      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-3 text-right outline-none transition focus:border-black sm:px-4"
      />

      <span className="w-6 shrink-0 text-right text-sm text-gray-500">
        원
      </span>
    </div>
  );
}