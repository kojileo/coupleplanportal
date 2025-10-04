'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function COMMON002Page() {
  const [activeTab, setActiveTab] = useState('account')
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      marketing: false
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analytics: true
    },
    app: {
      theme: 'light',
      language: 'ja',
      autoSave: true
    }
  })

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }))
  }

  const handleLogout = () => {
    if (confirm('ログアウトしますか？')) {
      // ログアウト処理
      window.location.href = '/auth/AUTH-001'
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('アカウントを削除しますか？この操作は取り消せません。')) {
      // アカウント削除処理
      console.log('Account deletion requested')
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
              <h1 className="page-title">設定</h1>
              <p className="page-subtitle">アカウントとアプリケーションの設定を管理します</p>
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
                  className={`tab-link ${activeTab === 'account' ? 'active' : ''}`}
                  onClick={() => setActiveTab('account')}
                >
                  アカウント
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
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'privacy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('privacy')}
                >
                  プライバシー
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'app' ? 'active' : ''}`}
                  onClick={() => setActiveTab('app')}
                >
                  アプリ
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* アカウント設定 */}
            {activeTab === 'account' && (
              <div className="tab-content active">
                <div className="settings-container">
                  <div className="settings-section">
                    <h2>アカウント設定</h2>
                    <div className="settings-list">
                      <div className="setting-item">
                        <div className="setting-icon">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="setting-content">
                          <h3>プロフィール</h3>
                          <p>名前、写真、基本情報の設定</p>
                        </div>
                        <div className="setting-action">
                          <Link href="/auth/AUTH-002" className="btn btn-outline">
                            <i className="fas fa-edit"></i>
                            編集
                          </Link>
                        </div>
                      </div>
                      
                      <div className="setting-item">
                        <div className="setting-icon">
                          <i className="fas fa-lock"></i>
                        </div>
                        <div className="setting-content">
                          <h3>セキュリティ</h3>
                          <p>パスワード、二段階認証の設定</p>
                        </div>
                        <div className="setting-action">
                          <button className="btn btn-outline">
                            <i className="fas fa-shield-alt"></i>
                            設定
                          </button>
                        </div>
                      </div>
                      
                      <div className="setting-item">
                        <div className="setting-icon">
                          <i className="fas fa-users"></i>
                        </div>
                        <div className="setting-content">
                          <h3>パートナー連携</h3>
                          <p>パートナーとの連携設定</p>
                        </div>
                        <div className="setting-action">
                          <Link href="/auth/AUTH-004" className="btn btn-outline">
                            <i className="fas fa-link"></i>
                            管理
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h2>データ管理</h2>
                    <div className="settings-list">
                      <div className="setting-item">
                        <div className="setting-icon">
                          <i className="fas fa-download"></i>
                        </div>
                        <div className="setting-content">
                          <h3>データエクスポート</h3>
                          <p>あなたのデータをダウンロード</p>
                        </div>
                        <div className="setting-action">
                          <button className="btn btn-outline">
                            <i className="fas fa-download"></i>
                            エクスポート
                          </button>
                        </div>
                      </div>
                      
                      <div className="setting-item">
                        <div className="setting-icon">
                          <i className="fas fa-trash"></i>
                        </div>
                        <div className="setting-content">
                          <h3>アカウント削除</h3>
                          <p>アカウントとデータを完全に削除</p>
                        </div>
                        <div className="setting-action">
                          <button className="btn btn-danger" onClick={handleDeleteAccount}>
                            <i className="fas fa-trash"></i>
                            削除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h2>セッション管理</h2>
                    <div className="settings-list">
                      <div className="setting-item">
                        <div className="setting-icon">
                          <i className="fas fa-sign-out-alt"></i>
                        </div>
                        <div className="setting-content">
                          <h3>ログアウト</h3>
                          <p>すべてのデバイスからログアウト</p>
                        </div>
                        <div className="setting-action">
                          <button className="btn btn-outline" onClick={handleLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                            ログアウト
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 通知設定 */}
            {activeTab === 'notifications' && (
              <div className="tab-content active">
                <div className="settings-container">
                  <div className="settings-section">
                    <h2>通知設定</h2>
                    <div className="notification-settings">
                      <div className="notification-item">
                        <div className="notification-content">
                          <h3>メール通知</h3>
                          <p>重要な更新やお知らせをメールで受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.notifications.email}
                            onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-content">
                          <h3>プッシュ通知</h3>
                          <p>アプリ内の通知やリマインダーを受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.notifications.push}
                            onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-content">
                          <h3>SMS通知</h3>
                          <p>緊急の通知をSMSで受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.notifications.sms}
                            onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                      
                      <div className="notification-item">
                        <div className="notification-content">
                          <h3>マーケティング通知</h3>
                          <p>おすすめ情報やキャンペーンの通知を受け取ります</p>
                        </div>
                        <label className="toggle-switch">
                          <input 
                            type="checkbox" 
                            checked={settings.notifications.marketing}
                            onChange={(e) => handleSettingChange('notifications', 'marketing', e.target.checked)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* プライバシー設定 */}
            {activeTab === 'privacy' && (
              <div className="tab-content active">
                <div className="settings-container">
                  <div className="settings-section">
                    <h2>プライバシー設定</h2>
                    <div className="privacy-settings">
                      <div className="form-group">
                        <label htmlFor="profileVisibility" className="form-label">プロフィールの公開範囲</label>
                        <select 
                          id="profileVisibility" 
                          name="profileVisibility" 
                          className="form-select"
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                        >
                          <option value="private">非公開（パートナーのみ）</option>
                          <option value="friends">友達のみ</option>
                          <option value="public">公開</option>
                        </select>
                      </div>
                      
                      <div className="checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={settings.privacy.dataSharing}
                            onChange={(e) => handleSettingChange('privacy', 'dataSharing', e.target.checked)}
                          />
                          <span className="checkmark"></span>
                          データの共有を許可する
                        </label>
                        
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={settings.privacy.analytics}
                            onChange={(e) => handleSettingChange('privacy', 'analytics', e.target.checked)}
                          />
                          <span className="checkmark"></span>
                          アナリティクスデータの収集を許可する
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* アプリ設定 */}
            {activeTab === 'app' && (
              <div className="tab-content active">
                <div className="settings-container">
                  <div className="settings-section">
                    <h2>アプリ設定</h2>
                    <div className="app-settings">
                      <div className="form-group">
                        <label htmlFor="theme" className="form-label">テーマ</label>
                        <select 
                          id="theme" 
                          name="theme" 
                          className="form-select"
                          value={settings.app.theme}
                          onChange={(e) => handleSettingChange('app', 'theme', e.target.value)}
                        >
                          <option value="light">ライト</option>
                          <option value="dark">ダーク</option>
                          <option value="auto">自動</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="language" className="form-label">言語</label>
                        <select 
                          id="language" 
                          name="language" 
                          className="form-select"
                          value={settings.app.language}
                          onChange={(e) => handleSettingChange('app', 'language', e.target.value)}
                        >
                          <option value="ja">日本語</option>
                          <option value="en">English</option>
                        </select>
                      </div>
                      
                      <div className="checkbox-group">
                        <label className="checkbox-label">
                          <input
                            type="checkbox"
                            checked={settings.app.autoSave}
                            onChange={(e) => handleSettingChange('app', 'autoSave', e.target.checked)}
                          />
                          <span className="checkmark"></span>
                          自動保存を有効にする
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
