'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC004004Page() {
  const [currentPhase, setCurrentPhase] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<{[key: string]: boolean}>({})
  const [showTaskDetails, setShowTaskDetails] = useState<string | null>(null)

  const improvementPlan = {
    title: '段階的関係修復プラン',
    duration: '4週間',
    description: '感情の安定化から始まり、コミュニケーション改善、信頼関係の再構築まで段階的に進める包括的なプランです。',
    phases: [
      {
        id: 'phase-1',
        title: '第1週: 感情の安定化',
        description: '個人の感情を理解し、安定させることを目指します。',
        duration: '1週間',
        tasks: [
          {
            id: 'task-1-1',
            title: '感情日記の記録',
            description: '毎日、感情の変化を記録し、パターンを理解します。',
            duration: '毎日10分',
            difficulty: 'easy',
            resources: ['感情日記テンプレート', '感情チャート']
          },
          {
            id: 'task-1-2',
            title: '深呼吸・リラクゼーション練習',
            description: 'ストレスを軽減し、感情をコントロールする技術を身につけます。',
            duration: '毎日15分',
            difficulty: 'easy',
            resources: ['呼吸法ガイド', 'リラクゼーション音源']
          },
          {
            id: 'task-1-3',
            title: '個人的なストレス管理',
            description: 'ストレスの原因を特定し、対処法を身につけます。',
            duration: '週2回、各30分',
            difficulty: 'medium',
            resources: ['ストレス管理ワークシート', '対処法リスト']
          }
        ]
      },
      {
        id: 'phase-2',
        title: '第2週: コミュニケーション改善',
        description: '効果的なコミュニケーションスキルを身につけます。',
        duration: '1週間',
        tasks: [
          {
            id: 'task-2-1',
            title: 'アクティブリスニングの練習',
            description: '相手の話を真剣に聞き、理解する技術を練習します。',
            duration: '毎日20分',
            difficulty: 'medium',
            resources: ['アクティブリスニングガイド', '練習用シナリオ']
          },
          {
            id: 'task-2-2',
            title: '感情の表現方法の学習',
            description: '感情を適切に表現する方法を学びます。',
            duration: '週3回、各30分',
            difficulty: 'medium',
            resources: ['感情表現ワークシート', '表現方法ガイド']
          },
          {
            id: 'task-2-3',
            title: '建設的な対話の実践',
            description: '対立を避け、建設的な対話を行う技術を実践します。',
            duration: '週2回、各45分',
            difficulty: 'hard',
            resources: ['対話ガイド', '実践用シナリオ']
          }
        ]
      },
      {
        id: 'phase-3',
        title: '第3週: 信頼関係の再構築',
        description: '互いの信頼を回復し、関係を強化します。',
        duration: '1週間',
        tasks: [
          {
            id: 'task-3-1',
            title: '小さな約束の実行',
            description: '小さな約束を守ることで、信頼を段階的に回復します。',
            duration: '毎日',
            difficulty: 'easy',
            resources: ['約束管理シート', '進捗トラッカー']
          },
          {
            id: 'task-3-2',
            title: '感謝の表現',
            description: '相手への感謝を積極的に表現します。',
            duration: '毎日5分',
            difficulty: 'easy',
            resources: ['感謝表現ガイド', '感謝カードテンプレート']
          },
          {
            id: 'task-3-3',
            title: '共通の目標設定',
            description: '二人で共通の目標を設定し、協力して達成します。',
            duration: '週1回、1時間',
            difficulty: 'medium',
            resources: ['目標設定ワークシート', '進捗管理ツール']
          }
        ]
      },
      {
        id: 'phase-4',
        title: '第4週: 対立解決プロセスの確立',
        description: '将来の対立を予防し、効果的に解決するプロセスを確立します。',
        duration: '1週間',
        tasks: [
          {
            id: 'task-4-1',
            title: '対立解決のルール設定',
            description: '対立が発生した際の解決ルールを設定します。',
            duration: '週1回、1時間',
            difficulty: 'medium',
            resources: ['ルール設定テンプレート', '合意書テンプレート']
          },
          {
            id: 'task-4-2',
            title: '定期的な話し合いの時間確保',
            description: '定期的に話し合う時間を確保し、問題を早期発見します。',
            duration: '週2回、各30分',
            difficulty: 'easy',
            resources: ['話し合いガイド', 'スケジュール管理ツール']
          },
          {
            id: 'task-4-3',
            title: '将来の目標設定',
            description: '長期的な関係の目標を設定し、継続的な改善を目指します。',
            duration: '週1回、1時間',
            difficulty: 'medium',
            resources: ['長期目標設定ワークシート', '進捗管理ツール']
          }
        ]
      }
    ]
  }

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }))
  }

  const handlePhaseComplete = (phaseId: string) => {
    const phase = improvementPlan.phases.find(p => p.id === phaseId)
    if (phase) {
      const allTasksCompleted = phase.tasks.every(task => completedTasks[task.id])
      if (allTasksCompleted) {
        setCurrentPhase(prev => Math.min(prev + 1, improvementPlan.phases.length - 1))
      }
    }
  }

  const getPhaseProgress = (phaseId: string) => {
    const phase = improvementPlan.phases.find(p => p.id === phaseId)
    if (!phase) return 0
    
    const completedCount = phase.tasks.filter(task => completedTasks[task.id]).length
    return (completedCount / phase.tasks.length) * 100
  }

  const getOverallProgress = () => {
    const totalTasks = improvementPlan.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)
    const completedCount = Object.values(completedTasks).filter(Boolean).length
    return (completedCount / totalTasks) * 100
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500'
      case 'medium': return 'text-yellow-500'
      case 'hard': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'fas fa-circle'
      case 'medium': return 'fas fa-circle'
      case 'hard': return 'fas fa-circle'
      default: return 'fas fa-circle'
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
              <h1 className="page-title">関係改善プラン</h1>
              <p className="page-subtitle">段階的に関係を改善していきましょう</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* プラン概要 */}
          <div className="plan-overview">
            <div className="overview-card">
              <h2>{improvementPlan.title}</h2>
              <p className="plan-description">{improvementPlan.description}</p>
              
              <div className="plan-meta">
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>期間: {improvementPlan.duration}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-chart-line"></i>
                  <span>進捗: {Math.round(getOverallProgress())}%</span>
                </div>
              </div>

              <div className="overall-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${getOverallProgress()}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* フェーズ一覧 */}
          <div className="phases-section">
            <h2>実施フェーズ</h2>
            
            <div className="phases-timeline">
              {improvementPlan.phases.map((phase, index) => (
                <div key={phase.id} className={`phase-card ${index <= currentPhase ? 'active' : ''}`}>
                  <div className="phase-header">
                    <div className="phase-number">{index + 1}</div>
                    <div className="phase-info">
                      <h3 className="phase-title">{phase.title}</h3>
                      <p className="phase-description">{phase.description}</p>
                      <div className="phase-meta">
                        <span className="phase-duration">
                          <i className="fas fa-clock"></i>
                          {phase.duration}
                        </span>
                        <span className="phase-progress">
                          <i className="fas fa-chart-line"></i>
                          {Math.round(getPhaseProgress(phase.id))}%
                        </span>
                      </div>
                    </div>
                    <div className="phase-actions">
                      {index <= currentPhase && (
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => setCurrentPhase(index)}
                        >
                          {index === currentPhase ? '現在のフェーズ' : 'フェーズを選択'}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="phase-progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${getPhaseProgress(phase.id)}%` }}
                    ></div>
                  </div>

                  {/* タスク一覧 */}
                  {index <= currentPhase && (
                    <div className="phase-tasks">
                      <h4>タスク一覧</h4>
                      <div className="tasks-list">
                        {phase.tasks.map(task => (
                          <div key={task.id} className={`task-item ${completedTasks[task.id] ? 'completed' : ''}`}>
                            <div className="task-header">
                              <div className="task-checkbox">
                                <input
                                  type="checkbox"
                                  checked={completedTasks[task.id] || false}
                                  onChange={() => handleTaskComplete(task.id)}
                                />
                              </div>
                              <div className="task-info">
                                <h5 className="task-title">{task.title}</h5>
                                <p className="task-description">{task.description}</p>
                                <div className="task-meta">
                                  <span className="task-duration">
                                    <i className="fas fa-clock"></i>
                                    {task.duration}
                                  </span>
                                  <span className={`task-difficulty ${getDifficultyColor(task.difficulty)}`}>
                                    <i className={getDifficultyIcon(task.difficulty)}></i>
                                    {task.difficulty === 'easy' ? '簡単' :
                                     task.difficulty === 'medium' ? '中程度' : '難しい'}
                                  </span>
                                </div>
                              </div>
                              <div className="task-actions">
                                <button 
                                  className="btn btn-outline btn-sm"
                                  onClick={() => setShowTaskDetails(showTaskDetails === task.id ? null : task.id)}
                                >
                                  <i className="fas fa-info-circle"></i>
                                  詳細
                                </button>
                              </div>
                            </div>

                            {/* タスク詳細 */}
                            {showTaskDetails === task.id && (
                              <div className="task-details">
                                <h6>提供リソース</h6>
                                <ul className="resources-list">
                                  {task.resources.map((resource, resourceIndex) => (
                                    <li key={resourceIndex} className="resource-item">
                                      <i className="fas fa-file-alt"></i>
                                      {resource}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* フェーズ完了ボタン */}
                      {getPhaseProgress(phase.id) === 100 && (
                        <div className="phase-completion">
                          <button 
                            className="btn btn-primary"
                            onClick={() => handlePhaseComplete(phase.id)}
                          >
                            <i className="fas fa-check"></i>
                            フェーズ完了
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 進捗サマリー */}
          <div className="progress-summary">
            <h3>進捗サマリー</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <div className="stat-value">{Math.round(getOverallProgress())}%</div>
                <div className="stat-label">全体進捗</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {Object.values(completedTasks).filter(Boolean).length}
                </div>
                <div className="stat-label">完了タスク</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">
                  {improvementPlan.phases.reduce((sum, phase) => sum + phase.tasks.length, 0)}
                </div>
                <div className="stat-label">総タスク数</div>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="plan-actions">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-download"></i>
                プランをダウンロード
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-share"></i>
                パートナーと共有
              </button>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.href = '/uc004/UC004-005'}
              >
                <i className="fas fa-arrow-right"></i>
                振り返りレポートを見る
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
