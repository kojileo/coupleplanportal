'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC007003Page() {
  const [activeTab, setActiveTab] = useState('notifications')
  const [showNotificationDetails, setShowNotificationDetails] = useState<string | null>(null)

  const notificationSettings = {
    email: {
      enabled: true,
      planChanges: true,
      billingReminders: true,
      paymentFailures: true,
      newFeatures: false,
      promotional: false
    },
    push: {
      enabled: true,
      planChanges: true,
      billingReminders: true,
      paymentFailures: true,
      newFeatures: false
    },
    sms: {
      enabled: false,
      planChanges: false,
      billingReminders: false,
      paymentFailures: true
    }
  }

  const recentNotifications = [
    {
      id: 1,
      type: 'plan_change',
      title: 'プラン変更完了',
      message: 'プレミアムプランに正常に変更されました。新しい機能が利用可能です。',
      timestamp: '2025-01-15 14:30',
      read: true,
      priority: 'normal'
    },
    {
      id: 2,
      type: 'billing_reminder',
      title: '請求日のお知らせ',
      message: '次回の請求日は2025年2月15日です。支払い方法をご確認ください。',
      timestamp: '2025-01-10 09:00',
      read: true,
      priority: 'normal'
    },
    {
      id: 3,
      type: 'payment_success',
      title: '支払い完了',
      message: '¥980の支払いが正常に完了しました。ありがとうございます。',
      timestamp: '2025-01-15 14:32',
      read: true,
      priority: 'normal'
    },
    {
      id: 4,
      type: 'new_feature',
      title: '新機能リリース',
      message: 'Date Canvas機能がリリースされました。思い出をビジュアルで保存できます。',
      timestamp: '2025-01-08 16:45',
      read: false,
      priority: 'low'
    },
    {
      id: 5,
      type: 'payment_failure',
      title: '支払いエラー',
      message: '支払い処理中にエラーが発生しました。支払い方法をご確認ください。',
      timestamp: '2025-01-05 10:15',
      read: false,
      priority: 'high'
    }
  ]

  const notificationTypes = [
    {
      id: 'plan_changes',
      name: 'プラン変更',
      description: 'プランの変更、アップグレード、ダウングレードに関する通知',
      icon: 'fas fa-exchange-alt'
    },
    {
      id: 'billing_reminders',
      name: '請求リマインダー',
      description: '請求日、支払い期限に関する通知',
      icon: 'fas fa-calendar-alt'
    },
    {
      id: 'payment_failures',
      name: '支払いエラー',
      description: '支払い失敗、支払い方法の問題に関する通知',
      icon: 'fas fa-exclamation-triangle'
    },
    {
      id: 'new_features',
      name: '新機能',
      description: '新機能のリリース、機能更新に関する通知',
      icon: 'fas fa-star'
    },
    {
      id: 'promotional',
      name: 'プロモーション',
      description: '特別オファー、割引情報に関する通知',
      icon: 'fas fa-gift'
    }
  ]

  const handleSettingChange = (category: string, setting: string, value: boolean) => {
    console.log('Setting changed:', category, setting, value)
    // 設定変更の処理
  }

  const handleNotificationClick = (notificationId: number) => {
    console.log('Notification clicked:', notificationId)
    // 通知の既読処理
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'plan_change': return 'fas fa-exchange-alt'
      case 'billing_reminder': return 'fas fa-calendar-alt'
      case 'payment_success': return 'fas fa-check-circle'
      case 'payment_failure': return 'fas fa-exclamation-triangle'
      case 'new_feature': return 'fas fa-star'
      default: return 'fas fa-bell'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'normal': return 'text-blue-500'
      case 'low': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ja-JP')
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
              <h1 className="page-title">課金変更通知</h1>
              <p className="page-subtitle">通知設定と課金に関するお知らせを管理します</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="tabs">
            <ul className="tab-list">
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="fas fa-bell"></i>
                  通知一覧
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  <i className="fas fa-cog"></i>
                  通知設定
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  <i className="fas fa-history"></i>
                  履歴
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* 通知一覧タブ */}
            {activeTab === 'notifications' && (
              <div className="tab-content active">
                <div className="notifications-section">
                  <div className="notifications-header">
                    <h2>通知一覧</h2>
                    <div className="notification-actions">
                      <button className="btn btn-outline btn-sm">
                        <i className="fas fa-check"></i>
                        すべて既読
                      </button>
                      <button className="btn btn-outline btn-sm">
                        <i className="fas fa-trash"></i>
                        削除
                      </button>
                    </div>
                  </div>

                  <div className="notifications-list">
                    {recentNotifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        onClick={() => handleNotificationClick(notification.id)}
                      >
                        <div className="notification-icon">
                          <i className={getNotificationIcon(notification.type)}></i>
                        </div>
                        
                        <div className="notification-content">
                          <div className="notification-header">
                            <h3 className="notification-title">{notification.title}</h3>
                            <div className="notification-meta">
                              <span className={`priority ${getPriorityColor(notification.priority)}`}>
                                {notification.priority === 'high' ? '高' :
                                 notification.priority === 'normal' ? '中' : '低'}
                              </span>
                              <span className="timestamp">{formatTimestamp(notification.timestamp)}</span>
                            </div>
                          </div>
                          
                          <p className="notification-message">{notification.message}</p>
                          
                          {!notification.read && (
                            <div className="unread-indicator">
                              <i className="fas fa-circle"></i>
                            </div>
                          )}
                        </div>
                        
                        <div className="notification-actions">
                          <button className="btn btn-outline btn-sm">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-outline btn-sm">
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 通知設定タブ */}
            {activeTab === 'settings' && (
              <div className="tab-content active">
                <div className="settings-section">
                  <h2>通知設定</h2>
                  <p>どのような通知を受け取るかを設定できます</p>

                  {/* メール通知設定 */}
                  <div className="settings-group">
                    <h3>メール通知</h3>
                    <div className="settings-card">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>メール通知を有効にする</h4>
                          <p>重要な通知をメールで受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.email.enabled}
                            onChange={(e) => handleSettingChange('email', 'enabled', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      {notificationSettings.email.enabled && (
                        <div className="sub-settings">
                          {notificationTypes.map(type => (
                            <div key={type.id} className="setting-item">
                              <div className="setting-info">
                                <h4>
                                  <i className={type.icon}></i>
                                  {type.name}
                                </h4>
                                <p>{type.description}</p>
                              </div>
                              <label className="toggle-switch">
                                <input 
                                  type="checkbox" 
                                  checked={notificationSettings.email[type.id as keyof typeof notificationSettings.email] as boolean}
                                  onChange={(e) => handleSettingChange('email', type.id, e.target.checked)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* プッシュ通知設定 */}
                  <div className="settings-group">
                    <h3>プッシュ通知</h3>
                    <div className="settings-card">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>プッシュ通知を有効にする</h4>
                          <p>アプリ内で通知を受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.push.enabled}
                            onChange={(e) => handleSettingChange('push', 'enabled', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      {notificationSettings.push.enabled && (
                        <div className="sub-settings">
                          {notificationTypes.slice(0, -1).map(type => (
                            <div key={type.id} className="setting-item">
                              <div className="setting-info">
                                <h4>
                                  <i className={type.icon}></i>
                                  {type.name}
                                </h4>
                                <p>{type.description}</p>
                              </div>
                              <label className="toggle-switch">
                                <input 
                                  type="checkbox" 
                                  checked={notificationSettings.push[type.id as keyof typeof notificationSettings.push] as boolean}
                                  onChange={(e) => handleSettingChange('push', type.id, e.target.checked)}
                                />
                                <span className="slider"></span>
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SMS通知設定 */}
                  <div className="settings-group">
                    <h3>SMS通知</h3>
                    <div className="settings-card">
                      <div className="setting-item">
                        <div className="setting-info">
                          <h4>SMS通知を有効にする</h4>
                          <p>緊急の通知をSMSで受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={notificationSettings.sms.enabled}
                            onChange={(e) => handleSettingChange('sms', 'enabled', e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      </div>

                      {notificationSettings.sms.enabled && (
                        <div className="sub-settings">
                          <div className="setting-item">
                            <div className="setting-info">
                              <h4>
                                <i className="fas fa-exclamation-triangle"></i>
                                支払いエラー
                              </h4>
                              <p>支払い失敗、支払い方法の問題に関する通知</p>
                            </div>
                            <label className="toggle-switch">
                              <input 
                                type="checkbox" 
                                checked={notificationSettings.sms.paymentFailures}
                                onChange={(e) => handleSettingChange('sms', 'paymentFailures', e.target.checked)}
                              />
                              <span className="slider"></span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 履歴タブ */}
            {activeTab === 'history' && (
              <div className="tab-content active">
                <div className="history-section">
                  <h2>通知履歴</h2>
                  <p>過去の通知履歴を確認できます</p>

                  <div className="history-filters">
                    <div className="filter-group">
                      <label>通知タイプ</label>
                      <select className="filter-select">
                        <option value="">すべて</option>
                        <option value="plan_change">プラン変更</option>
                        <option value="billing_reminder">請求リマインダー</option>
                        <option value="payment_success">支払い完了</option>
                        <option value="payment_failure">支払いエラー</option>
                        <option value="new_feature">新機能</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label>期間</label>
                      <select className="filter-select">
                        <option value="all">すべて</option>
                        <option value="week">過去1週間</option>
                        <option value="month">過去1ヶ月</option>
                        <option value="quarter">過去3ヶ月</option>
                      </select>
                    </div>
                  </div>

                  <div className="history-list">
                    {recentNotifications.map(notification => (
                      <div key={notification.id} className="history-item">
                        <div className="history-icon">
                          <i className={getNotificationIcon(notification.type)}></i>
                        </div>
                        
                        <div className="history-content">
                          <div className="history-header">
                            <h4 className="history-title">{notification.title}</h4>
                            <span className="history-timestamp">{formatTimestamp(notification.timestamp)}</span>
                          </div>
                          
                          <p className="history-message">{notification.message}</p>
                          
                          <div className="history-meta">
                            <span className={`priority ${getPriorityColor(notification.priority)}`}>
                              {notification.priority === 'high' ? '高優先度' :
                               notification.priority === 'normal' ? '通常' : '低優先度'}
                            </span>
                            <span className={`status ${notification.read ? 'read' : 'unread'}`}>
                              {notification.read ? '既読' : '未読'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="history-pagination">
                    <button className="btn btn-outline" disabled>
                      <i className="fas fa-chevron-left"></i>
                      前へ
                    </button>
                    <div className="page-numbers">
                      <button className="page-btn active">1</button>
                      <button className="page-btn">2</button>
                      <button className="page-btn">3</button>
                    </div>
                    <button className="btn btn-outline">
                      次へ
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* サポート情報 */}
          <div className="support-info">
            <h3>サポート情報</h3>
            <div className="support-links">
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-question-circle"></i>
                よくある質問
              </Link>
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-phone"></i>
                お問い合わせ
              </Link>
              <Link href="/uc007/UC007-001" className="support-link">
                <i className="fas fa-credit-card"></i>
                課金管理
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
