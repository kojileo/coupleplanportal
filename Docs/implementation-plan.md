# CouplePlan 実装計画 (2025年10月版) - 更新版

## 1. スコープ概要
- MVP v0.9: デートプラン生成〜共同編集〜課金管理までの一連フローを Web で提供
- 非スコープ: 位置情報ピン専用画面 (UC005-002)、アルバム生成 (UC005-005)、オフラインモード (COMMON-005)
- 依存チーム: AI プラン生成 (AI Team)、課金・会計 (Growth Team)

## 実装状況 (2025年1月27日更新)

### ✅ 完了済み
- **プロジェクト構造セットアップ**: Next.js 15 + TypeScript + Tailwind CSS
- **共通UIコンポーネント**: Button, Card, Input, Modal, Stepper
- **型定義**: ユーザー、デートプラン、ポータル、共同編集、仲裁、Date Canvas、課金関連
- **ユーティリティ関数**: 日付フォーマット、バリデーション、ローカルストレージ、エラーハンドリング
- **認証系画面**: AUTH-001 (ログイン・アカウント作成), AUTH-002 (プロフィール設定)
- **共通画面**: COMMON-001 (ダッシュボード)
- **UC-001画面**: UC001-001 (デートプラン作成), UC001-002 (AI生成中)
- **UC-003画面**: UC003-001 (ポータルトップ)

### 🚧 進行中
- **残りの画面実装**: UC-002, UC-004, UC-005, UC-007系画面
- **API統合**: バックエンドとの連携
- **テスト実装**: ユニットテスト、統合テスト

### 📋 未着手
- **本番デプロイ**: Vercel + AWS ECS
- **パフォーマンス最適化**: 画像最適化、コード分割
- **監視・ログ**: エラー追跡、パフォーマンス監視

## 2. タイムライン (更新版)
| フェーズ | 期間 | 主担当 | 成果物 | 状況 |
|----------|------|--------|--------|------|
| Sprint 0 (設計) | 10/07 - 10/11 | FE/BE/UX | 技術選定、APIモック、UIライブラリ定義 | ✅ 完了 |
| Sprint 1 (認証/共通) | 10/14 - 10/25 | FE | AUTH, COMMON 系の実装、CI 整備 | ✅ 完了 |
| Sprint 2 (UC001/UC002) | 10/28 - 11/08 | FE/AI | プラン生成・共同編集、リアルタイム同期 PoC | 🚧 進行中 |
| Sprint 3 (UC003/UC004) | 11/11 - 11/22 | FE/BE | ポータル、仲裁フロー、AI連携強化 | 🚧 進行中 |
| Sprint 4 (UC005/UC007) | 11/25 - 12/06 | FE/Growth | Date Canvas、課金管理、Stripe 連携 | 📋 未着手 |
| Hardening | 12/09 - 12/20 | QA/All | バグ修正、パフォーマンス改善、リリース判定 | 📋 未着手 |

### 現在の進捗 (2025年1月27日)
- **Sprint 1**: 100% 完了
- **Sprint 2**: 60% 完了 (UC001-001, UC001-002 完了、UC002系 未着手)
- **Sprint 3**: 30% 完了 (UC003-001 完了、UC004系 未着手)
- **Sprint 4**: 0% 完了

## 3. 技術スタック (実装済み)
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS ✅
- **UI Components**: カスタムコンポーネント (Button, Card, Input, Modal, Stepper) ✅
- **State Management**: React Hooks + Context API (Zustand 予定) ✅
- **Styling**: Tailwind CSS + カスタムデザインシステム ✅
- **Icons**: Lucide React ✅
- **Animations**: Framer Motion ✅
- **Forms**: React Hook Form + Zod (予定)
- **Notifications**: React Hot Toast ✅

### 未実装 (今後の予定)
- **Backend**: FastAPI + PostgreSQL + Redis
- **AI Integration**: LangChain + OpenAI API
- **Realtime**: Supabase Realtime or Ably (UC002/UC005)
- **Infrastructure**: Vercel (FE), AWS ECS (BE), RDS, S3, CloudFront, Stripe

## 4. 主要タスク (実装状況)
### 4.1 共通 ✅ 完了
- [x] デザインシステム / カラートークンを Tailwind に移植
- [x] 共通UIコンポーネント (Button, Card, Input, Modal, Stepper) を実装
- [x] 型定義とユーティリティ関数の実装
- [ ] i18n フレームワーク (next-intl) の導入

### 4.2 認証 🚧 進行中
- [x] ログイン・アカウント作成画面 (AUTH-001)
- [x] プロフィール設定画面 (AUTH-002)
- [ ] Supabase Auth を用いたメールリンクログイン
- [ ] プロフィール画像アップロード (S3 + presigned URL)
- [ ] パートナー招待コード生成

### 4.3 プラン生成/共同編集 🚧 進行中
- [x] デートプラン作成画面 (UC001-001)
- [x] AI生成中画面 (UC001-002)
- [ ] AI プラン生成 API の統合 (`POST /plans/generate`)
- [ ] カスタマイズビューの diff/patch 実装
- [ ] 共同編集ボードの WebSocket 同期、競合解決画面への配線

### 4.4 Date Canvas 📋 未着手
- [ ] Canvas 描画を Fabric.js で構築
- [ ] マップ表示に MapLibre GL を採用、`location` カテゴリをピン化
- [ ] 共有リンク (短縮 URL) を CloudFront Functions で発行

### 4.5 課金 📋 未着手
- [ ] Stripe Customer Portal 連携
- [ ] 任意課金アラートの通知設定 (メール + Slack Webhook)
- [ ] 売上ダッシュボードは BigQuery + Looker Studio Embedding を検討

## 5. リリースノート雛形
```
## CouplePlan v0.1 (2025-12-23)
- プロトタイプのNext.js実装を開始
- 共通UIコンポーネントとデザインシステムを構築
- 認証画面 (AUTH-001, AUTH-002) を実装
- ダッシュボード画面 (COMMON-001) を実装
- デートプラン作成画面 (UC001-001) を実装
- AI生成中画面 (UC001-002) を実装
- ポータルトップ画面 (UC003-001) を実装
- TypeScript型定義とユーティリティ関数を実装
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
