import Link from "next/link";
import { getTranslations } from "next-intl/server";

import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/settings";

interface LoginPageProps {
  params: Promise<{ locale: Locale }>;
}

const highlightCopy: Record<Locale, Array<{ title: string; description: string }>> = {
  ja: [
    {
      title: "AI Ritual Sync",
      description: "週次の振り返りや仲裁ログを自動で同期。ジャーナル差分もサマリー化。",
    },
    {
      title: "Date Canvas",
      description: "ふたりの思い出をキャンバスに集約。写真や音声メモも共同編集できます。",
    },
  ],
  en: [
    {
      title: "AI Ritual Sync",
      description: "Keep weekly check-ins, insights and mediation diffs in one synced place.",
    },
    {
      title: "Date Canvas",
      description: "Co-create itineraries, drop pins and capture shared memories effortlessly.",
    },
  ],
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth.login" });
  const highlights = highlightCopy[locale];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <SiteHeader locale={locale} />
      <main className="mx-auto flex w-full max-w-6xl flex-1 items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 rounded-3xl bg-white/90 px-6 py-10 shadow-xl sm:px-10 md:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-[var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-accent)]">
              {t("title")}
            </span>
            <p className="text-lg text-muted">{t("subtitle")}</p>
            <dl className="space-y-4 text-sm text-muted">
              {highlights.map((item) => (
                <div key={item.title}>
                  <dt className="font-semibold text-[var(--color-foreground)]">{item.title}</dt>
                  <dd>{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <form className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[var(--color-foreground)]">
                {t("emailLabel")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)]"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[var(--color-foreground)]">
                {t("passwordLabel")}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="h-12 w-full rounded-2xl border border-black/10 bg-white px-4 text-sm shadow-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-soft)]"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 rounded border-black/20" />
                <span>{t("rememberMe")}</span>
              </label>
              <Link
                href={`/${locale}/auth/reset`}
                className="font-medium text-[var(--color-accent)] hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>
            <Button type="submit" className="w-full justify-center">
              {t("submit")}
            </Button>
            <p className="text-center text-sm text-muted">
              {t("signupHint")}{" "}
              <Link
                href={`/${locale}/auth/register`}
                className="font-semibold text-[var(--color-accent)] hover:underline"
              >
                {t("signupLink")}
              </Link>
            </p>
          </form>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
