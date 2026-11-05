import type { PortfolioCategory } from "@/services/content/types";
import { cn } from "@/utils/cn";

type FilterValue = "All" | PortfolioCategory;

type PortfolioFilterProps = {
  categories: PortfolioCategory[];
  active: FilterValue;
  counts: Record<string, number>;
  onChange: (value: FilterValue) => void;
};

export function PortfolioFilter({ categories, active, counts, onChange }: PortfolioFilterProps) {
  const values: FilterValue[] = ["All", ...categories];

  return (
    <div
      className="flex flex-wrap gap-x-2 gap-y-2 border-y border-line py-4"
      role="group"
      aria-label="Filter portfolio by category"
    >
      {values.map((value) => {
        const isActive = active === value;
        const count = counts[value] ?? 0;

        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={isActive}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition-colors",
              isActive
                ? "bg-ink text-ivory"
                : "text-stone hover:bg-ivory hover:text-ink"
            )}
          >
            {value}
            <span
              className={cn(
                "text-[9px] tabular-nums",
                isActive ? "text-ivory/70" : "text-stone/70"
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
