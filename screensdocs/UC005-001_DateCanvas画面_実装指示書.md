# UC005-001: Date Canvas画面 実装指示書

## 1. 全体評価

### 目的とゴール
- **主要目的**: デート中のタスク・メモ・メディアをリアルタイムに共同編集できるインタラクティブボードを提供
- **ビジネスゴール**: デート体験中のエンゲージメント最大化と後続機能（Memory Sparks、アルバム生成）へのデータ供給
- **技術ゴール**: WebSocketベースの双方向同期とオフラインフォールバックを高信頼で実現

### 受け入れ基準
- Canvas初期状態が2秒以内に表示される
- 編集内容が平均200ms以内にパートナーへ反映される
- オフライン時はローカルキューに退避し、復帰後10秒以内に同期される
- メディアアップロードは1件50MBまで対応し進捗インジケーターを表示
- キーボード、スクリーンリーダー、タッチ操作で主要操作が完結する

### 機能段階性
1. **基礎**: Canvas状態取得・更新、リアルタイム同期、タスク・メモ・スタンプ操作
2. **拡張**: 履歴タイムライン、テンプレート挿入、リアクションアニメーション
3. **制約**: 操作レート制限、メディア容量制限、オフラインキュー件数制限

## 2. 仕様の厳密化

### コア機能

#### Canvas状態取得
- **取得**: GET /api/v1/dates/{dateId}/canvas
- **構成**: レイヤー（ToDo, Notes, Stickers, Media）とメタデータを取得
- **失敗**: リトライ導線とオフラインキャッシュ（最新20件のローカルスナップショット）を提示

#### Canvas更新
- **操作**: ノード追加/編集/削除、ステータス変更、並び替え
- **送信**: PUT /api/v1/dates/{dateId}/canvas でバッチ更新（デバウンス500ms）
- **競合**: OT（Operational Transformation）で解決し失敗時は差分マージモーダル

#### リアルタイム同期
- **接続**: WSS /api/v1/dates/{dateId}/canvas/sync
- **イベント**: node.add, node.update, node.delete, presence
- **再接続**: 指数バックオフ（最大60秒）とステータスバナー表示

#### メディアアップロード
- **送信**: POST /api/v1/dates/{dateId}/media
- **制約**: 画像/動画/音声 50MB・10分以内
- **表示**: サムネイル生成とアップロード状態バッジ

#### ドラッグ&ドロップ操作
- **入力**: マウス・タッチ・キーボードでノード移動
- **補助**: スナップガイド、グリッドライン、移動ボタン

### 入力制約 & バリデーション

#### dateId
- **形式**: UUID v4
- **必須**: URLまたはコンテキストから必須
- **エラーメッセージ**: "デートIDが取得できません。プランから再開してください"

#### node.content
- **形式**: プレーンテキスト最大2000文字
- **必須**: ノード種別により変動
- **エラーメッセージ**: "2000文字以内で入力してください"

#### media.file
- **形式**: 画像(JPEG/PNG/HEIC)、動画(MP4/H.264)、音声(M4A)
- **制限**: 50MBまで、ウイルススキャン必須
- **エラーメッセージ**: "対応していないファイル形式です"

### データモデル & API

#### リクエスト / レスポンスモデル
~~~typescript
interface CanvasStateResponse {
  dateId: string;
  updatedAt: string;
  nodes: CanvasNode[];
  presence: PresenceUser[];
}

interface CanvasNode {
  nodeId: string;
  type: 'todo' | 'note' | 'memory' | 'media' | 'sticker';
  position: { x: number; y: number; zIndex: number };
  content: string;
  status?: 'pending' | 'in_progress' | 'done';
  attachments?: AttachmentMeta[];
  reactions?: Reaction[];
  updatedBy: string;
  updatedAt: string;
}

interface CanvasUpdatePayload {
  dateId: string;
  version: number;
  operations: CanvasOperation[];
}

interface CanvasOperation {
  opId: string;
  action: 'add' | 'update' | 'delete' | 'move';
  node: Partial<CanvasNode> & { nodeId: string };
  timestamp: string;
}

interface MediaUploadResponse {
  mediaId: string;
  url: string;
  thumbnailUrl?: string;
  status: 'processing' | 'ready';
}
~~~

#### イベントモデル
~~~typescript
interface CanvasSyncEvent {
  type: 'node.add' | 'node.update' | 'node.delete' | 'presence';
  payload: any;
  emittedAt: string;
}

interface PresenceEventPayload {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  cursor?: { x: number; y: number };
  status: 'editing' | 'viewing' | 'idle';
}
~~~

#### API エンドポイント
- Canvas状態取得: GET /api/v1/dates/{dateId}/canvas
- Canvas更新: PUT /api/v1/dates/{dateId}/canvas
- リアルタイム同期: WSS /api/v1/dates/{dateId}/canvas/sync
- メディアアップロード: POST /api/v1/dates/{dateId}/media

