# Supabase セットアップガイド (初心者向け)

## 🎯 このガイドの目的
CouplePlanアプリのバックエンド（データベース・認証・ファイル保存）をSupabaseで構築します。
**月額$0のFreeプラン**から開始して、成長に応じてProプラン($25/月)へ移行する戦略です。

## 📋 前提条件
- GitHubアカウント（無料）
- 基本的なWeb開発の知識
- 約2-3時間の作業時間

## 1. Supabaseプロジェクト作成

### 1.1 アカウント作成（5分）
1. [Supabase](https://supabase.com) にアクセス
2. **"Start your project"** をクリック
3. **GitHubアカウントでサインアップ**（推奨）
4. 組織名: `coupleplan` で作成

### 1.2 プロジェクト作成（10分）
1. **"New Project"** をクリック
2. プロジェクト設定:
   - **Name**: `coupleplan-production`
   - **Database Password**: 強力なパスワードを生成（保存しておく）
   - **Region**: `Northeast Asia (Tokyo)` を選択
   - **Pricing Plan**: `Free` ($0/月) ← **重要！**

### 1.3 環境変数設定（5分）
1. Supabase Dashboard → **Settings** → **API**
2. 以下の値をコピー:
   - **Project URL**
   - **anon public** key
   - **service_role** key

3. プロジェクトルートに `.env.local` ファイルを作成:
```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

⚠️ **重要**: `.env.local` はGitにコミットしないでください！

## 2. データベーススキーマ実装（30分）

### 2.1 プロフィールテーブル（ユーザー情報）
**目的**: ユーザーの基本情報とパートナー関係を管理

1. Supabase Dashboard → **SQL Editor**
2. 以下のSQLを実行:

```sql
-- プロフィールテーブル
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  partner_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- セキュリティ設定（RLS）
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ポリシー: ユーザーは自分のプロフィールのみアクセス可能
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- パートナーとの関係を確認するポリシー
CREATE POLICY "Users can view partner profile" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    auth.uid() = partner_id
  );
```

✅ **確認**: テーブルが作成されたら、左側のメニューで `profiles` テーブルが表示されます。

### 2.2 デートプランテーブル（デートプラン管理）
**目的**: AIが生成したデートプランやユーザーが作成したプランを保存

```sql
-- デートプランテーブル
CREATE TABLE date_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  partner_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,
  content JSONB, -- AI生成コンテンツや詳細情報
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- セキュリティ設定
ALTER TABLE date_plans ENABLE ROW LEVEL SECURITY;

-- ポリシー: 作成者とパートナーのみアクセス可能
CREATE POLICY "Users can view own plans" ON date_plans
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() = partner_id
  );

CREATE POLICY "Users can create plans" ON date_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own plans" ON date_plans
  FOR UPDATE USING (
    auth.uid() = user_id OR 
    auth.uid() = partner_id
  );
```

✅ **確認**: `date_plans` テーブルが作成されます。

### 2.3 共同編集テーブル（カップル共同編集）
**目的**: パートナー同士でデートプランを共同編集する際の権限管理

```sql
-- 共同編集テーブル
CREATE TABLE plan_collaborations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_id UUID REFERENCES date_plans(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  role TEXT DEFAULT 'editor' CHECK (role IN ('editor', 'viewer')),
  last_edited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(plan_id, user_id) -- 1つのプランに1人1回のみ参加
);

-- セキュリティ設定
ALTER TABLE plan_collaborations ENABLE ROW LEVEL SECURITY;

-- ポリシー: プランの関係者のみアクセス可能
CREATE POLICY "Collaborators can view collaborations" ON plan_collaborations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM date_plans 
      WHERE id = plan_id 
      AND (user_id = auth.uid() OR partner_id = auth.uid())
    )
  );
