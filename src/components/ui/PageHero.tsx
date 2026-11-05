import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { cn } from "@/utils/cn";
import type { ImageAsset } from "@/config/imageConfig";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: ImageAsset;
  imageClassName?: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageClassName,
  children,
}: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper">
      <Container
        className={cn(
          "grid gap-12 py-16 sm:py-20 lg:py-24",
          image ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-end" : "max-w-5xl"
        )}
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bronze">
            {eyebrow}
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-[-0.03em] text-balance text-ink sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone sm:text-lg">
            {description}
          </p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>

        {image ? (
          <div className={cn("relative min-h-[320px] overflow-hidden bg-ivory sm:min-h-[420px]", imageClassName)}>
            <SmartImage
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </Container>
    </section>
  );
}
