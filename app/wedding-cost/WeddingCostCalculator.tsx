"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  venue: "",
  meal: "",
  guests: "",
  studio: "",
  dress: "",
  makeup: "",
  photography: "",
  weddingItems: "",
  honeymoon: "",
  rings: "",
  gifts: "",
  other: "",
};

const formatWon = (value: number) =>
  new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(Math.round(value));

export default function WeddingCostCalculator() {
  const [values, setValues] = useState(initialValues);

  const venue = Number(values.venue || 0);
  const meal = Number(values.meal || 0);
  const guests = Number(values.guests || 0);
  const studio = Number(values.studio || 0);
  const dress = Number(values.dress || 0);
  const makeup = Number(values.makeup || 0);
  const photography = Number(values.photography || 0);
  const weddingItems = Number(values.weddingItems || 0);
  const honeymoon = Number(values.honeymoon || 0);
  const rings = Number(values.rings || 0);
  const gifts = Number(values.gifts || 0);
  const other = Number(values.other || 0);

  const mealCost = meal * guests;

  const totalWeddingCost =
    venue +
    mealCost +
    studio +
    dress +
    makeup +
    photography +
    weddingItems +
    honeymoon +
    rings +
    gifts +
    other;

  const costItems = [
    {
      label: "예식장 대관료",
      amount: venue,
      color: "blue" as const,
    },
    {
      label: "식사 비용",
      amount: mealCost,
      color: "blue" as const,
    },
    {
      label: "스튜디오",
      amount: studio,
      color: "orange" as const,
    },
    {
      label: "드레스",
      amount: dress,
      color: "orange" as const,
    },
    {
      label: "메이크업",
      amount: makeup,
      color: "orange" as const,
    },
    {
      label: "사진·영상",
      amount: photography,
      color: "orange" as const,
    },
    {
      label: "웨딩용품",
      amount: weddingItems,
      color: "orange" as const,
    },
    {
      label: "신혼여행",
      amount: honeymoon,
      color: "emerald" as const,
    },
    {
      label: "예물·반지",
      amount: rings,
      color: "emerald" as const,
    },
    {
      label: "답례품",
      amount: gifts,
      color: "emerald" as const,
    },
    {
      label: "기타 비용",
      amount: other,
      color: "emerald" as const,
    },
  ];

  const sortedCostItems = [...costItems].sort(
    (a, b) => b.amount - a.amount
  );

  const largestCostItem = costItems.reduce(
    (largest, item) =>
      item.amount > largest.amount ? item : largest,
    costItems[0]
  );

  const getPercentage = (amount: number) => {
    if (totalWeddingCost === 0) {
      return 0;
    }

    return Math.round(
      (amount / totalWeddingCost) * 100
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
      venue: "3000000",
      meal: "70000",
      guests: "200",
      studio: "1000000",
      dress: "1500000",
      makeup: "500000",
      photography: "1000000",
      weddingItems: "1000000",
      honeymoon: "5000000",
      rings: "2000000",
      gifts: "1000000",
      other: "1000000",
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const resultReady =
    venue > 0 ||
    meal > 0 ||
    guests > 0 ||
    studio > 0 ||
    dress > 0 ||
    makeup > 0 ||
    photography > 0 ||
    weddingItems > 0 ||
    honeymoon > 0 ||
    rings > 0 ||
    gifts > 0 ||
    other > 0;

  return (
    <CalculatorLayout
      title="💍 결혼/웨딩 비용 계산기"
      description="예식장, 식사, 스드메, 신혼여행 등 결혼에 필요한 예상 비용을 계산해보세요."
      headerTitle="결혼/웨딩 비용"
    >
      {/* 입력 */}
      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          결혼·웨딩 조건 입력
        </h2>

        <p className="mt-1 mb-5 text-sm text-gray-500">
          결혼 준비와 예식에 필요한 비용을 입력해주세요.
        </p>

        <div className="space-y-4">
          <InputRow
            label="예식장 대관료"
            value={values.venue}
            unit="원"
            onChange={(value) =>
              updateValue("venue", value)
            }
          />

          <InputRow
            label="1인 식사비"
            value={values.meal}
            unit="원"
            onChange={(value) =>
              updateValue("meal", value)
            }
          />

          <InputRow
            label="하객 수"
            value={values.guests}
            unit="명"
            onChange={(value) =>
              updateValue("guests", value)
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            스드메·예식 준비
          </h3>

          <InputRow
            label="스튜디오"
            value={values.studio}
            unit="원"
            onChange={(value) =>
              updateValue("studio", value)
            }
          />

          <InputRow
            label="드레스"
            value={values.dress}
            unit="원"
            onChange={(value) =>
              updateValue("dress", value)
            }
          />

          <InputRow
            label="메이크업"
            value={values.makeup}
            unit="원"
            onChange={(value) =>
              updateValue("makeup", value)
            }
          />

          <InputRow
            label="사진·영상"
            value={values.photography}
            unit="원"
            onChange={(value) =>
              updateValue(
                "photography",
                value
              )
            }
          />

          <InputRow
            label="웨딩용품"
            value={values.weddingItems}
            unit="원"
            onChange={(value) =>
              updateValue(
                "weddingItems",
                value
              )
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            결혼 관련 추가 비용
          </h3>

          <InputRow
            label="신혼여행"
            value={values.honeymoon}
            unit="원"
            onChange={(value) =>
              updateValue(
                "honeymoon",
                value
              )
            }
          />

          <InputRow
            label="예물·반지"
            value={values.rings}
            unit="원"
            onChange={(value) =>
              updateValue("rings", value)
            }
          />

          <InputRow
            label="답례품"
            value={values.gifts}
            unit="원"
            onChange={(value) =>
              updateValue("gifts", value)
            }
          />

          <InputRow
            label="기타 비용"
            value={values.other}
            unit="원"
            onChange={(value) =>
              updateValue("other", value)
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
          <p className="text-2xl">💍</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            결혼하려면 얼마가 필요할까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            예식장과 식사비, 스드메, 신혼여행 등의 비용을 입력하면
            <br />
            결혼 준비에 필요한 예상 비용을 계산해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {resultReady && (
        <>
          <div className="mt-6 rounded-2xl bg-black p-4 text-white shadow-md sm:p-6">
            <div className="text-center">
              <p className="text-sm text-gray-300">
                결혼·웨딩 예상 비용
              </p>

              <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                {formatWon(totalWeddingCost)}원
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="rounded-xl bg-gray-900 px-3 py-4 text-center">
                <p className="text-xs text-gray-400">
                  하객 수
                </p>

                <p className="mt-2 text-sm font-semibold sm:text-base">
                  {formatWon(guests)}명
                </p>
              </div>

              <div className="rounded-xl bg-gray-900 px-3 py-4 text-center">
                <p className="text-xs text-gray-400">
                  예상 식사비
                </p>

                <p className="mt-2 text-sm font-semibold sm:text-base">
                  {formatWon(mealCost)}원
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              예식장, 식사, 스드메, 신혼여행 등 입력한 비용을 기준으로 계산했어요.
            </p>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">
              📊 결혼·웨딩 비용 분석
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

            <div className="mt-6 space-y-4">
              {sortedCostItems.map((item) => (
                <CostRow
                  key={item.label}
                  label={item.label}
                  amount={item.amount}
                  total={totalWeddingCost}
                  color={item.color}
                />
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">
              ※ 결혼 비용은 예식 규모, 하객 수, 지역,
              업체 선택 등에 따라 크게 달라질 수 있습니다.
              입력한 조건을 기준으로 한 참고용 예상값입니다.
            </p>
          </div>
        </>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-6 space-y-3">
        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            💍 결혼/웨딩 비용 계산기란?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p className="text-sm leading-7 text-gray-600">
            결혼을 준비할 때는 예식장 비용뿐만 아니라
            식사비, 스드메, 사진·영상, 신혼여행 등
            다양한 비용이 발생합니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            이 계산기는 결혼 준비 과정에서 예상되는 비용을
            항목별로 입력하고 전체 예산을 계산할 수 있도록
            도와줍니다.
          </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            결혼 비용은 어떻게 계산하나요?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p className="text-sm leading-7 text-gray-600">
            식사비는 1인 식사비에 예상 하객 수를 곱해 계산합니다.
          </p>

          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
            1인 식사비 × 하객 수
            <br />
            = 예상 식사비
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            전체 비용은 예식장, 식사, 스드메, 신혼여행,
            예물 등 입력한 항목을 모두 더해 계산합니다.
          </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            어떤 비용을 포함하나요?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <p className="text-sm leading-7 text-gray-600">
            예식장 대관료, 식사비, 스튜디오, 드레스,
            메이크업, 사진·영상, 웨딩용품, 신혼여행,
            예물·반지, 답례품, 기타 비용을 입력할 수 있습니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            실제 결혼 준비에서는 입력 항목 외에도 다양한
            비용이 발생할 수 있으므로 필요한 항목은
            기타 비용에 포함해 계산해보세요.
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
                Q. 식사비는 어떻게 계산하나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                1인 식사비와 예상 하객 수를 곱해 계산합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 신혼여행 비용도 포함할 수 있나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                네. 신혼여행 예상 비용을 별도로 입력할 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 결혼식에 필요한 모든 비용이 포함되나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                모든 결혼 비용을 자동으로 포함하는 것은 아닙니다.
                제공된 항목에 예상 비용을 입력하고,
                빠진 비용은 기타 비용에 입력할 수 있습니다.
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
    <div className="flex items-center gap-2 sm:gap-3">
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

      <span className="w-10 shrink-0 whitespace-nowrap text-right text-sm text-gray-500 sm:w-14">
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