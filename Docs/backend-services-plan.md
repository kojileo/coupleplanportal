# CouplePlan バックエンドサービス準備計画

## 1. サービス選定の見直し (コスト最適化)

### 現在の選定 → 最適化後の選定

| 機能 | 現在の選定 | 最適化後の選定 | 理由 | 月額コスト |
|------|------------|----------------|------|------------|
| **認証・データベース** | FastAPI + PostgreSQL + Redis | **Supabase** | 認証・DB・Realtime・Storageが統合 | $0 (Free) → $25 (Pro) |
| **フロントエンドホスティング** | Vercel | **Vercel** | 無料枠で十分 | $0 (Hobby) |
| **AI API** | OpenAI API | **OpenAI API** | 使用量ベース | $10-50 |
| **課金** | Stripe | **Stripe** | 手数料のみ | 2.9% + 30円 |
| **ファイルストレージ** | AWS S3 | **Supabase Storage** | Supabaseに統合 | 含む |
| **CDN** | CloudFront | **Vercel Edge** | Vercelに統合 | 含む |
| **監視・ログ** | PagerDuty + 独自 | **Sentry (無料枠)** | 無料枠で十分 | $0 |
| **メール送信** | SendGrid | **Supabase Auth** | 認証メールはSupabase | 含む |
| **通知** | Slack Webhook | **Slack Webhook** | 無料 | $0 |

### 総コスト見積もり (月額)

#### MVP段階 (Freeプラン)
- **Supabase Free**: $0
- **Vercel Hobby**: $0
- **OpenAI API**: $10-30 (使用量による)
- **Stripe**: 手数料のみ
- **Sentry**: $0 (無料枠)
- **その他**: $0

**合計: $10-30/月** (従来のAWS構成の約1/10)

#### 本格運用段階 (Proプラン)
- **Supabase Pro**: $25
- **Vercel Pro**: $20 (必要に応じて)
- **OpenAI API**: $30-100 (使用量による)
- **Stripe**: 手数料のみ
- **Sentry**: $0 (無料枠)
- **その他**: $0

**合計: $75-145/月** (従来のAWS構成の約1/3)

## 2. Supabase準備作業計画

### Phase 1: プロジェクトセットアップ (1週間)

#### 1.1 Supabaseプロジェクト作成
- [ ] Supabaseアカウント作成
- [ ] プロジェクト作成 (coupleplan-production)
- [ ] 環境変数の設定
- [ ] データベース接続確認

#### 1.2 データベーススキーマ設計
- [ ] ユーザーテーブル設計
- [ ] デートプランテーブル設計
- [ ] 共同編集テーブル設計
- [ ] 仲裁・関係修復テーブル設計
- [ ] 課金・サブスクリプションテーブル設計
- [ ] ポータル・記事テーブル設計
- [ ] **容量見積もり**: Freeプラン(500MB)内での設計

#### 1.3 認証設定
- [ ] メール認証の設定
- [ ] パスワードポリシーの設定
- [ ] プロフィールテーブルの設定
- [ ] RLS (Row Level Security) の設定

### Phase 2: データベース実装 (2週間)

