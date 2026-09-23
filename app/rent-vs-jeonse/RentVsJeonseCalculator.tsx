"use client";

import { useEffect, useState } from "react";
import CalculatorLayout from "../components/CalculatorLayout";

const initialValues = {
  contractMonths: "",
  jeonseDeposit: "",
  jeonseLoan: "",
  jeonseLoanRate: "",
  rentDeposit: "",
  monthlyRent: "",
  monthlyMaintenance: "",
};

export default function RentVsJeonseCalculator() {
  const [values, setValues] = useState(initialValues);
  const [comparisonAnimated, setComparisonAnimated] = useState(false);

  const contractMonths = Number(values.contractMonths || 0);
  const jeonseDeposit = Number(values.jeonseDeposit || 0);
  const jeonseLoan = Number(values.jeonseLoan || 0);
  const jeonseLoanRate = Number(values.jeonseLoanRate || 0);
  const rentDeposit = Number(values.rentDeposit || 0);
  const monthlyRent = Number(values.monthlyRent || 0);
  const monthlyMaintenance = Number(values.monthlyMaintenance || 0);

  // 전세 대출 연간 이자
  const annualJeonseInterest =
    jeonseLoan * (jeonseLoanRate / 100);

  // 계약기간 동안의 전세 대출 이자
  const totalJeonseInterest =
    contractMonths > 0
      ? annualJeonseInterest * (contractMonths / 12)
      : 0;

  // 계약기간 동안의 관리비
  const totalJeonseMaintenance =
    monthlyMaintenance * contractMonths;

  // 전세에서 발생하는 예상 비용
  // 보증금 원금은 계약 종료 후 반환된다고 가정
  const totalJeonseCost =
    totalJeonseInterest + totalJeonseMaintenance;

  // 월세
  const totalRent =
    monthlyRent * contractMonths;

  // 월세 관리비
  const totalRentMaintenance =
    monthlyMaintenance * contractMonths;

  // 계약기간 동안의 월세 총비용
  const totalRentCost =
    totalRent + totalRentMaintenance;

  // 양쪽의 비용 차이
  const costDifference =
    totalRentCost - totalJeonseCost;

  const jeonseIsCheaper =
    totalJeonseCost < totalRentCost;

  const rentIsCheaper =
    totalRentCost < totalJeonseCost;

  const costsAreEqual =
    totalJeonseCost === totalRentCost;
  

  const monthlyJeonseCost =
    contractMonths > 0
      ? totalJeonseCost / contractMonths
      : 0;

  const monthlyRentCost =
    contractMonths > 0
      ? totalRentCost / contractMonths
      : 0;

  // 전세와 월세의 보증금 차이
  const depositDifference =
    jeonseDeposit - rentDeposit;

  const comparisonItems = [
    {
      label: "전세대출 이자",
      amount: totalJeonseInterest,
      color: "blue" as const,
    },
    {
      label: "전세 관리비",
      amount: totalJeonseMaintenance,
      color: "blue" as const,
    },
    {
      label: "월세",
      amount: totalRent,
      color: "emerald" as const,
    },
    {
      label: "월세 관리비",
      amount: totalRentMaintenance,
      color: "emerald" as const,
    },
  ];

  const sortedComparisonItems = [...comparisonItems].sort(
    (a, b) => b.amount - a.amount
  );

  const largestCostItem =
    comparisonItems.reduce(
      (largest, item) =>
        item.amount > largest.amount ? item : largest,
      comparisonItems[0]
    );

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

  const fillExampleValues = () => {
    setValues({
      contractMonths: "24",
      jeonseDeposit: "200000000",
      jeonseLoan: "100000000",
      jeonseLoanRate: "3.5",
      rentDeposit: "50000000",
      monthlyRent: "900000",
      monthlyMaintenance: "150000",
    });
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  const formatWon = (value: number) =>
    new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0,
    }).format(Math.round(value));

  const getPercentage = (amount: number) => {
    if (totalJeonseCost + totalRentCost === 0) {
      return 0;
    }

    return Math.round(
      (amount / (totalJeonseCost + totalRentCost)) * 100
    );
  };

  const resultReady =
    contractMonths > 0 &&
    (jeonseDeposit > 0 ||
      jeonseLoan > 0 ||
      rentDeposit > 0 ||
      monthlyRent > 0 ||
      monthlyMaintenance > 0);
     
  useEffect(() => {
    if (!resultReady) {
      setComparisonAnimated(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setComparisonAnimated(true);
    }, 100);

    return () => window.clearTimeout(timer);
  }, [
    resultReady,
    totalJeonseCost,
    totalRentCost,
  ]);

  return (
    <CalculatorLayout
      title="🏘️ 전세 vs 월세 계산기"
      description="전세와 월세에 필요한 예상 주거비를 비교해보세요."
      headerTitle="전세 vs 월세 계산기"
    >
      {/* 입력 */}
      <div className="rounded-2xl bg-white p-4 shadow-md sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
          전세·월세 조건 입력
        </h2>

        <p className="mt-1 mb-5 text-sm text-gray-500">
          계약기간과 보증금, 월세 등의 조건을 입력해주세요.
        </p>

        <div className="space-y-4">
          <InputRow
            label="계약기간"
            value={values.contractMonths}
            unit="개월"
            onChange={(value) =>
              updateValue("contractMonths", value)
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            전세 조건
          </h3>

          <InputRow
            label="전세 보증금"
            value={values.jeonseDeposit}
            unit="원"
            onChange={(value) =>
              updateValue("jeonseDeposit", value)
            }
          />

          <InputRow
            label="전세 대출금"
            value={values.jeonseLoan}
            unit="원"
            onChange={(value) =>
              updateValue("jeonseLoan", value)
            }
          />

          <InputRow
            label="대출 금리"
            value={values.jeonseLoanRate}
            unit="%"
            allowDecimal
            onChange={(value) =>
              updateValue(
                "jeonseLoanRate",
                value,
                true
              )
            }
          />

          <div className="my-6 h-px bg-gray-200" />

          <h3 className="text-base font-semibold text-gray-900">
            월세 조건
          </h3>

          <InputRow
            label="월세 보증금"
            value={values.rentDeposit}
            unit="원"
            onChange={(value) =>
              updateValue("rentDeposit", value)
            }
          />

          <InputRow
            label="월세"
            value={values.monthlyRent}
            unit="원"
            onChange={(value) =>
              updateValue("monthlyRent", value)
            }
          />

          <InputRow
            label="월 관리비"
            value={values.monthlyMaintenance}
            unit="원"
            onChange={(value) =>
              updateValue(
                "monthlyMaintenance",
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
        <div className="mt-6 rounded-2xl bg-white p-5 text-center shadow-md sm:p-6">
          <p className="text-2xl">🏘️</p>

          <h2 className="mt-3 text-lg font-semibold text-gray-900">
            전세와 월세 중 어떤 비용이 더 들까?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            계약기간과 주거비 조건을 입력하면
            <br />
            전세와 월세의 예상 비용을 비교해드려요.
          </p>
        </div>
      )}

      {/* 결과 */}
      {resultReady && (
        <>
          <div className="mt-6 rounded-2xl bg-black p-4 text-white shadow-md sm:p-6">
            <div className="text-center">
              <p className="text-sm text-gray-300">
                {contractMonths}개월 예상 주거비
              </p>
            </div>

            {/* 전세 vs 월세 비교 */}
            <div className="mt-5 flex items-center gap-2 sm:gap-3">
              <div
                className={`
                  self-center overflow-hidden rounded-2xl border
                  transition-all duration-5000 ease-in-out
                  motion-reduce:transition-none
                  ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "flex-[56_1_0%] border-emerald-400 bg-emerald-800/25 p-5 shadow-[0_0_24px_rgba(52,211,153,0.12)] sm:p-6"
                      : "flex-[44_1_0%] border-gray-800 bg-gray-900 p-4 sm:p-5"
                  }
                `}
              >
                <p
                  className={`text-center font-medium ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "text-emerald-300"
                      : "text-gray-400"
                  }`}
                >
                  전세 예상 비용
                </p>

                <p
                  className={`mt-2 text-center font-bold tracking-tight ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "text-3xl text-white sm:text-4xl"
                      : "text-2xl text-white sm:text-3xl"
                  }`}
                >
                  {formatWon(totalJeonseCost)}원
                </p>

                <p
                  className={`mt-1 text-center text-xs ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "text-emerald-200/70"
                      : "text-gray-500"
                  }`}
                >
                  대출이자 + 관리비
                </p>

                {/* 월평균 구분선 — 큰 카드에서도 항상 표시 */}
                <div
                  className={`my-4 h-px ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "bg-emerald-300/20"
                      : "bg-gray-800"
                  }`}
                />

                <p
                  className={`text-center text-xs ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "text-emerald-200/70"
                      : "text-gray-500"
                  }`}
                >
                  전세 월평균
                </p>

                <p
                  className={`mt-1 text-center font-semibold ${
                    comparisonAnimated && totalJeonseCost < totalRentCost
                      ? "text-lg text-white sm:text-xl"
                      : "text-base text-white sm:text-lg"
                  }`}
                >
                  {formatWon(monthlyJeonseCost)}원
                </p>
              </div>

              <div
                className={`
                  self-center overflow-hidden rounded-2xl border
                  transition-all duration-5000 ease-in-out
                  motion-reduce:transition-none
                  ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "flex-[56_1_0%] border-emerald-400 bg-emerald-800/25 p-5 shadow-[0_0_24px_rgba(52,211,153,0.12)] sm:p-6"
                      : "flex-[44_1_0%] border-gray-800 bg-gray-900 p-4 sm:p-5"
                  }
                `}
              >
                <p
                  className={`text-center font-medium ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "text-emerald-300"
                      : "text-gray-400"
                  }`}
                >
                  월세 예상 비용
                </p>

                <p
                  className={`mt-2 text-center font-bold tracking-tight ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "text-3xl text-white sm:text-4xl"
                      : "text-2xl text-white sm:text-3xl"
                  }`}
                >
                  {formatWon(totalRentCost)}원
                </p>

                <p
                  className={`mt-1 text-center text-xs ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "text-emerald-200/70"
                      : "text-gray-500"
                  }`}
                >
                  월세 + 관리비
                </p>

                {/* 월평균 구분선 — 큰 카드에서도 항상 표시 */}
                <div
                  className={`my-4 h-px ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "bg-emerald-300/20"
                      : "bg-gray-800"
                  }`}
                />

                <p
                  className={`text-center text-xs ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "text-emerald-200/70"
                      : "text-gray-500"
                  }`}
                >
                  월세 월평균
                </p>

                <p
                  className={`mt-1 text-center font-semibold ${
                    comparisonAnimated && totalRentCost < totalJeonseCost
                      ? "text-lg text-white sm:text-xl"
                      : "text-base text-white sm:text-lg"
                  }`}
                >
                  {formatWon(monthlyRentCost)}원
                </p>
              </div>
            </div>

            {/* 비교 결과 */}
            <div className="mt-4 rounded-xl bg-gray-900 px-4 py-3 text-center">
              <p className="text-xs text-gray-400">
                예상 비용 차이
              </p>

              <p className="mt-1 text-sm font-semibold sm:text-base">
                {formatWon(Math.abs(costDifference))}원
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                {costDifference > 0
                  ? "입력한 조건에서는 전세가 상대적으로 저렴해요."
                  : costDifference < 0
                  ? "입력한 조건에서는 월세가 상대적으로 저렴해요."
                  : "전세와 월세의 예상 비용이 같아요."}
              </p>
            </div>
          </div>

          {/* 비용 분석 */}
          <div className="mt-6 rounded-2xl bg-white p-4 shadow-md sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900 sm:text-xl">
              📊 전세·월세 비용 분석
            </h2>

            {/* 비용 차이 */}
            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                예상 비용 차이
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatWon(Math.abs(costDifference))}원
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {costDifference > 0
                  ? "입력한 조건에서는 월세의 예상 비용이 더 높아요."
                  : costDifference < 0
                  ? "입력한 조건에서는 전세의 예상 비용이 더 높아요."
                  : "전세와 월세의 예상 비용이 같아요."}
              </p>
            </div>

            {/* 보증금 차이 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                보증금 차이
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {formatWon(Math.abs(depositDifference))}원
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {depositDifference > 0
                  ? "전세에 더 많은 보증금이 필요해요."
                  : depositDifference < 0
                  ? "월세에 더 많은 보증금이 필요해요."
                  : "두 방식의 보증금이 같아요."}
              </p>
            </div>

            {/* 가장 큰 비용 */}
            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-500">
                가장 큰 비용 항목
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                {largestCostItem.label}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {formatWon(largestCostItem.amount)}원
              </p>
            </div>

            {/* 항목별 비용 */}
            <div className="mt-6 space-y-4">
              {sortedComparisonItems.map((item) => (
                <CostRow
                  key={item.label}
                  label={item.label}
                  amount={item.amount}
                  total={totalJeonseCost + totalRentCost}
                  color={item.color}
                />
              ))}
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-400">
              ※ 보증금 원금은 계약 종료 후 반환된다고 가정하며,
              계산 결과에는 보증금 자체를 비용으로 포함하지 않습니다.
            </p>
          </div>
        </>
      )}

      {/* SEO 콘텐츠 */}
      <section className="mt-6 space-y-3">
        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            🏘️ 전세 vs 월세 계산기란?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <p className="text-sm leading-7 text-gray-600">
              전세와 월세 중 어떤 주거 형태를 선택할지
              비교할 때 필요한 예상 비용을 계산해볼 수 있는
              계산기입니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              계약기간과 전세 보증금, 전세대출, 대출 금리,
              월세 보증금, 월세, 관리비를 입력하면
              계약기간 동안 발생하는 예상 비용을 비교할 수 있습니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              실제 주거비는 대출 조건, 관리비, 계약 조건 등에
              따라 달라질 수 있으므로 계산 결과는 주거비를
              계획하기 위한 참고용으로 활용해보세요.
            </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            전세와 월세 계산 방법
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <p className="text-sm leading-7 text-gray-600">
              전세는 전세대출이 있는 경우 대출금과 금리를 이용해
              계약기간 동안 발생하는 예상 이자를 계산합니다.
            </p>

            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
              전세대출금 × 연이율 × 계약기간 ÷ 12
              <br />
              = 계약기간 동안의 전세대출 이자
              <br />
              <br />
              전세대출 이자 + 월 관리비 × 계약개월 수
              <br />
              = 계약기간 동안의 전세 비용
            </div>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              월세는 월세에 계약기간을 곱하고,
              계약기간 동안의 관리비를 더해서 계산합니다.
            </p>

            <div className="mt-4 rounded-xl bg-gray-100 p-4 text-sm leading-7 text-gray-700">
              (월세 + 월 관리비) × 계약개월 수
              <br />
              = 계약기간 동안의 월세 비용
            </div>

            <p className="mt-4 text-sm leading-7 text-gray-600">
              전세 보증금과 월세 보증금은 계약 종료 후 반환되는
              원금이라고 가정하여 총비용에는 포함하지 않습니다.
            </p>
          </div>
        </details>

        <details className="overflow-hidden rounded-2xl bg-white shadow-md">
          <summary className="cursor-pointer px-5 py-4 text-base font-semibold leading-6 text-gray-900 sm:px-6 sm:py-5 sm:text-lg">
            어떤 비용을 비교하나요?
          </summary>

          <div className="border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
            <p className="text-sm leading-7 text-gray-600">
              전세는 전세대출 이자와 관리비를 기준으로 계산합니다.
              대출금이 없다면 전세대출 이자는 0원으로 계산됩니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              월세는 월세와 관리비를 기준으로 계산합니다.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600">
              취득세, 중개보수, 이사비, 대출 부대비용 등
              별도의 비용은 현재 계산에 포함하지 않습니다.
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
                  Q. 전세 보증금은 왜 총비용에 포함하지 않나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  전세 보증금은 계약이 끝나면 반환되는 원금이라고
                  가정하기 때문입니다. 대신 전세대출을 이용한다면
                  대출 이자를 비용으로 반영합니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 전세대출이 없으면 어떻게 계산하나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  전세대출금을 0원으로 입력하면 전세대출 이자도
                  0원으로 계산됩니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 관리비는 전세와 월세에 동일하게 적용되나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  현재 버전에서는 입력한 월 관리비를 두 방식에
                  동일하게 적용합니다.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Q. 보증금이 다른 경우도 비교할 수 있나요?
                </h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  네. 전세 보증금과 월세 보증금을 각각 입력하면
                  두 보증금의 차이도 함께 확인할 수 있습니다.
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

  const formattedInteger = new Intl.NumberFormat("ko-KR").format(
    Number(integerPart || 0)
  );

  if (value.includes(".")) {
    return `${formattedInteger}.${decimalPart ?? ""}`;
  }

  return formattedInteger;
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
          {new Intl.NumberFormat("ko-KR").format(
            Math.round(amount)
          )}
          원 · {percentage}%
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
    <div className="flex items-center gap-2 sm:gap-3">
      <label className="w-[104px] shrink-0 whitespace-nowrap text-sm font-medium text-gray-700 sm:w-28">
        {label}
      </label>

      <input
        type="text"
        inputMode={allowDecimal ? "decimal" : "numeric"}
        value={displayValue}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-3 text-right outline-none transition focus:border-black sm:px-4"
      />

      <span className="w-6 shrink-0 whitespace-nowrap text-right text-sm text-gray-500 sm:w-14">
        {unit}
      </span>
    </div>
  );
}

