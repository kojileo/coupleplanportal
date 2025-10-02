import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  CalendarDays,
  CreditCard,
  HeartPulse,
  MessageCircleHeart,
  Paintbrush,
  Sparkles,
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/settings";

const dashboardCopy: Record<Locale, {
  userName: string;
  activePlans: Array<{
    id: string;
    title: string;
    schedule: string;
    status: "active" | "draft" | "archived";
    score: number;
    highlights: string[];
  }>;
  relationship: {
    score: number;
    trend: number;
    insights: string[];
  };
  notifications: Array<{
    id: string;
    title: string;
    body: string;
    timeAgo: string;
    cta: string;
  }>;
}> = {
  ja: {
    userName: "田中",
    activePlans: [
      {
        id: "tokyo-tower",
        title: "東京タワーデート体験",
        schedule: "2025年1月5日 14:00",
        status: "active",
        score: 92,
        highlights: ["サンセットディナー予約済み", "夜景フォトスポットをAIがキュレーション"],
      },
      {
        id: "yokohama",
        title: "横浜アートウォーク",
        schedule: "2025年1月19日 11:00",
        status: "draft",
        score: 78,
        highlights: ["カップル向けワークショップ候補3件", "ペア割クーポン提案"],
      },
    ],
    relationship: {
      score: 86,
      trend: 8,
      insights: [
        "週次リチュアルを継続中 (4週連続)",
        "前回の仲裁ログに基づくフォローアップリマインダー",
      ],
    },
    notifications: [
      {
        id: "canvas",
        title: "Date Canvasに2件のメモが追加されました",
        body: "パートナーが週末のフォトセットをアップロードしました。コメントを送りましょう。",
        timeAgo: "15分前",
        cta: "開く",
      },
      {
        id: "mediation",
        title: "AI仲裁サマリーを確認",
        body: "先週のディスカッションで出たアクションアイテムを振り返りましょう。",
        timeAgo: "3時間前",
        cta: "サマリーを見る",
      },
    ],
  },
  en: {
    userName: "Hana",
    activePlans: [
      {
        id: "brooklyn",
        title: "Brooklyn Sunset Date",
        schedule: "Jan 5, 2025 · 6:30 PM",
        status: "active",
        score: 90,
        highlights: ["Sunrise ceramics class booked", "AI scouted photo walk route"],
      },
      {
        id: "tokyo-museum",
        title: "Museum Circuit",
        schedule: "Jan 19, 2025 · 1:00 PM",
        status: "draft",
        score: 75,
        highlights: ["Three matching workshops", "Member perks unlocked"],
      },
    ],
    relationship: {
      score: 84,
      trend: 6,
      insights: [
        "Weekly ritual streak ×4",
        "Follow-up on last mediation summary to close loop",
      ],
    },
    notifications: [
      {
        id: "canvas",
        title: "New Canvas memory",
        body: "Your partner added weekend photos. Drop a note to celebrate!",
        timeAgo: "15 min ago",
        cta: "Open",
      },
      {
        id: "mediation",
        title: "Mediation summary ready",
        body: "Revisit action items resolved during last check-in to stay aligned.",
        timeAgo: "3 hours ago",
        cta: "View summary",
      },
    ],
  },
};

const quickActionIconMap = {
  aiPlanning: Sparkles,
  mediation: MessageCircleHeart,
  canvas: Paintbrush,
  billing: CreditCard,
} as const;

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dashboard" });
  const content = dashboardCopy[locale];

  const quickActions = (Object.keys(quickActionIconMap) as Array<
    keyof typeof quickActionIconMap
  >).map((key) => ({
    key,
    Icon: quickActionIconMap[key],
    title: t(`quickActions.items.${key}.title`),
    description: t(`quickActions.items.${key}.description`),
    href:
      key === "aiPlanning"
        ? `/${locale}/plans/new`
        : key === "mediation"
        ? `/${locale}/mediation`
        : key === "canvas"
        ? `/${locale}/canvas`
        : `/${locale}/billing`,
  }));

  return (
    <AppShell locale={locale}>
      <section className="flex flex-col justify-between gap-6 rounded-3xl bg-white/90 p-8 shadow-sm md:flex-row">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            CouplePlan Portal
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">
            {t("welcome.title", { name: content.userName })}
          </h1>
          <p className="text-sm text-muted">{t("welcome.subtitle")}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" className="rounded-2xl" asChild>
            <Link href={`/${locale}/plans`}>{t("actions.viewPlans")}</Link>
          </Button>
          <Button className="rounded-2xl" asChild>
            <Link href={`/${locale}/plans/new`}>
              <Sparkles className="h-4 w-4" aria-hidden />
              {t("actions.newPlan")}
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
            {t("quickActions.title")}
          </h2>
          <div className="grid gap-4">
            {quickActions.map(({ key, Icon, title, description, href }) => (
              <Link
                key={key}
                href={href}
                className="flex items-center justify-between gap-6 rounded-3xl border border-black/5 bg-white/90 px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-foreground)]">{title}</p>
                    <p className="text-xs text-muted">{description}</p>
                  </div>
                </div>
                <ArrowIcon />
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
            {t("relationshipHealth.title")}
          </h2>
          <div className="rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {t("relationshipHealth.scoreLabel")}
                </p>
                <p className="mt-2 text-4xl font-semibold text-[var(--color-foreground)]">
                  {content.relationship.score}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                +{content.relationship.trend}%
              </span>
            </div>
            <ul className="mt-6 space-y-3 text-sm text-muted">
              {content.relationship.insights.map((insight) => (
                <li key={insight} className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
              {t("currentPlans.title")}
            </h2>
            <Link href={`/${locale}/plans`} className="text-sm font-medium text-[var(--color-accent)]">
              {t("currentPlans.viewAll")}
            </Link>
          </div>
          <div className="space-y-4">
            {content.activePlans.map((plan) => (
              <article key={plan.id} className="rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{plan.title}</h3>
                    <p className="text-sm text-muted">{plan.schedule}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-600">
                      {t(`planStatuses.${plan.status}`)}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {plan.score}% match
                    </span>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {plan.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[var(--color-accent)]" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
            {t("notifications.title")}
          </h2>
          <div className="space-y-4 rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm">
            {content.notifications.map((notification) => (
              <div key={notification.id} className="space-y-2 border-b border-black/5 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {notification.title}
                  </p>
                  <span className="text-xs text-muted">{notification.timeAgo}</span>
                </div>
                <p className="text-sm text-muted">{notification.body}</p>
                <Link
                  href={`/${locale}/notifications/${notification.id}`}
                  className="text-sm font-medium text-[var(--color-accent)]"
                >
                  {notification.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ArrowIcon() {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
      →
    </span>
  );
}
