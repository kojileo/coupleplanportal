'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      icon: 'fas fa-robot',
      title: 'AIデートプラン提案',
      description: 'あなたの好みに合わせて、AIが最適なデートプランを提案します。',
      link: '/uc001/UC001-001',
    },
    {
      icon: 'fas fa-users',
      title: 'カップル共同編集',
      description: 'パートナーと一緒にデートプランを編集・調整できます。',
      link: '/uc002/UC002-001',
    },
    {
      icon: 'fas fa-search',
      title: 'デート情報ポータル',
      description: '豊富なデートスポット情報とアイデアを提供します。',
      link: '/uc003/UC003-001',
    },
    {
      icon: 'fas fa-heart',
      title: '関係修復サポート',
      description: 'AIが喧嘩や対立の仲裁をサポートします。',
      link: '/uc004/UC004-001',
    },
  ]

  const screenCategories = [
    {
      title: '認証・初期設定系',
      screens: [
        { name: 'AUTH-001: ログイン・アカウント作成', link: '/auth/AUTH-001' },
        { name: 'AUTH-002: プロフィール設定', link: '/auth/AUTH-002' },
        { name: 'AUTH-003: プライバシー設定', link: '/auth/AUTH-003' },
        { name: 'AUTH-004: パートナー連携設定', link: '/auth/AUTH-004' },
      ],
    },
    {
      title: 'UC-001: AIデートプラン提案・生成',
      screens: [
        { name: 'UC001-001: デートプラン作成', link: '/uc001/UC001-001' },
        { name: 'UC001-002: AI生成中', link: '/uc001/UC001-002' },
        { name: 'UC001-003: プラン提案', link: '/uc001/UC001-003' },
        { name: 'UC001-004: プラン詳細', link: '/uc001/UC001-004' },
      ],
    },
    {
      title: 'UC-002: カップル共同デートプラン編集',
      screens: [
        { name: 'UC002-001: 共同編集', link: '/uc002/UC002-001' },
        { name: 'UC002-002: 編集競合解決', link: '/uc002/UC002-002' },
      ],
    },
    {
      title: 'UC-003: ポータル起点統合プラットフォーム',
      screens: [
        { name: 'UC003-001: ポータルトップ', link: '/uc003/UC003-001' },
        { name: 'UC003-002: デート情報検索', link: '/uc003/UC003-002' },
        { name: 'UC003-003: 記事詳細', link: '/uc003/UC003-003' },
      ],
    },
    {
      title: 'UC-004: AI喧嘩仲裁・関係修復システム',
      screens: [
        { name: 'UC004-001: 仲裁依頼', link: '/uc004/UC004-001' },
        { name: 'UC004-002: 状況分析', link: '/uc004/UC004-002' },
        { name: 'UC004-003: 仲裁提案', link: '/uc004/UC004-003' },
      ],
    },
    {
      title: 'UC-005: Date Canvas共同編集ボード',
      screens: [
        { name: 'UC005-001: Date Canvas', link: '/uc005/UC005-001' },
      ],
    },
    {
      title: 'UC-007: 段階的マネタイズ制御',
      screens: [
        { name: 'UC007-001: 課金管理', link: '/uc007/UC007-001' },
        { name: 'UC007-002: 機能解放', link: '/uc007/UC007-002' },
      ],
    },
    {
      title: '共通・システム系',
      screens: [
        { name: 'COMMON-001: ダッシュボード', link: '/common/COMMON-001' },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ナビゲーションバー */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <i className="fas fa-heart"></i>
            <span>CouplePlan</span>
          </div>
          <div className="nav-menu" id="nav-menu">
            <Link href="/auth/AUTH-001" className="nav-link">ログイン</Link>
            <Link href="/uc003/UC003-001" className="nav-link">ポータル</Link>
            <Link href="/common/COMMON-001" className="nav-link">ダッシュボード</Link>
          </div>
          <div className="nav-toggle" id="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="container">
          {/* ヒーローセクション */}
          <div className="hero-section">
            <h1 className="hero-title">CouplePlan</h1>
            <p className="hero-subtitle">AIが提案する、あなただけのデートプラン</p>
            <div className="hero-buttons">
              <Link href="/auth/AUTH-001" className="btn btn-primary">始める</Link>
              <Link href="/uc003/UC003-001" className="btn btn-secondary">ポータルを見る</Link>
            </div>
          </div>

          {/* 機能紹介セクション */}
          <section className="features-section">
            <h2 className="section-title">主な機能</h2>
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">
                    <i className={feature.icon}></i>
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  <Link href={feature.link} className="feature-link">詳細を見る</Link>
                </div>
              ))}
            </div>
          </section>

          {/* 画面一覧セクション */}
          <section className="screens-section">
            <h2 className="section-title">画面一覧</h2>
            <div className="screens-grid">
              {screenCategories.map((category, index) => (
                <div key={index} className="screen-category">
                  <h3>{category.title}</h3>
                  <div className="screen-links">
                    {category.screens.map((screen, screenIndex) => (
                      <Link key={screenIndex} href={screen.link} className="screen-link">
                        {screen.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
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
                <li><Link href="/uc003/UC003-001">ポータル</Link></li>
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
