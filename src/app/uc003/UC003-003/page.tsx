'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC003003Page() {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likes, setLikes] = useState(234)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')

  const article = {
    id: 1,
    title: '東京で楽しむ冬のデートスポット10選',
    excerpt: '寒い冬でも楽しめる、カップルにおすすめのデートスポットを厳選しました。',
    content: `
      <p>冬の東京は、イルミネーションや温かいカフェ、室内のエンターテイメント施設など、カップルが楽しめるスポットがたくさんあります。今回は、特に冬の時期におすすめのデートスポットを10箇所厳選してご紹介します。</p>
      
      <h2>1. 表参道ヒルズ</h2>
      <p>おしゃれなショッピングモールで、冬の限定商品やイルミネーションを楽しめます。カフェも充実しており、ショッピングの合間に休憩できます。</p>
      
      <h2>2. 代々木公園</h2>
      <p>都心のオアシスで、冬の澄んだ空気の中を散歩できます。紅葉の名残りや、冬の植物を楽しむことができます。</p>
      
      <h2>3. 国立新美術館</h2>
      <p>現代アートを楽しめる美術館。冬の特別展も多く開催され、文化的なデートを楽しめます。</p>
      
      <h2>4. 渋谷スカイ</h2>
      <p>渋谷の街並みを一望できる展望台。冬の夕暮れ時は特に美しく、写真映えも抜群です。</p>
      
      <h2>5. 六本木ヒルズ</h2>
      <p>エンターテイメントとショッピングの複合施設。冬のイルミネーションイベントも開催されます。</p>
    `,
    author: {
      name: 'CouplePlan編集部',
      avatar: '/images/author-avatar.jpg',
      bio: 'デートのプロがお届けする、カップル向け情報サイト'
    },
    category: 'デートスポット',
    tags: ['冬', '東京', 'デート', 'おすすめ', 'イルミネーション'],
    readTime: '5分',
    publishDate: '2025-01-10',
    lastUpdated: '2025-01-15',
    image: '/images/winter-date-spots.jpg',
    views: 1234,
    likes: likes,
    comments: 45
  }

  const relatedArticles = [
    {
      id: 2,
      title: '予算5,000円で楽しむカジュアルデート',
      excerpt: 'お財布に優しい予算でも、素敵なデートを楽しむ方法をご紹介します。',
      image: '/images/budget-date.jpg',
      readTime: '3分',
      category: 'デートアイデア'
    },
    {
      id: 3,
      title: '雨の日でも楽しめる室内デートスポット',
      excerpt: '天気に左右されない、室内で楽しめるデートスポットを集めました。',
      image: '/images/indoor-date.jpg',
      readTime: '4分',
      category: 'デートスポット'
    },
    {
      id: 4,
      title: '初デートで失敗しないコツとマナー',
      excerpt: '初デートを成功させるための基本的なマナーとコツをまとめました。',
      image: '/images/first-date.jpg',
      readTime: '6分',
      category: 'デートマナー'
    }
  ]

  const comments = [
    {
      id: 1,
      author: '田中太郎',
      avatar: '/images/user-avatar1.jpg',
      content: '表参道ヒルズの冬のイルミネーション、本当に綺麗でした！カップルで行くのに最適ですね。',
      timestamp: '2時間前',
      likes: 12
    },
    {
      id: 2,
      author: '佐藤花子',
      avatar: '/images/user-avatar2.jpg',
      content: '代々木公園の冬の散歩、おすすめです！寒いけど空気が澄んでいて気持ちいいです。',
      timestamp: '5時間前',
      likes: 8
    },
    {
      id: 3,
      author: '山田次郎',
      avatar: '/images/user-avatar3.jpg',
      content: '渋谷スカイの夕暮れ、最高でした！写真もたくさん撮れました。',
      timestamp: '1日前',
      likes: 15
    }
  ]

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikes(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      console.log('Comment submitted:', newComment)
      setNewComment('')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('リンクをクリップボードにコピーしました')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ナビゲーションバー */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fas fa-heart"></i>
            <span>CouplePlan</span>
          </div>
          <div className="nav-menu">
            <Link href="/auth/AUTH-001" className="nav-link">ログイン</Link>
            <Link href="/uc003/UC003-001" className="nav-link">ポータル</Link>
            <Link href="/common/COMMON-001" className="nav-link">ダッシュボード</Link>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="container">
          {/* パンくずリスト */}
          <div className="breadcrumb">
            <Link href="/uc003/UC003-001">ポータル</Link>
            <i className="fas fa-chevron-right"></i>
            <Link href="/uc003/UC003-002">デート情報検索</Link>
            <i className="fas fa-chevron-right"></i>
            <span>記事詳細</span>
          </div>

          {/* 記事ヘッダー */}
          <div className="article-header">
            <div className="article-category">
              <span className="category-badge">{article.category}</span>
            </div>
            <h1 className="article-title">{article.title}</h1>
            <p className="article-excerpt">{article.excerpt}</p>
            
            <div className="article-meta">
              <div className="author-info">
                <div className="author-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="author-details">
                  <span className="author-name">{article.author.name}</span>
                  <span className="publish-date">{article.publishDate}</span>
                </div>
              </div>
              
              <div className="article-stats">
                <div className="stat-item">
                  <i className="fas fa-eye"></i>
                  <span>{article.views}</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-clock"></i>
                  <span>{article.readTime}</span>
                </div>
                <div className="stat-item">
                  <i className="fas fa-comment"></i>
                  <span>{article.comments}</span>
                </div>
              </div>
            </div>

            <div className="article-actions">
              <button 
                className={`action-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
              >
                <i className="fas fa-bookmark"></i>
                {isBookmarked ? '保存済み' : '保存'}
              </button>
              <button 
                className={`action-btn ${isLiked ? 'active' : ''}`}
                onClick={handleLike}
              >
                <i className="fas fa-heart"></i>
                {likes}
              </button>
              <button className="action-btn" onClick={handleShare}>
                <i className="fas fa-share"></i>
                共有
              </button>
            </div>
          </div>

          {/* 記事画像 */}
          <div className="article-image">
            <div className="image-placeholder">
              <i className="fas fa-image"></i>
            </div>
          </div>

          {/* 記事タグ */}
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>

          {/* 記事本文 */}
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* 著者情報 */}
          <div className="author-section">
            <div className="author-card">
              <div className="author-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="author-info">
                <h3 className="author-name">{article.author.name}</h3>
                <p className="author-bio">{article.author.bio}</p>
              </div>
            </div>
          </div>

          {/* コメントセクション */}
          <div className="comments-section">
            <div className="comments-header">
              <h3>コメント ({article.comments})</h3>
              <button 
                className="btn btn-outline"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? 'コメントを閉じる' : 'コメントを見る'}
              </button>
            </div>

            {showComments && (
              <div className="comments-content">
                {/* コメント投稿フォーム */}
                <form className="comment-form" onSubmit={handleCommentSubmit}>
                  <div className="comment-input-group">
                    <input
                      type="text"
                      className="comment-input"
                      placeholder="コメントを入力..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      投稿
                    </button>
                  </div>
                </form>

                {/* コメント一覧 */}
                <div className="comments-list">
                  {comments.map(comment => (
                    <div key={comment.id} className="comment-item">
                      <div className="comment-avatar">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-author">{comment.author}</span>
                          <span className="comment-time">{comment.timestamp}</span>
                        </div>
                        <p className="comment-text">{comment.content}</p>
                        <div className="comment-actions">
                          <button className="comment-action">
                            <i className="fas fa-heart"></i>
                            {comment.likes}
                          </button>
                          <button className="comment-action">
                            <i className="fas fa-reply"></i>
                            返信
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 関連記事 */}
          <div className="related-articles">
            <h3>関連記事</h3>
            <div className="related-grid">
              {relatedArticles.map(article => (
                <div key={article.id} className="related-card">
                  <div className="related-image">
                    <div className="image-placeholder">
                      <i className="fas fa-image"></i>
                    </div>
                  </div>
                  <div className="related-content">
                    <span className="related-category">{article.category}</span>
                    <h4 className="related-title">{article.title}</h4>
                    <p className="related-excerpt">{article.excerpt}</p>
                    <div className="related-meta">
                      <span className="read-time">{article.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* アクションボタン */}
          <div className="article-actions-bottom">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-arrow-left"></i>
                一覧に戻る
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                プランに追加
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-share"></i>
                共有
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
