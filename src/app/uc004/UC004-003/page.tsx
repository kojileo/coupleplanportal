'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC004003Page() {
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<string | null>(null)
  const [userFeedback, setUserFeedback] = useState<{[key: string]: 'like' | 'dislike' | null}>({})

  const mediationProposals = [
    {
      id: 'proposal-1',
      title: '段階的関係修復プラン',
      type: 'comprehensive',
      priority: 'high',
      duration: '2-4週間',
      description: '感情の安定化から始まり、コミュニケーション改善、信頼関係の再構築まで段階的に進める包括的なプランです。',
      effectiveness: 85,
      difficulty: 'medium',
      features: [
        '感情認識トレーニング',
        'コミュニケーションスキル向上',
        '信頼関係の再構築',
        '対立解決プロセスの確立'
      ],
      steps: [
        {
          phase: '第1週: 感情の安定化',
          tasks: [
            '感情日記の記録',
            '深呼吸・リラクゼーション練習',
            '個人的なストレス管理'
          ]
        },
        {
          phase: '第2週: コミュニケーション改善',
          tasks: [
            'アクティブリスニングの練習',
            '感情の表現方法の学習',
            '建設的な対話の実践'
          ]
        },
        {
          phase: '第3週: 信頼関係の再構築',
          tasks: [
            '小さな約束の実行',
            '感謝の表現',
            '共通の目標設定'
          ]
        },
        {
          phase: '第4週: 対立解決プロセスの確立',
          tasks: [
            '対立解決のルール設定',
            '定期的な話し合いの時間確保',
            '将来の目標設定'
          ]
        }
      ],
      resources: [
        '感情認識ワークシート',
        'コミュニケーション練習ガイド',
        '信頼構築アクティビティ集',
        '対立解決チェックリスト'
      ]
    },
    {
      id: 'proposal-2',
      title: '即効性のある対話促進プラン',
      type: 'immediate',
      priority: 'high',
      duration: '1-2週間',
      description: '緊急性の高い問題に対して、即座に効果を発揮する対話促進に特化したプランです。',
      effectiveness: 75,
      difficulty: 'easy',
      features: [
        '構造化された対話セッション',
        '中立的なファシリテーション',
        '感情の安全な表現',
        '即座の合意形成'
      ],
      steps: [
        {
          phase: '準備段階（1-2日）',
          tasks: [
            '対話のルール設定',
            '中立的な場所の確保',
            '時間の確保'
          ]
        },
        {
          phase: '対話セッション（1週間）',
          tasks: [
            '感情の表現',
            '問題の明確化',
            '解決策の検討',
            '合意の形成'
          ]
        }
      ],
      resources: [
        '対話ファシリテーションガイド',
        '感情表現ワークシート',
        '合意形成テンプレート'
      ]
    },
    {
      id: 'proposal-3',
      title: '長期的関係改善プラン',
      type: 'long-term',
      priority: 'medium',
      duration: '2-3ヶ月',
      description: '根本的な関係性の改善を目指す、長期的で持続可能なプランです。',
      effectiveness: 90,
      difficulty: 'hard',
      features: [
        '深層心理分析',
        '関係性パターンの変更',
        '持続可能な改善',
        '予防的アプローチ'
      ],
      steps: [
        {
          phase: '第1ヶ月: 分析・理解',
          tasks: [
            '関係性の深層分析',
            '個人の成長課題の特定',
            '関係性の目標設定'
          ]
        },
        {
          phase: '第2ヶ月: 実践・改善',
          tasks: [
            '新しい行動パターンの実践',
            'コミュニケーションの改善',
            '関係性の再構築'
          ]
        },
        {
          phase: '第3ヶ月: 定着・予防',
          tasks: [
            '新しいパターンの定着',
            '予防策の確立',
            '継続的な改善'
          ]
        }
      ],
      resources: [
        '関係性分析ツール',
        '個人成長ワークブック',
        '関係性改善ガイド',
        '予防策チェックリスト'
      ]
    }
  ]

  const handleProposalSelect = (proposalId: string) => {
    setSelectedProposal(proposalId)
  }

  const handleFeedback = (proposalId: string, feedback: 'like' | 'dislike') => {
    setUserFeedback(prev => ({
      ...prev,
      [proposalId]: feedback
    }))
  }

  const handleProposalAccept = (proposalId: string) => {
    console.log('Proposal accepted:', proposalId)
    // 次のステップに進む
    window.location.href = '/uc004/UC004-004'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500'
      case 'medium': return 'text-yellow-500'
      case 'low': return 'text-green-500'
      default: return 'text-gray-500'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'hard': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comprehensive': return 'fas fa-cogs'
      case 'immediate': return 'fas fa-bolt'
      case 'long-term': return 'fas fa-calendar-alt'
      default: return 'fas fa-lightbulb'
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
              <h1 className="page-title">仲裁提案</h1>
              <p className="page-subtitle">AIが分析結果に基づいて最適な解決策を提案します</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 提案一覧 */}
          <div className="proposals-section">
            <div className="proposals-header">
              <h2>推奨解決策</h2>
              <p>あなたの状況に最適な解決策を3つ提案いたします</p>
            </div>

            <div className="proposals-grid">
              {mediationProposals.map((proposal, index) => (
                <div key={proposal.id} className={`proposal-card ${selectedProposal === proposal.id ? 'selected' : ''}`}>
                  <div className="proposal-header">
                    <div className="proposal-icon">
                      <i className={getTypeIcon(proposal.type)}></i>
                    </div>
                    <div className="proposal-title-section">
                      <h3 className="proposal-title">{proposal.title}</h3>
                      <div className="proposal-meta">
                        <span className={`priority ${getPriorityColor(proposal.priority)}`}>
                          <i className="fas fa-exclamation-circle"></i>
                          {proposal.priority === 'high' ? '高優先度' : 
                           proposal.priority === 'medium' ? '中優先度' : '低優先度'}
                        </span>
                        <span className="duration">
                          <i className="fas fa-clock"></i>
                          {proposal.duration}
                        </span>
                      </div>
                    </div>
                    <div className="proposal-actions">
                      <button 
                        className={`feedback-btn ${userFeedback[proposal.id] === 'like' ? 'liked' : ''}`}
                        onClick={() => handleFeedback(proposal.id, 'like')}
                      >
                        <i className="fas fa-thumbs-up"></i>
                      </button>
                      <button 
                        className={`feedback-btn ${userFeedback[proposal.id] === 'dislike' ? 'disliked' : ''}`}
                        onClick={() => handleFeedback(proposal.id, 'dislike')}
                      >
                        <i className="fas fa-thumbs-down"></i>
                      </button>
                    </div>
                  </div>

                  <div className="proposal-content">
                    <p className="proposal-description">{proposal.description}</p>
                    
                    <div className="proposal-metrics">
                      <div className="metric">
                        <span className="metric-label">効果性</span>
                        <div className="metric-bar">
                          <div 
                            className="metric-fill"
                            style={{ width: `${proposal.effectiveness}%` }}
                          ></div>
                        </div>
                        <span className="metric-value">{proposal.effectiveness}%</span>
                      </div>
                      
                      <div className="metric">
                        <span className="metric-label">難易度</span>
                        <span className={`difficulty ${getDifficultyColor(proposal.difficulty)}`}>
                          {proposal.difficulty === 'easy' ? '簡単' :
                           proposal.difficulty === 'medium' ? '中程度' : '難しい'}
                        </span>
                      </div>
                    </div>

                    <div className="proposal-features">
                      <h4>主な機能</h4>
                      <ul className="features-list">
                        {proposal.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="feature-item">
                            <i className="fas fa-check"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="proposal-actions-bottom">
                      <button 
                        className="btn btn-outline"
                        onClick={() => setShowDetails(showDetails === proposal.id ? null : proposal.id)}
                      >
                        <i className="fas fa-info-circle"></i>
                        {showDetails === proposal.id ? '詳細を閉じる' : '詳細を見る'}
                      </button>
                      
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleProposalSelect(proposal.id)}
                      >
                        <i className="fas fa-check"></i>
                        選択
                      </button>
                    </div>
                  </div>

                  {/* 詳細表示 */}
                  {showDetails === proposal.id && (
                    <div className="proposal-details">
                      <div className="details-section">
                        <h4>実施ステップ</h4>
                        <div className="steps-timeline">
                          {proposal.steps.map((step, stepIndex) => (
                            <div key={stepIndex} className="step-item">
                              <div className="step-phase">{step.phase}</div>
                              <ul className="step-tasks">
                                {step.tasks.map((task, taskIndex) => (
                                  <li key={taskIndex} className="task-item">
                                    <i className="fas fa-circle"></i>
                                    {task}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="details-section">
                        <h4>提供リソース</h4>
                        <ul className="resources-list">
                          {proposal.resources.map((resource, resourceIndex) => (
                            <li key={resourceIndex} className="resource-item">
                              <i className="fas fa-file-alt"></i>
                              {resource}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 選択された提案の確認 */}
          {selectedProposal && (
            <div className="selected-proposal">
              <div className="confirmation-card">
                <h3>選択された提案</h3>
                <p>
                  {mediationProposals.find(p => p.id === selectedProposal)?.title} を選択しました。
                  この提案を実行しますか？
                </p>
                <div className="confirmation-actions">
                  <button 
                    className="btn btn-outline"
                    onClick={() => setSelectedProposal(null)}
                  >
                    キャンセル
                  </button>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleProposalAccept(selectedProposal)}
                  >
                    <i className="fas fa-check"></i>
                    実行する
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* カスタム提案 */}
          <div className="custom-proposal">
            <div className="custom-proposal-card">
              <h3>カスタム提案</h3>
              <p>提案された解決策が合わない場合は、カスタム提案を依頼できます。</p>
              <button className="btn btn-outline">
                <i className="fas fa-edit"></i>
                カスタム提案を依頼
              </button>
            </div>
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
