'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Auth002Page() {
  const [formData, setFormData] = useState({
    nickname: '',
    age: '',
    gender: '',
    location: '',
    interests: [] as string[],
    budget: '',
    timePreference: '',
    partnerName: '',
    partnerAge: '',
    partnerGender: '',
    relationshipLength: '',
    sharedInterests: [] as string[],
    profileImage: null as File | null
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const totalSteps = 3

  const { updateProfile } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      const interest = value
      setFormData(prev => ({
        ...prev,
        interests: checked 
          ? [...prev.interests, interest]
          : prev.interests.filter(i => i !== interest)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // プロフィール情報をSupabaseに保存
      const { error } = await updateProfile({
        nickname: formData.nickname,
        age: formData.age,
        gender: formData.gender,
        location: formData.location,
        interests: formData.interests,
        budget: formData.budget,
        timePreference: formData.timePreference,
        partnerName: formData.partnerName,
        partnerAge: formData.partnerAge,
        partnerGender: formData.partnerGender,
        relationshipLength: formData.relationshipLength,
        sharedInterests: formData.sharedInterests
      })

      if (error) {
        setError('プロフィールの保存に失敗しました。')
      } else {
        // プロフィール設定完了後、プライバシー設定画面に遷移
        router.push('/auth/AUTH-003')
      }
    } catch (err) {
      setError('予期しないエラーが発生しました。')
    } finally {
      setLoading(false)
    }
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
              <h1 className="page-title">プロフィール設定</h1>
              <p className="page-subtitle">あなたの情報と好みを設定してください</p>
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
            <div className={`stepper-item ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'active' : ''}`}>
              <div className="stepper-number">1</div>
              <div className="stepper-label">基本情報</div>
            </div>
            <div className={`stepper-item ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'active' : ''}`}>
              <div className="stepper-number">2</div>
              <div className="stepper-label">好み設定</div>
            </div>
            <div className={`stepper-item ${currentStep >= 3 ? 'completed' : ''} ${currentStep === 3 ? 'active' : ''}`}>
              <div className="stepper-number">3</div>
              <div className="stepper-label">パートナー情報</div>
            </div>
          </div>

          {/* エラーメッセージ */}
          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          {/* フォーム */}
          <div className="form-container">
            <form className="profile-form" onSubmit={handleSubmit}>
              {/* ステップ1: 基本情報 */}
              {currentStep === 1 && (
                <div className="form-section">
                  <div className="section-header">
                    <h2 className="section-title">基本情報</h2>
                    <p className="section-description">あなたの基本情報を入力してください</p>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="profileImage" className="form-label">プロフィール画像</label>
                      <div className="image-upload">
                        <div className="image-preview">
                          <i className="fas fa-user"></i>
                          <span>画像を選択</span>
                        </div>
                        <input 
                          type="file" 
                          id="profileImage" 
                          name="profileImage" 
                          accept="image/*" 
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                        <button 
                          type="button" 
                          className="btn btn-outline"
                          onClick={() => document.getElementById('profileImage')?.click()}
                        >
                          <i className="fas fa-camera"></i>
                          画像を選択
                        </button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="nickname" className="form-label">ニックネーム</label>
                      <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        className="form-input"
                        value={formData.nickname}
                        onChange={handleInputChange}
                        required
                      />
                      <small className="form-help">他のユーザーに表示される名前です</small>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="age" className="form-label">年齢</label>
                      <select
                        id="age"
                        name="age"
                        className="form-select"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">選択してください</option>
                        {Array.from({ length: 50 }, (_, i) => i + 18).map(age => (
                          <option key={age} value={age}>{age}歳</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="gender" className="form-label">性別</label>
                      <select
                        id="gender"
                        name="gender"
                        className="form-select"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">選択してください</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                        <option value="other">その他</option>
                        <option value="prefer-not-to-say">回答しない</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="location" className="form-label">居住地</label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-input"
                        placeholder="例: 東京都渋谷区"
                        value={formData.location}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ステップ2: 好み設定 */}
              {currentStep === 2 && (
                <div className="form-section">
                  <div className="section-header">
                    <h2 className="section-title">好み設定</h2>
                    <p className="section-description">あなたの趣味や好みを教えてください</p>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">興味のある分野</label>
                    <div className="checkbox-grid">
                      {['映画', '音楽', 'スポーツ', 'アート', 'グルメ', '旅行', '読書', 'ゲーム', 'ファッション', '写真'].map(interest => (
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
                    <label htmlFor="budget" className="form-label">デート予算</label>
                    <select
                      id="budget"
                      name="budget"
                      className="form-select"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="low">〜3,000円</option>
                      <option value="medium">3,000円〜10,000円</option>
                      <option value="high">10,000円〜30,000円</option>
                      <option value="premium">30,000円〜</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="timePreference" className="form-label">時間帯の好み</label>
                    <select
                      id="timePreference"
                      name="timePreference"
                      className="form-select"
                      value={formData.timePreference}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="morning">午前</option>
                      <option value="afternoon">午後</option>
                      <option value="evening">夕方</option>
                      <option value="night">夜</option>
                      <option value="flexible">柔軟</option>
                    </select>
                  </div>
                </div>
              )}

              {/* ステップ3: パートナー情報 */}
              {currentStep === 3 && (
                <div className="form-section">
                  <div className="section-header">
                    <h2 className="section-title">パートナー情報</h2>
                    <p className="section-description">パートナーの情報を入力してください（任意）</p>
                  </div>
                  
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="partnerName" className="form-label">パートナー名</label>
                      <input
                        type="text"
                        id="partnerName"
                        name="partnerName"
                        className="form-input"
                        placeholder="パートナーの名前"
                        value={formData.partnerName}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="partnerAge" className="form-label">パートナーの年齢</label>
                      <select
                        id="partnerAge"
                        name="partnerAge"
                        className="form-select"
                        value={formData.partnerAge}
                        onChange={handleInputChange}
                      >
                        <option value="">選択してください</option>
                        {Array.from({ length: 50 }, (_, i) => i + 18).map(age => (
                          <option key={age} value={age}>{age}歳</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="partnerGender" className="form-label">パートナーの性別</label>
                      <select
                        id="partnerGender"
                        name="partnerGender"
                        className="form-select"
                        value={formData.partnerGender}
                        onChange={handleInputChange}
                      >
                        <option value="">選択してください</option>
                        <option value="male">男性</option>
                        <option value="female">女性</option>
                        <option value="other">その他</option>
                        <option value="prefer-not-to-say">回答しない</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="relationshipLength" className="form-label">交際期間</label>
                      <select
                        id="relationshipLength"
                        name="relationshipLength"
                        className="form-select"
                        value={formData.relationshipLength}
                        onChange={handleInputChange}
                      >
                        <option value="">選択してください</option>
                        <option value="less-than-1month">1ヶ月未満</option>
                        <option value="1-3months">1〜3ヶ月</option>
                        <option value="3-6months">3〜6ヶ月</option>
                        <option value="6months-1year">6ヶ月〜1年</option>
                        <option value="1-2years">1〜2年</option>
                        <option value="2-5years">2〜5年</option>
                        <option value="more-than-5years">5年以上</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">共通の興味</label>
                    <div className="checkbox-grid">
                      {['映画', '音楽', 'スポーツ', 'アート', 'グルメ', '旅行', '読書', 'ゲーム', 'ファッション', '写真'].map(interest => (
                        <label key={interest} className="checkbox-label">
                          <input
                            type="checkbox"
                            name="sharedInterests"
                            value={interest}
                            checked={formData.sharedInterests.includes(interest)}
                            onChange={handleInputChange}
                          />
                          <span className="checkmark"></span>
                          {interest}
                        </label>
                      ))}
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
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    <i className="fas fa-check"></i>
                    {loading ? '保存中...' : '完了'}
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