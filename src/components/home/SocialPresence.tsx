import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/config/siteConfig";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { IconName } from "@/services/content/types";

const channels: Array<{ icon: IconName; label: string; value: string; href: string }> = [
  {
    icon: "instagram",
    label: "Instagram",
    value: "@mcchelaa254",
    href: siteConfig.social.instagram,
  },
  {
    icon: "facebook",
    label: "Facebook",
    value: "mcchelaa254",
    href: siteConfig.social.facebook,
  },
  {
    icon: "mail",
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: "whatsapp",
    label: "WhatsApp",
    value: "Start a conversation",
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
];

export function SocialPresence() {
  const { content } = useSiteContent();

  return (
    <section className="border-b border-line bg-paper py-20 lg:py-24">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <SectionHeader
            eyebrow={content.social.eyebrow}
            heading={content.social.heading}
            description={content.social.description}
          />
        </Reveal>
        <div className="border-t border-line">
          {channels.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 0.04}>
              <a
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 border-b border-line py-5 transition-colors hover:text-bronze"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <Icon name={channel.icon} className="h-5 w-5 shrink-0 text-bronze" />
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-stone">
                      {channel.label}
                    </span>
                    <span className="mt-1 block truncate font-display text-xl text-ink transition-colors group-hover:text-bronze sm:text-2xl">
                      {channel.value}
                    </span>
                  </span>
                </span>
                <ArrowUpRight
                  className="h-5 w-5 shrink-0 text-stone transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bronze"
                  aria-hidden
                />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
