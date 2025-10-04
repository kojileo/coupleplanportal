'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC001004Page() {
  const [activeTab, setActiveTab] = useState('schedule')
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isShared, setIsShared] = useState(false)

  const plan = {
    id: 1,
    title: '渋谷デートプラン',
    description: 'カフェ巡りとショッピングを楽しむ、カジュアルなデートプラン',
    duration: '4時間',
    budget: '¥15,000',
    rating: 4.8,
    date: '2025-01-15',
    time: '14:00-18:00',
    spots: [
      {
        name: 'Blue Bottle Coffee',
        type: 'カフェ',
        time: '14:00-15:30',
        address: '東京都渋谷区恵比寿1-4-18',
        description: 'おしゃれなカフェでゆっくりとコーヒーを楽しみましょう',
        image: '/images/blue-bottle.jpg',
        rating: 4.5,
        price: '¥1,000-2,000'
      },
      {
        name: '渋谷スクランブル交差点',
        type: '観光',
        time: '15:30-16:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '世界で最も忙しい交差点の一つを体験',
        image: '/images/shibuya-crossing.jpg',
        rating: 4.7,
        price: '無料'
      },
      {
        name: '渋谷PARCO',
        type: 'ショッピング',
        time: '16:00-18:00',
        address: '東京都渋谷区宇田川町15-1',
        description: '最新のファッションとカルチャーを楽しめる複合施設',
        image: '/images/parco.jpg',
        rating: 4.3,
        price: '¥5,000-15,000'
      },
      {
        name: '渋谷スカイ',
        type: '展望台',
        time: '18:00-19:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '渋谷の街並みを一望できる展望台',
        image: '/images/shibuya-sky.jpg',
        rating: 4.9,
        price: '¥2,000'
      }
    ],
    highlights: ['写真映えスポット', 'カフェ巡り', 'ショッピング', '夜景'],
    tips: [
      'Blue Bottle Coffeeは混雑する可能性があるため、事前に予約することをお勧めします',
      '渋谷スクランブル交差点は夕方の方がより美しい光景が見られます',
      '渋谷PARCOは最新のトレンドアイテムが揃っているので、お気に入りを見つけてみてください',
      '渋谷スカイは日没時間に合わせて訪問すると、美しい夕日と夜景の両方を楽しめます'
    ]
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    setIsShared(true)
    // 実際の共有処理
    if (navigator.share) {
      navigator.share({
        title: plan.title,
        text: plan.description,
        url: window.location.href
      })
    } else {
      // フォールバック
      navigator.clipboard.writeText(window.location.href)
      alert('リンクをクリップボードにコピーしました')
    }
  }

  const handleStartPlan = () => {
    // プラン開始処理
    window.location.href = '/uc002/UC002-001'
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
              <h1 className="page-title">{plan.title}</h1>
              <p className="page-subtitle">{plan.description}</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-outline" onClick={handleBookmark}>
                <i className={`fas fa-bookmark ${isBookmarked ? 'filled' : ''}`}></i>
                {isBookmarked ? '保存済み' : '保存'}
              </button>
              <button className="btn btn-outline" onClick={handleShare}>
                <i className="fas fa-share"></i>
                共有
              </button>
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* プラン情報カード */}
          <div className="plan-info-card">
            <div className="plan-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{plan.date}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{plan.time}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-yen-sign"></i>
                <span>{plan.budget}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-star"></i>
                <span>{plan.rating}</span>
              </div>
            </div>
            
            <div className="plan-highlights">
              {plan.highlights.map((highlight, index) => (
                <span key={index} className="highlight-tag">
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="tabs">
            <ul className="tab-list">
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'schedule' ? 'active' : ''}`}
                  onClick={() => setActiveTab('schedule')}
                >
                  スケジュール
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'map' ? 'active' : ''}`}
                  onClick={() => setActiveTab('map')}
                >
                  マップ
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'tips' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tips')}
                >
                  コツ・ヒント
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* スケジュールタブ */}
            {activeTab === 'schedule' && (
              <div className="tab-content active">
                <div className="schedule-container">
                  {plan.spots.map((spot, index) => (
                    <div key={index} className="schedule-item">
                      <div className="schedule-time">
                        <span className="time-text">{spot.time}</span>
                      </div>
                      <div className="schedule-content">
                        <div className="spot-header">
                          <h3 className="spot-name">{spot.name}</h3>
                          <span className="spot-type">{spot.type}</span>
                        </div>
                        <p className="spot-description">{spot.description}</p>
                        <div className="spot-meta">
                          <div className="spot-address">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{spot.address}</span>
                          </div>
                          <div className="spot-rating">
                            <i className="fas fa-star"></i>
                            <span>{spot.rating}</span>
                          </div>
                          <div className="spot-price">
                            <i className="fas fa-yen-sign"></i>
                            <span>{spot.price}</span>
                          </div>
                        </div>
                        <div className="spot-image">
                          <div className="image-placeholder">
                            <i className="fas fa-image"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* マップタブ */}
            {activeTab === 'map' && (
              <div className="tab-content active">
                <div className="map-container">
                  <div className="map-placeholder">
                    <i className="fas fa-map"></i>
                    <span>マップ表示</span>
                  </div>
                  <div className="map-legend">
                    <h3>ルート情報</h3>
                    <div className="route-info">
                      <div className="route-item">
                        <i className="fas fa-walking"></i>
                        <span>徒歩: 15分</span>
                      </div>
                      <div className="route-item">
                        <i className="fas fa-subway"></i>
                        <span>電車: 8分</span>
                      </div>
                      <div className="route-item">
                        <i className="fas fa-car"></i>
                        <span>車: 12分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* コツ・ヒントタブ */}
            {activeTab === 'tips' && (
              <div className="tab-content active">
                <div className="tips-container">
                  <h3>デートのコツ・ヒント</h3>
                  <div className="tips-list">
                    {plan.tips.map((tip, index) => (
                      <div key={index} className="tip-item">
                        <div className="tip-icon">
                          <i className="fas fa-lightbulb"></i>
                        </div>
                        <p className="tip-text">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* アクションボタン */}
          <div className="plan-actions-bottom">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-edit"></i>
                編集
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-copy"></i>
                複製
              </button>
              <button className="btn btn-primary btn-large" onClick={handleStartPlan}>
                <i className="fas fa-play"></i>
                プランを開始
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
