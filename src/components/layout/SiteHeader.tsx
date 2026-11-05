import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { siteConfig } from "@/config/siteConfig";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/utils/cn";

function navLinkClass(isActive: boolean) {
  return cn(
    "relative py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200",
    "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-bronze after:transition-transform after:duration-300",
    isActive
      ? "text-ink after:scale-x-100"
      : "text-ink/65 after:scale-x-0 hover:text-ink hover:after:scale-x-100"
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        isScrolled || isOpen
          ? "border-b border-line bg-paper/95 backdrop-blur-sm"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link
          to="/"
          className="group flex items-baseline gap-2 font-display text-xl tracking-tight text-ink"
          aria-label="MC Chelaa home"
        >
          <span>MC</span>
          <span className="text-bronze">Chelaa</span>
          <span className="ml-1 hidden h-1.5 w-1.5 self-center bg-bronze transition-transform duration-300 group-hover:rotate-45 sm:block" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) => navLinkClass(isActive)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink to="/contact" size="sm">
            Book MC Chelaa
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-ink transition-colors hover:border-bronze hover:text-bronze lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id="mobile-navigation"
            initial={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-line bg-paper lg:hidden"
          >
            <div className="flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto px-5 pb-10 pt-8 sm:px-8">
              <nav className="flex flex-col divide-y divide-line" aria-label="Mobile">
                {siteConfig.nav.map((item, index) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center justify-between py-5 font-display text-3xl transition-colors",
                        isActive ? "text-bronze" : "text-ink hover:text-bronze"
                      )
                    }
                  >
                    {item.label}
                    <span className="text-[11px] font-sans tracking-[0.2em] text-stone">
                      0{index + 1}
                    </span>
                  </NavLink>
                ))}
              </nav>

              <div className="mt-10">
                <ButtonLink to="/contact" size="lg" className="w-full" onClick={() => setIsOpen(false)}>
                  Book MC Chelaa
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </ButtonLink>
              </div>

              <div className="mt-auto pt-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-bronze">
                  Connect
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-3 block text-sm text-stone hover:text-ink"
                >
                  {siteConfig.email}
                </a>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="mt-1 block text-sm text-stone hover:text-ink"
                >
                  {siteConfig.phoneDisplay}
                </a>
                <SocialLinks className="mt-5" />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