#### 2.1 テーブル作成
```sql
-- ユーザーテーブル
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  partner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- デートプランテーブル
CREATE TABLE date_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  partner_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'draft',
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 共同編集テーブル
CREATE TABLE plan_collaborations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID REFERENCES date_plans(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  role TEXT DEFAULT 'editor',
  last_edited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, user_id)
);

-- 仲裁・関係修復テーブル
CREATE TABLE mediation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  partner_id UUID REFERENCES profiles(id),
  conflict_type TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 課金・サブスクリプションテーブル
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 2.2 RLS (Row Level Security) 設定
- [ ] プロフィールテーブルのRLS設定
- [ ] デートプランテーブルのRLS設定
- [ ] 共同編集テーブルのRLS設定
- [ ] 仲裁テーブルのRLS設定
- [ ] 課金テーブルのRLS設定

#### 2.3 インデックス作成
- [ ] パフォーマンス最適化のためのインデックス設定
- [ ] 検索クエリの最適化

### Phase 3: ストレージ設定 (1週間)

#### 3.1 Supabase Storage設定
- [ ] バケット作成 (avatars, plan-images, canvas-files)
- [ ] ストレージポリシーの設定
- [ ] ファイルアップロード機能の実装
- [ ] 画像リサイズ機能の実装

#### 3.2 ファイル管理機能
- [ ] プロフィール画像アップロード
- [ ] デートプラン画像アップロード
- [ ] Date Canvasファイル保存

### Phase 4: Realtime機能設定 (1週間)

#### 4.1 Realtime設定
- [ ] 共同編集のRealtime同期
- [ ] 通知のRealtime配信
- [ ] オンライン状態の管理

#### 4.2 WebSocket接続管理
- [ ] 接続状態の監視
- [ ] 再接続ロジックの実装
- [ ] エラーハンドリング

### Phase 5: API統合 (2週間)

#### 5.1 Supabase Client設定
- [ ] Next.js用Supabaseクライアント設定
- [ ] 認証フローの実装
- [ ] データ取得・更新の実装

#### 5.2 フロントエンド統合
- [ ] 認証画面との統合
- [ ] ダッシュボードとの統合
- [ ] デートプラン作成との統合
- [ ] 共同編集との統合

## 3. 外部サービス統合計画

### 3.1 OpenAI API統合
- [ ] APIキーの設定
- [ ] デートプラン生成APIの実装
- [ ] 仲裁・関係修復AIの実装
- [ ] レート制限の実装

### 3.2 Stripe統合
- [ ] Stripeアカウント設定
- [ ] サブスクリプション管理
- [ ] Webhook設定
- [ ] 支払い処理の実装

### 3.3 通知サービス
- [ ] メール通知 (Supabase Auth)
- [ ] プッシュ通知 (Vercel Edge Functions)
- [ ] Slack通知 (Webhook)

## 4. セキュリティ・コンプライアンス

### 4.1 データ保護
- [ ] GDPR対応
- [ ] 個人情報の暗号化
- [ ] データ削除機能
- [ ] 同意管理

### 4.2 セキュリティ
- [ ] HTTPS強制
- [ ] CORS設定
- [ ] レート制限
- [ ] 入力値検証

## 5. 監視・ログ設定

### 5.1 エラー監視
- [ ] Sentry設定
- [ ] エラー追跡
- [ ] パフォーマンス監視

### 5.2 ログ管理
- [ ] アプリケーションログ
- [ ] アクセスログ
- [ ] セキュリティログ

## 6. テスト・デプロイ

### 6.1 テスト環境
- [ ] ステージング環境構築
- [ ] テストデータ作成
- [ ] 統合テスト実装

### 6.2 本番デプロイ
- [ ] 本番環境設定
- [ ] CI/CDパイプライン構築
- [ ] 監視設定

## 7. タイムライン

| 週 | タスク | 担当 | 成果物 |
|----|--------|------|--------|
| 1 | Supabaseプロジェクト作成・スキーマ設計 | BE | データベース設計書 |
| 2-3 | データベース実装・RLS設定 | BE | データベース構築完了 |
| 4 | ストレージ・Realtime設定 | BE | ファイル管理・リアルタイム機能 |
| 5-6 | API統合・フロントエンド連携 | FE/BE | バックエンド統合完了 |
| 7 | 外部サービス統合 | BE | OpenAI・Stripe統合 |
| 8 | テスト・デプロイ | QA/All | 本番リリース |

## 8. コスト最適化のポイント

### 8.1 Supabase活用
- 認証・データベース・ストレージ・Realtimeを統合
- 無料枠: 50,000 MAU、500MB DB、1GB Storage
- Pro: $25/月で無制限

### 8.2 Vercel活用
- フロントエンドホスティング無料
- Edge Functionsでサーバーレス処理
- 自動デプロイ・スケーリング

### 8.3 使用量ベース課金
- OpenAI API: 実際の使用量のみ
- Stripe: 成功した取引のみ
- 必要に応じてスケールアップ

この計画により、**月額$10-30でCouplePlanのMVPを運用**できます。

### 🎯 Freeプランで十分な理由

1. **容量制限内**: 1,000ユーザー、1,000プラン程度なら500MBで十分
2. **段階的成長**: 必要に応じてProプラン($25/月)へ移行
3. **学習コスト**: Supabaseの機能を無料で学習可能
4. **リスク最小化**: 初期投資を抑えてMVPを検証

### 📈 Proプラン移行のタイミング

- ユーザー数: 1,000人突破
- データベース: 400MB超過  
- ストレージ: 800MB超過
- 本格運用開始時
