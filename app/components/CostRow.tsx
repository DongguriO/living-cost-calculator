export type CostRowColor = "blue" | "orange" | "emerald";

interface CostRowProps {
  label: string;
  amount: number;
  total: number;
  color: CostRowColor;
  formatWon: (value: number) => string;
}

export default function CostRow({
  label,
  amount,
  total,
  color,
  formatWon,
}: CostRowProps) {
  const percentage =
    total > 0 ? Math.round((amount / total) * 1000) / 10 : 0;

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