```

✅ **確認**: `plan_collaborations` テーブルが作成されます。

### 2.4 仲裁・関係修復テーブル（AI仲裁機能）
**目的**: カップルの喧嘩や対立をAIが仲裁する機能のデータ管理

```sql
-- 仲裁依頼テーブル
CREATE TABLE mediation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  partner_id UUID REFERENCES profiles(id),
  conflict_type TEXT NOT NULL, -- 対立の種類
  description TEXT NOT NULL, -- 問題の説明
  context TEXT, -- 詳細な状況
  emotions TEXT[], -- 感情の配列
  urgency TEXT DEFAULT 'medium', -- 緊急度
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'proposing', 'completed')),
  ai_analysis JSONB, -- AI分析結果
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- セキュリティ設定
ALTER TABLE mediation_requests ENABLE ROW LEVEL SECURITY;

-- ポリシー: 依頼者とパートナーのみアクセス可能
CREATE POLICY "Users can view own mediation requests" ON mediation_requests
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() = partner_id
  );
```

✅ **確認**: `mediation_requests` テーブルが作成されます。

### 2.5 課金・サブスクリプションテーブル（有料プラン管理）
**目的**: ユーザーの有料プラン加入状況とStripe連携

```sql
-- サブスクリプションテーブル
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  plan_name TEXT NOT NULL, -- 'free', 'premium'
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due')),
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  stripe_subscription_id TEXT UNIQUE, -- Stripe連携用
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- セキュリティ設定
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- ポリシー: ユーザーは自分のサブスクリプションのみアクセス可能
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);
```

✅ **確認**: `subscriptions` テーブルが作成されます。

## 3. ストレージ設定（ファイル保存）（15分）

### 3.1 バケット作成（ファイル保存用フォルダ）
**目的**: プロフィール画像、デートプラン画像、Date Canvasファイルを保存

#### 手順1: Storage画面に移動
1. Supabase Dashboard → **Storage** をクリック
2. **"New bucket"** ボタンをクリック

#### 手順2: プロフィール画像用バケット (`avatars`) を作成
**モーダル画面での入力値:**

| 項目 | 入力値 | 説明 |
|------|--------|------|
| **Name of bucket** | `avatars` | バケット名（変更不可） |
| **Bucket type** | `Standard bucket` | デフォルト選択済み |
| **Public bucket** | ✅ **ON** | 画像を公開（後でRLSで制御） |
| **Restrict file size** | ❌ **OFF** | デフォルトのまま |
| **Restrict MIME types** | ❌ **OFF** | デフォルトのまま |

3. **"Create"** ボタンをクリック

#### 手順3: デートプラン画像用バケット (`plan-images`) を作成
**再度「New bucket」をクリックして、以下の値を入力:**

| 項目 | 入力値 | 説明 |
|------|--------|------|
| **Name of bucket** | `plan-images` | デートプラン画像用 |
| **Bucket type** | `Standard bucket` | デフォルト選択済み |
| **Public bucket** | ✅ **ON** | 画像を公開 |
| **Restrict file size** | ❌ **OFF** | デフォルトのまま |
| **Restrict MIME types** | ❌ **OFF** | デフォルトのまま |

4. **"Create"** ボタンをクリック

#### 手順4: Date Canvasファイル用バケット (`canvas-files`) を作成
**再度「New bucket」をクリックして、以下の値を入力:**

| 項目 | 入力値 | 説明 |
|------|--------|------|
| **Name of bucket** | `canvas-files` | Date Canvasファイル用 |
| **Bucket type** | `Standard bucket` | デフォルト選択済み |
| **Public bucket** | ✅ **ON** | ファイルを公開 |
| **Restrict file size** | ❌ **OFF** | デフォルトのまま |
| **Restrict MIME types** | ❌ **OFF** | デフォルトのまま |

5. **"Create"** ボタンをクリック

#### 手順5: 確認
**Storage画面で以下の3つのバケットが表示されることを確認:**
- ✅ `avatars`
- ✅ `plan-images` 
- ✅ `canvas-files`

### 3.2 ストレージポリシー設定（セキュリティ）
**目的**: ユーザーが自分のファイルのみアップロード・アクセスできるように制限

```sql
-- プロフィール画像のポリシー
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- デートプラン画像のポリシー
CREATE POLICY "Users can upload plan images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'plan-images' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

