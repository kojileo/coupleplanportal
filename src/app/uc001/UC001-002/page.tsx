'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function UC001002Page() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const steps = [
    { icon: 'fas fa-search', title: '情報収集', description: 'あなたの好みを分析中...' },
    { icon: 'fas fa-map-marker-alt', title: '場所検索', description: '最適なスポットを検索中...' },
    { icon: 'fas fa-route', title: 'ルート作成', description: '効率的なルートを計画中...' },
    { icon: 'fas fa-magic', title: 'プラン生成', description: 'AIがデートプランを生成中...' },
    { icon: 'fas fa-check', title: '完了', description: 'デートプランが完成しました！' }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setIsComplete(true)
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return steps.length - 1
        }
        return prev + 1
      })
    }, 2000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  const handleComplete = () => {
    window.location.href = '/uc001/UC001-003'
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
              <h1 className="page-title">AI生成中</h1>
              <p className="page-subtitle">あなたたちに最適なデートプランを作成しています</p>
            </div>
          </div>

          {/* 生成中コンテンツ */}
          <div className="generation-container">
            <div className="generation-content">
              {/* AIアイコン */}
              <div className="ai-icon">
                <div className="spinner"></div>
                <i className="fas fa-robot"></i>
              </div>

              {/* プログレスバー */}
              <div className="progress-section">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  <span className="progress-percentage">{progress}%</span>
                  <span className="progress-label">生成中...</span>
                </div>
              </div>

              {/* ステップ表示 */}
              <div className="steps-container">
                {steps.map((step, index) => (
                  <div 
                    key={index}
                    className={`step-item ${index <= currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                  >
                    <div className="step-icon">
                      <i className={step.icon}></i>
                    </div>
                    <div className="step-content">
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-description">{step.description}</p>
                    </div>
                    {index < currentStep && (
                      <div className="step-check">
                        <i className="fas fa-check"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 生成中のメッセージ */}
              <div className="generation-messages">
                <div className="message-item">
                  <i className="fas fa-lightbulb"></i>
                  <span>あなたの好みに基づいて最適なスポットを選んでいます</span>
                </div>
                <div className="message-item">
                  <i className="fas fa-clock"></i>
                  <span>時間と予算に合わせてスケジュールを調整中です</span>
                </div>
                <div className="message-item">
                  <i className="fas fa-heart"></i>
                  <span>二人の思い出に残る特別なプランを作成しています</span>
                </div>
              </div>

              {/* 完了時の表示 */}
              {isComplete && (
                <div className="completion-section">
                  <div className="completion-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h2 className="completion-title">デートプランが完成しました！</h2>
                  <p className="completion-description">
                    あなたたちに最適なデートプランが生成されました。<br />
                    詳細を確認して、素敵なデートをお楽しみください。
                  </p>
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={handleComplete}
                  >
                    <i className="fas fa-eye"></i>
                    プランを確認する
                  </button>
                </div>
              )}

              {/* キャンセルボタン */}
              {!isComplete && (
                <div className="cancel-section">
                  <button className="btn btn-outline">
                    <i className="fas fa-times"></i>
                    生成をキャンセル
                  </button>
                </div>
              )}
            </div>

            {/* サイドバー情報 */}
            <div className="generation-sidebar">
              <div className="info-card">
                <h3 className="card-title">生成中の情報</h3>
                <div className="info-item">
                  <i className="fas fa-calendar"></i>
                  <span>希望日: 2025年1月15日</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <span>時間帯: 午後</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-yen-sign"></i>
                  <span>予算: ¥15,000</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>地域: 東京</span>
                </div>
              </div>

              <div className="tips-card">
                <h3 className="card-title">生成のヒント</h3>
                <ul className="tips-list">
                  <li>より詳細な情報を提供すると、より精度の高いプランが生成されます</li>
                  <li>過去のデート履歴を参考に、新しい体験を提案します</li>
                  <li>天候や交通状況も考慮して最適なルートを作成します</li>
                  <li>二人の好みのバランスを取ったプランに調整します</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}