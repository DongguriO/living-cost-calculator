"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  delivery: "",
  hospital: "",
  postpartum: "",
  babyItems: "",
  feeding: "",
  diapers: "",
  clothing: "",
  childcare: "",
  education: "",
  medical: "",
  monthlyOther: "",
  months: "12",
};

const formatWon = (value: number) =>
  new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export default function ChildcareCostCalculator() {
  const [values, setValues] = useState(initialValues);

  const delivery = Number(values.delivery || 0);
  const hospital = Number(values.hospital || 0);
  const postpartum = Number(values.postpartum || 0);
  const babyItems = Number(values.babyItems || 0);
  const feeding = Number(values.feeding || 0);
  const diapers = Number(values.diapers || 0);
  const clothing = Number(values.clothing || 0);
  const childcare = Number(values.childcare || 0);
  const education = Number(values.education || 0);
  const medical = Number(values.medical || 0);
  const monthlyOther = Number(values.monthlyOther || 0);
  const months = Number(values.months || 0);

  const monthlyBasicCost =
    feeding +
    diapers +
    clothing +
    childcare +
    education +
    medical +
    monthlyOther;

  const initialCost =
    delivery +
    hospital +
    postpartum +
    babyItems;

  const monthlyChildcareCost =
    monthlyBasicCost;

  const totalMonthlyCost =
    monthlyChildcareCost * months;

  const totalChildcareCost =
    initialCost +
    totalMonthlyCost;

  const costItems = [
    {
      label: "출산 관련 비용",
      amount: delivery,
      color: "blue" as const,
    },
    {
      label: "병원·진료비",
      amount: hospital,
      color: "blue" as const,
    },
    {
      label: "산후조리 비용",
      amount: postpartum,
      color: "blue" as const,
    },
    {
      label: "육아용품",
      amount: babyItems,
      color: "blue" as const,
    },
    {
      label: "수유·식비",
      amount: feeding * months,
      color: "emerald" as const,
    },
    {
      label: "기저귀",
      amount: diapers * months,
      color: "emerald" as const,
    },
    {
      label: "의류",
      amount: clothing * months,
      color: "emerald" as const,
    },
    {
      label: "보육비",
      amount: childcare * months,
      color: "orange" as const,
    },
    {
      label: "교육비",
      amount: education * months,
      color: "orange" as const,
    },
    {
      label: "의료비",
      amount: medical * months,
      color: "orange" as const,
    },
    {
      label: "기타 생활비",
      amount: monthlyOther * months,
      color: "emerald" as const,
    },
  ];

  const sortedCostItems = [...costItems].sort(
    (a, b) => b.amount - a.amount
  );

  const largestCostItem = costItems.reduce(
    (largest, item) =>
      item.amount > largest.amount
        ? item
        : largest,
    costItems[0]
  );

  const getPercentage = (amount: number) => {
    if (totalChildcareCost === 0) {
      return 0;
    }

    return Math.round(
      (amount / totalChildcareCost) * 100
    );
  };

  const updateValue = (
    key: keyof typeof values,
    value: string
  ) => {
    const filteredValue = value.replace(
      /[^0-9]/g,
      ""
    );

    setValues((prev) => ({
      ...prev,
      [key]: filteredValue,
    }));
  };

  const fillExampleValues = () => {
    setValues({
      delivery: "1000000",
      hospital: "500000",
      postpartum: "2500000",
      babyItems: "3000000",
      feeding: "200000",
      diapers: "100000",
      clothing: "50000",
      childcare: "300000",
      education: "100000",
      medical: "50000",
      monthlyOther: "100000",
      months: "12",
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };


  const resultReady =
    delivery > 0 ||
    hospital > 0 ||
    postpartum > 0 ||
    babyItems > 0 ||
    monthlyBasicCost > 0;

  return (
    <CalculatorLayout
      title="👶 출산·육아 비용 계산기"
      description="출산과 초기 육아에 필요한 비용을 입력해 예상 지출을 계산해보세요."
      headerTitle="출산·육아 비용"
    >
      {/* 입력 */}
      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          출산·육아 조건 입력
        </h2>

        <p className="mt-1 mb-5 text-sm text-gray-500">
          출산에 필요한 초기 비용과 월별 육아비용을 입력해주세요.
        </p>

        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900">
            출산·초기 비용
          </h3>

          <InputRow
            label="출산 관련 비용"
            value={values.delivery}
            unit="원"
            onChange={(value) =>
              updateValue("delivery", value)
            }
          />

          <InputRow
            label="병원·진료비"
            value={values.hospital}
            unit="원"
            onChange={(value) =>
              updateValue("hospital", value)
            }
          />

          <InputRow
            label="산후조리 비용"
            value={values.postpartum}
            unit="원"
            onChange={(value) =>
              updateValue(
                "postpartum",
                value
              )
            }
          />

          <InputRow
            label="육아용품"
            value={values.babyItems}
            unit="원"
            onChange={(value) =>
              updateValue(
                "babyItems",
                value
              )
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            월별 육아비용
          </h3>

          <InputRow
            label="수유·식비"
            value={values.feeding}
            unit="원/월"
            onChange={(value) =>
              updateValue("feeding", value)
            }
          />

          <InputRow
            label="기저귀"
            value={values.diapers}
            unit="원/월"
            onChange={(value) =>
              updateValue("diapers", value)
            }
          />

          <InputRow
            label="의류"
            value={values.clothing}
            unit="원/월"
            onChange={(value) =>
              updateValue("clothing", value)
            }
          />

          <InputRow
            label="보육비"
            value={values.childcare}
            unit="원/월"
            onChange={(value) =>
              updateValue(
                "childcare",
                value
              )
            }
          />

          <InputRow
            label="교육비"
            value={values.education}
            unit="원/월"
            onChange={(value) =>
              updateValue(
                "education",
                value
              )
            }
          />

          <InputRow
            label="의료비"
            value={values.medical}
            unit="원/월"
            onChange={(value) =>
              updateValue(
                "medical",
                value
              )
            }
          />

          <InputRow
            label="기타 생활비"
            value={values.monthlyOther}
            unit="원/월"
            onChange={(value) =>
              updateValue(
                "monthlyOther",
                value
              )
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            계산 기간
          </h3>

          <InputRow
            label="계산 기간"
            value={values.months}
            unit="개월"
            onChange={(value) =>
              updateValue("months", value)
            }
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

      {/* 입력 전 */}
      {!resultReady && (
        <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-md">
          <p className="text-2xl">👶</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            출산과 육아에는 얼마가 필요할까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            출산에 필요한 초기 비용과 월별 육아비용을 입력하면
            설정한 기간 동안의 예상 비용을 계산해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {resultReady && (
        <>
          <div className="mt-6 rounded-2xl bg-black p-4 text-white shadow-md sm:p-6">
            <div className="text-center">
              <p className="text-sm text-gray-300">
                {months}개월 예상 출산·육아 비용
              </p>

              <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                {formatWon(totalChildcareCost)}원
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-xl bg-gray-900 px-3 py-4 text-center">
                <p className="text-xs text-gray-400">
                  초기 비용
                </p>

                <p className="mt-2 text-sm font-semibold sm:text-base">
                  {formatWon(initialCost)}원
                </p>
              </div>

              <div className="rounded-xl bg-gray-900 px-3 py-4 text-center">
                <p className="text-xs text-gray-400">
                  월 예상 육아비용
                </p>

                <p className="mt-2 text-sm font-semibold sm:text-base">
                  {formatWon(monthlyChildcareCost)}원
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              초기 비용과 입력한 월별 육아비용을 계산 기간만큼 반영했어요.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-4 shadow-md sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900">
              📊 출산·육아 비용 분석
            </h2>

            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                가장 큰 비용 항목
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {largestCostItem.label}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {formatWon(largestCostItem.amount)}원 · 전체의{" "}
                {getPercentage(largestCostItem.amount)}%
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                초기 비용
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatWon(initialCost)}원
              </p>

              <p className="mt-1 text-sm text-gray-600">
                출산·병원·산후조리·육아용품
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {sortedCostItems.map((item) => (
                <CostRow
                  key={item.label}
                  label={item.label}
                  amount={item.amount}
                  total={totalChildcareCost}
                  color={item.color}
                />
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">
              ※ 실제 출산·육아 비용은 가정의 상황,
              이용하는 서비스, 자녀의 성장 단계 등에 따라
              달라질 수 있습니다. 입력한 조건을 기준으로 한
              참고용 예상값입니다.
            </p>
          </div>
        </>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-6 space-y-3">
        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            👶 출산·육아 비용 계산기란?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <p className="text-sm leading-7 text-gray-600">
              출산을 준비할 때는 병원비와 산후조리 비용,
              육아용품 등 초기 비용이 발생할 수 있습니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              출산 이후에도 수유·식비, 기저귀, 의류,
              보육비, 교육비, 의료비 등 다양한 지출이
              지속적으로 발생할 수 있습니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              이 계산기는 초기 비용과 월별 비용을 입력해
              설정한 기간 동안 필요한 예상 비용을 계산합니다.
            </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            출산·육아 비용은 어떻게 계산하나요?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p className="text-sm leading-7 text-gray-600">
            먼저 출산과 관련된 초기 비용을 합산합니다.
          </p>

          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
            출산 관련 비용
            <br />
            + 병원·진료비
            <br />
            + 산후조리 비용
            <br />
            + 육아용품
            <br />
            = 초기 비용
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            이후 월별 육아비용을 합산하고 계산 기간을 곱합니다.
          </p>

          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
            월별 육아비용 × 계산 기간
            <br />
            = 기간 동안의 육아비용
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            초기 비용과 기간 동안의 육아비용을 합산해
            전체 예상 비용을 계산합니다.
          </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            어떤 비용을 포함하나요?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p className="text-sm leading-7 text-gray-600">
            초기 비용으로 출산 관련 비용, 병원·진료비,
            산후조리 비용, 육아용품을 입력할 수 있습니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            월별 비용으로 수유·식비, 기저귀, 의류,
            보육비, 교육비, 의료비, 기타 생활비를
            입력할 수 있습니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            실제 가정에서 발생하는 비용 중 입력 항목에
            해당하지 않는 비용은 기타 생활비에 포함해
            계산할 수 있습니다.
          </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            자주 묻는 질문
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <div className="space-y-5">
            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 계산 기간은 몇 개월로 설정하면 되나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                원하는 기간을 직접 입력하면 됩니다.
                예를 들어 12개월을 입력하면 초기 비용과
                월별 육아비용 12개월분을 합산합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 정부지원금이나 수당도 반영되나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                현재 계산에는 지원금이나 수당을 자동으로
                반영하지 않습니다. 입력한 실제 지출 예상액을
                기준으로 계산합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 아이가 성장하면 비용이 달라지지 않나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                맞습니다. 아이의 성장 단계에 따라 필요한
                비용이 달라질 수 있습니다. 현재 계산기는
                입력한 월별 비용이 계산 기간 동안 동일하다고
                가정합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 육아용품은 월별 비용인가요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                아닙니다. 육아용품은 초기 비용으로 한 번
                입력하고 계산합니다.
              </p>
            </div>
          </div>
          </div>
        </details>

      </section>
    </CalculatorLayout>
  );
}

function formatInputValue(value: string) {
  if (!value) return "";

  return new Intl.NumberFormat("ko-KR").format(
    Number(value)
  );
}

function InputRow({
  label,
  value,
  unit,
  onChange,
}: {
  label: string;
  value: string;
  unit: string;
  onChange: (value: string) => void;
}) {
  const displayValue = formatInputValue(value);

  return (
    <div className="flex items-center gap-1 sm:gap-3">
        <label className="w-[104px] shrink-0 whitespace-nowrap text-sm font-medium text-gray-700 sm:w-28">
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

        <span className="w-9 shrink-0 whitespace-nowrap text-right text-sm text-gray-500 sm:w-14">
            {unit}
        </span>
    </div>
  );
}

function CostRow({
  label,
  amount,
  total,
  color,
}: {
  label: string;
  amount: number;
  total: number;
  color: "blue" | "orange" | "emerald";
}) {
  const percentage =
    total > 0
      ? Math.round((amount / total) * 1000) / 10
      : 0;

  const colorStyles = {
    blue: {
      text: "text-blue-600",
      bar: "bg-blue-500",
    },
    orange: {
      text: "text-orange-600",
      bar: "bg-orange-500",
    },
    emerald: {
      text: "text-emerald-600",
      bar: "bg-emerald-500",
    },
  };

  const style = colorStyles[color];

  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="min-w-0 font-medium text-gray-700">
          {label}
        </span>

        <span
          className={`shrink-0 whitespace-nowrap font-medium ${style.text}`}
        >
          {formatWon(amount)}원 · {percentage}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full ${style.bar}`}
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}