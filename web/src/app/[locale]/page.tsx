import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ArrowUpRight, HeartHandshake, Map, Sparkles, Users } from "lucide-react";

import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/settings";

interface LandingPageProps {
  params: Promise<{ locale: Locale }>;
}

const featureIconMap = {
  aiPlanning: Sparkles,
  collaboration: Users,
  portal: Map,
  mediation: HeartHandshake,
} as const;

export default async function LandingPage({ params }: LandingPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing" });

  const features = (Object.keys(featureIconMap) as Array<keyof typeof featureIconMap>).map((key) => {
    const Icon = featureIconMap[key];
    return {
      key,
      Icon,
      title: t(`features.items.${key}.title`),
      description: t(`features.items.${key}.description`),
    };
  });

  const categories = ["auth", "portal", "canvas"].map((key) => ({
    key,
    title: t(`screens.categories.${key}.title`),
    items: t.raw(`screens.categories.${key}.items`) as string[],
  }));

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <section className="grid gap-10 rounded-3xl bg-gradient-to-br from-rose-50 via-white to-sky-50 px-6 py-12 shadow-sm sm:px-10 md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-500">
              {t("hero.eyebrow")}
            </span>
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-foreground)] sm:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="max-w-xl text-lg text-muted sm:text-xl">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="shadow-md">
                <Link href={`/${locale}/auth/login`}>
                  {t("hero.primaryCta")}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={`/${locale}/app/dashboard`}>{t("hero.secondaryCta")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-6 shadow-lg md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/40 via-transparent to-rose-200/50" aria-hidden />
            <div className="relative space-y-5 text-sm text-muted">
              <div className="flex items-center justify-between rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-rose-400">AI Ritual</p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">Weekend Date Blueprint</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                  92% match
                </span>
              </div>
              <div className="rounded-2xl bg-white/70 p-4 shadow-sm">
                <p className="text-xs font-medium text-muted">Next Stop</p>
                <p className="text-base font-semibold text-[var(--color-foreground)]">Artisan Coffee Workshop</p>
                <p className="text-sm text-muted">14:30 · Nakameguro</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-500">Mood</p>
                  <p className="text-lg font-semibold text-[var(--color-foreground)]">Playful</p>
                </div>
                <div className="rounded-2xl bg-white/70 p-4 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-500">Energy</p>
                  <p className="text-lg font-semibold text-[var(--color-foreground)]">Light</p>
                </div>
              </div>
              <div className="rounded-2xl bg-white/70 p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-rose-400">Date Canvas</p>
                <p className="text-sm text-muted">
                  Capture highlights, add photos and leave voice notes together.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">
                {t("features.title")}
              </h2>
              <p className="max-w-2xl text-sm text-muted">{t("hero.subtitle")}</p>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {features.map(({ key, Icon, title, description }) => (
              <div
                key={key}
                className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{title}</h3>
                </div>
                <p className="mt-4 text-sm text-muted">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="screens" className="mt-20 space-y-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">{t("screens.title")}</h2>
            <p className="max-w-2xl text-sm text-muted">{t("screens.description")}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {categories.map((category) => (
              <div key={category.key} className="rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{category.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-xs font-semibold text-[var(--color-accent)]">
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