✅ **確認**: Storage画面で3つのバケットが表示されます。

## 4. Realtime設定（リアルタイム通信）（10分）

### 4.1 共同編集のRealtime（カップル共同編集）
**目的**: パートナー同士が同時にデートプランを編集する際のリアルタイム同期

```sql
-- デートプランの変更をRealtimeで配信
ALTER PUBLICATION supabase_realtime ADD TABLE date_plans;

-- 共同編集の変更をRealtimeで配信
ALTER PUBLICATION supabase_realtime ADD TABLE plan_collaborations;
```

### 4.2 通知のRealtime（システム通知）
**目的**: 仲裁依頼の更新やサブスクリプション変更をリアルタイムで通知

```sql
-- 仲裁依頼の更新をRealtimeで配信
ALTER PUBLICATION supabase_realtime ADD TABLE mediation_requests;

-- サブスクリプションの変更をRealtimeで配信
ALTER PUBLICATION supabase_realtime ADD TABLE subscriptions;
```

✅ **確認**: Realtime機能が有効になります。

## 5. 関数・トリガー設定（自動化）（15分）

### 5.1 プロフィール作成時のトリガー（自動プロフィール作成）
**目的**: ユーザーがアカウント作成した際に、自動的にプロフィールテーブルにレコードを作成

```sql
-- ユーザー作成時にプロフィールを自動作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- トリガーを設定
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 5.2 更新日時の自動更新（データ整合性）
**目的**: レコードが更新された際に、自動的に`updated_at`フィールドを現在時刻に更新

```sql
-- 更新日時を自動更新する関数
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 各テーブルにトリガーを設定
CREATE TRIGGER handle_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_updated_at_date_plans
  BEFORE UPDATE ON date_plans
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

✅ **確認**: 関数とトリガーが作成されます。

## 6. インデックス設定（パフォーマンス最適化）（10分）

### 6.1 検索速度向上のためのインデックス
**目的**: データベースの検索速度を向上させ、アプリの応答速度を改善

```sql
-- プロフィール検索用インデックス
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_partner_id ON profiles(partner_id);

-- デートプラン検索用インデックス
CREATE INDEX idx_date_plans_user_id ON date_plans(user_id);
CREATE INDEX idx_date_plans_status ON date_plans(status);
CREATE INDEX idx_date_plans_created_at ON date_plans(created_at);

-- 共同編集検索用インデックス
CREATE INDEX idx_plan_collaborations_plan_id ON plan_collaborations(plan_id);
CREATE INDEX idx_plan_collaborations_user_id ON plan_collaborations(user_id);

-- 仲裁依頼検索用インデックス
CREATE INDEX idx_mediation_requests_user_id ON mediation_requests(user_id);
CREATE INDEX idx_mediation_requests_status ON mediation_requests(status);
```

✅ **確認**: インデックスが作成され、検索速度が向上します。

## 7. セキュリティ設定（セキュリティ強化）（10分）

### 7.1 API制限設定（不正アクセス防止）
**目的**: 過度なAPI呼び出しを制限し、セキュリティを向上

#### 手順1: Settings画面に移動
1. Supabase Dashboard → 左側メニューの **Settings** をクリック
2. **API** タブをクリック

#### 手順2: Rate Limiting設定
**注意**: 現在のSupabaseでは、Rate Limitingは**Proプラン以上**でのみ利用可能です。

**Freeプランの場合:**
- デフォルトの制限が適用されます
- カスタム設定はできません
- 必要に応じてProプラン($25/月)への移行を検討

**Proプランの場合:**
1. **Rate Limiting** セクションを探す
2. 以下の値を設定:
   - 認証: 100 requests/hour
   - データベース: 1000 requests/hour
   - ストレージ: 500 requests/hour

