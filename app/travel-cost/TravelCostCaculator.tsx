"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  days: "",
  people: "",
  transportation: "",
  accommodation: "",
  food: "",
  activities: "",
  shoppingEtc: "",
};

export default function TravelCostCalculator() {
  const [values, setValues] = useState(initialValues);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const days = Number(values.days || 0);
  const people = Number(values.people || 0);

  const transportation = Number(values.transportation || 0);
  const accommodation = Number(values.accommodation || 0);
  const food = Number(values.food || 0);
  const activities = Number(values.activities || 0);
  const shoppingEtc = Number(values.shoppingEtc || 0);

  const totalCost =
    transportation +
    accommodation +
    food +
    activities +
    shoppingEtc;

  const costItems = [
    {
      label: "교통비",
      amount: transportation,
    },
    {
      label: "숙박비",
      amount: accommodation,
    },
    {
      label: "식비",
      amount: food,
    },
    {
      label: "관광·체험비",
      amount: activities,
    },
    {
      label: "쇼핑·기타비",
      amount: shoppingEtc,
    },
  ];

  const largestCostItem = costItems.reduce(
    (largest, item) =>
      item.amount > largest.amount ? item : largest,
    costItems[0]
  );

  const largestCostPercentage =
    totalCost > 0
      ? Math.round(
          (largestCostItem.amount / totalCost) * 1000
        ) / 10
      : 0;

  const perPersonCost =
    people > 0 ? totalCost / people : 0;

  const dailyCost =
    days > 0 ? totalCost / days : 0;

  // 예비비는 총 여행비의 10%로 계산
  const contingencyCost = totalCost * 0.1;
  const estimatedCostWithContingency =
    totalCost + contingencyCost;

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

  const resetValues = () => {
    setValues(initialValues);
  };

  const fillExampleValues = () => {
    setValues({
      days: "4",
      people: "2",
      transportation: "300000",
      accommodation: "400000",
      food: "300000",
      activities: "150000",
      shoppingEtc: "100000",
    });
  };

  const formatWon = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0,
    }).format(Math.round(value));

  return (
    <CalculatorLayout
      title="✈️ 여행 예산 계산기"
      description="여행 기간과 인원을 입력하고 예상 여행비를 간편하게 계산해보세요."
      headerTitle="여행 예산 계산기"
    >
      {/* 기본 여행 정보 */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">
          기본 여행 정보
        </h2>

        <p className="mt-1 mb-5 text-sm text-gray-500">
          여행 기간과 여행 인원을 입력해주세요.
        </p>

        <div className="space-y-4">
          <InputRow
            label="여행 기간"
            value={values.days}
            unit="일"
            onChange={(value) =>
              updateValue("days", value)
            }
          />

          <InputRow
            label="여행 인원"
            value={values.people}
            unit="명"
            onChange={(value) =>
              updateValue("people", value)
            }
          />
        </div>

        <div className="my-6 h-px bg-gray-200" />

        <h2 className="text-xl font-semibold text-gray-900">
          여행 비용
        </h2>

        <p className="mt-1 mb-5 text-sm text-gray-500">
          여행 전체에서 예상되는 비용을 항목별로 입력해주세요.
        </p>

        <div className="space-y-4">
          <InputRow
            label="교통비"
            value={values.transportation}
            unit="원"
            onChange={(value) =>
              updateValue("transportation", value)
            }
          />

          <InputRow
            label="숙박비"
            value={values.accommodation}
            unit="원"
            onChange={(value) =>
              updateValue("accommodation", value)
            }
          />

          <InputRow
            label="식비"
            value={values.food}
            unit="원"
            onChange={(value) =>
              updateValue("food", value)
            }
          />

          <InputRow
            label="관광·체험비"
            value={values.activities}
            unit="원"
            onChange={(value) =>
              updateValue("activities", value)
            }
          />

          <InputRow
            label="쇼핑·기타비"
            value={values.shoppingEtc}
            unit="원"
            onChange={(value) =>
              updateValue("shoppingEtc", value)
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

      {/* 입력 전 안내 */}
      {totalCost === 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-md">
          <p className="text-2xl">✈️</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            이번 여행에는 얼마가 필요할까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            여행 기간과 인원, 예상 비용을 입력하면
            <br />
            총 여행비와 1인당 비용을 계산해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {totalCost > 0 && (
        <>
          <div className="mt-6 rounded-2xl bg-black p-6 text-center text-white shadow-md">
            <p className="text-sm text-gray-300">
              총 예상 여행비
            </p>

            <p className="mt-2 text-4xl font-bold">
              {formatWon(totalCost)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              입력한 여행 비용을 모두 합산한 금액이에요.
            </p>

            <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

            <p className="text-sm text-gray-300">
              1인당 여행비
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {people > 0
                ? `${formatWon(perPersonCost)}원`
                : "인원을 입력해주세요"}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              총 여행비 ÷ 여행 인원
            </p>

            <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

            <p className="text-sm text-gray-300">
              하루 평균 비용
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {days > 0
                ? `${formatWon(dailyCost)}원`
                : "여행 기간을 입력해주세요"}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              총 여행비 ÷ 여행 기간
            </p>

            <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

            <p className="text-sm text-gray-300">
              예비비 포함 예상 비용
            </p>

            <p className="mt-2 text-2xl font-semibold">
              {formatWon(estimatedCostWithContingency)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              총 여행비 + 예비비 10%
            </p>
          </div>

          {/* 비용 분석 */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">
              💳 여행 비용 분석
            </h2>

            {/* 가장 큰 지출 */}
            <div className="mt-5 rounded-xl bg-gray-50 p-5">
              <p className="text-sm text-gray-500">
                가장 큰 지출
              </p>

              <p className="mt-1 text-xl font-semibold text-gray-900">
                {largestCostItem.label}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {formatWon(largestCostItem.amount)}원 · 전체의{" "}
                {largestCostPercentage}%
              </p>
            </div>

            {/* 항목별 비용 */}
            <div className="mt-5 space-y-4">
              <CostRow
                label="교통비"
                amount={transportation}
                total={totalCost}
              />

              <CostRow
                label="숙박비"
                amount={accommodation}
                total={totalCost}
              />

              <CostRow
                label="식비"
                amount={food}
                total={totalCost}
              />

              <CostRow
                label="관광·체험비"
                amount={activities}
                total={totalCost}
              />

              <CostRow
                label="쇼핑·기타비"
                amount={shoppingEtc}
                total={totalCost}
              />
            </div>
          </div>
        </>
      )}

      {/* SEO 설명 콘텐츠 */}
      <section className="mt-6 space-y-3">
        {/* 여행 예산 계산기란? */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection === "about"
                  ? null
                  : "about"
              )
            }
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              여행 예산 계산기란?
            </h2>

            <span className="ml-4 text-2xl font-light text-gray-500">
              {openSection === "about" ? "−" : "+"}
            </span>
          </button>

          {openSection === "about" && (
            <div className="border-t border-gray-100 px-6 pb-6 pt-5">
              <p className="text-sm leading-7 text-gray-600">
                여행을 계획할 때는 교통비, 숙박비, 식비뿐만
                아니라 관광이나 체험, 쇼핑 등 다양한 비용이
                발생합니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                여행 예산 계산기는 여행 기간과 인원을 입력하고
                예상되는 비용을 항목별로 입력해 전체 여행에
                필요한 예상 비용을 계산할 수 있는 계산기입니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                총 여행비뿐만 아니라 1인당 여행비와 하루 평균
                비용, 예비비를 포함한 예상 비용까지 함께
                확인할 수 있습니다.
              </p>
            </div>
          )}
        </div>

        {/* 여행비 계산 방법 */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection === "method"
                  ? null
                  : "method"
              )
            }
            className="flex w-full items-center justify-between px-6 py-5 text-left"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              여행비 계산 방법
            </h2>

            <span className="ml-4 text-2xl font-light text-gray-500">
              {openSection === "method" ? "−" : "+"}
            </span>
          </button>

          {openSection === "method" && (
            <div className="border-t border-gray-100 px-6 pb-6 pt-5">
              <p className="text-sm leading-7 text-gray-600">
                총 여행비는 입력한 교통비, 숙박비, 식비,
                관광·체험비, 쇼핑·기타비를 모두 합산해서
                계산합니다.
              </p>

              <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                교통비 + 숙박비 + 식비 + 관광·체험비 +
                쇼핑·기타비
                <br />
                = 총 여행비
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                1인당 여행비는 총 여행비를 여행 인원으로
                나누어 계산합니다.
              </p>

              <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                총 여행비 ÷ 여행 인원
                <br />
                = 1인당 여행비
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                하루 평균 비용은 총 여행비를 여행 기간으로
                나누어 계산합니다.
              </p>

              <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                총 여행비 ÷ 여행 기간
                <br />
                = 하루 평균 비용
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-600">
                예비비 포함 예상 비용은 예상하지 못한 추가
                지출을 고려해 총 여행비에 10%의 예비비를
                더한 금액입니다.
              </p>

              <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                총 여행비 × 10%
                <br />
                = 예비비
                <br />
                <br />
                총 여행비 + 예비비
                <br />
                = 예비비 포함 예상 비용
              </div>
            </div>
          )}
        </div>

        {/* 어떤 비용을 입력할 수 있나요? */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <button
            type="button"
            onClick={() =>
              setOpenSection(
                openSection === "costs"
                  ? null
                  : "costs"
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
                교통비에는 항공권, 기차, 버스, 렌터카,
                대중교통 등 여행에 필요한 교통 관련 비용을
                입력할 수 있습니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                숙박비에는 호텔, 리조트, 펜션, 게스트하우스
                등의 예상 숙박 비용을 입력할 수 있습니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                식비에는 여행 중 식사와 음료 등에 사용할
                것으로 예상되는 금액을 입력합니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                관광·체험비에는 관광지 입장료, 투어,
                액티비티 등의 비용을 입력할 수 있습니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                쇼핑·기타비에는 쇼핑, 기념품 및 위 항목에
                포함되지 않는 기타 비용을 입력할 수 있습니다.
              </p>

              <p className="mt-3 text-sm leading-7 text-gray-600">
                모든 항목을 정확히 알지 못해도 괜찮습니다.
                알고 있는 비용만 입력하고 나머지는 0원으로
                두어도 계산할 수 있습니다.
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
                openSection === "faq"
                  ? null
                  : "faq"
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
                    Q. 여행 기간과 인원을 꼭 입력해야 하나요?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    총 여행비만 계산하는 경우에는 여행 기간과
                    인원이 없어도 비용을 합산할 수 있습니다.
                    다만 1인당 여행비와 하루 평균 비용을
                    계산하려면 각각 여행 인원과 기간을 입력해야
                    합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Q. 교통비와 숙박비는 1인당 금액을 입력하나요?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    이 계산기는 여행 전체에서 예상되는 비용을
                    기준으로 계산합니다. 따라서 교통비와
                    숙박비를 포함한 각 항목에는 여행 전체에서
                    사용할 것으로 예상되는 금액을 입력해주세요.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Q. 예비비는 어떻게 계산되나요?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    예상하지 못한 추가 지출을 고려해 총 여행비의
                    10%를 예비비로 계산합니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Q. 모든 비용을 입력해야 하나요?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    아니요. 알고 있는 비용만 입력해도 됩니다.
                    입력하지 않은 항목은 0원으로 계산됩니다.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900">
                    Q. 실제 여행 비용과 정확히 일치하나요?
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-gray-600">
                    이 계산기는 입력한 예상 비용을 기준으로
                    계산하는 도구입니다. 항공권, 숙박 요금,
                    환율 및 현지 물가 등에 따라 실제 비용은
                    달라질 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
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
    <div className="flex items-center gap-3">
      <label className="w-28 shrink-0 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        inputMode="numeric"
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none transition focus:border-black"
      />

      <span className="w-14 shrink-0 text-sm text-gray-500">
        {unit}
      </span>
    </div>
  );
}

function CostRow({
  label,
  amount,
  total,
}: {
  label: string;
  amount: number;
  total: number;
}) {
  const percentage =
    total > 0
      ? Math.round((amount / total) * 1000) / 10
      : 0;

  return (
    <div>
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">
          {label}
        </span>

        <span className="text-gray-500">
          {new Intl.NumberFormat("ko-KR").format(
            Math.round(amount)
          )}
          원 · {percentage}%
        </span>
      </div>

      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-gray-800"
          style={{
            width: `${Math.min(percentage, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}