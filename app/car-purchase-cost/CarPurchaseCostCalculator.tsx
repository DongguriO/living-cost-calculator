"use client";

import { useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  vehiclePrice: "",
  options: "",
  acquisitionTaxRate: "7",
  registrationFee: "",
  deliveryFee: "",
  insurance: "",
  downPayment: "",
  loanRate: "",
  loanMonths: "",
};

const categories = [
  { key: "vehiclePrice", label: "차량 가격" },
  { key: "options", label: "옵션/추가 장비" },
  { key: "acquisitionTax", label: "취득세" },
  { key: "registrationFee", label: "등록·기타 비용" },
  { key: "deliveryFee", label: "탁송·배송비" },
  { key: "insurance", label: "첫해 자동차보험" },
] as const;

export default function CarPurchaseCostCalculator() {
  const [values, setValues] = useState(initialValues);

  const vehiclePrice = Number(values.vehiclePrice || 0);
  const options = Number(values.options || 0);
  const acquisitionTaxRate = Number(
    values.acquisitionTaxRate || 0
  );
  const registrationFee = Number(
    values.registrationFee || 0
  );
  const deliveryFee = Number(values.deliveryFee || 0);
  const insurance = Number(values.insurance || 0);
  const downPayment = Number(values.downPayment || 0);
  const loanRate = Number(values.loanRate || 0);
  const loanMonths = Number(values.loanMonths || 0);

  // 차량 가격 + 옵션
  const taxableVehiclePrice = vehiclePrice + options;

  // 취득세
  const acquisitionTax =
    taxableVehiclePrice * (acquisitionTaxRate / 100);

  // 차량 구매에 필요한 전체 비용
  const totalPurchaseCost =
    taxableVehiclePrice +
    acquisitionTax +
    registrationFee +
    deliveryFee +
    insurance;

  // 할부 대상 금액
  const maxLoanAmount = taxableVehiclePrice;

  const loanPrincipal = Math.max(
    0,
    Math.min(
      maxLoanAmount,
      taxableVehiclePrice - downPayment
    )
  );

  // 월 할부 금리
  const monthlyLoanRate = loanRate / 100 / 12;

  // 월 할부금
  let monthlyPayment = 0;

  if (loanPrincipal > 0 && loanMonths > 0) {
    if (monthlyLoanRate > 0) {
      monthlyPayment =
        (loanPrincipal *
          monthlyLoanRate *
          Math.pow(
            1 + monthlyLoanRate,
            loanMonths
          )) /
        (Math.pow(
          1 + monthlyLoanRate,
          loanMonths
        ) - 1);
    } else {
      monthlyPayment =
        loanPrincipal / loanMonths;
    }
  }

  // 총 할부 상환액
  const totalLoanPayment =
    monthlyPayment * loanMonths;

  // 총 할부 이자
  const totalLoanInterest = Math.max(
    0,
    totalLoanPayment - loanPrincipal
  );

  // 실제 초기 현금
  const initialCashNeeded =
    totalPurchaseCost - loanPrincipal;

  const costItems = [
    {
      label: "차량 가격",
      amount: vehiclePrice,
    },
    {
      label: "옵션/추가 장비",
      amount: options,
    },
    {
      label: "취득세",
      amount: acquisitionTax,
    },
    {
      label: "등록·기타 비용",
      amount: registrationFee,
    },
    {
      label: "탁송·배송비",
      amount: deliveryFee,
    },
    {
      label: "첫해 자동차보험",
      amount: insurance,
    },
  ];

  const largestCostItem = costItems.reduce(
    (largest, item) =>
      item.amount > largest.amount
        ? item
        : largest,
    costItems[0]
  );

  const getPercentage = (amount: number) => {
    if (totalPurchaseCost === 0) {
      return 0;
    }

    return Math.round(
      (amount / totalPurchaseCost) * 100
    );
  };

  const updateValue = (
    key: keyof typeof values,
    value: string,
    allowDecimal = false
  ) => {
    const filteredValue = allowDecimal
      ? value
          .replace(/[^0-9.]/g, "")
          .replace(/(\..*)\./g, "$1")
      : value.replace(/[^0-9]/g, "");

    setValues((prev) => ({
      ...prev,
      [key]: filteredValue,
    }));
  };

  const fillExampleValues = () => {
    setValues({
      vehiclePrice: "35000000",
      options: "3000000",
      acquisitionTaxRate: "7",
      registrationFee: "500000",
      deliveryFee: "300000",
      insurance: "1200000",
      downPayment: "10000000",
      loanRate: "5",
      loanMonths: "60",
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
    vehiclePrice > 0 ||
    options > 0 ||
    registrationFee > 0 ||
    deliveryFee > 0 ||
    insurance > 0;

  return (
    <CalculatorLayout
      title="🚘 자동차 구매비용 계산기"
      description="차량 가격과 취득세, 옵션, 보험료, 할부 조건 등을 입력해 자동차 구매에 필요한 비용을 계산해보세요."
      headerTitle="자동차 구매비용"
    >
      {/* 입력 */}
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900">
          자동차 구매 조건 입력
        </h2>

        <p className="mt-1 mb-5 text-sm text-gray-500">
          차량 가격과 구매에 필요한 비용, 할부 조건을 입력해주세요.
        </p>

        <div className="space-y-4">
          <InputRow
            label="차량 가격"
            value={values.vehiclePrice}
            unit="원"
            onChange={(value) =>
              updateValue("vehiclePrice", value)
            }
          />

          <InputRow
            label="옵션/추가 장비"
            value={values.options}
            unit="원"
            onChange={(value) =>
              updateValue("options", value)
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            세금·부대비용
          </h3>

          <InputRow
            label="취득세율"
            value={values.acquisitionTaxRate}
            unit="%"
            allowDecimal
            onChange={(value) =>
              updateValue(
                "acquisitionTaxRate",
                value,
                true
              )
            }
          />

          <InputRow
            label="등록·기타 비용"
            value={values.registrationFee}
            unit="원"
            onChange={(value) =>
              updateValue(
                "registrationFee",
                value
              )
            }
          />

          <InputRow
            label="탁송·배송비"
            value={values.deliveryFee}
            unit="원"
            onChange={(value) =>
              updateValue(
                "deliveryFee",
                value
              )
            }
          />

          <InputRow
            label="첫해 보험료"
            value={values.insurance}
            unit="원"
            onChange={(value) =>
              updateValue(
                "insurance",
                value
              )
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            할부 조건
          </h3>

          <InputRow
            label="선수금"
            value={values.downPayment}
            unit="원"
            onChange={(value) =>
              updateValue(
                "downPayment",
                value
              )
            }
          />

          <InputRow
            label="할부 금리"
            value={values.loanRate}
            unit="%"
            allowDecimal
            onChange={(value) =>
              updateValue(
                "loanRate",
                value,
                true
              )
            }
          />

          <InputRow
            label="할부 기간"
            value={values.loanMonths}
            unit="개월"
            onChange={(value) =>
              updateValue(
                "loanMonths",
                value
              )
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
          <p className="text-2xl">🚘</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            자동차를 구매하려면 얼마가 필요할까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            차량 가격과 세금, 부대비용, 할부 조건을 입력하면
            <br />
            자동차 구매에 필요한 예상 비용을 계산해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {resultReady && (
        <>
          <div className="mt-6 rounded-2xl bg-black p-6 text-center text-white shadow-md">
            <p className="text-sm text-gray-300">
              자동차 구매 예상 비용
            </p>

            <p className="mt-3 text-4xl font-bold">
              {formatWon(totalPurchaseCost)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              차량 가격 + 취득세 + 부대비용 + 첫해 보험료
            </p>

            <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

            <p className="text-sm text-gray-300">
              실제 필요한 초기 현금
            </p>

            <p className="mt-2 text-2xl font-bold">
              {formatWon(initialCashNeeded)}원
            </p>

            <p className="mt-2 text-xs text-gray-400">
              총 구매비용에서 할부 원금을 제외한 금액
            </p>

            {monthlyPayment > 0 && (
              <>
                <div className="mx-auto my-5 h-px max-w-xs bg-gray-700" />

                <p className="text-sm text-gray-300">
                  월 예상 할부금
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {formatWon(monthlyPayment)}원
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {loanMonths}개월 · 연 {loanRate}% 기준
                </p>
              </>
            )}
          </div>

          {/* 비용 분석 */}
          <div className="mt-6 rounded-2xl bg-white p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">
              📊 자동차 구매비용 분석
            </h2>

            {/* 가장 큰 비용 */}
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

            {/* 취득세 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                예상 취득세
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatWon(acquisitionTax)}원
              </p>

              <p className="mt-1 text-sm text-gray-600">
                차량 가격 + 옵션 × {acquisitionTaxRate}%
              </p>
            </div>

            {/* 할부 */}
            {loanPrincipal > 0 && (
              <div className="mt-4 rounded-xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">
                  예상 총 할부 이자
                </p>

                <p className="mt-1 text-lg font-semibold text-gray-900">
                  {formatWon(totalLoanInterest)}원
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  할부 원금 {formatWon(loanPrincipal)}원 기준
                </p>
              </div>
            )}

            {/* 항목별 비용 */}
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
              ※ 계산 결과는 입력한 차량 가격과 비용을 기준으로 한
              예상값입니다. 실제 세금과 금융상품의 조건은 차량 종류,
              지역, 금융사 등에 따라 달라질 수 있습니다.
            </p>
          </div>
        </>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-6 space-y-3">
        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            🚘 자동차 구매비용 계산기란?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
          <p className="text-sm leading-7 text-gray-600">
            자동차를 구매할 때 차량 가격만 생각하기보다
            취득세, 등록비, 탁송비, 보험료 등 다양한 비용을
            함께 고려해야 합니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            이 계산기는 차량 가격과 옵션, 세금 및 부대비용을
            입력해 자동차 구매에 필요한 예상 비용을
            계산할 수 있도록 도와줍니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            할부를 이용하는 경우에는 선수금과 금리, 할부기간을
            입력해 월 예상 할부금과 총 이자도 함께 확인할 수 있습니다.
          </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            자동차 구매비용은 어떻게 계산하나요?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
          <p className="text-sm leading-7 text-gray-600">
            기본적인 자동차 구매비용은 차량 가격에 옵션과
            취득세, 등록·기타 비용, 탁송·배송비,
            첫해 보험료 등을 더해 계산합니다.
          </p>

          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
            차량 가격 + 옵션
            <br />
            + 취득세 + 등록·기타 비용
            <br />
            + 탁송·배송비 + 첫해 보험료
            <br />
            = 자동차 구매 예상 비용
          </div>

          <p className="mt-4 text-sm leading-7 text-gray-600">
            할부를 이용한다면 차량 가격과 옵션에서 선수금을
            제외한 금액을 할부 원금으로 계산합니다.
          </p>

          <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
            차량 가격 + 옵션 - 선수금
            <br />
            = 예상 할부 원금
          </div>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-6 py-5 text-lg font-semibold text-gray-900">
            어떤 비용을 포함하나요?
          </summary>

          <div className="border-t border-gray-100 px-6 pb-6 pt-5">
          <p className="text-sm leading-7 text-gray-600">
            차량 가격과 옵션, 취득세, 등록·기타 비용,
            탁송·배송비, 첫해 자동차보험료를 입력할 수 있습니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            할부를 이용하는 경우 선수금, 할부 금리,
            할부 기간을 입력해 예상 월 납입금과
            총 할부 이자를 확인할 수 있습니다.
          </p>

          <p className="mt-3 text-sm leading-7 text-gray-600">
            실제 차량 구매에는 개별 차량이나 계약 조건에 따라
            추가 비용이 발생할 수 있으므로 최종 계약 전에는
            실제 견적서를 확인하는 것이 좋습니다.
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
                Q. 차량 가격 외에 어떤 비용이 필요한가요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                취득세, 등록·기타 비용, 탁송·배송비,
                보험료 등이 추가로 발생할 수 있습니다.
                이 계산기에서는 해당 항목을 직접 입력해
                예상 구매비용에 반영할 수 있습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 할부를 이용하면 월 얼마를 내나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                차량 가격과 옵션에서 선수금을 제외한 금액을
                할부 원금으로 계산하고, 입력한 금리와 기간을
                기준으로 월 예상 할부금을 계산합니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 취득세율은 직접 변경할 수 있나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                네. 차량이나 적용 조건에 따라 세율이 달라질 수
                있으므로 취득세율을 직접 입력할 수 있도록
                만들었습니다.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                Q. 자동차 유지비도 포함되나요?
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-600">
                이 계산기는 자동차를 구매할 때 필요한
                초기 비용을 계산하는 용도입니다.
                매월 발생하는 연료비, 정비비, 자동차세 등의
                유지비는 별도로 계산해야 합니다.
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

  const [integerPart, decimalPart] = value.split(".");

  const formattedInteger = new Intl.NumberFormat(
    "ko-KR"
  ).format(Number(integerPart || 0));

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
        inputMode={
          allowDecimal ? "decimal" : "numeric"
        }
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

