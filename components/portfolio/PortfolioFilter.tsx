import type { PortfolioCategory } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const filters: { label: string; value: PortfolioCategory }[] = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Nikkahs", value: "nikkahs" },
  { label: "Mehndis", value: "mehndis" }
];

type PortfolioFilterProps = {
  active: PortfolioCategory;
  onChange: (category: PortfolioCategory) => void;
};

export function PortfolioFilter({ active, onChange }: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Portfolio filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          role="tab"
          aria-selected={active === filter.value}
          className={cn(
            "min-h-11 rounded-full border px-5 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-gold-300",
            active === filter.value
              ? "border-gold-400 bg-gold-400 text-ink"
              : "border-white/10 bg-white/[0.03] text-mist hover:border-gold-400/70 hover:text-gold-300"
          )}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
