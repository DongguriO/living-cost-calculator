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
    { label: "예식장 대관료", amount: venue },
    { label: "식사 비용", amount: mealCost },
    { label: "스튜디오", amount: studio },
    { label: "드레스", amount: dress },
    { label: "메이크업", amount: makeup },
    { label: "사진·영상", amount: photography },
    { label: "웨딩용품", amount: weddingItems },
    { label: "신혼여행", amount: honeymoon },
    { label: "예물·반지", amount: rings },
    { label: "답례품", amount: gifts },
    { label: "기타 비용", amount: other },
  ];

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

  const formatWon = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0,
    }).format(Math.round(value));

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
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">
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
          <div className="mt-6 rounded-2xl bg-black p-6 text-center text-white shadow-md">
            <p className="text-sm text-gray-300">
              결혼·웨딩 예상 비용
            </p>

            <p className="mt-3 text-4xl font-bold">
              {formatWon(totalWeddingCost)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              예식 + 준비비 + 신혼여행 등 입력 비용 기준
            </p>

            <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

            <p className="text-sm text-gray-300">
              하객 {formatWon(guests)}명 기준 식사비
            </p>

            <p className="mt-2 text-2xl font-bold">
              {formatWon(mealCost)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              1인 {formatWon(meal)}원 기준
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

            <div className="mt-6 space-y-5">
              {costItems.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="font-medium text-gray-700">
                      {item.label}
                    </span>

                    <span className="shrink-0 text-gray-500">
                      {formatWon(item.amount)}원
                    </span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gray-800"
                      style={{
                        width: `${Math.min(
                          getPercentage(item.amount),
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
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
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            💍 결혼/웨딩 비용 계산기란?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
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
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            결혼 비용은 어떻게 계산하나요?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
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
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            어떤 비용을 포함하나요?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
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
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            자주 묻는 질문
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
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
  return (
    <div className="flex items-center gap-3">
      <label className="w-28 shrink-0 text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        inputMode="numeric"
        value={formatInputValue(value)}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="0"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-right outline-none transition focus:border-black"
      />

      <span className="w-14 shrink-0 text-sm text-gray-500">
        {unit}
      </span>
    </div>
  );
}

