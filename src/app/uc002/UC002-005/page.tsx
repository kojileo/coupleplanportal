'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC002005Page() {
  const [workflowStep, setWorkflowStep] = useState(1)
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending')
  const [comments, setComments] = useState('')

  const workflowSteps = [
    {
      id: 1,
      title: 'プラン作成',
      description: 'デートプランの基本情報を作成',
      status: 'completed',
      author: 'あなた',
      timestamp: '2025-01-15 13:45'
    },
    {
      id: 2,
      title: '共同編集',
      description: 'パートナーと一緒にプランを編集',
      status: 'completed',
      author: '田中太郎',
      timestamp: '2025-01-15 14:30'
    },
    {
      id: 3,
      title: 'パートナー承認',
      description: 'パートナーによるプランの承認',
      status: 'pending',
      author: '田中太郎',
      timestamp: '2025-01-15 15:00'
    },
    {
      id: 4,
      title: '最終確認',
      description: '両者による最終確認',
      status: 'pending',
      author: 'システム',
      timestamp: '2025-01-15 15:15'
    }
  ]

  const plan = {
    id: 1,
    title: '渋谷デートプラン',
    description: 'カフェ巡りとショッピングを楽しむ、カジュアルなデートプラン',
    date: '2025-01-15',
    duration: '4時間',
    budget: '¥15,000',
    spots: [
      {
        name: 'Blue Bottle Coffee',
        type: 'カフェ',
        time: '14:00-15:30'
      },
      {
        name: '渋谷スクランブル交差点',
        type: '観光',
        time: '15:30-16:00'
      },
      {
        name: '渋谷PARCO',
        type: 'ショッピング',
        time: '16:00-18:00'
      }
    ]
  }

  const handleApprove = () => {
    setApprovalStatus('approved')
    setWorkflowStep(4)
    alert('プランを承認しました')
  }

  const handleReject = () => {
    setApprovalStatus('rejected')
    alert('プランを却下しました。コメントを確認してください。')
  }

  const handleRequestChanges = () => {
    if (!comments.trim()) {
      alert('変更要求の理由を入力してください')
      return
    }
    alert('変更要求を送信しました')
  }

  const handleFinalApprove = () => {
    alert('プランが最終承認されました！')
    // ダッシュボードに遷移
    window.location.href = '/common/COMMON-001'
  }

  const getStepStatus = (step: any) => {
    if (step.status === 'completed') return 'completed'
    if (step.id === workflowStep) return 'active'
    if (step.id < workflowStep) return 'completed'
    return 'pending'
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
              <h1 className="page-title">承認ワークフロー</h1>
              <p className="page-subtitle">デートプランの承認プロセスを管理します</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* プラン情報 */}
          <div className="plan-info-card">
            <div className="plan-header">
              <h2 className="plan-title">{plan.title}</h2>
              <p className="plan-description">{plan.description}</p>
            </div>
            <div className="plan-meta">
              <div className="meta-item">
                <i className="fas fa-calendar"></i>
                <span>{plan.date}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>{plan.duration}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-yen-sign"></i>
                <span>{plan.budget}</span>
              </div>
            </div>
          </div>

          {/* ワークフローステップ */}
          <div className="workflow-section">
            <h2>承認プロセス</h2>
            <div className="workflow-steps">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className={`workflow-step ${getStepStatus(step)}`}>
                  <div className="step-marker">
                    <div className="step-number">
                      {step.status === 'completed' ? (
                        <i className="fas fa-check"></i>
                      ) : (
                        step.id
                      )}
                    </div>
                  </div>
                  <div className="step-content">
                    <div className="step-header">
                      <h3 className="step-title">{step.title}</h3>
                      <span className={`step-status ${step.status}`}>
                        {step.status === 'completed' ? '完了' : 
                         step.status === 'pending' ? '待機中' : '進行中'}
                      </span>
                    </div>
                    <p className="step-description">{step.description}</p>
                    <div className="step-meta">
                      <span className="step-author">
                        <i className="fas fa-user"></i>
                        {step.author}
                      </span>
                      <span className="step-time">
                        <i className="fas fa-clock"></i>
                        {step.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 現在のステップ */}
          {workflowStep === 3 && (
            <div className="approval-section">
              <h2>パートナー承認</h2>
              <div className="approval-card">
                <div className="approval-header">
                  <h3>プランの承認をお願いします</h3>
                  <p>以下のプランについて、承認または変更要求を行ってください。</p>
                </div>
                
                <div className="plan-summary">
                  <h4>プラン概要</h4>
                  <div className="summary-spots">
                    {plan.spots.map((spot, index) => (
                      <div key={index} className="summary-spot">
                        <span className="spot-time">{spot.time}</span>
                        <span className="spot-name">{spot.name}</span>
                        <span className="spot-type">{spot.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="approval-actions">
                  <button className="btn btn-primary" onClick={handleApprove}>
                    <i className="fas fa-check"></i>
                    承認
                  </button>
                  <button className="btn btn-danger" onClick={handleReject}>
                    <i className="fas fa-times"></i>
                    却下
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 変更要求フォーム */}
          {approvalStatus === 'rejected' && (
            <div className="rejection-section">
              <h2>変更要求</h2>
              <div className="rejection-form">
                <div className="form-group">
                  <label htmlFor="comments" className="form-label">変更要求の理由</label>
                  <textarea
                    id="comments"
                    className="form-input form-textarea"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="どの部分を変更したいか、理由を詳しく教えてください"
                    rows={4}
                  />
                </div>
                <div className="form-actions">
                  <button className="btn btn-primary" onClick={handleRequestChanges}>
                    <i className="fas fa-paper-plane"></i>
                    変更要求を送信
                  </button>
                  <button className="btn btn-outline" onClick={() => setApprovalStatus('pending')}>
                    キャンセル
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 最終確認 */}
          {workflowStep === 4 && (
            <div className="final-approval-section">
              <h2>最終確認</h2>
              <div className="final-approval-card">
                <div className="approval-status">
                  <div className="status-icon success">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h3>プランが承認されました</h3>
                  <p>両者による承認が完了しました。最終確認を行ってください。</p>
                </div>
                
                <div className="final-actions">
                  <button className="btn btn-primary btn-large" onClick={handleFinalApprove}>
                    <i className="fas fa-check"></i>
                    最終承認
                  </button>
                  <button className="btn btn-outline">
                    <i className="fas fa-edit"></i>
                    編集に戻る
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 承認履歴 */}
          <div className="approval-history">
            <h3>承認履歴</h3>
            <div className="history-list">
              <div className="history-item">
                <div className="history-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="history-content">
                  <div className="history-action">プランを作成しました</div>
                  <div className="history-meta">
                    <span className="history-author">あなた</span>
                    <span className="history-time">2025-01-15 13:45</span>
                  </div>
                </div>
              </div>
              
              <div className="history-item">
                <div className="history-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="history-content">
                  <div className="history-action">プランを編集しました</div>
                  <div className="history-meta">
                    <span className="history-author">田中太郎</span>
                    <span className="history-time">2025-01-15 14:30</span>
                  </div>
                </div>
              </div>
              
              {approvalStatus === 'approved' && (
                <div className="history-item">
                  <div className="history-icon success">
                    <i className="fas fa-check"></i>
                  </div>
                  <div className="history-content">
                    <div className="history-action">プランを承認しました</div>
                    <div className="history-meta">
                      <span className="history-author">田中太郎</span>
                      <span className="history-time">2025-01-15 15:00</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* アクションボタン */}
          <div className="workflow-actions">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-eye"></i>
                プレビュー
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-edit"></i>
                編集に戻る
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-share"></i>
                共有
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
