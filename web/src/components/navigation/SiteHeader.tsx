"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

import type { Locale } from "@/i18n/settings";

export function SiteHeader({ locale: localeProp }: { locale?: Locale }) {
  const localeFromContext = useLocale() as Locale;
  const activeLocale = localeProp ?? localeFromContext;
  const t = useTranslations("common.nav");
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { key: "portal", href: `/${activeLocale}/portal`, label: t("portal") },
    { key: "dashboard", href: `/${activeLocale}/app/dashboard`, label: t("dashboard") },
    { key: "login", href: `/${activeLocale}/auth/login`, label: t("login") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href={`/${activeLocale}`} className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <Heart className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold">CouplePlan</span>
            <span className="text-xs font-medium text-muted">AI Date Co-pilot</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="text-sm text-muted transition hover:text-[var(--color-foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[var(--color-foreground)] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen ? (
        <div className="md:hidden">
          <div className="space-y-2 border-t border-black/10 bg-white px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-[var(--color-foreground)] hover:bg-[var(--color-accent-soft)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
