'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Auth003Page() {
  const [formData, setFormData] = useState({
    aiDataUsage: true,
    analyticsData: true,
    marketingData: false,
    locationData: true,
    profileVisibility: 'private',
    dataRetention: '1year',
    dataExport: true,
    dataDeletion: false,
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    sharing: {
      partner: true,
      friends: false,
      public: false
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      if (name.includes('.')) {
        const [parent, child] = name.split('.')
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent as keyof typeof prev] as any,
            [child]: checked
          }
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Privacy settings submitted:', formData)
    // 次のステップに進む
    window.location.href = '/auth/AUTH-004'
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
              <h1 className="page-title">プライバシー設定</h1>
              <p className="page-subtitle">データの利用とプライバシー設定を行ってください</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* ステッパー */}
          <div className="stepper">
            <div className="stepper-item completed">
              <div className="stepper-number">
                <i className="fas fa-check"></i>
              </div>
              <div className="stepper-label">アカウント作成</div>
            </div>
            <div className="stepper-item completed">
              <div className="stepper-number">
                <i className="fas fa-check"></i>
              </div>
              <div className="stepper-label">プロフィール設定</div>
            </div>
            <div className="stepper-item active">
              <div className="stepper-number">3</div>
              <div className="stepper-label">プライバシー設定</div>
            </div>
          </div>

          {/* フォーム */}
          <div className="form-container">
            <form className="privacy-form" onSubmit={handleSubmit}>
              {/* データ利用同意セクション */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title">データ利用について</h2>
                  <p className="section-description">サービス向上のためのデータ利用に同意してください</p>
                </div>
                
                <div className="privacy-cards">
                  <div className="privacy-card">
                    <div className="privacy-card-header">
                      <div className="privacy-icon">
                        <i className="fas fa-robot"></i>
                      </div>
                      <div className="privacy-content">
                        <h3>AI機能向上のためのデータ利用</h3>
                        <p>あなたのデート履歴や好みを分析して、より良いデートプランを提案するために使用されます。</p>
                      </div>
                    </div>
                    <div className="privacy-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          name="aiDataUsage" 
                          checked={formData.aiDataUsage}
                          onChange={handleInputChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">同意する</span>
                    </div>
                  </div>
                  
                  <div className="privacy-card">
                    <div className="privacy-card-header">
                      <div className="privacy-icon">
                        <i className="fas fa-chart-line"></i>
                      </div>
                      <div className="privacy-content">
                        <h3>アナリティクスデータの利用</h3>
                        <p>アプリの使用状況を分析して、ユーザー体験の向上に活用されます。</p>
                      </div>
                    </div>
                    <div className="privacy-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          name="analyticsData" 
                          checked={formData.analyticsData}
                          onChange={handleInputChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">同意する</span>
                    </div>
                  </div>
                  
                  <div className="privacy-card">
                    <div className="privacy-card-header">
                      <div className="privacy-icon">
                        <i className="fas fa-bullhorn"></i>
                      </div>
                      <div className="privacy-content">
                        <h3>マーケティングデータの利用</h3>
                        <p>パーソナライズされたおすすめ情報やキャンペーンの提供に使用されます。</p>
                      </div>
                    </div>
                    <div className="privacy-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          name="marketingData" 
                          checked={formData.marketingData}
                          onChange={handleInputChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">同意する</span>
                    </div>
                  </div>
                  
                  <div className="privacy-card">
                    <div className="privacy-card-header">
                      <div className="privacy-icon">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="privacy-content">
                        <h3>位置情報の利用</h3>
                        <p>近くのデートスポットの提案や、位置に基づいたサービス提供に使用されます。</p>
                      </div>
                    </div>
                    <div className="privacy-toggle">
                      <label className="toggle-switch">
                        <input 
                          type="checkbox" 
                          name="locationData" 
                          checked={formData.locationData}
                          onChange={handleInputChange}
                        />
                        <span className="toggle-slider"></span>
                      </label>
                      <span className="toggle-label">同意する</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* プロフィール公開設定 */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title">プロフィール公開設定</h2>
                  <p className="section-description">あなたのプロフィール情報の公開範囲を設定してください</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="profileVisibility" className="form-label">プロフィールの公開範囲</label>
                  <select 
                    id="profileVisibility" 
                    name="profileVisibility" 
                    className="form-select"
                    value={formData.profileVisibility}
                    onChange={handleInputChange}
                  >
                    <option value="private">非公開（パートナーのみ）</option>
                    <option value="friends">友達のみ</option>
                    <option value="public">公開</option>
                  </select>
                </div>
              </div>

              {/* データ保持期間 */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title">データ保持期間</h2>
                  <p className="section-description">あなたのデータを保持する期間を選択してください</p>
                </div>
                
                <div className="form-group">
                  <label htmlFor="dataRetention" className="form-label">データ保持期間</label>
                  <select 
                    id="dataRetention" 
                    name="dataRetention" 
                    className="form-select"
                    value={formData.dataRetention}
                    onChange={handleInputChange}
                  >
                    <option value="6months">6ヶ月</option>
                    <option value="1year">1年</option>
                    <option value="2years">2年</option>
                    <option value="indefinite">無期限</option>
                  </select>
                </div>
              </div>

              {/* データ管理オプション */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title">データ管理オプション</h2>
                  <p className="section-description">あなたのデータに関する追加オプションを設定してください</p>
                </div>
                
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="dataExport"
                      checked={formData.dataExport}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    データのエクスポートを許可する
                  </label>
                  
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="dataDeletion"
                      checked={formData.dataDeletion}
                      onChange={handleInputChange}
                    />
                    <span className="checkmark"></span>
                    アカウント削除時にデータも完全削除する
                  </label>
                </div>
              </div>

              {/* 通知設定 */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title">通知設定</h2>
                  <p className="section-description">どのような通知を受け取るかを設定してください</p>
                </div>
                
                <div className="notification-settings">
                  <div className="notification-item">
                    <div className="notification-content">
                      <h3>メール通知</h3>
                      <p>重要な更新やお知らせをメールで受け取ります</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="notifications.email" 
                        checked={formData.notifications.email}
                        onChange={handleInputChange}
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
                        name="notifications.push" 
                        checked={formData.notifications.push}
                        onChange={handleInputChange}
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
                        name="notifications.sms" 
                        checked={formData.notifications.sms}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* 共有設定 */}
              <div className="form-section">
                <div className="section-header">
                  <h2 className="section-title">共有設定</h2>
                  <p className="section-description">デートプランや思い出の共有範囲を設定してください</p>
                </div>
                
                <div className="sharing-settings">
                  <div className="sharing-item">
                    <div className="sharing-content">
                      <h3>パートナーとの共有</h3>
                      <p>パートナーとデートプランや思い出を共有します</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="sharing.partner" 
                        checked={formData.sharing.partner}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="sharing-item">
                    <div className="sharing-content">
                      <h3>友達との共有</h3>
                      <p>友達とデートプランや思い出を共有します</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="sharing.friends" 
                        checked={formData.sharing.friends}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  
                  <div className="sharing-item">
                    <div className="sharing-content">
                      <h3>公開共有</h3>
                      <p>一般公開して他のユーザーと共有します</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        name="sharing.public" 
                        checked={formData.sharing.public}
                        onChange={handleInputChange}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* フォームナビゲーション */}
              <div className="form-navigation">
                <button type="button" className="btn btn-secondary" onClick={() => window.history.back()}>
                  <i className="fas fa-arrow-left"></i>
                  前へ
                </button>
                <button type="submit" className="btn btn-primary">
                  次へ
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
