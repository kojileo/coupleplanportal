'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function COMMON003Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    { id: 'all', name: 'すべて', icon: 'fas fa-th' },
    { id: 'getting-started', name: 'はじめに', icon: 'fas fa-play' },
    { id: 'features', name: '機能', icon: 'fas fa-star' },
    { id: 'troubleshooting', name: 'トラブルシューティング', icon: 'fas fa-tools' },
    { id: 'account', name: 'アカウント', icon: 'fas fa-user' },
    { id: 'billing', name: '課金', icon: 'fas fa-credit-card' }
  ]

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'CouplePlanの使い方を教えてください',
      answer: 'CouplePlanは、AIが提案するデートプランでカップルの絆を深めるアプリです。まずはプロフィールを設定し、パートナーと連携してから、AIデートプラン生成機能を使って最適なデートプランを作成できます。'
    },
    {
      id: 2,
      category: 'features',
      question: 'AIデートプラン生成はどのように動作しますか？',
      answer: 'AIデートプラン生成では、あなたの好み、予算、時間、地域などの情報を基に、最適なデートプランを自動生成します。過去のデート履歴も学習して、より精度の高い提案を行います。'
    },
    {
      id: 3,
      category: 'features',
      question: '共同編集機能について教えてください',
      answer: '共同編集機能では、パートナーとリアルタイムでデートプランを編集できます。編集競合が発生した場合は、自動的に解決され、編集履歴も管理されます。'
    },
    {
      id: 4,
      category: 'troubleshooting',
      question: 'アプリが起動しません',
      answer: 'アプリが起動しない場合は、以下の手順をお試しください：1. アプリを再起動する 2. デバイスを再起動する 3. アプリを最新版に更新する 4. ストレージ容量を確認する'
    },
    {
      id: 5,
      category: 'account',
      question: 'パスワードを忘れました',
      answer: 'パスワードを忘れた場合は、ログイン画面の「パスワードを忘れた方」リンクをクリックして、メールアドレスにリセットリンクを送信してください。'
    },
    {
      id: 6,
      category: 'billing',
      question: '課金について教えてください',
      answer: 'CouplePlanは基本的に無料でご利用いただけます。一部の高度な機能については、有料プランをご利用いただく場合があります。課金設定は設定画面から確認・変更できます。'
    }
  ]

  const helpArticles = [
    {
      id: 1,
      title: '初回セットアップガイド',
      description: 'CouplePlanを始めるための基本的な設定手順を説明します。',
      category: 'getting-started',
      readTime: '5分',
      difficulty: '初級'
    },
    {
      id: 2,
      title: 'AIデートプランの作成方法',
      description: 'AIが提案するデートプランの作成から実行までの流れを説明します。',
      category: 'features',
      readTime: '8分',
      difficulty: '中級'
    },
    {
      id: 3,
      title: 'パートナーとの連携方法',
      description: 'パートナーとの連携設定と共同編集機能の使い方を説明します。',
      category: 'features',
      readTime: '6分',
      difficulty: '初級'
    },
    {
      id: 4,
      title: 'Date Canvasの使い方',
      description: '思い出をビジュアルで保存するDate Canvas機能の使い方を説明します。',
      category: 'features',
      readTime: '10分',
      difficulty: '中級'
    },
    {
      id: 5,
      title: 'よくある問題と解決方法',
      description: 'アプリの使用中によく発生する問題とその解決方法をまとめました。',
      category: 'troubleshooting',
      readTime: '12分',
      difficulty: '初級'
    }
  ]

  const filteredFaqs = faqs.filter(faq => 
    selectedCategory === 'all' || faq.category === selectedCategory
  )

  const filteredArticles = helpArticles.filter(article => 
    selectedCategory === 'all' || article.category === selectedCategory
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 検索処理
    console.log('Search:', searchQuery)
  }

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id)
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
          {/* ヘッダー */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">ヘルプセンター</h1>
              <p className="page-subtitle">CouplePlanの使い方やよくある質問を確認できます</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 検索セクション */}
          <div className="search-section">
            <div className="search-container">
              <form className="search-form" onSubmit={handleSearch}>
                <div className="search-input-group">
                  <input
                    type="text"
                    placeholder="質問やキーワードで検索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  <button type="submit" className="search-button">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* カテゴリフィルター */}
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

          {/* よくある質問 */}
          <section className="faq-section">
            <h2 className="section-title">よくある質問</h2>
            <div className="faq-list">
              {filteredFaqs.map(faq => (
                <div key={faq.id} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <span>{faq.question}</span>
                    <i className={`fas fa-chevron-down ${expandedFaq === faq.id ? 'rotated' : ''}`}></i>
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ヘルプ記事 */}
          <section className="articles-section">
            <h2 className="section-title">ヘルプ記事</h2>
            <div className="articles-grid">
              {filteredArticles.map(article => (
                <div key={article.id} className="article-card">
                  <div className="article-header">
                    <h3 className="article-title">{article.title}</h3>
                    <div className="article-meta">
                      <span className="read-time">
                        <i className="fas fa-clock"></i>
                        {article.readTime}
                      </span>
                      <span className={`difficulty ${article.difficulty}`}>
                        {article.difficulty}
                      </span>
                    </div>
                  </div>
                  <p className="article-description">{article.description}</p>
                  <button className="btn btn-outline btn-sm">
                    記事を読む
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* お問い合わせ */}
          <section className="contact-section">
            <div className="contact-card">
              <div className="contact-content">
                <h2>お問い合わせ</h2>
                <p>ヘルプ記事で解決しない場合は、お気軽にお問い合わせください。</p>
                <div className="contact-methods">
                  <div className="contact-method">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-info">
                      <h3>メールサポート</h3>
                      <p>support@coupleplan.app</p>
                      <button className="btn btn-outline">
                        メールを送信
                      </button>
                    </div>
                  </div>
                  
                  <div className="contact-method">
                    <div className="contact-icon">
                      <i className="fas fa-comments"></i>
                    </div>
                    <div className="contact-info">
                      <h3>チャットサポート</h3>
                      <p>リアルタイムでサポートを受けられます</p>
                      <button className="btn btn-primary">
                        チャットを開始
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* クイックリンク */}
          <section className="quick-links-section">
            <h2 className="section-title">クイックリンク</h2>
            <div className="quick-links-grid">
              <Link href="/common/COMMON-002" className="quick-link-card">
                <div className="quick-link-icon">
                  <i className="fas fa-cog"></i>
                </div>
                <h3>設定</h3>
                <p>アカウント設定やアプリ設定を変更</p>
              </Link>
              
              <Link href="/auth/AUTH-004" className="quick-link-card">
                <div className="quick-link-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>パートナー連携</h3>
                <p>パートナーとの連携設定を管理</p>
              </Link>
              
              <Link href="/uc001/UC001-001" className="quick-link-card">
                <div className="quick-link-icon">
                  <i className="fas fa-magic"></i>
                </div>
                <h3>デートプラン作成</h3>
                <p>AIが提案するデートプランを作成</p>
              </Link>
              
              <Link href="/uc003/UC003-001" className="quick-link-card">
                <div className="quick-link-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>スポット検索</h3>
                <p>デートスポットを検索・発見</p>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
