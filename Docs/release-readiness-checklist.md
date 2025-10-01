# リリース準備チェックリスト (CouplePlan v0.9)

プロトタイプから実装版へ移行するために必要な確認項目をまとめています。開発フローでは各担当が完了チェックを更新し、リリース会議の資料として利用します。

## 1. プロダクト範囲
- [ ] 対象画面: AUTH-001〜004, UC001-001〜005, UC002-001〜005, UC003-001〜005, UC004-001〜005, UC005-001, UC007-001〜005, COMMON-001〜004
- [ ] バックログ扱いの画面 (UC005-002/005, COMMON-005) はナビゲーションから非表示になっている
- [ ] `Docs/画面一覧・遷移図.md` と `screensdocs` の仕様内容が一致している

## 2. UX / UI
- [ ] Figma コンポーネントと HTML プロトの差分レビュー完了
- [ ] レスポンシブ (768px, 1024px, 1280px) のスタイルガイド更新
- [ ] ダークモード対応ポリシー決定 (第一版はライトのみ)

## 3. アプリケーション実装
- [ ] 画面遷移ルーティング (React Router / Next.js) 設計書承認
- [ ] グローバル状態管理 (Redux Toolkit or Zustand) 方針確定
- [ ] API モック (`/api/v1/...`) を MSW で準備
- [ ] `common.js` / `navigation.js` を TypeScript 化して再利用可能な hooks に落とし込む

## 4. バックエンド / データ
- [ ] 認証方式 (Supabase Auth / Cognito 等) を選定し、環境変数設計を完了
- [ ] プラン生成 API (AI) の PoC 成果を共有
- [ ] Date Canvas 用のストレージ (S3 + SignedURL) とリアルタイム同期基盤 (Firestore/Ably) を決定
- [ ] 課金は Stripe を利用し、Webhook 仕様を `Docs/画面-API-データマッピング.md` に反映

## 5. QA
- [ ] `Docs/test-strategy.md` に沿ったテストケース作成 (Smoke / Regression / E2E)
- [ ] 自動テスト枠: lint, unit, integration, e2e (Playwright) を CI に組み込み
- [ ] 手動テストスケジュール作成 (3days)

## 6. 運用 / セキュリティ
- [ ] エラーモニタリング (Sentry) とログ集約 (Datadog) の導入計画
- [ ] 個人情報の取り扱い手順を更新 (プロフィール画像、位置情報)
- [ ] プライバシーポリシー・利用規約の改訂ドラフトをリーガルへ共有

## 7. ドキュメント
- [ ] `screensdocs` の不足分を補完 (本コミットで追加済)
- [ ] API 仕様は OpenAPI 3.1 で別途エクスポート予定
- [ ] リリースノートの雛形を `Docs/implementation-plan.md` に記載

完了チェックは Notion のリリーステンプレートと連携予定です。
