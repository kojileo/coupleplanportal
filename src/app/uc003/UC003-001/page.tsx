'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC003001Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'すべて', icon: 'fas fa-th' },
    { id: 'restaurant', name: 'レストラン', icon: 'fas fa-utensils' },
    { id: 'entertainment', name: 'エンターテイメント', icon: 'fas fa-film' },
    { id: 'shopping', name: 'ショッピング', icon: 'fas fa-shopping-bag' },
    { id: 'nature', name: '自然・公園', icon: 'fas fa-tree' },
    { id: 'culture', name: '文化・アート', icon: 'fas fa-palette' },
    { id: 'sports', name: 'スポーツ', icon: 'fas fa-dumbbell' },
    { id: 'relaxation', name: 'リラックス', icon: 'fas fa-spa' }
  ]

  const featuredArticles = [
    {
      id: 1,
      title: '東京で楽しむ冬のデートスポット10選',
      excerpt: '寒い冬でも楽しめる、カップルにおすすめのデートスポットを厳選しました。',
      image: '/images/article1.jpg',
      category: 'entertainment',
      readTime: '5分',
      likes: 234
    },
    {
      id: 2,
      title: '予算5,000円で楽しむカジュアルデート',
      excerpt: 'お財布に優しい予算でも、素敵なデートを楽しむ方法をご紹介します。',
      image: '/images/article2.jpg',
      category: 'restaurant',
      readTime: '3分',
      likes: 189
    },
    {
      id: 3,
      title: '雨の日でも楽しめる室内デートスポット',
      excerpt: '天気に左右されない、室内で楽しめるデートスポットを集めました。',
      image: '/images/article3.jpg',
      category: 'entertainment',
      readTime: '4分',
      likes: 156
    }
  ]

  const popularSpots = [
    {
      id: 1,
      name: '表参道ヒルズ',
      category: 'shopping',
      rating: 4.5,
      price: '¥¥',
      distance: '0.5km'
    },
    {
      id: 2,
      name: '代々木公園',
      category: 'nature',
      rating: 4.3,
      price: '¥',
      distance: '1.2km'
    },
    {
      id: 3,
      name: '国立新美術館',
      category: 'culture',
      rating: 4.7,
      price: '¥¥',
      distance: '2.1km'
    }
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 検索処理
    console.log('Search:', searchQuery)
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
            <Link href="/common/COMMON-003" className="nav-link">ヘルプ</Link>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="main-content">
        {/* ヒーローセクション */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">AIがあなたたちのデートを特別にします</h1>
            <p className="hero-subtitle">最適なデートプランの提案から、思い出の共有まで。カップルのための総合プラットフォーム</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large">
                <i className="fas fa-rocket"></i>
                今すぐ始める
              </button>
              <button className="btn btn-outline btn-large">
                <i className="fas fa-play"></i>
                詳しく見る
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </section>

        {/* 機能紹介 */}
        <section className="features-section">
          <div className="container">
            <div className="section-header">
              <h2>CouplePlanの特徴</h2>
              <p>AI技術を活用した革新的なデート体験</p>
            </div>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <div className="feature-content">
                  <h3>AIデートプラン生成</h3>
                  <p>あなたたちの好み、予算、時間に合わせて最適なデートプランを自動生成</p>
                  <ul className="feature-list">
                    <li>個人の好みを学習</li>
                    <li>予算に応じた提案</li>
                    <li>天候や季節を考慮</li>
                  </ul>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="feature-content">
                  <h3>共同編集</h3>
                  <p>パートナーと一緒にリアルタイムでデートプランを作成・編集</p>
                  <ul className="feature-list">
                    <li>リアルタイム共同編集</li>
                    <li>編集競合の自動解決</li>
                    <li>編集履歴の管理</li>
                  </ul>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-paint-brush"></i>
                </div>
                <div className="feature-content">
                  <h3>Date Canvas</h3>
                  <p>思い出をビジュアルで共有・保存できる特別な機能</p>
                  <ul className="feature-list">
                    <li>写真とメモの組み合わせ</li>
                    <li>マップ上での思い出表示</li>
                    <li>デジタルスクラップブック</li>
                  </ul>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <div className="feature-content">
                  <h3>関係修復サポート</h3>
                  <p>AIが喧嘩や対立の仲裁をサポートし、より良い関係を築きます</p>
                  <ul className="feature-list">
                    <li>中立的な視点での提案</li>
                    <li>コミュニケーション改善</li>
                    <li>関係性の分析</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 検索セクション */}
        <section className="search-section">
          <div className="container">
            <div className="search-container">
              <h2>デートスポットを探す</h2>
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-input-group">
                  <input
                    type="text"
                    placeholder="スポット名、エリア、ジャンルで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              
              <div className="category-filters">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`category-filter ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <i className={category.icon}></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 人気記事 */}
        <section className="articles-section">
          <div className="container">
            <div className="section-header">
              <h2>人気記事</h2>
              <p>デートのアイデアやおすすめスポット情報</p>
            </div>
            
            <div className="articles-grid">
              {featuredArticles.map(article => (
                <div key={article.id} className="article-card">
                  <div className="article-image">
                    <div className="image-placeholder">
                      <i className="fas fa-image"></i>
                    </div>
                    <div className="article-category">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </div>
                  </div>
                  <div className="article-content">
                    <h3 className="article-title">{article.title}</h3>
                    <p className="article-excerpt">{article.excerpt}</p>
                    <div className="article-meta">
                      <span className="read-time">
                        <i className="fas fa-clock"></i>
                        {article.readTime}
                      </span>
                      <span className="likes">
                        <i className="fas fa-heart"></i>
                        {article.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 人気スポット */}
        <section className="spots-section">
          <div className="container">
            <div className="section-header">
              <h2>人気スポット</h2>
              <p>今話題のデートスポット</p>
            </div>
            
            <div className="spots-grid">
              {popularSpots.map(spot => (
                <div key={spot.id} className="spot-card">
                  <div className="spot-image">
                    <div className="image-placeholder">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="spot-content">
                    <h3 className="spot-name">{spot.name}</h3>
                    <div className="spot-meta">
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        {spot.rating}
                      </div>
                      <div className="price">{spot.price}</div>
                      <div className="distance">{spot.distance}</div>
                    </div>
                    <button className="btn btn-outline btn-sm">
                      詳細を見る
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTAセクション */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <h2>今すぐデートプランを作成しよう</h2>
              <p>AIがあなたたちに最適なデートプランを提案します</p>
              <div className="cta-actions">
                <Link href="/uc001/UC001-001" className="btn btn-primary btn-large">
                  <i className="fas fa-magic"></i>
                  プランを作成
                </Link>
                <Link href="/auth/AUTH-001" className="btn btn-outline btn-large">
                  <i className="fas fa-user"></i>
                  アカウント作成
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>CouplePlan</h4>
              <p>AIが提案する、あなただけのデートプラン</p>
            </div>
            <div className="footer-section">
              <h4>機能</h4>
              <ul>
                <li><Link href="/uc001/UC001-001">AIデートプラン</Link></li>
                <li><Link href="/uc002/UC002-001">共同編集</Link></li>
                <li><Link href="/uc005/UC005-001">Date Canvas</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>サポート</h4>
              <ul>
                <li><Link href="/common/COMMON-003">ヘルプ</Link></li>
                <li><Link href="/common/COMMON-002">設定</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CouplePlan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}