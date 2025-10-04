'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC002004Page() {
  const [viewMode, setViewMode] = useState('timeline')
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null)

  const plan = {
    id: 1,
    title: '渋谷デートプラン',
    description: 'カフェ巡りとショッピングを楽しむ、カジュアルなデートプラン',
    date: '2025-01-15',
    duration: '4時間',
    budget: '¥15,000',
    spots: [
      {
        id: 1,
        name: 'Blue Bottle Coffee',
        type: 'カフェ',
        time: '14:00-15:30',
        address: '東京都渋谷区恵比寿1-4-18',
        description: 'おしゃれなカフェでゆっくりとコーヒーを楽しみましょう',
        rating: 4.5,
        price: '¥1,000-2,000',
        image: '/images/blue-bottle.jpg',
        coordinates: { lat: 35.6762, lng: 139.6503 }
      },
      {
        id: 2,
        name: '渋谷スクランブル交差点',
        type: '観光',
        time: '15:30-16:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '世界で最も忙しい交差点の一つを体験',
        rating: 4.7,
        price: '無料',
        image: '/images/shibuya-crossing.jpg',
        coordinates: { lat: 35.6598, lng: 139.7006 }
      },
      {
        id: 3,
        name: '渋谷PARCO',
        type: 'ショッピング',
        time: '16:00-18:00',
        address: '東京都渋谷区宇田川町15-1',
        description: '最新のファッションとカルチャーを楽しめる複合施設',
        rating: 4.3,
        price: '¥5,000-15,000',
        image: '/images/parco.jpg',
        coordinates: { lat: 35.6598, lng: 139.7006 }
      },
      {
        id: 4,
        name: '渋谷スカイ',
        type: '展望台',
        time: '18:00-19:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '渋谷の街並みを一望できる展望台',
        rating: 4.9,
        price: '¥2,000',
        image: '/images/shibuya-sky.jpg',
        coordinates: { lat: 35.6598, lng: 139.7006 }
      }
    ]
  }

  const handleSpotSelect = (spotId: number) => {
    setSelectedSpot(selectedSpot === spotId ? null : spotId)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plan.title,
        text: plan.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('リンクをクリップボードにコピーしました')
    }
  }

  const handleExport = () => {
    // プランをエクスポート
    console.log('Exporting plan:', plan)
    alert('プランをエクスポートしました')
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
              <h1 className="page-title">プランプレビュー</h1>
              <p className="page-subtitle">デートプランの最終確認を行います</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-outline" onClick={handleShare}>
                <i className="fas fa-share"></i>
                共有
              </button>
              <button className="btn btn-outline" onClick={handleExport}>
                <i className="fas fa-download"></i>
                エクスポート
              </button>
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* プラン情報カード */}
          <div className="plan-info-card">
            <div className="plan-header">
              <h2 className="plan-title">{plan.title}</h2>
              <p className="plan-description">{plan.description}</p>
            </div>
            <div className="plan-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{plan.date}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{plan.duration}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-yen-sign"></i>
                <span>{plan.budget}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{plan.spots.length}スポット</span>
              </div>
            </div>
          </div>

          {/* ビューモード切り替え */}
          <div className="view-mode-selector">
            <div className="mode-buttons">
              <button 
                className={`mode-btn ${viewMode === 'timeline' ? 'active' : ''}`}
                onClick={() => setViewMode('timeline')}
              >
                <i className="fas fa-list"></i>
                タイムライン
              </button>
              <button 
                className={`mode-btn ${viewMode === 'map' ? 'active' : ''}`}
                onClick={() => setViewMode('map')}
              >
                <i className="fas fa-map"></i>
                マップ
              </button>
              <button 
                className={`mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th"></i>
                グリッド
              </button>
            </div>
          </div>

          {/* タイムラインビュー */}
          {viewMode === 'timeline' && (
            <div className="timeline-view">
              <div className="timeline-container">
                {plan.spots.map((spot, index) => (
                  <div key={spot.id} className="timeline-item">
                    <div className="timeline-marker">
                      <div className="marker-number">{index + 1}</div>
                    </div>
                    <div className="timeline-content">
                      <div className="spot-card">
                        <div className="spot-header">
                          <h3 className="spot-name">{spot.name}</h3>
                          <span className="spot-type">{spot.type}</span>
                          <span className="spot-time">{spot.time}</span>
                        </div>
                        <div className="spot-image">
                          <div className="image-placeholder">
                            <i className="fas fa-image"></i>
                          </div>
                        </div>
                        <div className="spot-details">
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* マップビュー */}
          {viewMode === 'map' && (
            <div className="map-view">
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

          {/* グリッドビュー */}
          {viewMode === 'grid' && (
            <div className="grid-view">
              <div className="spots-grid">
                {plan.spots.map(spot => (
                  <div key={spot.id} className="spot-card">
                    <div className="spot-image">
                      <div className="image-placeholder">
                        <i className="fas fa-image"></i>
                      </div>
                    </div>
                    <div className="spot-content">
                      <h3 className="spot-name">{spot.name}</h3>
                      <span className="spot-type">{spot.type}</span>
                      <span className="spot-time">{spot.time}</span>
                      <p className="spot-description">{spot.description}</p>
                      <div className="spot-meta">
                        <div className="spot-rating">
                          <i className="fas fa-star"></i>
                          <span>{spot.rating}</span>
                        </div>
                        <div className="spot-price">
                          <i className="fas fa-yen-sign"></i>
                          <span>{spot.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="preview-actions">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-edit"></i>
                編集に戻る
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-copy"></i>
                複製
              </button>
              <button className="btn btn-primary btn-large">
                <i className="fas fa-check"></i>
                プランを確定
              </button>
            </div>
          </div>

          {/* 共有オプション */}
          <div className="share-section">
            <h3>プランを共有</h3>
            <div className="share-options">
              <button className="btn btn-outline">
                <i className="fab fa-twitter"></i>
                Twitter
              </button>
              <button className="btn btn-outline">
                <i className="fab fa-facebook"></i>
                Facebook
              </button>
              <button className="btn btn-outline">
                <i className="fab fa-instagram"></i>
                Instagram
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-link"></i>
                リンクをコピー
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
