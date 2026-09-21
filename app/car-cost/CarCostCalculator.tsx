"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  distance: "",
  efficiency: "",
  fuelPrice: "",
  insurance: "",
  tax: "",
  parking: "",
  toll: "",
  maintenance: "",
};

export default function CarCostPage() {
  const [values, setValues] = useState(initialValues);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const distance = Number(values.distance || 0);
  const efficiency = Number(values.efficiency || 0);
  const fuelPrice = Number(values.fuelPrice || 0);

  const insurance = Number(values.insurance || 0);
  const tax = Number(values.tax || 0);
  const parking = Number(values.parking || 0);
  const toll = Number(values.toll || 0);
  const maintenance = Number(values.maintenance || 0);

  const monthlyFuelCost =
    efficiency > 0
      ? (distance / efficiency) * fuelPrice
      : 0;

  const monthlyInsurance = insurance / 12;
  const monthlyTax = tax / 12;

  const monthlyTotal =
    monthlyFuelCost +
    monthlyInsurance +
    monthlyTax +
    parking +
    toll +
    maintenance;

  const yearlyTotal = monthlyTotal * 12;
  const dailyCost = yearlyTotal / 365;

  const updateValue = (
    key: keyof typeof values,
    value: string,
    allowDecimal = false
  ) => {
    const filteredValue = allowDecimal
      ? value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1")
      : value.replace(/[^0-9]/g, "");

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
      distance: "1000",
      efficiency: "12",
      fuelPrice: "1700",
      insurance: "1000000",
      tax: "300000",
      parking: "100000",
      toll: "50000",
      maintenance: "100000",
    });
  };

  const formatWon = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 2,
    }).format(value);

