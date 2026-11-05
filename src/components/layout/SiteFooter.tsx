import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/config/siteConfig";
import { useSiteContent } from "@/hooks/useSiteContent";

export function SiteFooter() {
  const { content } = useSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.7fr_0.9fr_1fr]">
          <div>
            <Link to="/" className="inline-flex items-baseline gap-2 font-display text-2xl">
              <span>MC</span>
              <span className="text-bronze">Chelaa</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
              {content.footer.introduction}
            </p>
            <p className="mt-6 font-display text-lg italic text-bronze">{siteConfig.tagline}</p>
            <ButtonLink to="/contact" variant="bronze" size="sm" className="mt-8">
              Book MC Chelaa
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </ButtonLink>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {siteConfig.nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-ivory/70 transition-colors hover:text-ivory"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
              Services
            </p>
            <ul className="mt-5 space-y-3">
              {content.footer.services.map((service) => (
                <li key={service} className="text-sm text-ivory/70">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
              Contact
            </p>
            <ul className="mt-5 space-y-4 text-sm text-ivory/70">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-start gap-3 transition-colors hover:text-ivory"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="inline-flex items-start gap-3 transition-colors hover:text-ivory"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden />
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="inline-flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-bronze" aria-hidden />
                {siteConfig.location}
              </li>
            </ul>
            <SocialLinks tone="dark" className="mt-6" />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-xs text-ivory/45">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <p>
              {siteConfig.personName} · {siteConfig.tagline}
            </p>
          </div>

          <a
            href="https://lucykamau.logicorex.co.ke/"
            target="_blank"
            rel="noreferrer"
            aria-label="Built by Lucy Kamau (opens in a new tab)"
            className="group inline-flex items-center gap-4 border border-ivory/15 px-4 py-3 transition-colors duration-300 hover:border-bronze/60"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-bronze/50 font-display text-sm tracking-[0.08em] text-bronze transition-colors duration-300 group-hover:border-bronze group-hover:bg-bronze group-hover:text-ink">
              LK
            </span>
            <span className="pr-1">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.24em] text-ivory/40">
                Built by
              </span>
              <span className="mt-0.5 flex items-center gap-1.5 text-sm font-medium text-ivory">
                <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-bronze after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                  Lucy Kamau
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-bronze transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
