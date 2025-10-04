'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function UC004002Page() {
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [currentAnalysis, setCurrentAnalysis] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  const analysisSteps = [
    '感情データの分析中...',
    'コミュニケーションパターンの解析中...',
    '関係性の動的変化を評価中...',
    '過去の対立パターンを分析中...',
    '解決可能性を評価中...',
    '最適な介入方法を検討中...',
    '分析完了'
  ]

  const analysisResults = {
    emotionalAnalysis: {
      primaryEmotions: ['怒り', '失望', '不安'],
      intensity: 7.5,
      stability: 3.2,
      trends: [
        { emotion: '怒り', trend: 'increasing', value: 8.2 },
        { emotion: '失望', trend: 'stable', value: 7.1 },
        { emotion: '不安', trend: 'decreasing', value: 6.8 }
      ]
    },
    communicationPatterns: {
      conflictStyle: '回避型',
      communicationFrequency: '低',
      resolutionAttempts: 3,
      successRate: 0.2,
      patterns: [
        '問題を先延ばしにする傾向',
        '感情的な表現を避ける',
        '表面的な解決に留まる'
      ]
    },
    relationshipDynamics: {
      powerBalance: '不均衡',
      trustLevel: 4.2,
      intimacyLevel: 3.8,
      commitmentLevel: 6.5,
      stressFactors: [
        '仕事のストレス',
        '将来への不安',
        'コミュニケーション不足'
      ]
    },
    conflictHistory: {
      frequency: '月2-3回',
      duration: '平均3日',
      escalation: '中程度',
      resolution: '時間経過による自然解決',
      patterns: [
        '同じテーマでの繰り返し',
        '感情的な対立の増加',
        '解決策の実行不足'
      ]
    },
    interventionRecommendations: {
      priority: '高',
      approach: '段階的関係修復',
      timeline: '2-4週間',
      methods: [
        '感情認識トレーニング',
        'コミュニケーションスキル向上',
        '信頼関係の再構築',
        '対立解決プロセスの確立'
      ]
    }
  }

  useEffect(() => {
    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < analysisSteps.length) {
        setCurrentAnalysis(analysisSteps[currentStep])
        setAnalysisProgress((currentStep + 1) / analysisSteps.length * 100)
        currentStep++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'fas fa-arrow-up text-red-500'
      case 'decreasing': return 'fas fa-arrow-down text-green-500'
      case 'stable': return 'fas fa-minus text-yellow-500'
      default: return 'fas fa-minus'
    }
  }

  const getIntensityColor = (value: number) => {
    if (value >= 8) return 'text-red-500'
    if (value >= 6) return 'text-orange-500'
    if (value >= 4) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getLevelColor = (value: number) => {
    if (value >= 7) return 'text-green-500'
    if (value >= 5) return 'text-yellow-500'
    if (value >= 3) return 'text-orange-500'
    return 'text-red-500'
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
              <h1 className="page-title">状況分析</h1>
              <p className="page-subtitle">AIが関係性を詳細に分析しています</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 分析進行状況 */}
          <div className="analysis-progress">
            <div className="progress-header">
              <h2>分析進行状況</h2>
              <div className="progress-percentage">{Math.round(analysisProgress)}%</div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            
            <div className="current-analysis">
              <i className="fas fa-cog fa-spin"></i>
              <span>{currentAnalysis}</span>
            </div>
          </div>

          {/* 分析完了後の結果表示 */}
          {isComplete && (
            <div className="analysis-results">
              <div className="results-header">
                <h2>分析結果</h2>
                <p className="results-subtitle">AIによる詳細な関係性分析が完了しました</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? '詳細を閉じる' : '詳細を見る'}
                </button>
              </div>

              {/* 感情分析 */}
              <div className="analysis-section">
                <h3 className="section-title">
                  <i className="fas fa-heart"></i>
                  感情分析
                </h3>
                <div className="analysis-grid">
                  <div className="analysis-card">
                    <h4>主要感情</h4>
                    <div className="emotions-list">
                      {analysisResults.emotionalAnalysis.primaryEmotions.map((emotion, index) => (
                        <span key={index} className="emotion-tag">{emotion}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="analysis-card">
                    <h4>感情の強度</h4>
                    <div className="intensity-meter">
                      <div className="intensity-value">
                        <span className={getIntensityColor(analysisResults.emotionalAnalysis.intensity)}>
                          {analysisResults.emotionalAnalysis.intensity}
                        </span>
                        <span className="intensity-label">/10</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="analysis-card">
                    <h4>感情の安定性</h4>
                    <div className="stability-meter">
                      <div className="stability-value">
                        <span className={getLevelColor(analysisResults.emotionalAnalysis.stability)}>
                          {analysisResults.emotionalAnalysis.stability}
                        </span>
                        <span className="stability-label">/10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {showDetails && (
                  <div className="detailed-analysis">
                    <h4>感情の推移</h4>
                    <div className="emotion-trends">
                      {analysisResults.emotionalAnalysis.trends.map((trend, index) => (
                        <div key={index} className="trend-item">
                          <span className="emotion-name">{trend.emotion}</span>
                          <div className="trend-indicator">
                            <i className={getTrendIcon(trend.trend)}></i>
                            <span className="trend-value">{trend.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* コミュニケーションパターン */}
              <div className="analysis-section">
                <h3 className="section-title">
                  <i className="fas fa-comments"></i>
                  コミュニケーションパターン
                </h3>
                <div className="analysis-grid">
                  <div className="analysis-card">
                    <h4>対立スタイル</h4>
                    <div className="style-indicator">
                      <span className="style-name">{analysisResults.communicationPatterns.conflictStyle}</span>
                    </div>
                  </div>
                  
                  <div className="analysis-card">
                    <h4>コミュニケーション頻度</h4>
                    <div className="frequency-indicator">
                      <span className="frequency-name">{analysisResults.communicationPatterns.communicationFrequency}</span>
                    </div>
                  </div>
                  
                  <div className="analysis-card">
                    <h4>解決成功率</h4>
                    <div className="success-rate">
                      <span className="rate-value">
                        {Math.round(analysisResults.communicationPatterns.successRate * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {showDetails && (
                  <div className="detailed-analysis">
                    <h4>特定されたパターン</h4>
                    <ul className="patterns-list">
                      {analysisResults.communicationPatterns.patterns.map((pattern, index) => (
                        <li key={index} className="pattern-item">
                          <i className="fas fa-exclamation-circle"></i>
                          {pattern}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 関係性の動的変化 */}
              <div className="analysis-section">
                <h3 className="section-title">
                  <i className="fas fa-users"></i>
                  関係性の動的変化
                </h3>
                <div className="analysis-grid">
                  <div className="analysis-card">
                    <h4>信頼レベル</h4>
                    <div className="level-meter">
                      <span className={getLevelColor(analysisResults.relationshipDynamics.trustLevel)}>
                        {analysisResults.relationshipDynamics.trustLevel}
                      </span>
                      <span className="level-label">/10</span>
                    </div>
                  </div>
                  
                  <div className="analysis-card">
                    <h4>親密さレベル</h4>
                    <div className="level-meter">
                      <span className={getLevelColor(analysisResults.relationshipDynamics.intimacyLevel)}>
                        {analysisResults.relationshipDynamics.intimacyLevel}
                      </span>
                      <span className="level-label">/10</span>
                    </div>
                  </div>
                  
                  <div className="analysis-card">
                    <h4>コミットメントレベル</h4>
                    <div className="level-meter">
                      <span className={getLevelColor(analysisResults.relationshipDynamics.commitmentLevel)}>
                        {analysisResults.relationshipDynamics.commitmentLevel}
                      </span>
                      <span className="level-label">/10</span>
                    </div>
                  </div>
                </div>

                {showDetails && (
                  <div className="detailed-analysis">
                    <h4>ストレス要因</h4>
                    <div className="stress-factors">
                      {analysisResults.relationshipDynamics.stressFactors.map((factor, index) => (
                        <span key={index} className="stress-tag">{factor}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 介入推奨事項 */}
              <div className="analysis-section">
                <h3 className="section-title">
                  <i className="fas fa-lightbulb"></i>
                  介入推奨事項
                </h3>
                <div className="recommendations">
                  <div className="recommendation-card priority-high">
                    <div className="recommendation-header">
                      <h4>推奨アプローチ</h4>
                      <span className="priority-badge">高優先度</span>
                    </div>
                    <p className="recommendation-approach">
                      {analysisResults.interventionRecommendations.approach}
                    </p>
                    <div className="recommendation-timeline">
                      <i className="fas fa-clock"></i>
                      予想期間: {analysisResults.interventionRecommendations.timeline}
                    </div>
                  </div>

                  <div className="recommendation-methods">
                    <h4>推奨方法</h4>
                    <ul className="methods-list">
                      {analysisResults.interventionRecommendations.methods.map((method, index) => (
                        <li key={index} className="method-item">
                          <i className="fas fa-check-circle"></i>
                          {method}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* アクションボタン */}
          {isComplete && (
            <div className="analysis-actions">
              <div className="action-buttons">
                <button className="btn btn-outline">
                  <i className="fas fa-download"></i>
                  分析レポートをダウンロード
                </button>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.location.href = '/uc004/UC004-003'}
                >
                  <i className="fas fa-arrow-right"></i>
                  仲裁提案を見る
                </button>
              </div>
            </div>
          )}

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
