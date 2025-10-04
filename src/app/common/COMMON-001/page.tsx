'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function COMMON001Page() {
  const [activeTab, setActiveTab] = useState('plans')

  const recentPlans = [
    {
      id: 1,
      title: '渋谷デートプラン',
      date: '2025-01-15',
      status: 'completed',
      partner: '田中さん',
      rating: 4.5
    },
    {
      id: 2,
      title: '新宿カフェ巡り',
      date: '2025-01-20',
      status: 'upcoming',
      partner: '田中さん',
      rating: null
    },
    {
      id: 3,
      title: '代々木公園散歩',
      date: '2025-01-10',
      status: 'completed',
      partner: '田中さん',
      rating: 4.2
    }
  ]

  const memories = [
    {
      id: 1,
      title: '初デートの思い出',
      date: '2024-12-25',
      location: '表参道',
      image: '/images/memory1.jpg',
      likes: 12
    },
    {
      id: 2,
      title: 'クリスマスデート',
      date: '2024-12-24',
      location: '六本木',
      image: '/images/memory2.jpg',
      likes: 8
    }
  ]

  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: 'デートのリマインダー',
      message: '明日のデートの準備はできていますか？',
      time: '2時間前',
      unread: true
    },
    {
      id: 2,
      type: 'partner',
      title: 'パートナーからのメッセージ',
      message: 'デートプランを確認しました！',
      time: '5時間前',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      title: '新機能のご案内',
      message: 'Date Canvas機能が利用可能になりました',
      time: '1日前',
      unread: false
    }
  ]

  const stats = {
    totalPlans: 12,
    completedPlans: 8,
    totalMemories: 45,
    relationshipDays: 365
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
            <Link href="/common/COMMON-003" className="nav-link">ヘルプ</Link>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="container">
          {/* ヘッダー */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">ダッシュボード</h1>
              <p className="page-subtitle">おかえりなさい！今日も素敵なデートを楽しみましょう</p>
            </div>
            <div className="header-actions">
              <Link href="/uc001/UC001-001" className="btn btn-primary">
                <i className="fas fa-plus"></i>
                新しいプラン
              </Link>
            </div>
          </div>

          {/* 統計カード */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.totalPlans}</h3>
                <p className="stat-label">総プラン数</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.completedPlans}</h3>
                <p className="stat-label">完了プラン</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-heart"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.totalMemories}</h3>
                <p className="stat-label">思い出</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-content">
                <h3 className="stat-number">{stats.relationshipDays}</h3>
                <p className="stat-label">交際日数</p>
              </div>
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="tabs">
            <ul className="tab-list">
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'plans' ? 'active' : ''}`}
                  onClick={() => setActiveTab('plans')}
                >
                  デートプラン
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'memories' ? 'active' : ''}`}
                  onClick={() => setActiveTab('memories')}
                >
                  思い出
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  通知
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* デートプランタブ */}
            {activeTab === 'plans' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h2>最近のデートプラン</h2>
                  <Link href="/uc001/UC001-001" className="btn btn-outline">
                    新しいプランを作成
                  </Link>
                </div>
                
                <div className="plans-grid">
                  {recentPlans.map(plan => (
                    <div key={plan.id} className="plan-card">
                      <div className="plan-header">
                        <h3 className="plan-title">{plan.title}</h3>
                        <span className={`plan-status ${plan.status}`}>
                          {plan.status === 'completed' ? '完了' : '予定'}
                        </span>
                      </div>
                      <div className="plan-meta">
                        <div className="plan-date">
                          <i className="fas fa-calendar"></i>
                          {plan.date}
                        </div>
                        <div className="plan-partner">
                          <i className="fas fa-user"></i>
                          {plan.partner}
                        </div>
                        {plan.rating && (
                          <div className="plan-rating">
                            <i className="fas fa-star"></i>
                            {plan.rating}
                          </div>
                        )}
                      </div>
                      <div className="plan-actions">
                        <button className="btn btn-outline btn-sm">
                          詳細を見る
                        </button>
                        {plan.status === 'upcoming' && (
                          <button className="btn btn-primary btn-sm">
                            編集
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 思い出タブ */}
            {activeTab === 'memories' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h2>思い出アルバム</h2>
                  <Link href="/uc005/UC005-001" className="btn btn-outline">
                    Date Canvasを開く
                  </Link>
                </div>
                
                <div className="memories-grid">
                  {memories.map(memory => (
                    <div key={memory.id} className="memory-card">
                      <div className="memory-image">
                        <div className="image-placeholder">
                          <i className="fas fa-image"></i>
                        </div>
                      </div>
                      <div className="memory-content">
                        <h3 className="memory-title">{memory.title}</h3>
                        <div className="memory-meta">
                          <div className="memory-date">
                            <i className="fas fa-calendar"></i>
                            {memory.date}
                          </div>
                          <div className="memory-location">
                            <i className="fas fa-map-marker-alt"></i>
                            {memory.location}
                          </div>
                        </div>
                        <div className="memory-actions">
                          <button className="btn btn-outline btn-sm">
                            <i className="fas fa-heart"></i>
                            {memory.likes}
                          </button>
                          <button className="btn btn-outline btn-sm">
                            詳細
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 通知タブ */}
            {activeTab === 'notifications' && (
              <div className="tab-content active">
                <div className="content-header">
                  <h2>通知</h2>
                  <button className="btn btn-outline">
                    すべて既読にする
                  </button>
                </div>
                
                <div className="notifications-list">
                  {notifications.map(notification => (
                    <div key={notification.id} className={`notification-item ${notification.unread ? 'unread' : ''}`}>
                      <div className="notification-icon">
                        <i className={`fas fa-${notification.type === 'reminder' ? 'bell' : notification.type === 'partner' ? 'user' : 'info'}`}></i>
                      </div>
                      <div className="notification-content">
                        <h3 className="notification-title">{notification.title}</h3>
                        <p className="notification-message">{notification.message}</p>
                        <div className="notification-time">{notification.time}</div>
                      </div>
                      {notification.unread && (
                        <div className="notification-badge"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* クイックアクション */}
          <div className="quick-actions">
            <h2>クイックアクション</h2>
            <div className="actions-grid">
              <Link href="/uc001/UC001-001" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-magic"></i>
                </div>
                <h3>AIプラン生成</h3>
                <p>AIが最適なデートプランを提案</p>
              </Link>
              
              <Link href="/uc002/UC002-001" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>共同編集</h3>
                <p>パートナーと一緒にプランを作成</p>
              </Link>
              
              <Link href="/uc005/UC005-001" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-paint-brush"></i>
                </div>
                <h3>Date Canvas</h3>
                <p>思い出をビジュアルで保存</p>
              </Link>
              
              <Link href="/uc003/UC003-001" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>スポット検索</h3>
                <p>デートスポットを探す</p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}