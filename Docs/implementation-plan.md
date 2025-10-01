# CouplePlan 実装計画 (2025年10月版)

## 1. スコープ概要
- MVP v0.9: デートプラン生成〜共同編集〜課金管理までの一連フローを Web で提供
- 非スコープ: 位置情報ピン専用画面 (UC005-002)、アルバム生成 (UC005-005)、オフラインモード (COMMON-005)
- 依存チーム: AI プラン生成 (AI Team)、課金・会計 (Growth Team)

## 2. タイムライン
| フェーズ | 期間 | 主担当 | 成果物 |
|----------|------|--------|--------|
| Sprint 0 (設計) | 10/07 - 10/11 | FE/BE/UX | 技術選定、APIモック、UIライブラリ定義 |
| Sprint 1 (認証/共通) | 10/14 - 10/25 | FE | AUTH, COMMON 系の実装、CI 整備 |
| Sprint 2 (UC001/UC002) | 10/28 - 11/08 | FE/AI | プラン生成・共同編集、リアルタイム同期 PoC |
| Sprint 3 (UC003/UC004) | 11/11 - 11/22 | FE/BE | ポータル、仲裁フロー、AI連携強化 |
| Sprint 4 (UC005/UC007) | 11/25 - 12/06 | FE/Growth | Date Canvas、課金管理、Stripe 連携 |
| Hardening | 12/09 - 12/20 | QA/All | バグ修正、パフォーマンス改善、リリース判定 |

## 3. 技術スタック
- Frontend: Next.js 15 + TypeScript + Tailwind (デザインシステムは DaisyUI カスタム)
- State: Redux Toolkit + RTK Query (API キャッシュ)
- Backend: FastAPI + PostgreSQL + Redis、AI サービスは LangChain 経由で OpenAI API を利用
- Realtime: Supabase Realtime or Ably (UC002/UC005)
- Infrastructure: Vercel (FE), AWS ECS (BE), RDS, S3, CloudFront, Stripe

## 4. 主要タスク (抜粋)
### 4.1 共通
- [ ] デザインシステム / カラートークンを Tailwind に移植
- [ ] 共通ナビゲーション component (`AppShell`) を実装
- [ ] i18n フレームワーク (next-intl) の導入

### 4.2 認証
- [ ] Supabase Auth を用いたメールリンクログイン
- [ ] プロフィール画像アップロード (S3 + presigned URL)
- [ ] パートナー招待コード生成

### 4.3 プラン生成/共同編集
- [ ] AI プラン生成 API の統合 (`POST /plans/generate`)
- [ ] カスタマイズビューの diff/patch 実装
- [ ] 共同編集ボードの WebSocket 同期、競合解決画面への配線

### 4.4 Date Canvas
- [ ] Canvas 描画を Fabric.js で構築
- [ ] マップ表示に MapLibre GL を採用、`location` カテゴリをピン化
- [ ] 共有リンク (短縮 URL) を CloudFront Functions で発行

### 4.5 課金
- [ ] Stripe Customer Portal 連携
- [ ] 任意課金アラートの通知設定 (メール + Slack Webhook)
- [ ] 売上ダッシュボードは BigQuery + Looker Studio Embedding を検討

## 5. リリースノート雛形
```
## CouplePlan v0.9 (2025-12-23)
- AI デートプラン作成と共同編集機能を正式リリース
- Date Canvas ボードで思い出を可視化 (マップトグル付き)
- カップル向け仲裁サポート機能を追加
- 課金管理ダッシュボードと通知設定を搭載
```

## 6. リスク/課題
- AI プラン生成のレイテンシが SLA (<4s) を満たすか要検証
- 共同編集の競合解決アルゴリズム（Operational Transform vs CRDT）を確定
- Stripe Webhook と内部イベントの冪等性を担保
- 位置情報データの個人情報保護 (同意・削除ポリシー)

## 7. コミュニケーション
- 定例: 月曜 11:00 (All hands)、木曜 17:00 (技術同期)
- ドキュメント: GitHub + Notion、設計レビューは FigJam
- インシデント: PagerDuty (S2 以上)、Slack #cp-release チャンネル
