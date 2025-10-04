'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC001001Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    dateType: '',
    dateDate: '',
    dateTime: '',
    duration: '',
    budget: 10000,
    location: '',
    specificArea: '',
    interests: [] as string[],
    mood: '',
    specialRequests: '',
    partnerPreferences: [] as string[],
    accessibility: [] as string[],
    weather: '',
    transportation: [] as string[]
  })

  const totalSteps = 4

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      const item = value
      setFormData(prev => ({
        ...prev,
        [name]: checked 
          ? [...(prev[name as keyof typeof prev] as string[]), item]
          : (prev[name as keyof typeof prev] as string[]).filter(i => i !== item)
      }))
    } else if (type === 'range') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Plan submitted:', formData)
    // AI生成処理に進む
    window.location.href = '/uc001/UC001-002'
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const setBudget = (amount: number) => {
    setFormData(prev => ({
      ...prev,
      budget: amount
    }))
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
              <h1 className="page-title">デートプラン作成</h1>
              <p className="page-subtitle">AIがあなたたちに最適なデートプランを提案します</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* デートプラン作成フォーム */}
          <div className="plan-form-container">
            <form className="plan-form" onSubmit={handleSubmit}>
              {/* ステップ1: 基本情報 */}
              {currentStep === 1 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-number">1</div>
                    <div className="step-content">
                      <h2>基本情報</h2>
                      <p>デートの基本要件を教えてください</p>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <div className="form-grid">
                      <div className="form-group">
                        <label htmlFor="dateType" className="form-label">デートの種類</label>
                        <select 
                          id="dateType" 
                          name="dateType" 
                          className="form-select" 
                          value={formData.dateType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">選択してください</option>
                          <option value="first">初デート</option>
                          <option value="anniversary">記念日</option>
                          <option value="casual">カジュアル</option>
                          <option value="special">特別な日</option>
                          <option value="makeup">仲直り</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="dateDate" className="form-label">希望日</label>
                        <input 
                          type="date" 
                          id="dateDate" 
                          name="dateDate" 
                          className="form-input" 
                          value={formData.dateDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="dateTime" className="form-label">時間帯</label>
                        <select 
                          id="dateTime" 
                          name="dateTime" 
                          className="form-select" 
                          value={formData.dateTime}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">選択してください</option>
                          <option value="morning">午前（9:00-12:00）</option>
                          <option value="afternoon">午後（12:00-17:00）</option>
                          <option value="evening">夕方（17:00-21:00）</option>
                          <option value="night">夜（21:00-24:00）</option>
                          <option value="all-day">終日</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="duration" className="form-label">所要時間</label>
                        <select 
                          id="duration" 
                          name="duration" 
                          className="form-select" 
                          value={formData.duration}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">選択してください</option>
                          <option value="2hours">2時間</option>
                          <option value="4hours">4時間</option>
                          <option value="6hours">6時間</option>
                          <option value="8hours">8時間</option>
                          <option value="all-day">終日</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ2: 予算・地域 */}
              {currentStep === 2 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-number">2</div>
                    <div className="step-content">
                      <h2>予算・地域</h2>
                      <p>予算と地域を設定してください</p>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <div className="form-group">
                      <label htmlFor="budget" className="form-label">予算</label>
                      <div className="budget-input">
                        <input 
                          type="range" 
                          id="budget" 
                          name="budget" 
                          min="0" 
                          max="50000" 
                          value={formData.budget} 
                          step="1000" 
                          onChange={handleInputChange}
                        />
                        <div className="budget-display">
                          <span>¥{formData.budget.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="budget-presets">
                        <button type="button" className="budget-preset" onClick={() => setBudget(5000)}>¥5,000</button>
                        <button type="button" className="budget-preset" onClick={() => setBudget(10000)}>¥10,000</button>
                        <button type="button" className="budget-preset" onClick={() => setBudget(20000)}>¥20,000</button>
                        <button type="button" className="budget-preset" onClick={() => setBudget(30000)}>¥30,000</button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">地域</label>
                      <select 
                        id="location" 
                        name="location" 
                        className="form-select" 
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">選択してください</option>
                        <option value="tokyo">東京</option>
                        <option value="osaka">大阪</option>
                        <option value="kyoto">京都</option>
                        <option value="yokohama">横浜</option>
                        <option value="nagoya">名古屋</option>
                        <option value="fukuoka">福岡</option>
                        <option value="sapporo">札幌</option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="specificArea" className="form-label">具体的なエリア（任意）</label>
                      <input 
                        type="text" 
                        id="specificArea" 
                        name="specificArea" 
                        className="form-input" 
                        placeholder="例: 渋谷、新宿、表参道など"
                        value={formData.specificArea}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ3: 好み・興味 */}
              {currentStep === 3 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-number">3</div>
                    <div className="step-content">
                      <h2>好み・興味</h2>
                      <p>あなたたちの好みや興味を教えてください</p>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <div className="form-group">
                      <label className="form-label">興味のある分野</label>
                      <div className="checkbox-grid">
                        {['映画', '音楽', 'アート', 'グルメ', '旅行', 'スポーツ', 'ショッピング', '自然', '歴史', 'エンターテイメント'].map(interest => (
                          <label key={interest} className="checkbox-label">
                            <input
                              type="checkbox"
                              name="interests"
                              value={interest}
                              checked={formData.interests.includes(interest)}
                              onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                            {interest}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="mood" className="form-label">デートの雰囲気</label>
                      <select 
                        id="mood" 
                        name="mood" 
                        className="form-select" 
                        value={formData.mood}
                        onChange={handleInputChange}
                      >
                        <option value="">選択してください</option>
                        <option value="romantic">ロマンチック</option>
                        <option value="casual">カジュアル</option>
                        <option value="adventure">アドベンチャー</option>
                        <option value="relaxing">リラックス</option>
                        <option value="exciting">エキサイティング</option>
                        <option value="cultural">文化的</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="specialRequests" className="form-label">特別なリクエスト</label>
                      <textarea 
                        id="specialRequests" 
                        name="specialRequests" 
                        className="form-input form-textarea" 
                        placeholder="特別な要望や希望があれば教えてください"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ4: 詳細設定 */}
              {currentStep === 4 && (
                <div className="form-step active">
                  <div className="step-header">
                    <div className="step-number">4</div>
                    <div className="step-content">
                      <h2>詳細設定</h2>
                      <p>より詳細な設定を行ってください</p>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <div className="form-group">
                      <label className="form-label">パートナーの好み</label>
                      <div className="checkbox-grid">
                        {['静かな場所', 'にぎやかな場所', '新しい体験', '定番の場所', '写真映え', '美味しいもの', 'お買い物', '自然体験'].map(preference => (
                          <label key={preference} className="checkbox-label">
                            <input
                              type="checkbox"
                              name="partnerPreferences"
                              value={preference}
                              checked={formData.partnerPreferences.includes(preference)}
                              onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                            {preference}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">アクセシビリティ</label>
                      <div className="checkbox-grid">
                        {['車椅子対応', 'エレベーター利用', '段差なし', '音声案内', '点字対応'].map(access => (
                          <label key={access} className="checkbox-label">
                            <input
                              type="checkbox"
                              name="accessibility"
                              value={access}
                              checked={formData.accessibility.includes(access)}
                              onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                            {access}
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="weather" className="form-label">天候</label>
                      <select 
                        id="weather" 
                        name="weather" 
                        className="form-select" 
                        value={formData.weather}
                        onChange={handleInputChange}
                      >
                        <option value="">選択してください</option>
                        <option value="sunny">晴れ</option>
                        <option value="cloudy">曇り</option>
                        <option value="rainy">雨</option>
                        <option value="snowy">雪</option>
                        <option value="any">天候問わず</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">交通手段</label>
                      <div className="checkbox-grid">
                        {['電車', 'バス', '車', '自転車', '徒歩', 'タクシー'].map(transport => (
                          <label key={transport} className="checkbox-label">
                            <input
                              type="checkbox"
                              name="transportation"
                              value={transport}
                              checked={formData.transportation.includes(transport)}
                              onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                            {transport}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* フォームナビゲーション */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" className="btn btn-secondary" onClick={prevStep}>
                    <i className="fas fa-arrow-left"></i>
                    前へ
                  </button>
                )}
                
                {currentStep < totalSteps ? (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    次へ
                    <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-magic"></i>
                    AIプラン生成開始
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}