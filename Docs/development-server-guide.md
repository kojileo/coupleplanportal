# 開発サーバー管理ガイド

## 🎯 このガイドの目的
CouplePlanアプリの開発サーバー（Next.js）の起動、停止、リセット、トラブルシューティングの方法を説明します。

## 📋 基本操作

### 1. 開発サーバーの起動
```powershell
npm run dev
```
- **URL**: http://localhost:3000
- **自動リロード**: ファイル変更時に自動でページが更新される
- **ホットリロード**: 状態を保持したまま更新

### 2. 開発サーバーの停止
```powershell
# 方法1: Ctrl+C (推奨)
Ctrl+C

# 方法2: プロセス強制終了
taskkill /F /IM node.exe
```

### 3. ポート確認
```powershell
# ポート3000の使用状況確認
netstat -ano | findstr :3000

# ポート3001の使用状況確認
netstat -ano | findstr :3001
```

## 🧹 クリーンアップ手順

### 1. 完全リセット（推奨）
```powershell
# 1. プロセス停止
taskkill /F /IM node.exe

# 2. ビルドキャッシュ削除
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. npmキャッシュクリア
npm cache clean --force

# 4. 依存関係再インストール
npm install

# 5. サーバー再起動
npm run dev
```

### 2. 軽量リセット
```powershell
# 1. プロセス停止
taskkill /F /IM node.exe

# 2. ビルドキャッシュのみ削除
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# 3. サーバー再起動
npm run dev
```

### 3. 依存関係リセット
```powershell
# 1. プロセス停止
taskkill /F /IM node.exe

# 2. node_modules削除
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# 3. package-lock.json削除
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# 4. 依存関係再インストール
npm install

# 5. サーバー再起動
npm run dev
```

## ⚠️ よくある問題と解決方法

### 問題1: ポートが使用中エラー
```
Error: listen EADDRINUSE: address already in use :::3000
```

**解決方法:**
```powershell
# 1. 使用中のプロセスを確認
netstat -ano | findstr :3000

# 2. プロセスを強制終了
taskkill /F /PID [プロセスID]

# 3. または全てのNode.jsプロセスを終了
taskkill /F /IM node.exe
```

### 問題2: 権限エラー（EPERM）
```
Error: EPERM: operation not permitted, open '.next\trace'
```

**解決方法:**
```powershell
# 1. プロセス停止
taskkill /F /IM node.exe

# 2. ビルドキャッシュ削除
Remove-Item -Recurse -Force .next

# 3. サーバー再起動
npm run dev
```

### 問題3: メモリ不足エラー
```
JavaScript heap out of memory
```

**解決方法:**
```powershell
# 1. プロセス停止
taskkill /F /IM node.exe

# 2. 完全リセット実行
Remove-Item -Recurse -Force .next
npm cache clean --force
npm install
npm run dev
```

### 問題4: SWC依存関係警告
```
⚠ Found lockfile missing swc dependencies, patching...
⚠ Lockfile was successfully patched, please run "npm install"
```

**解決方法:**
```powershell
# 1. 警告は無視して開発継続（推奨）
# 機能に影響なし

# 2. 完全に消したい場合
npm install
```

## 🛠️ 便利なスクリプト

### cleanup.ps1 の作成
プロジェクトルートに `cleanup.ps1` を作成:

```powershell
# cleanup.ps1
Write-Host "🧹 プロジェクトをクリーンアップしています..."

# プロセス停止
Write-Host "📱 Node.jsプロセスを停止中..."
taskkill /F /IM node.exe 2>$null

# キャッシュクリア
Write-Host "🗑️ ビルドキャッシュを削除中..."
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue

# npmキャッシュクリア
Write-Host "📦 npmキャッシュをクリア中..."
npm cache clean --force

Write-Host "✅ クリーンアップ完了！"
Write-Host "🚀 開発サーバーを起動するには: npm run dev"
```

### 使用方法
```powershell
# PowerShellで実行
.\cleanup.ps1

# 実行後
npm run dev
```

## 📊 サーバー状態確認

### 1. プロセス確認
```powershell
# Node.jsプロセス一覧
tasklist | findstr node

# ポート使用状況
netstat -ano | findstr :3000
```

### 2. ログ確認
```powershell
# 開発サーバーのログを確認
# ターミナルで npm run dev 実行時の出力を確認
```

## 🎯 ベストプラクティス

### 1. 開発開始時
```powershell
# 毎回の開発開始時
npm run dev
```

### 2. 問題が発生した時
```powershell
# 軽量リセット
taskkill /F /IM node.exe
Remove-Item -Recurse -Force .next
npm run dev
```

### 3. 依存関係を更新した時
```powershell
# 完全リセット
taskkill /F /IM node.exe
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
npm install
npm run dev
```

### 4. 開発終了時
```powershell
# Ctrl+C で正常停止（推奨）
# または
taskkill /F /IM node.exe
```

## 🚨 緊急時の対応

### 完全リセット（何もかもリセット）
```powershell
# 1. 全プロセス停止
taskkill /F /IM node.exe

# 2. 全キャッシュ削除
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json

# 3. npmキャッシュクリア
npm cache clean --force

# 4. 依存関係再インストール
npm install

# 5. サーバー起動
npm run dev
```

## 📝 トラブルシューティングチェックリスト

- [ ] Node.jsプロセスが停止しているか
- [ ] ポート3000が空いているか
- [ ] .nextフォルダが削除されているか
- [ ] npmキャッシュがクリアされているか
- [ ] 依存関係が最新か
- [ ] 環境変数が正しく設定されているか
- [ ] ファイルパスに日本語が含まれていないか

## 🔗 関連ドキュメント

- [実装計画](implementation-plan.md)
- [Supabaseセットアップガイド](supabase-setup-guide.md)
- [バックエンドサービス計画](backend-services-plan.md)
