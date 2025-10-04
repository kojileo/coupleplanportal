'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC001003Page() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)
  const [showDetails, setShowDetails] = useState<number | null>(null)

  const plans = [
    {
      id: 1,
      title: '渋谷デートプラン',
      description: 'カフェ巡りとショッピングを楽しむ、カジュアルなデートプラン',
      duration: '4時間',
      budget: '¥15,000',
      rating: 4.8,
      spots: [
        { name: 'Blue Bottle Coffee', type: 'カフェ', time: '14:00-15:30' },
        { name: '渋谷スクランブル交差点', type: '観光', time: '15:30-16:00' },
        { name: '渋谷PARCO', type: 'ショッピング', time: '16:00-18:00' },
        { name: '渋谷スカイ', type: '展望台', time: '18:00-19:00' }
      ],
      highlights: ['写真映えスポット', 'カフェ巡り', 'ショッピング', '夜景']
    },
    {
      id: 2,
      title: '新宿デートプラン',
      description: 'グルメとエンターテイメントを満喫する、充実したデートプラン',
      duration: '6時間',
      budget: '¥25,000',
      rating: 4.6,
      spots: [
        { name: '新宿御苑', type: '公園', time: '10:00-12:00' },
        { name: '新宿高島屋', type: 'ショッピング', time: '12:00-13:30' },
        { name: '新宿歌舞伎町', type: 'エンターテイメント', time: '13:30-16:00' },
        { name: '新宿都庁展望台', type: '展望台', time: '16:00-17:00' }
      ],
      highlights: ['自然散策', 'グルメ', 'エンターテイメント', '展望台']
    },
    {
      id: 3,
      title: '表参道デートプラン',
      description: 'おしゃれな街を散策する、洗練されたデートプラン',
      duration: '5時間',
      budget: '¥20,000',
      rating: 4.9,
      spots: [
        { name: '表参道ヒルズ', type: 'ショッピング', time: '13:00-15:00' },
        { name: '原宿竹下通り', type: '観光', time: '15:00-16:00' },
        { name: '代々木公園', type: '公園', time: '16:00-17:30' },
        { name: '表参道カフェ', type: 'カフェ', time: '17:30-18:30' }
      ],
      highlights: ['おしゃれスポット', 'ショッピング', '自然散策', 'カフェ']
    }
  ]

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId)
  }

  const handlePlanAccept = () => {
    if (selectedPlan) {
      // プラン承認処理
      window.location.href = '/uc001/UC001-004'
    }
  }

  const handlePlanCustomize = () => {
    if (selectedPlan) {
      // カスタマイズ画面に遷移
      window.location.href = '/uc001/UC001-005'
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
          {/* ヘッダー */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">AIプラン提案</h1>
              <p className="page-subtitle">あなたに最適なデートプランを3つ提案しました</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* プラン一覧 */}
          <div className="plans-container">
            {plans.map(plan => (
              <div key={plan.id} className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`}>
                <div className="plan-header">
                  <div className="plan-info">
                    <h3 className="plan-title">{plan.title}</h3>
                    <p className="plan-description">{plan.description}</p>
                  </div>
                  <div className="plan-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < Math.floor(plan.rating) ? 'filled' : ''}`}></i>
                      ))}
                    </div>
                    <span className="rating-text">{plan.rating}</span>
                  </div>
                </div>
                
                <div className="plan-meta">
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
                
                <div className="plan-highlights">
                  {plan.highlights.map((highlight, index) => (
                    <span key={index} className="highlight-tag">
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="plan-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setShowDetails(showDetails === plan.id ? null : plan.id)}
                  >
                    <i className="fas fa-eye"></i>
                    {showDetails === plan.id ? '詳細を閉じる' : '詳細を見る'}
                  </button>
                  <button 
                    className={`btn ${selectedPlan === plan.id ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <i className="fas fa-check"></i>
                    {selectedPlan === plan.id ? '選択中' : '選択'}
                  </button>
                </div>
                
                {showDetails === plan.id && (
                  <div className="plan-details">
                    <h4>スケジュール詳細</h4>
                    <div className="schedule-list">
                      {plan.spots.map((spot, index) => (
                        <div key={index} className="schedule-item">
                          <div className="schedule-time">{spot.time}</div>
                          <div className="schedule-content">
                            <h5>{spot.name}</h5>
                            <span className="schedule-type">{spot.type}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* アクションボタン */}
          {selectedPlan && (
            <div className="plan-actions-bottom">
              <div className="selected-plan-info">
                <h3>選択中のプラン: {plans.find(p => p.id === selectedPlan)?.title}</h3>
                <p>このプランでよろしいですか？</p>
              </div>
              <div className="action-buttons">
                <button className="btn btn-outline" onClick={handlePlanCustomize}>
                  <i className="fas fa-edit"></i>
                  カスタマイズ
                </button>
                <button className="btn btn-primary" onClick={handlePlanAccept}>
                  <i className="fas fa-check"></i>
                  このプランで決定
                </button>
              </div>
            </div>
          )}

          {/* 再生成オプション */}
          <div className="regeneration-section">
            <h3>他のプランも見たいですか？</h3>
            <p>異なる条件でプランを再生成することもできます</p>
            <button className="btn btn-outline">
              <i className="fas fa-redo"></i>
              プランを再生成
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
