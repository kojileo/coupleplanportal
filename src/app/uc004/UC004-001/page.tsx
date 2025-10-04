'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC004001Page() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    conflictType: '',
    severity: '',
    description: '',
    context: '',
    emotions: [] as string[],
    partnerInvolved: true,
    partnerConsent: false,
    urgency: '',
    previousAttempts: '',
    desiredOutcome: ''
  })

  const conflictTypes = [
    { id: 'communication', name: 'コミュニケーション', icon: 'fas fa-comments' },
    { id: 'trust', name: '信頼関係', icon: 'fas fa-handshake' },
    { id: 'future', name: '将来について', icon: 'fas fa-calendar' },
    { id: 'family', name: '家族・友人関係', icon: 'fas fa-users' },
    { id: 'money', name: 'お金・経済', icon: 'fas fa-yen-sign' },
    { id: 'time', name: '時間の使い方', icon: 'fas fa-clock' },
    { id: 'intimacy', name: '親密さ・愛情', icon: 'fas fa-heart' },
    { id: 'other', name: 'その他', icon: 'fas fa-ellipsis-h' }
  ]

  const severityLevels = [
    { id: 'low', name: '軽度', description: '日常的な意見の相違' },
    { id: 'medium', name: '中度', description: '感情的な対立がある' },
    { id: 'high', name: '重度', description: '関係に深刻な影響' },
    { id: 'critical', name: '緊急', description: '関係の破綻の危機' }
  ]

  const emotions = [
    '怒り', '悲しみ', '不安', '失望', '孤独', '嫉妬', '後悔', '困惑',
    '希望', '愛情', '理解', '許し', '感謝', '安心', '満足', '喜び'
  ]

  const urgencyLevels = [
    { id: 'low', name: '低', description: '1週間以内' },
    { id: 'medium', name: '中', description: '3日以内' },
    { id: 'high', name: '高', description: '24時間以内' },
    { id: 'urgent', name: '緊急', description: '即座に' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name === 'emotions') {
        const emotion = value
        setFormData(prev => ({
          ...prev,
          emotions: checked 
            ? [...prev.emotions, emotion]
            : prev.emotions.filter(e => e !== emotion)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Conflict mediation request submitted:', formData)
    // 次のステップに進む
    window.location.href = '/uc004/UC004-002'
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
              <h1 className="page-title">AI仲裁依頼</h1>
              <p className="page-subtitle">AIが中立的な視点で関係修復をサポートします</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* ステップインジケーター */}
          <div className="step-indicator">
            <div className="steps">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
                  <div className="step-number">{step}</div>
                  <div className="step-label">
                    {step === 1 && '状況'}
                    {step === 2 && '感情'}
                    {step === 3 && '詳細'}
                    {step === 4 && '確認'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* フォーム */}
          <div className="mediation-form">
            <form onSubmit={handleSubmit}>
              {/* ステップ1: 状況把握 */}
              {currentStep === 1 && (
                <div className="form-step">
                  <h2 className="step-title">状況を教えてください</h2>
                  <p className="step-description">どのような問題が発生しているか、基本的な情報を教えてください。</p>
                  
                  <div className="form-group">
                    <label className="form-label">問題の種類</label>
                    <div className="conflict-types">
                      {conflictTypes.map(type => (
                        <button
                          key={type.id}
                          type="button"
                          className={`conflict-type-btn ${formData.conflictType === type.id ? 'selected' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, conflictType: type.id }))}
                        >
                          <i className={type.icon}></i>
                          <span>{type.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">深刻度</label>
                    <div className="severity-levels">
                      {severityLevels.map(level => (
                        <label key={level.id} className="severity-option">
                          <input
                            type="radio"
                            name="severity"
                            value={level.id}
                            checked={formData.severity === level.id}
                            onChange={handleInputChange}
                          />
                          <div className="severity-card">
                            <h3>{level.name}</h3>
                            <p>{level.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="description" className="form-label">問題の概要</label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-input form-textarea"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="どのような問題が発生しているか、簡潔に説明してください"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* ステップ2: 感情分析 */}
              {currentStep === 2 && (
                <div className="form-step">
                  <h2 className="step-title">現在の感情を教えてください</h2>
                  <p className="step-description">今感じている感情を選択してください。複数選択可能です。</p>
                  
                  <div className="form-group">
                    <label className="form-label">感情選択</label>
                    <div className="emotions-grid">
                      {emotions.map(emotion => (
                        <label key={emotion} className="emotion-option">
                          <input
                            type="checkbox"
                            name="emotions"
                            value={emotion}
                            checked={formData.emotions.includes(emotion)}
                            onChange={handleInputChange}
                          />
                          <span className="emotion-tag">{emotion}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="context" className="form-label">状況の詳細</label>
                    <textarea
                      id="context"
                      name="context"
                      className="form-input form-textarea"
                      value={formData.context}
                      onChange={handleInputChange}
                      placeholder="どのような状況でこの感情が生まれたか、詳しく教えてください"
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* ステップ3: 詳細情報 */}
              {currentStep === 3 && (
                <div className="form-step">
                  <h2 className="step-title">詳細情報</h2>
                  <p className="step-description">より具体的な情報を教えてください。</p>
                  
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="partnerInvolved"
                        checked={formData.partnerInvolved}
                        onChange={handleInputChange}
                      />
                      <span className="checkmark"></span>
                      パートナーもこの問題に関わっている
                    </label>
                  </div>

                  {formData.partnerInvolved && (
                    <div className="form-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          name="partnerConsent"
                          checked={formData.partnerConsent}
                          onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        パートナーも仲裁に同意している
                      </label>
                    </div>
                  )}

                  <div className="form-group">
                    <label htmlFor="urgency" className="form-label">緊急度</label>
                    <select
                      id="urgency"
                      name="urgency"
                      className="form-select"
                      value={formData.urgency}
                      onChange={handleInputChange}
                    >
                      <option value="">選択してください</option>
                      {urgencyLevels.map(level => (
                        <option key={level.id} value={level.id}>
                          {level.name} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="previousAttempts" className="form-label">これまでの解決試行</label>
                    <textarea
                      id="previousAttempts"
                      name="previousAttempts"
                      className="form-input form-textarea"
                      value={formData.previousAttempts}
                      onChange={handleInputChange}
                      placeholder="これまでにどのような解決方法を試しましたか？"
                      rows={3}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="desiredOutcome" className="form-label">希望する結果</label>
                    <textarea
                      id="desiredOutcome"
                      name="desiredOutcome"
                      className="form-input form-textarea"
                      value={formData.desiredOutcome}
                      onChange={handleInputChange}
                      placeholder="どのような結果を望んでいますか？"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* ステップ4: 確認 */}
              {currentStep === 4 && (
                <div className="form-step">
                  <h2 className="step-title">内容確認</h2>
                  <p className="step-description">入力内容を確認してください。</p>
                  
                  <div className="confirmation-summary">
                    <div className="summary-section">
                      <h3>基本情報</h3>
                      <div className="summary-item">
                        <span className="label">問題の種類:</span>
                        <span className="value">
                          {conflictTypes.find(t => t.id === formData.conflictType)?.name}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="label">深刻度:</span>
                        <span className="value">
                          {severityLevels.find(s => s.id === formData.severity)?.name}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="label">緊急度:</span>
                        <span className="value">
                          {urgencyLevels.find(u => u.id === formData.urgency)?.name}
                        </span>
                      </div>
                    </div>

                    <div className="summary-section">
                      <h3>感情・状況</h3>
                      <div className="summary-item">
                        <span className="label">選択された感情:</span>
                        <span className="value">
                          {formData.emotions.join(', ') || 'なし'}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="label">問題の概要:</span>
                        <span className="value">{formData.description}</span>
                      </div>
                    </div>

                    <div className="summary-section">
                      <h3>その他</h3>
                      <div className="summary-item">
                        <span className="label">パートナー関与:</span>
                        <span className="value">{formData.partnerInvolved ? 'はい' : 'いいえ'}</span>
                      </div>
                      {formData.partnerInvolved && (
                        <div className="summary-item">
                          <span className="label">パートナー同意:</span>
                          <span className="value">{formData.partnerConsent ? 'はい' : 'いいえ'}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="privacy-notice">
                    <h3>プライバシーについて</h3>
                    <p>
                      お客様の情報は厳重に管理され、第三者と共有されることはありません。
                      AIは中立的な視点で分析を行い、関係修復のための提案をいたします。
                    </p>
                  </div>
                </div>
              )}

              {/* ナビゲーションボタン */}
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button type="button" className="btn btn-outline" onClick={prevStep}>
                    <i className="fas fa-arrow-left"></i>
                    前へ
                  </button>
                )}
                
                {currentStep < 4 ? (
                  <button type="button" className="btn btn-primary" onClick={nextStep}>
                    次へ
                    <i className="fas fa-arrow-right"></i>
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-paper-plane"></i>
                    仲裁依頼を送信
                  </button>
                )}
              </div>
            </form>
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
                緊急サポート
              </Link>
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-envelope"></i>
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
