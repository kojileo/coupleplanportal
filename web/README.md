# CouplePlan Web

Next.js 15 / TypeScript / Tailwind 4 をベースにした CouplePlan 向けフロントエンドです。

## 動作確認方法

1. Node.js 20 系 (開発環境では 20.18.0) がインストールされていることを確認します。
2. 依存関係をインストールします。
   ```bash
   npm install
   ```
3. 開発サーバーを起動します。
   ```bash
   npm run dev
   ```
4. ブラウザで <http://localhost:3000> を開き、`/ja` または `/en` 配下の画面が表示されることを確認します。
5. コード品質チェックとして ESLint を実行します。
   ```bash
   npm run lint
   ```
   すべてのファイルでエラーが発生しないことを確認してください。

## フォルダ構成メモ

- `src/app/[locale]/page.tsx` : ランディングページ (Prototype/index.html を参照)
- `src/app/[locale]/auth/login/page.tsx` : 認証画面 AUTH-001
- `src/app/[locale]/app/dashboard/page.tsx` : COMMON-001 ダッシュボード
- `src/app/[locale]/portal/page.tsx` : UC003 ポータル
- `src/i18n` : `next-intl` による ja/en ローカライズ設定

## 参考

- Next.js ドキュメント: <https://nextjs.org/docs>
- next-intl ドキュメント: <https://next-intl-docs.vercel.app/>
