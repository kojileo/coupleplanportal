'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC004005Page() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)

  const reportData = {
    overview: {
      planTitle: '段階的関係修復プラン',
      duration: '4週間',
      startDate: '2025-01-01',
      endDate: '2025-01-28',
      completionRate: 85,
      overallSatisfaction: 4.2,
      relationshipImprovement: 3.8
    },
    progress: {
      phases: [
        {
          phase: '第1週: 感情の安定化',
          completion: 100,
          satisfaction: 4.5,
          keyAchievements: [
            '感情日記の継続記録',
            'リラクゼーション技術の習得',
            'ストレス管理の改善'
          ]
        },
        {
          phase: '第2週: コミュニケーション改善',
          completion: 90,
          satisfaction: 4.0,
          keyAchievements: [
            'アクティブリスニングの実践',
            '感情表現の向上',
            '建設的な対話の開始'
          ]
        },
        {
          phase: '第3週: 信頼関係の再構築',
          completion: 80,
          satisfaction: 3.8,
          keyAchievements: [
            '小さな約束の継続実行',
            '感謝の表現の習慣化',
            '共通目標の設定'
          ]
        },
        {
          phase: '第4週: 対立解決プロセスの確立',
          completion: 70,
          satisfaction: 3.5,
          keyAchievements: [
            '対立解決ルールの設定',
            '定期的な話し合いの開始',
            '将来目標の設定'
          ]
        }
      ]
    },
    emotionalAnalysis: {
      before: {
        anger: 8.2,
        disappointment: 7.1,
        anxiety: 6.8,
        trust: 4.2,
        intimacy: 3.8
      },
      after: {
        anger: 5.1,
        disappointment: 4.3,
        anxiety: 4.2,
        trust: 6.8,
        intimacy: 6.2
      },
      improvements: [
        '怒りの感情が大幅に減少',
        '信頼関係が向上',
        '親密さのレベルが改善',
        '全体的な感情の安定化'
      ]
    },
    communicationAnalysis: {
      before: {
        frequency: '低',
        quality: '低',
        conflictResolution: '回避型',
        activeListening: 2.5
      },
      after: {
        frequency: '中',
        quality: '中',
        conflictResolution: '協調型',
        activeListening: 4.2
      },
      improvements: [
        'コミュニケーション頻度の増加',
        '対話の質の向上',
        '対立解決スタイルの改善',
        'アクティブリスニングスキルの向上'
      ]
    },
    relationshipMetrics: {
      trustLevel: {
        before: 4.2,
        after: 6.8,
        change: '+2.6'
      },
      intimacyLevel: {
        before: 3.8,
        after: 6.2,
        change: '+2.4'
      },
      commitmentLevel: {
        before: 6.5,
        after: 7.8,
        change: '+1.3'
      },
      overallSatisfaction: {
        before: 3.2,
        after: 4.2,
        change: '+1.0'
      }
    },
    challenges: [
      {
        challenge: '時間の確保が困難',
        impact: '中',
        solution: '短時間でも効果的な活動に変更',
        status: '解決済み'
      },
      {
        challenge: '感情の表現が難しい',
        impact: '高',
        solution: '段階的な表現方法の練習',
        status: '改善中'
      },
      {
        challenge: '過去の傷の影響',
        impact: '高',
        solution: '専門的なカウンセリングの検討',
        status: '継続中'
      }
    ],
    recommendations: [
      {
        category: '継続的な改善',
        items: [
          '定期的な感情チェックインの継続',
          'コミュニケーションスキルのさらなる向上',
          '信頼関係の維持と強化'
        ]
      },
      {
        category: '新しい取り組み',
        items: [
          'カップルカウンセリングの検討',
          '関係性の深い対話の実践',
          '将来の目標設定の見直し'
        ]
      },
      {
        category: '予防策',
        items: [
          '定期的な関係性チェック',
          '対立の早期発見システム',
          'ストレス管理の継続'
        ]
      }
    ],
    userFeedback: {
      mostHelpful: [
        '感情日記の記録',
        'アクティブリスニングの練習',
        '感謝の表現の習慣化'
      ],
      mostChallenging: [
        '感情の表現',
        '過去の傷の克服',
        '時間の確保'
      ],
      overallRating: 4.2,
      wouldRecommend: true,
      additionalComments: '全体的に良い改善が見られました。特に感情の安定化とコミュニケーションの改善が顕著でした。'
    }
  }

  const getChangeColor = (change: string) => {
    const value = parseFloat(change.replace('+', ''))
    if (value > 0) return 'text-green-500'
    if (value < 0) return 'text-red-500'
    return 'text-gray-500'
  }

  const getChangeIcon = (change: string) => {
    const value = parseFloat(change.replace('+', ''))
    if (value > 0) return 'fas fa-arrow-up'
    if (value < 0) return 'fas fa-arrow-down'
    return 'fas fa-minus'
  }

  const getCompletionColor = (completion: number) => {
    if (completion >= 90) return 'text-green-500'
    if (completion >= 70) return 'text-yellow-500'
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
              <h1 className="page-title">振り返りレポート</h1>
              <p className="page-subtitle">関係改善プランの実施結果と分析</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* レポート概要 */}
          <div className="report-overview">
            <div className="overview-card">
              <h2>{reportData.overview.planTitle}</h2>
              <div className="overview-meta">
                <div className="meta-item">
                  <i className="fas fa-calendar"></i>
                  <span>期間: {reportData.overview.startDate} - {reportData.overview.endDate}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-chart-line"></i>
                  <span>完了率: {reportData.overview.completionRate}%</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-star"></i>
                  <span>満足度: {reportData.overview.overallSatisfaction}/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="tabs">
            <ul className="tab-list">
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="fas fa-chart-pie"></i>
                  概要
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'progress' ? 'active' : ''}`}
                  onClick={() => setActiveTab('progress')}
                >
                  <i className="fas fa-tasks"></i>
                  進捗
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'emotions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('emotions')}
                >
                  <i className="fas fa-heart"></i>
                  感情分析
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'communication' ? 'active' : ''}`}
                  onClick={() => setActiveTab('communication')}
                >
                  <i className="fas fa-comments"></i>
                  コミュニケーション
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'recommendations' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recommendations')}
                >
                  <i className="fas fa-lightbulb"></i>
                  推奨事項
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* 概要タブ */}
            {activeTab === 'overview' && (
              <div className="tab-content active">
                <div className="overview-section">
                  <h2>レポート概要</h2>
                  
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <h3>完了率</h3>
                      <div className="metric-value">{reportData.overview.completionRate}%</div>
                      <div className="metric-bar">
                        <div 
                          className="metric-fill"
                          style={{ width: `${reportData.overview.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>満足度</h3>
                      <div className="metric-value">{reportData.overview.overallSatisfaction}/5</div>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < Math.floor(reportData.overview.overallSatisfaction) ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>関係改善度</h3>
                      <div className="metric-value">{reportData.overview.relationshipImprovement}/5</div>
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i 
                            key={i} 
                            className={`fas fa-star ${i < Math.floor(reportData.overview.relationshipImprovement) ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="key-insights">
                    <h3>主要な洞察</h3>
                    <ul className="insights-list">
                      <li className="insight-item">
                        <i className="fas fa-check-circle text-green-500"></i>
                        感情の安定化が最も効果的でした
                      </li>
                      <li className="insight-item">
                        <i className="fas fa-check-circle text-green-500"></i>
                        コミュニケーションスキルの向上が関係改善に大きく貢献
                      </li>
                      <li className="insight-item">
                        <i className="fas fa-exclamation-triangle text-yellow-500"></i>
                        時間の確保が継続的な課題
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 進捗タブ */}
            {activeTab === 'progress' && (
              <div className="tab-content active">
                <div className="progress-section">
                  <h2>フェーズ別進捗</h2>
                  
                  <div className="phases-timeline">
                    {reportData.progress.phases.map((phase, index) => (
                      <div key={index} className="phase-card">
                        <div className="phase-header">
                          <div className="phase-number">{index + 1}</div>
                          <div className="phase-info">
                            <h3 className="phase-title">{phase.phase}</h3>
                            <div className="phase-metrics">
                              <span className={`completion ${getCompletionColor(phase.completion)}`}>
                                完了率: {phase.completion}%
                              </span>
                              <span className="satisfaction">
                                満足度: {phase.satisfaction}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="phase-progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${phase.completion}%` }}
                          ></div>
                        </div>
                        
                        <div className="phase-achievements">
                          <h4>主要な成果</h4>
                          <ul className="achievements-list">
                            {phase.keyAchievements.map((achievement, achievementIndex) => (
                              <li key={achievementIndex} className="achievement-item">
                                <i className="fas fa-check"></i>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 感情分析タブ */}
            {activeTab === 'emotions' && (
              <div className="tab-content active">
                <div className="emotions-section">
                  <h2>感情分析</h2>
                  
                  <div className="emotions-comparison">
                    <h3>感情の変化</h3>
                    <div className="emotions-grid">
                      {Object.entries(reportData.emotionalAnalysis.before).map(([emotion, beforeValue]) => {
                        const afterValue = reportData.emotionalAnalysis.after[emotion as keyof typeof reportData.emotionalAnalysis.after]
                        const change = afterValue - beforeValue
                        const changeStr = change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1)
                        
                        return (
                          <div key={emotion} className="emotion-comparison">
                            <h4>{emotion === 'anger' ? '怒り' :
                                 emotion === 'disappointment' ? '失望' :
                                 emotion === 'anxiety' ? '不安' :
                                 emotion === 'trust' ? '信頼' :
                                 emotion === 'intimacy' ? '親密さ' : emotion}</h4>
                            <div className="emotion-values">
                              <div className="value-before">
                                <span className="label">実施前</span>
                                <span className="value">{beforeValue}</span>
                              </div>
                              <div className="value-after">
                                <span className="label">実施後</span>
                                <span className="value">{afterValue}</span>
                              </div>
                              <div className="value-change">
                                <span className={`change ${getChangeColor(changeStr)}`}>
                                  <i className={getChangeIcon(changeStr)}></i>
                                  {changeStr}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="emotions-improvements">
                    <h3>感情の改善点</h3>
                    <ul className="improvements-list">
                      {reportData.emotionalAnalysis.improvements.map((improvement, index) => (
                        <li key={index} className="improvement-item">
                          <i className="fas fa-arrow-up text-green-500"></i>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* コミュニケーションタブ */}
            {activeTab === 'communication' && (
              <div className="tab-content active">
                <div className="communication-section">
                  <h2>コミュニケーション分析</h2>
                  
                  <div className="communication-comparison">
                    <h3>コミュニケーションの変化</h3>
                    <div className="comparison-grid">
                      <div className="comparison-item">
                        <h4>頻度</h4>
                        <div className="before-after">
                          <span className="before">{reportData.communicationAnalysis.before.frequency}</span>
                          <i className="fas fa-arrow-right"></i>
                          <span className="after">{reportData.communicationAnalysis.after.frequency}</span>
                        </div>
                      </div>
                      
                      <div className="comparison-item">
                        <h4>質</h4>
                        <div className="before-after">
                          <span className="before">{reportData.communicationAnalysis.before.quality}</span>
                          <i className="fas fa-arrow-right"></i>
                          <span className="after">{reportData.communicationAnalysis.after.quality}</span>
                        </div>
                      </div>
                      
                      <div className="comparison-item">
                        <h4>対立解決スタイル</h4>
                        <div className="before-after">
                          <span className="before">{reportData.communicationAnalysis.before.conflictResolution}</span>
                          <i className="fas fa-arrow-right"></i>
                          <span className="after">{reportData.communicationAnalysis.after.conflictResolution}</span>
                        </div>
                      </div>
                      
                      <div className="comparison-item">
                        <h4>アクティブリスニング</h4>
                        <div className="before-after">
                          <span className="before">{reportData.communicationAnalysis.before.activeListening}/5</span>
                          <i className="fas fa-arrow-right"></i>
                          <span className="after">{reportData.communicationAnalysis.after.activeListening}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="communication-improvements">
                    <h3>コミュニケーションの改善点</h3>
                    <ul className="improvements-list">
                      {reportData.communicationAnalysis.improvements.map((improvement, index) => (
                        <li key={index} className="improvement-item">
                          <i className="fas fa-check text-green-500"></i>
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 推奨事項タブ */}
            {activeTab === 'recommendations' && (
              <div className="tab-content active">
                <div className="recommendations-section">
                  <h2>今後の推奨事項</h2>
                  
                  <div className="recommendations-grid">
                    {reportData.recommendations.map((category, index) => (
                      <div key={index} className="recommendation-category">
                        <h3>{category.category}</h3>
                        <ul className="recommendations-list">
                          {category.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="recommendation-item">
                              <i className="fas fa-lightbulb"></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="challenges-section">
                    <h3>課題と解決策</h3>
                    <div className="challenges-list">
                      {reportData.challenges.map((challenge, index) => (
                        <div key={index} className="challenge-item">
                          <div className="challenge-header">
                            <h4>{challenge.challenge}</h4>
                            <span className={`status ${challenge.status === '解決済み' ? 'resolved' : 
                                                      challenge.status === '改善中' ? 'improving' : 'ongoing'}`}>
                              {challenge.status}
                            </span>
                          </div>
                          <div className="challenge-details">
                            <p><strong>影響度:</strong> {challenge.impact}</p>
                            <p><strong>解決策:</strong> {challenge.solution}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="user-feedback">
                    <h3>ユーザーフィードバック</h3>
                    <div className="feedback-summary">
                      <div className="feedback-rating">
                        <span className="rating-label">総合評価:</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <i 
                              key={i} 
                              className={`fas fa-star ${i < Math.floor(reportData.userFeedback.overallRating) ? 'filled' : ''}`}
                            ></i>
                          ))}
                        </div>
                        <span className="rating-value">{reportData.userFeedback.overallRating}/5</span>
                      </div>
                      
                      <div className="feedback-sections">
                        <div className="feedback-section">
                          <h4>最も役立った要素</h4>
                          <ul className="feedback-list">
                            {reportData.userFeedback.mostHelpful.map((item, index) => (
                              <li key={index} className="feedback-item">
                                <i className="fas fa-thumbs-up text-green-500"></i>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="feedback-section">
                          <h4>最も困難だった要素</h4>
                          <ul className="feedback-list">
                            {reportData.userFeedback.mostChallenging.map((item, index) => (
                              <li key={index} className="feedback-item">
                                <i className="fas fa-exclamation-triangle text-yellow-500"></i>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="feedback-comments">
                        <h4>追加コメント</h4>
                        <p>{reportData.userFeedback.additionalComments}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* アクションボタン */}
          <div className="report-actions">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-download"></i>
                レポートをダウンロード
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-share"></i>
                パートナーと共有
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                新しいプランを作成
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