return (
  <CalculatorLayout
    title="🚗 자동차 유지비 계산기"
    description="내 차에 한 달에 얼마나 들어가는지 계산해보세요."
    headerTitle="자동차 유지비 계산기"
  >
    {/* 입력 */}
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900">
        기본 주행 정보
      </h2>

      <p className="mt-1 mb-5 text-sm text-gray-500">
        자동차의 기본적인 주행 정보를 입력해주세요.
      </p>

      <div className="space-y-4">
        <InputRow
          label="월 주행거리"
          value={values.distance}
          unit="km"
          allowDecimal
          onChange={(value) =>
            updateValue("distance", value, true)
          }
        />

        <InputRow
          label="연비"
          value={values.efficiency}
          unit="km/L"
          allowDecimal
          onChange={(value) =>
            updateValue("efficiency", value, true)
          }
        />

        <InputRow
          label="연료 가격"
          value={values.fuelPrice}
          unit="원/L"
          onChange={(value) =>
            updateValue("fuelPrice", value)
          }
        />
      </div>

      <div className="my-6 h-px bg-gray-200" />

      <h2 className="text-xl font-semibold text-gray-900">
        기타 유지비
      </h2>

      <p className="mt-1 mb-5 text-sm text-gray-500">
        알고 있는 비용만 입력해도 계산할 수 있어요.
      </p>

      <div className="space-y-4">
        <InputRow
          label="연간 보험료"
          value={values.insurance}
          unit="원"
          onChange={(value) =>
            updateValue("insurance", value)
          }
        />

        <InputRow
          label="연간 자동차세"
          value={values.tax}
          unit="원"
          onChange={(value) =>
            updateValue("tax", value)
          }
        />

        <InputRow
          label="월 주차비"
          value={values.parking}
          unit="원"
          onChange={(value) =>
            updateValue("parking", value)
          }
        />

        <InputRow
          label="월 통행료"
          value={values.toll}
          unit="원"
          onChange={(value) =>
            updateValue("toll", value)
          }
        />

        <InputRow
          label="월 정비비"
          value={values.maintenance}
          unit="원"
          onChange={(value) =>
            updateValue("maintenance", value)
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

    {/* 결과 */}
    {monthlyTotal === 0 && (
      <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-md">
        <p className="text-2xl">🚗</p>

        <h2 className="mt-3 text-lg font-semibold text-gray-900">
          내 자동차 유지비는 얼마일까?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          위의 자동차 정보를 입력하면
          <br />
          예상 월 유지비를 계산해드려요.
        </p>
      </div>
    )}

    {monthlyTotal > 0 && (
      <>
        <div className="mt-6 rounded-2xl bg-black p-6 text-center text-white shadow-md">
          <p className="text-sm text-gray-300">
            예상 월 자동차 유지비
          </p>

          <p className="mt-2 text-4xl font-bold">
            {formatWon(monthlyTotal)}원
          </p>

          <p className="mt-2 text-xs text-gray-400">
            한 달 동안 예상되는 자동차 유지비예요.
          </p>

          <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

          <p className="text-sm text-gray-300">
            1년 예상 자동차 유지비
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatWon(yearlyTotal)}원
          </p>

          <p className="mt-2 text-xs text-gray-400">
            월 유지비 × 12개월
          </p>

          <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

          <p className="text-sm text-gray-300">
            하루 평균 비용
          </p>

          <p className="mt-2 text-2xl font-semibold">
            {formatWon(dailyCost)}원
          </p>

          <p className="mt-2 text-xs text-gray-400">
            연간 유지비 ÷ 365일
          </p>
        </div>

        {/* 비용 분석 */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-900">
            ⛽ 비용 분석
          </h2>

          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              월 연료비
            </p>

            <p className="mt-1 text-lg font-semibold text-gray-900">
              {formatWon(monthlyFuelCost)}원
            </p>

            <p className="mt-1 text-sm text-gray-600">
              월 {formatWon(distance)}km 주행 기준
            </p>
          </div>

          <div className="mt-4 space-y-4">
            <CostRow
              label="연료비"
              amount={monthlyFuelCost}
              total={monthlyTotal}
            />

            <CostRow
              label="보험료"
              amount={monthlyInsurance}
              total={monthlyTotal}
            />

            <CostRow
              label="자동차세"
              amount={monthlyTax}
              total={monthlyTotal}
            />

            <CostRow
              label="주차비"
              amount={parking}
              total={monthlyTotal}
            />

            <CostRow
              label="통행료"
              amount={toll}
              total={monthlyTotal}
            />

            <CostRow
              label="정비비"
              amount={maintenance}
              total={monthlyTotal}
            />
          </div>
        </div>
      </>
    )}

    {/* SEO 설명 콘텐츠 */}
    <section className="mt-6 space-y-3">
        {/* 자동차 유지비 계산기란? */}
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
                자동차 유지비 계산기란?
            </h2>

            <span className="ml-4 text-2xl font-light text-gray-500">
                {openSection === "about" ? "−" : "+"}
            </span>
            </button>

            {openSection === "about" && (
            <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                <p className="text-sm leading-7 text-gray-600">
                자동차를 보유하면 연료비뿐만 아니라 자동차 보험료,
                자동차세, 주차비, 통행료, 정비비 등 다양한 유지비가
                발생합니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                자동차 유지비 계산기는 월 주행거리와 연비, 연료 가격을
                입력하고 보험료와 자동차세 등의 비용을 함께 반영해서
                예상 월 유지비와 연간 유지비를 계산해볼 수 있는
                계산기입니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                계산 결과에서는 하루 평균 비용도 함께 확인할 수 있어
                자동차를 운행하면서 필요한 비용을 보다 쉽게 파악할 수
                있습니다.
                </p>
            </div>
            )}
        </div>

        {/* 자동차 유지비 계산 방법 */}
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
                자동차 유지비 계산 방법
            </h2>

            <span className="ml-4 text-2xl font-light text-gray-500">
                {openSection === "method" ? "−" : "+"}
            </span>
            </button>

            {openSection === "method" && (
            <div className="border-t border-gray-100 px-6 pb-6 pt-5">
                <p className="text-sm leading-7 text-gray-600">
                월 연료비는 월 주행거리를 연비로 나눈 뒤 연료 가격을
                곱해서 계산합니다.
                </p>

                <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                월 주행거리 ÷ 연비 × 연료 가격
                <br />
                = 월 연료비
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                연간 보험료와 자동차세는 각각 12개월로 나누어 월
                유지비에 반영합니다.
                </p>

                <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                연간 보험료 ÷ 12
                <br />
                = 월 보험료
                <br />
                <br />
                연간 자동차세 ÷ 12
                <br />
                = 월 자동차세
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                최종 월 자동차 유지비는 월 연료비와 월 보험료,
                월 자동차세, 주차비, 통행료, 정비비를 합산해서
                계산합니다.
                </p>

                <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
                월 연료비 + 월 보험료 + 월 자동차세 + 월 주차비 + 월 통행료 + 월 정비비
                <br />
                = 예상 월 자동차 유지비
                </div>

                <p className="mt-4 text-sm leading-7 text-gray-600">
                연간 유지비는 월 유지비에 12개월을 곱하고, 하루 평균
                비용은 연간 유지비를 365일로 나누어 계산합니다.
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
                자동차의 월 주행거리, 연비, 연료 가격을 입력할 수
                있습니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                그 외에도 연간 보험료와 자동차세, 월 주차비,
                통행료, 정비비를 입력해서 자동차 유지비를 계산할 수
                있습니다.
                </p>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                모든 항목을 알고 있지 않아도 계산할 수 있습니다.
                알고 있는 비용만 입력하고 나머지는 0원으로 두면
                입력한 비용을 기준으로 계산됩니다.
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
                    Q. 자동차 유지비에는 어떤 비용이 포함되나요?
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                    연료비, 자동차 보험료, 자동차세, 주차비, 통행료,
                    정비비를 입력해서 계산할 수 있습니다.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">
                    Q. 연간 보험료와 자동차세는 어떻게 계산되나요?
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                    입력한 연간 보험료와 자동차세를 각각 12개월로
                    나누어 월 유지비에 반영합니다.
                    </p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-900">
                    Q. 연비에 소수점을 입력할 수 있나요?
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                    네. 연비와 월 주행거리는 소수점을 입력할 수
                    있습니다. 예를 들어 12.5km/L와 같은 값을
                    입력할 수 있습니다.
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
                    Q. 자동차 할부금도 포함되나요?
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                    현재 계산기에는 자동차 할부금 항목이 포함되어
                    있지 않습니다. 할부금이 있다면 기타 비용 등을
                    이용해 별도로 계산할 수 있습니다.
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

  const [integerPart, decimalPart] = value.split(".");

  const formattedInteger = new Intl.NumberFormat("ko-KR").format(
    Number(integerPart || 0)
  );

  if (value.includes(".")) {
    return `${formattedInteger}.${decimalPart ?? ""}`;
  }

  return formattedInteger;
}

function InputRow({
  label,
  value,
  unit,
  allowDecimal = false,
  onChange,
}: {
  label: string;
  value: string;
  unit: string;
  allowDecimal?: boolean;
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
        inputMode={allowDecimal ? "decimal" : "numeric"}
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
          {new Intl.NumberFormat("ko-KR").format(amount)}원 ·{" "}
          {percentage}%
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