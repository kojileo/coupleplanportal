# CouplePlan テスト戦略 (v0.9)

## 1. テストレベル
| レベル | 目的 | 対象 | ツール |
|--------|------|------|--------|
| L0: Lint | コード品質基準を守る | JSX/TS, Style, i18n | ESLint, Stylelint |
| L1: Unit | 関数/コンポーネント単位のロジック確認 | Hooks, Reducer, Utils | Vitest + Testing Library |
| L2: Integration | UI と API モックの結合 | 画面コンポーネント, RTK Query | Playwright Component / MSW |
| L3: E2E | ユーザーフローの検証 | 代表画面 (Auth, UC001, UC002, UC005, UC007) | Playwright (Chromium/WebKit) |
| L4: Non-Functional | 性能、負荷、セキュリティ | 共同編集WS、課金API | k6, OWASP ZAP |

## 2. カバレッジ目標
- Unit: 70% (Statements) / 80% (Critical functions)
- Integration: 主要フロー (AI生成、共同編集、課金) をすべてカバー
- E2E: クリティカルパス 5 シナリオ / Regression 15 シナリオ
- アクセシビリティ: Lighthouse score 95 以上、キーボード操作完備

## 3. 代表テストシナリオ
1. **オンボーディング (AUTH → COMMON-001)**
   - 新規登録 → プロフィール設定 → ダッシュボード到達
   - 2FA・メール検証の分岐
2. **AI デートプラン生成〜共同編集**
   - 条件入力 → 生成 → プラン確定 → カスタマイズ → 共同編集ボード
   - 競合発生 → UC002-002 で解決 → 履歴復元
3. **Date Canvas 記録/共有**
   - メモ追加、カテゴリフィルタ、マップトグル
   - 共有リンク送信と Web Share フォールバック
4. **仲裁サイクル**
   - 仲裁依頼 → 分析 → 提案 → 改善プラン → レポート
5. **課金管理**
   - プラン変更、通知設定、メトリクス確認、サブスク解約

## 4. テストデータ設計
- Auth: テストユーザー `demo+{env}@coupleplan.app`
- Date Plan: 3 パターン (ロマンチック/カジュアル/アドベンチャー)
- Date Canvas: メモデータ 10 件 (各カテゴリ)
- Billing: Stripe テストカード (4242, 4000-0000-0000-0341 など)

## 5. 自動テストパイプライン
```
yarn lint
yarn test --runInBand
yarn test:integration
npx playwright test
```
- Pull Request で L0〜L2 を必須、`main` マージ時に L3 を実施
- Nightly で L4 (k6 負荷 5 分) を実行

## 6. 手動テスト
- テストケース管理: Notion (QA DB)
- UAT: プロダクトチーム + カスタマーサクセスで 2days
- デバイス: iPhone 15, Pixel 8, iPad, MacBook Pro, Windows 11 Edge

## 7. 品質ゲート
- ブロッカー/クリティカルの未解決バグ 0 件
- 重大アクセシビリティ欠陥 (WCAG 2.1 AA) 0 件
- Lighthouse Performance 80+, Accessibility 95+, Best Practice 90+, SEO 90+
- セキュリティスキャン (GitHub Dependabot, OWASP ZAP) クリア

## 8. ロールバック基準
- Stripe 連携で 5% 以上の決済失敗が発生
- AI プラン生成 API でタイムアウトが 10% 超
- Date Canvas でデータ欠損 (保存失敗) が 3 件以上
→ 即時ロールバック + インシデント対応