#### 手順3: 代替案（Freeプラン）
**Freeプランでは以下の方法でセキュリティを向上:**

1. **RLS (Row Level Security)** を適切に設定
2. **CORS設定** で許可ドメインを制限
3. **API Key** の適切な管理
4. **アプリケーション側** でのレート制限実装

### 7.2 CORS設定（クロスオリジン制限）
**目的**: 許可されたドメインからのみアクセス可能にする

#### 手順1: Settings画面に移動
1. Supabase Dashboard → 左側メニューの **Settings** をクリック
2. **API** タブをクリック

#### 手順2: CORS設定
1. **CORS** セクションを探す
2. **「Add new origin」** または **「+」** ボタンをクリック
3. 以下のドメインを追加:

**開発環境:**
- `http://localhost:3000`

**本番環境:**
- `https://coupleplan.vercel.app`
- `https://www.coupleplan.vercel.app` (www付きも追加)

#### 手順3: 設定の保存
1. 各ドメインを入力後、**「Save」** または **「Update」** ボタンをクリック
2. 設定が反映されるまで数分待つ

#### 手順4: 確認
**設定後、以下の方法で確認:**
1. ブラウザの開発者ツールを開く
2. ネットワークタブでAPIリクエストを確認
3. CORSエラーが発生しないことを確認

#### 手順5: トラブルシューティング
**CORSエラーが発生する場合:**
1. ドメインの入力ミスがないか確認
2. `http://` と `https://` の違いを確認
3. 設定反映まで数分待つ
4. ブラウザのキャッシュをクリア

✅ **確認**: CORS設定が完了し、指定したドメインからのみアクセス可能になります。

## 8. 監視・ログ設定（運用監視）（5分）

### 8.1 データベース監視
**目的**: アプリの動作状況を監視し、問題を早期発見

- Supabase Dashboard → **Logs** でクエリログを確認
- パフォーマンスメトリクスを監視
- エラーログを確認

### 8.2 アラート設定
**目的**: 問題発生時に自動通知

- データベース接続エラー
- ストレージ容量不足
- API制限超過

✅ **確認**: 監視設定が完了します。

## 9. バックアップ設定（データ保護）

### 9.1 Freeプランでのバックアップ
**重要**: Freeプランでは自動バックアップがありません

**推奨**: 定期的な手動バックアップ
```sql
-- データベースダンプの作成（手動）
pg_dump -h your-db-host -U postgres -d postgres > backup.sql
```

### 9.2 Proプラン移行時の自動バックアップ
- 7日間のポイントインタイムリカバリ
- 地理的冗長性
- 自動バックアップ

## 10. 本番環境設定（デプロイ準備）

### 10.1 環境変数設定
```env
# 本番環境用
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 10.2 ドメイン設定
- カスタムドメインの設定
- SSL証明書の自動更新
- CDNの設定

## 🎉 セットアップ完了！

### ✅ 完了したこと
1. **Supabaseプロジェクト作成** (Freeプラン)
2. **データベーススキーマ実装** (5テーブル)
3. **ストレージ設定** (3バケット)
4. **Realtime設定** (リアルタイム通信)
5. **関数・トリガー設定** (自動化)
6. **インデックス設定** (パフォーマンス)
7. **セキュリティ設定** (保護)
8. **監視・ログ設定** (運用)

### 🚀 次のステップ
1. **フロントエンド統合**: Next.jsアプリとSupabaseを接続
2. **認証実装**: ログイン・サインアップ機能
3. **API実装**: デートプラン作成・編集機能
4. **テスト**: 動作確認とデバッグ

### 💰 コスト
- **現在**: $0/月 (Freeプラン)
- **将来**: $25/月 (Proプラン移行時)

このガイドに従ってSupabaseをセットアップすることで、CouplePlanのバックエンド基盤を構築できます！
