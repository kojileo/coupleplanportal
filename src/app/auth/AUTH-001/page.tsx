'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Auth001Page() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    remember: false,
    terms: false,
    newsletter: false
  })

  const { signIn, signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        // ログイン処理
        const { error } = await signIn(formData.email, formData.password)
        if (error) {
          setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。')
        } else {
          router.push('/common/COMMON-001')
        }
      } else {
        // アカウント作成処理
        if (formData.password !== formData.confirmPassword) {
          setError('パスワードが一致しません。')
          return
        }
        if (!formData.terms) {
          setError('利用規約に同意してください。')
          return
        }

        const { error } = await signUp(formData.email, formData.password, {
          name: formData.name,
          newsletter: formData.newsletter
        })
        if (error) {
          setError('アカウント作成に失敗しました。メールアドレスが既に使用されている可能性があります。')
        } else {
          setError(null)
          alert('確認メールを送信しました。メール内のリンクをクリックしてアカウントを有効化してください。')
        }
      }
    } catch (err) {
      setError('予期しないエラーが発生しました。')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
            <Link href="/uc003/UC003-001" className="nav-link">ポータル</Link>
            <Link href="/common/COMMON-003" className="nav-link">ヘルプ</Link>
          </div>
        </div>
      </nav>

      {/* メインコンテンツ */}
      <main className="main-content">
        <div className="container">
          <div className="auth-container">
            <div className="auth-header">
              <h1 className="auth-title">CouplePlan</h1>
              <p className="auth-subtitle">AIがあなたたちのデートを特別にします</p>
            </div>

            {/* タブ切り替え */}
            <div className="auth-tabs">
              <button 
                className={`tab-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                ログイン
              </button>
              <button 
                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                アカウント作成
              </button>
            </div>

            {/* エラーメッセージ */}
            {error && (
              <div className="error-message">
                <i className="fas fa-exclamation-circle"></i>
                {error}
              </div>
            )}

            {/* ログインフォーム */}
            {isLogin ? (
              <div className="auth-form active">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">メールアドレス</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="password" className="form-label">パスワード</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        className="form-input"
                        placeholder="パスワードを入力"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-options">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      ログイン状態を保持
                    </label>
                    <a href="#" className="forgot-password">パスワードを忘れた方</a>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                    <i className="fas fa-sign-in-alt"></i>
                    {loading ? 'ログイン中...' : 'ログイン'}
                  </button>
                </form>
                
                <div className="divider">
                  <span>または</span>
                </div>
                
                <div className="social-login">
                  <button className="btn btn-social google">
                    <i className="fab fa-google"></i>
                    Googleでログイン
                  </button>
                  <button className="btn btn-social apple">
                    <i className="fab fa-apple"></i>
                    Appleでログイン
                  </button>
                </div>
              </div>
            ) : (
              <div className="auth-form active">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">お名前</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="山田太郎"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signupEmail" className="form-label">メールアドレス</label>
                    <input
                      type="email"
                      id="signupEmail"
                      name="email"
                      className="form-input"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="signupPassword" className="form-label">パスワード</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="signupPassword"
                        name="password"
                        className="form-input"
                        placeholder="8文字以上"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="form-label">パスワード確認</label>
                    <div className="password-input">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="form-input"
                        placeholder="パスワードを再入力"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="checkmark"></span>
                      <a href="#" onClick={(e) => e.preventDefault()}>利用規約</a>と<a href="#" onClick={(e) => e.preventDefault()}>プライバシーポリシー</a>に同意します
                    </label>
                  </div>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      お得な情報やアップデート情報を受け取る
                    </label>
                  </div>
                  
                  <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                    <i className="fas fa-user-plus"></i>
                    {loading ? '作成中...' : 'アカウント作成'}
                  </button>
                </form>
                
                <div className="divider">
                  <span>または</span>
                </div>
                
                <div className="social-login">
                  <button className="btn btn-social google">
                    <i className="fab fa-google"></i>
                    Googleで作成
                  </button>
                  <button className="btn btn-social apple">
                    <i className="fab fa-apple"></i>
                    Appleで作成
                  </button>
                </div>
              </div>
            )}

            {/* ゲスト利用 */}
            <div className="guest-access">
              <p>まずはお試しで利用したい方</p>
              <button className="btn btn-outline">
                <i className="fas fa-user-secret"></i>
                ゲストとして利用
              </button>
            </div>
          </div>

          {/* 機能紹介 */}
          <div className="features-showcase">
            <h2>CouplePlanの特徴</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-brain"></i>
                </div>
                <div className="feature-content">
                  <h3>AIデートプラン生成</h3>
                  <p>あなたたちの好みに合わせた最適なデートプランをAIが自動生成</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="feature-content">
                  <h3>共同編集</h3>
                  <p>パートナーと一緒にリアルタイムでデートプランを作成・編集</p>
                </div>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">
                  <i className="fas fa-paint-brush"></i>
                </div>
                <div className="feature-content">
                  <h3>Date Canvas</h3>
                  <p>思い出をビジュアルで共有・保存できる特別な機能</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}