"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { useScroll } from "@/hooks/use-scroll";
import { EASE_OUT_SOFT } from "@/lib/animations";
import { Container } from "@/components/ui/container";
import { CTAButton } from "@/components/ui/cta-button";
import { Logo } from "./logo";

export function Navbar() {
  const pathname = usePathname();
  const scrolled = useScroll(8);
  const [open, setOpen] = React.useState(false);
  const reduceMotion = useReducedMotion();

  const overDarkHero = pathname === "/" && !scrolled && !open;

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_OUT_SOFT }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled || open
          ? "glass border-border/60 shadow-xs"
          : "border-transparent bg-transparent shadow-none",
      )}
    >
      <Container>
        <motion.nav
          animate={{ height: scrolled ? "4rem" : "4.5rem" }}
          transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
          className="flex items-center justify-between"
          aria-label="Primary"
        >
          <Logo variant={overDarkHero ? "inverted" : "default"} />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300 xl:px-4",
                    overDarkHero
                      ? isActive(link.href)
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  {isActive(link.href) ? (
                    <motion.span
                      layoutId="nav-active"
                      className={cn(
                        "absolute inset-0 -z-10 rounded-full",
                        overDarkHero ? "bg-white/15" : "bg-secondary",
                      )}
                      transition={{ duration: 0.35, ease: EASE_OUT_SOFT }}
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <CTAButton
              href="/contact"
              size="sm"
              withArrow={false}
              variant={overDarkHero ? "inverse" : "primary"}
            >
              Book a session
            </CTAButton>
          </div>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full transition-colors lg:hidden",
              overDarkHero
                ? "text-white hover:bg-white/10"
                : "text-foreground hover:bg-secondary",
            )}
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </motion.button>
        </motion.nav>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-menu"
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: EASE_OUT_SOFT }}
            className="glass overflow-hidden border-b border-border lg:hidden"
          >
            <Container className="py-6">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.04, delayChildren: 0.03 },
                  },
                }}
                className="flex flex-col gap-1"
              >
                {NAV_LINKS.map((link) => (
                  <motion.li
                    key={link.href}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { duration: 0.3, ease: EASE_OUT_SOFT },
                      },
                    }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block rounded-full px-4 py-3 text-base font-medium transition-colors duration-300",
                        isActive(link.href)
                          ? "bg-secondary text-foreground"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-5">
                <CTAButton
                  href="/contact"
                  size="lg"
                  withArrow={false}
                  className="w-full"
                >
                  Book a session
                </CTAButton>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
