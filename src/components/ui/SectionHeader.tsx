import type { ReactNode } from "react";

import { cn } from "@/utils/cn";

type SectionHeaderProps = {
  eyebrow: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "left",
  tone = "light",
  className,
  children,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <p
        className={cn(
          "text-[11px] font-semibold uppercase tracking-[0.28em]",
          isDark ? "text-bronze" : "text-bronze"
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-5 font-display text-4xl leading-[1.08] tracking-[-0.02em] text-balance sm:text-5xl lg:text-6xl",
          isDark ? "text-ivory" : "text-ink"
        )}
      >
        {heading}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-relaxed sm:text-[17px]",
            align === "center" && "mx-auto",
            isDark ? "text-ivory/70" : "text-stone"
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
