import { AtSign, Globe, Mail } from "lucide-react";

import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/utils/cn";

const links = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: AtSign },
  { label: "Facebook", href: siteConfig.social.facebook, icon: Globe },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
];

export function SocialLinks({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={label}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center border transition-colors duration-200",
            isDark
              ? "border-ivory/25 text-ivory hover:border-bronze hover:text-bronze"
              : "border-line text-ink hover:border-bronze hover:text-bronze"
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </a>
      ))}
    </div>
  );
}
