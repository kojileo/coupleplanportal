"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { SiteHeader } from "@/components/navigation/SiteHeader";
import type { Locale } from "@/i18n/settings";

interface AppShellProps {
  children: ReactNode;
  locale: Locale;
}

export function AppShell({ children, locale }: AppShellProps) {
  const t = useTranslations("common.nav");

  const appLinks = [
    { key: "dashboard", href: `/${locale}/app/dashboard`, label: t("dashboard") },
    { key: "portal", href: `/${locale}/portal`, label: t("portal") },
    { key: "settings", href: `/${locale}/settings`, label: t("settings") },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <SiteHeader locale={locale} />
      <div className="mx-auto flex w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <aside className="sticky top-28 hidden h-max min-w-[220px] rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm md:block">
          <nav className="space-y-2">
            {appLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-muted transition hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-foreground)]"
              >
                <span>{link.label}</span>
                <span aria-hidden>{"→"}</span>
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1 space-y-8">{children}</main>
      </div>
    </div>
  );
}
