import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useSiteContent } from "@/hooks/useSiteContent";

export function ServicesPreview() {
  const { content } = useSiteContent();
  const { identities } = content;

  return (
    <section className="border-b border-line bg-ivory py-20 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeader
              eyebrow={identities.eyebrow}
              heading={identities.heading}
              description={identities.description}
            />
          </Reveal>

          <div className="border-t border-line">
            {identities.items.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <Link
                  to={item.to}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-line py-6 transition-colors hover:bg-paper sm:gap-6 sm:py-7"
                >
                  <span className="mt-1 w-7 text-[11px] font-semibold tracking-[0.16em] text-bronze">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon} className="h-5 w-5 text-bronze" />
                      <h3 className="font-display text-2xl leading-tight text-ink transition-colors group-hover:text-bronze sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="mt-2 h-5 w-5 text-stone transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                    aria-hidden
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
