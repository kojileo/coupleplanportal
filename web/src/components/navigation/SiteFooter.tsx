"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import type { Locale } from "@/i18n/settings";

export function SiteFooter({ locale: localeProp }: { locale?: Locale }) {
  const localeFromContext = useLocale() as Locale;
  const locale = localeProp ?? localeFromContext;
  const t = useTranslations("common.footer");
  const year = new Date().getFullYear();

  const footerLinks = [
    { href: `/${locale}/portal`, label: t("support") },
    { href: `/${locale}/app/dashboard`, label: t("settings") },
    { href: `/${locale}/help`, label: t("helpCenter") },
  ];

  return (
    <footer className="border-t border-black/5 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="space-y-1 text-sm text-muted">
          <p className="font-semibold text-[var(--color-foreground)]">CouplePlan</p>
          <p>{t("copyright", { year })}</p>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-muted">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-[var(--color-foreground)]">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
