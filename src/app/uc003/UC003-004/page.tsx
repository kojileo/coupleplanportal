'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC003004Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const [userType, setUserType] = useState<'new' | 'existing' | null>(null)

  const features = [
    {
      icon: 'fas fa-magic',
      title: 'AIデートプラン生成',
      description: 'あなたの好みに合わせて、AIが最適なデートプランを自動生成します。',
      benefits: ['時間短縮', '新しい発見', 'パーソナライズ']
    },
    {
      icon: 'fas fa-users',
      title: '共同編集機能',
      description: 'パートナーと一緒にリアルタイムでデートプランを作成・編集できます。',
      benefits: ['リアルタイム同期', '編集競合解決', '承認ワークフロー']
    },
    {
      icon: 'fas fa-paint-brush',
      title: 'Date Canvas',
      description: '思い出をビジュアルで保存・共有できる特別な機能です。',
      benefits: ['ビジュアル保存', '共同編集', '思い出管理']
    },
    {
      icon: 'fas fa-heart',
      title: '関係修復サポート',
      description: 'AIが喧嘩や対立の仲裁をサポートし、より良い関係を築きます。',
      benefits: ['中立的な視点', 'コミュニケーション改善', '関係性分析']
    }
  ]

  const testimonials = [
    {
      name: '田中太郎',
      age: 28,
      content: 'AIが提案してくれるデートプランが本当に素晴らしくて、毎回新しい発見があります！',
      rating: 5
    },
    {
      name: '佐藤花子',
      age: 26,
      content: 'パートナーと一緒にプランを作るのが楽しくて、デートがもっと楽しくなりました。',
      rating: 5
    },
    {
      name: '山田次郎',
      age: 30,
      content: 'Date Canvasで思い出を保存できるのが最高です。二人の記録が残せて嬉しいです。',
      rating: 5
    }
  ]

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleUserTypeSelect = (type: 'new' | 'existing') => {
    setUserType(type)
    nextStep()
  }

  const handleGetStarted = () => {
    if (userType === 'new') {
      window.location.href = '/auth/AUTH-001'
    } else {
      window.location.href = '/auth/AUTH-001'
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
          {/* ステップインジケーター */}
          <div className="step-indicator">
            <div className="steps">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && 'ようこそ'}
                    {step === 2 && '機能紹介'}
                    {step === 3 && '体験談'}
                    {step === 4 && '始めよう'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ステップ1: ウェルカム */}
          {currentStep === 1 && (
            <div className="welcome-step">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h1 className="welcome-title">CouplePlanへようこそ！</h1>
                <p className="welcome-description">
                  AIが提案する、あなただけのデートプランで<br />
                  カップルの絆を深めませんか？
                </p>
                
                <div className="user-type-selection">
                  <h3>どちらに該当しますか？</h3>
                  <div className="user-type-cards">
                    <div 
                      className="user-type-card"
                      onClick={() => handleUserTypeSelect('new')}
                    >
                      <div className="card-icon">
                        <i className="fas fa-user-plus"></i>
                      </div>
                      <h3>新規ユーザー</h3>
                      <p>CouplePlanを初めて使用します</p>
                    </div>
                    
                    <div 
                      className="user-type-card"
                      onClick={() => handleUserTypeSelect('existing')}
                    >
                      <div className="card-icon">
                        <i className="fas fa-user-check"></i>
                      </div>
                      <h3>既存ユーザー</h3>
                      <p>アカウントをお持ちです</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ステップ2: 機能紹介 */}
          {currentStep === 2 && (
            <div className="features-step">
              <div className="step-content">
                <h2 className="step-title">主な機能</h2>
                <p className="step-description">CouplePlanの特徴的な機能をご紹介します</p>
                
                <div className="features-grid">
                  {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                      <div className="feature-icon">
                        <i className={feature.icon}></i>
                      </div>
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                      <div className="feature-benefits">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <span key={benefitIndex} className="benefit-tag">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ステップ3: 体験談 */}
          {currentStep === 3 && (
            <div className="testimonials-step">
              <div className="step-content">
                <h2 className="step-title">ユーザーの声</h2>
                <p className="step-description">実際にCouplePlanをご利用いただいている方々の声をご紹介します</p>
                
                <div className="testimonials-grid">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="testimonial-card">
                      <div className="testimonial-content">
                        <p className="testimonial-text">"{testimonial.content}"</p>
                        <div className="testimonial-rating">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <i key={i} className="fas fa-star"></i>
                          ))}
                        </div>
                      </div>
                      <div className="testimonial-author">
                        <div className="author-avatar">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="author-info">
                          <span className="author-name">{testimonial.name}</span>
                          <span className="author-age">{testimonial.age}歳</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ステップ4: 始めよう */}
          {currentStep === 4 && (
            <div className="get-started-step">
              <div className="step-content">
                <h2 className="step-title">さあ、始めましょう！</h2>
                <p className="step-description">
                  CouplePlanで、あなたたちだけの特別なデート体験を始めませんか？
                </p>
                
                <div className="benefits-summary">
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>AIが最適なデートプランを提案</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>パートナーと共同でプラン作成</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>思い出をビジュアルで保存</span>
                  </div>
                  <div className="benefit-item">
                    <i className="fas fa-check-circle"></i>
                    <span>関係を深めるサポート機能</span>
                  </div>
                </div>
                
                <div className="pricing-info">
                  <h3>料金プラン</h3>
                  <div className="pricing-cards">
                    <div className="pricing-card">
                      <h4>無料プラン</h4>
                      <div className="price">¥0</div>
                      <ul className="features-list">
                        <li>基本的なデートプラン生成</li>
                        <li>月5回まで</li>
                        <li>基本的な共同編集</li>
                      </ul>
                    </div>
                    
                    <div className="pricing-card featured">
                      <h4>プレミアムプラン</h4>
                      <div className="price">¥980<span>/月</span></div>
                      <ul className="features-list">
                        <li>無制限のデートプラン生成</li>
                        <li>高度なAI機能</li>
                        <li>Date Canvas機能</li>
                        <li>関係修復サポート</li>
                        <li>優先サポート</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ナビゲーションボタン */}
          <div className="step-navigation">
            {currentStep > 1 && (
              <button className="btn btn-outline" onClick={prevStep}>
                <i className="fas fa-arrow-left"></i>
                前へ
              </button>
            )}
            
            {currentStep < 4 ? (
              <button className="btn btn-primary" onClick={nextStep}>
                次へ
                <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button className="btn btn-primary btn-large" onClick={handleGetStarted}>
                <i className="fas fa-rocket"></i>
                始める
              </button>
            )}
          </div>

          {/* スキップオプション */}
          {currentStep < 4 && (
            <div className="skip-option">
              <button className="btn btn-outline" onClick={handleGetStarted}>
                スキップして始める
              </button>
            </div>
          )}

          {/* サポート情報 */}
          <div className="support-info">
            <h3>サポート</h3>
            <div className="support-links">
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-question-circle"></i>
                ヘルプセンター
              </Link>
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-envelope"></i>
                お問い合わせ
              </Link>
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-comments"></i>
                チャットサポート
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
