'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC002003Page() {
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null)
  const [filter, setFilter] = useState('all')

  const planHistory = [
    {
      id: 1,
      version: 'v1.3',
      timestamp: '2025-01-15 14:30',
      author: '田中太郎',
      changes: [
        { type: 'modified', field: '時間', oldValue: '14:00-15:30', newValue: '13:30-15:00', spot: 'Blue Bottle Coffee' },
        { type: 'added', field: 'コメント', newValue: '予約した方が良いかもしれません', spot: 'Blue Bottle Coffee' }
      ],
      description: 'Blue Bottle Coffeeの時間を変更し、予約に関するコメントを追加'
    },
    {
      id: 2,
      version: 'v1.2',
      timestamp: '2025-01-15 14:15',
      author: 'あなた',
      changes: [
        { type: 'modified', field: '説明', oldValue: '世界で最も忙しい交差点', newValue: '世界で最も忙しい交差点の一つを体験', spot: '渋谷スクランブル交差点' }
      ],
      description: '渋谷スクランブル交差点の説明を詳細化'
    },
    {
      id: 3,
      version: 'v1.1',
      timestamp: '2025-01-15 14:00',
      author: '田中太郎',
      changes: [
        { type: 'added', field: 'スポット', newValue: '渋谷スカイ', spot: '新規追加' },
        { type: 'modified', field: '種類', oldValue: 'ショッピング', newValue: 'エンターテイメント', spot: '渋谷PARCO' }
      ],
      description: '渋谷スカイを追加し、PARCOの種類を変更'
    },
    {
      id: 4,
      version: 'v1.0',
      timestamp: '2025-01-15 13:45',
      author: 'あなた',
      changes: [
        { type: 'created', field: 'プラン', newValue: '渋谷デートプラン', spot: '新規作成' }
      ],
      description: '渋谷デートプランを新規作成'
    }
  ]

  const filteredHistory = planHistory.filter(version => {
    if (filter === 'all') return true
    if (filter === 'yours') return version.author === 'あなた'
    if (filter === 'partners') return version.author === '田中太郎'
    if (filter === 'major') return version.changes.some(change => change.type === 'created' || change.type === 'added')
    return true
  })

  const handleVersionSelect = (versionId: number) => {
    setSelectedVersion(selectedVersion === versionId ? null : versionId)
  }

  const handleVersionRestore = (versionId: number) => {
    if (confirm('このバージョンに戻しますか？現在の変更は失われます。')) {
      console.log(`Restoring to version ${versionId}`)
      alert('バージョンを復元しました')
    }
  }

  const handleVersionCompare = (versionId: number) => {
    console.log(`Comparing with version ${versionId}`)
    // 比較画面に遷移
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'created': return 'fas fa-plus-circle'
      case 'added': return 'fas fa-plus'
      case 'modified': return 'fas fa-edit'
      case 'deleted': return 'fas fa-trash'
      default: return 'fas fa-circle'
    }
  }

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'created': return 'success'
      case 'added': return 'info'
      case 'modified': return 'warning'
      case 'deleted': return 'danger'
      default: return 'secondary'
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
              <h1 className="page-title">編集履歴</h1>
              <p className="page-subtitle">プランの変更履歴を確認・管理できます</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* フィルター */}
          <div className="history-filters">
            <div className="filter-group">
              <label className="filter-label">フィルター:</label>
              <select 
                className="filter-select"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">すべて</option>
                <option value="yours">あなたの変更</option>
                <option value="partners">パートナーの変更</option>
                <option value="major">主要な変更</option>
              </select>
            </div>
          </div>

          {/* 履歴一覧 */}
          <div className="history-section">
            <h2>変更履歴</h2>
            <div className="history-list">
              {filteredHistory.map((version, index) => (
                <div key={version.id} className="history-item">
                  <div className="history-header" onClick={() => handleVersionSelect(version.id)}>
                    <div className="version-info">
                      <div className="version-number">{version.version}</div>
                      <div className="version-meta">
                        <span className="version-author">
                          <i className="fas fa-user"></i>
                          {version.author}
                        </span>
                        <span className="version-time">
                          <i className="fas fa-clock"></i>
                          {version.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="version-description">
                      {version.description}
                    </div>
                    <div className="version-actions">
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleVersionCompare(version.id)
                        }}
                      >
                        <i className="fas fa-code-branch"></i>
                        比較
                      </button>
                      {index > 0 && (
                        <button 
                          className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleVersionRestore(version.id)
                          }}
                        >
                          <i className="fas fa-undo"></i>
                          復元
                        </button>
                      )}
                      <i className={`fas fa-chevron-down ${selectedVersion === version.id ? 'rotated' : ''}`}></i>
                    </div>
                  </div>
                  
                  {selectedVersion === version.id && (
                    <div className="history-details">
                      <h4>変更詳細</h4>
                      <div className="changes-list">
                        {version.changes.map((change, changeIndex) => (
                          <div key={changeIndex} className="change-item">
                            <div className="change-icon">
                              <i className={`${getChangeIcon(change.type)} ${getChangeColor(change.type)}`}></i>
                            </div>
                            <div className="change-content">
                              <div className="change-field">
                                <strong>{change.field}</strong> - {change.spot}
                              </div>
                              {change.oldValue && (
                                <div className="change-old">
                                  <span className="change-label">変更前:</span>
                                  <span className="change-value old">{change.oldValue}</span>
                                </div>
                              )}
                              <div className="change-new">
                                <span className="change-label">変更後:</span>
                                <span className="change-value new">{change.newValue}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 統計情報 */}
          <div className="history-stats">
            <h3>編集統計</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-edit"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">{planHistory.length}</div>
                  <div className="stat-label">総変更数</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {planHistory.filter(v => v.author === 'あなた').length}
                  </div>
                  <div className="stat-label">あなたの変更</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {planHistory.filter(v => v.author === '田中太郎').length}
                  </div>
                  <div className="stat-label">パートナーの変更</div>
                </div>
              </div>
              
              <div className="stat-item">
                <div className="stat-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="stat-content">
                  <div className="stat-number">
                    {planHistory.length > 0 ? '30分' : '0分'}
                  </div>
                  <div className="stat-label">編集時間</div>
                </div>
              </div>
            </div>
          </div>

          {/* アクションボタン */}
          <div className="history-actions">
            <div className="action-buttons">
              <button className="btn btn-outline">
                <i className="fas fa-download"></i>
                履歴をエクスポート
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-share"></i>
                履歴を共有
              </button>
              <Link href="/uc002/UC002-001" className="btn btn-primary">
                <i className="fas fa-arrow-right"></i>
                編集に戻る
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