### UX / A11y

#### 操作性
- フローティングツールバーで主要操作を集約
- キーボードショートカット（例: Nで新規ノード、Ctrl+Enterで完了）
- タッチジェスチャー（ピンチズーム、長押しコンテキスト）

#### アクセシビリティ
- ノード選択時にフォーカスリングとaria-live通知
- Canvas領域にランドマーク role="application" と説明テキストを付与
- カラーフィードバックはアイコン・テキストで補完

#### 情緒デザイン
- 達成状況をアニメーションバッジで演出
- 共有操作時にパートナーのアバターとステータスを表示

### セキュリティ & プライバシー
- **認可**: dateIdとユーザー所属関係を検証
- **通信**: HTTPS/WSS + TLS1.3
- **メディア**: アップロード直後にマルウェアスキャンし署名付きURLで制御
- **ログ**: 操作ログは匿名化したノードIDで記録

### 非機能要件
- **レイテンシ**: 同期イベントRTT 200ms以下（80%タイル）
- **可用性**: 99.9%、WebSocket再接続成功率95%以上
- **スケール**: 同時接続 10,000セッション、ノード1,000件/Canvas
- **可観測性**: OT失敗率、再試行回数、オフラインキュー滞留時間を計測

## 3. 曖昧さと解決

### オフライン動作
- 10分以内の編集はローカルに保持し超過で警告表示
- 差分マージ時はタイムスタンプ優先 + ユーザー選択ダイアログ

### リアクション数
- 各ノードのリアクションは最大20種まで
- 既定はハート、拍手、笑顔、メモアイコン

### メディア処理
- 動画は非同期トランスコード、完了までは再生不可状態バッジ
- 大容量時はアップロード前に圧縮ガイダンスを提示

## 4. 受け入れ基準例（Gherkin風）

### リアルタイム同期
~~~gherkin
Given 2人のユーザーが同じDate Canvasを開いている
When ユーザーAが新しいメモを追加する
Then ユーザーBの画面に200ms以内で同じメモが表示される
And リアルタイム通知トーストが表示される

Given ネットワークが一時的に切断される
When 接続が復旧する
Then 切断中に追加したノードが10秒以内に同期される
~~~

### メディアアップロード
~~~gherkin
Given ユーザーが50MB未満の写真をドラッグ&ドロップする
When アップロードが完了する
Then Canvas上にサムネイルが表示される
And パートナーにアップロード完了トーストが表示される
~~~

## 5. リスクとトレードオフ

### 技術リスク
- OT実装の複雑さ → 専用ライブラリ採用と包括的テスト
- WebSocket断続 → HTTPフォールバックとオフラインキューで緩和
- 大量メディア → CDNキャッシュとサイズ制限で制御

### UXリスク
- 情報過多 → レイヤーフィルタとズームレベルで調整
- 同時編集衝突 → 編集ロックとプレゼンスで可視化
- モバイル負荷 → 軽量モード切替を提供

### プライバシーリスク
- メディア流出 → 署名付きURLと期限付リンク
- 位置情報ノード → マスキングと同意明記

## 6. 拡張余地

### 短期拡張
- テンプレートギャラリー
- フォーカスモード（担当者だけ表示）
- タイムライン再生

### 中期拡張
- AI要約ノード生成
- 音声メモ自動文字起こし
- デバイスセンサー連携（歩数等）

### 長期拡張
- ARオーバーレイ表示
- 複数ペア同時セッション
- 自動ストーリーボード生成

## 7. 実装ガイドライン

### 技術スタック
- **フロントエンド**: React 18 + TypeScript + Tailwind CSS
- **状態管理**: Zustand（ローカル状態） + React Query（APIキャッシュ）
- **リアルタイム**: yjs + y-websocket または Liveblocks相当
- **ストレージ**: IndexedDBでオフラインキュー管理

### コンポーネント設計
~~~typescript
interface DateCanvasPageProps {
  dateId: string;
  userId: string;
  partnerId: string;
}

interface CanvasBoardProps {
  nodes: CanvasNode[];
  presence: PresenceUser[];
  onOperation: (op: CanvasOperation) => void;
  onMediaUpload: (file: File) => void;
}

interface OfflineQueueBannerProps {
  pendingCount: number;
  retry: () => void;
}
~~~

### スタイリング
~~~css
.date-canvas-page {
  @apply relative h-full bg-slate-50 overflow-hidden;
}

.canvas-board {
  @apply h-full w-full cursor-grab active:cursor-grabbing;
}

.canvas-toolbar {
  @apply absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-white/90 shadow-lg backdrop-blur;
}

.media-upload-progress {
  @apply fixed bottom-6 right-6 w-72 bg-white rounded-xl shadow-lg border border-slate-200;
}
~~~

### テレメトリ
- 同期レイテンシ、操作頻度、オフライン滞留を送信
- メディアアップロード成功/失敗をトラッキングしてCDN最適化に活用

