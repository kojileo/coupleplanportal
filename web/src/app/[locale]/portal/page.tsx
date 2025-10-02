import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SiteHeader } from "@/components/navigation/SiteHeader";
import type { Locale } from "@/i18n/settings";

interface PortalPageProps {
  params: Promise<{ locale: Locale }>;
}

const portalCopy: Record<Locale, {
  heroTitle: string;
  heroSubtitle: string;
  sections: Array<{
    title: string;
    description: string;
    items: Array<{ title: string; meta: string; note: string }>;
  }>;
}> = {
  ja: {
    heroTitle: "Date Intelligence Hub",
    heroSubtitle: "UC-003のプロトタイプを基に、スポット推薦と体験ジャーナルを再構成しました。",
    sections: [
      {
        title: "トレンドスポット",
        description: "カップルに人気の最新スポットをAIがスコアリング。雰囲気や混雑状況も把握できます。",
        items: [
          {
            title: "星空プラネタリウム・中目黒",
            meta: "親密度スコア 94",
            note: "夜19時以降は静かめ。ヒューマンデザイン診断ワーク付き。",
          },
          {
            title: "サウナ&ラウンジ・代官山",
            meta: "リラックス度 88",
            note: "2名個室サウナ + アフターティーセット。",
          },
        ],
      },
      {
        title: "AIおすすめプラン",
        description: "関係性のトーンに合わせた半日プランを自動生成。移動時間も最適化します。",
        items: [
          {
            title: "クリエイティブ・モーニング",
            meta: "3時間 / 予算 8,000円",
            note: "ハンドドリップ講座 → 陶芸ワーク → リバーサイドブランチ。",
          },
          {
            title: "リレーションシップメンテ",
            meta: "2.5時間 / 予算 6,000円",
            note: "AIジャーナルテンプレート + コーチング質問セット付き。",
          },
        ],
      },
      {
        title: "体験ジャーナル",
        description: "Date Canvasに記録された体験ダイジェスト。感情スコアの推移も確認できます。",
        items: [
          {
            title: "11/24 SHIBUYA SKY",
            meta: "エナジー: 高い",
            note: "共有メモ: “また来月も夜景を見に行こう”。",
          },
          {
            title: "11/17 ペア料理会",
            meta: "学び: 新しい味の発見",
            note: "AIハイライト: コラボレーション度 +12",
          },
        ],
      },
    ],
  },
  en: {
    heroTitle: "Date Intelligence Hub",
    heroSubtitle: "Inspired by UC-003 prototypes to surface curated spots, AI flows and shared memories.",
    sections: [
      {
        title: "Trending Spots",
        description: "AI ranks what couples love right now with vibe and crowd insights included.",
        items: [
          {
            title: "Starlight Planetarium · Nakameguro",
            meta: "Intimacy score 94",
            note: "Quieter after 7PM. Includes human design micro-reading.",
          },
          {
            title: "Sauna & Lounge · Daikanyama",
            meta: "Relaxation score 88",
            note: "Private double sauna followed by artisan tea pairing.",
          },
        ],
      },
      {
        title: "AI Suggested Flows",
        description: "Half-day itineraries tuned to your relationship tone and energy budget.",
        items: [
          {
            title: "Creative Morning",
            meta: "3h · ¥8,000",
            note: "Hand-drip workshop → pottery studio → riverside brunch.",
          },
          {
            title: "Relationship Maintenance",
            meta: "2.5h · ¥6,000",
            note: "AI journal prompts plus coaching question set included.",
          },
        ],
      },
      {
        title: "Experience Journal",
        description: "Digest of memories captured in Date Canvas with emotion trendlines.",
        items: [
          {
            title: "Nov 24 · SHIBUYA SKY",
            meta: "Energy: High",
            note: "Shared note: “Let’s chase night views again next month.”",
          },
          {
            title: "Nov 17 · Pair Cooking Lab",
            meta: "Insight: Found a brand-new flavour",
            note: "AI highlight: Collaboration +12",
          },
        ],
      },
    ],
  },
};

export default async function PortalPage({ params }: PortalPageProps) {
  const { locale } = await params;
  const content = portalCopy[locale];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)]">
      <SiteHeader locale={locale} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
            CouplePlan Portal
          </p>
          <h1 className="text-3xl font-bold text-[var(--color-foreground)]">{content.heroTitle}</h1>
          <p className="max-w-2xl text-sm text-muted">{content.heroSubtitle}</p>
        </header>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {content.sections.map((section) => (
            <section key={section.title} className="space-y-4 rounded-3xl border border-black/5 bg-white/90 p-6 shadow-sm">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-foreground)]">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{section.description}</p>
              </div>
              <ul className="space-y-4 text-sm text-muted">
                {section.items.map((item) => (
                  <li key={item.title} className="space-y-1 rounded-2xl bg-white/80 p-4 shadow-sm">
                    <p className="text-base font-semibold text-[var(--color-foreground)]">{item.title}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">{item.meta}</p>
                    <p>{item.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
