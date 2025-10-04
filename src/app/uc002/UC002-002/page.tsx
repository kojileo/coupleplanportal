'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC002002Page() {
  const [conflicts, setConflicts] = useState([
    {
      id: 1,
      spotId: 1,
      spotName: 'Blue Bottle Coffee',
      field: '時間',
      yourValue: '14:00-15:30',
      partnerValue: '13:30-15:00',
      conflictType: 'time',
      timestamp: '2分前'
    },
    {
      id: 2,
      spotId: 2,
      spotName: '渋谷スクランブル交差点',
      field: '説明',
      yourValue: '世界で最も忙しい交差点の一つを体験',
      partnerValue: '渋谷のシンボル的な交差点で写真撮影',
      conflictType: 'description',
      timestamp: '5分前'
    },
    {
      id: 3,
      spotId: 3,
      spotName: '渋谷PARCO',
      field: '種類',
      yourValue: 'ショッピング',
      partnerValue: 'エンターテイメント',
      conflictType: 'type',
      timestamp: '1分前'
    }
  ])

  const [resolvedConflicts, setResolvedConflicts] = useState<number[]>([])

  const handleConflictResolve = (conflictId: number, resolution: 'yours' | 'partners' | 'merge') => {
    setResolvedConflicts(prev => [...prev, conflictId])
    
    // 実際の解決処理
    console.log(`Conflict ${conflictId} resolved with: ${resolution}`)
  }

  const handleAutoResolve = () => {
    // 自動解決処理
    conflicts.forEach(conflict => {
      if (!resolvedConflicts.includes(conflict.id)) {
        handleConflictResolve(conflict.id, 'yours')
      }
    })
  }

  const handleAcceptAllYours = () => {
    conflicts.forEach(conflict => {
      if (!resolvedConflicts.includes(conflict.id)) {
        handleConflictResolve(conflict.id, 'yours')
      }
    })
  }

  const handleAcceptAllPartners = () => {
    conflicts.forEach(conflict => {
      if (!resolvedConflicts.includes(conflict.id)) {
        handleConflictResolve(conflict.id, 'partners')
      }
    })
  }

  const remainingConflicts = conflicts.filter(conflict => !resolvedConflicts.includes(conflict.id))

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
              <h1 className="page-title">編集競合解決</h1>
              <p className="page-subtitle">パートナーとの編集競合を解決してください</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 競合状況サマリー */}
          <div className="conflict-summary">
            <div className="summary-card">
              <div className="summary-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="summary-content">
                <h3>編集競合が発生しました</h3>
                <p>
                  {conflicts.length}件の競合が検出されました。<br />
                  各競合について、どちらの変更を採用するか選択してください。
                </p>
              </div>
            </div>
          </div>

          {/* 一括解決オプション */}
          {remainingConflicts.length > 0 && (
            <div className="bulk-resolve-section">
              <h3>一括解決</h3>
              <div className="bulk-actions">
                <button className="btn btn-outline" onClick={handleAutoResolve}>
                  <i className="fas fa-magic"></i>
                  AI提案で自動解決
                </button>
                <button className="btn btn-outline" onClick={handleAcceptAllYours}>
                  <i className="fas fa-user"></i>
                  すべて自分の変更を採用
                </button>
                <button className="btn btn-outline" onClick={handleAcceptAllPartners}>
                  <i className="fas fa-users"></i>
                  すべてパートナーの変更を採用
                </button>
              </div>
            </div>
          )}

          {/* 競合一覧 */}
          <div className="conflicts-section">
            <h2>競合詳細</h2>
            <div className="conflicts-list">
              {conflicts.map(conflict => (
                <div 
                  key={conflict.id} 
                  className={`conflict-item ${resolvedConflicts.includes(conflict.id) ? 'resolved' : ''}`}
                >
                  <div className="conflict-header">
                    <h3 className="conflict-spot">{conflict.spotName}</h3>
                    <span className="conflict-field">{conflict.field}</span>
                    {resolvedConflicts.includes(conflict.id) && (
                      <span className="resolved-badge">
                        <i className="fas fa-check"></i>
                        解決済み
                      </span>
                    )}
                  </div>
                  
                  <div className="conflict-content">
                    <div className="conflict-option your-option">
                      <div className="option-header">
                        <div className="option-author">
                          <i className="fas fa-user"></i>
                          <span>あなたの変更</span>
                        </div>
                        <div className="option-time">{conflict.timestamp}</div>
                      </div>
                      <div className="option-value">
                        {conflict.yourValue}
                      </div>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => handleConflictResolve(conflict.id, 'yours')}
                        disabled={resolvedConflicts.includes(conflict.id)}
                      >
                        採用
                      </button>
                    </div>
                    
                    <div className="conflict-divider">
                      <span>VS</span>
                    </div>
                    
                    <div className="conflict-option partner-option">
                      <div className="option-header">
                        <div className="option-author">
                          <i className="fas fa-users"></i>
                          <span>パートナーの変更</span>
                        </div>
                        <div className="option-time">{conflict.timestamp}</div>
                      </div>
                      <div className="option-value">
                        {conflict.partnerValue}
                      </div>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => handleConflictResolve(conflict.id, 'partners')}
                        disabled={resolvedConflicts.includes(conflict.id)}
                      >
                        採用
                      </button>
                    </div>
                  </div>
                  
                  {conflict.conflictType === 'description' && !resolvedConflicts.includes(conflict.id) && (
                    <div className="merge-option">
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={() => handleConflictResolve(conflict.id, 'merge')}
                      >
                        <i className="fas fa-code-branch"></i>
                        両方をマージ
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 解決完了 */}
          {remainingConflicts.length === 0 && (
            <div className="resolution-complete">
              <div className="complete-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h2>すべての競合が解決されました</h2>
              <p>編集を続行できます</p>
              <div className="complete-actions">
                <Link href="/uc002/UC002-001" className="btn btn-primary">
                  <i className="fas fa-arrow-right"></i>
                  編集を続行
                </Link>
                <Link href="/uc001/UC001-004" className="btn btn-outline">
                  <i className="fas fa-eye"></i>
                  プランを確認
                </Link>
              </div>
            </div>
          )}

          {/* 進捗表示 */}
          {remainingConflicts.length > 0 && (
            <div className="progress-section">
              <div className="progress-info">
                <span>解決済み: {resolvedConflicts.length} / {conflicts.length}</span>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(resolvedConflicts.length / conflicts.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* ヘルプ */}
          <div className="help-section">
            <h3>競合解決について</h3>
            <div className="help-content">
              <div className="help-item">
                <i className="fas fa-info-circle"></i>
                <span>同じスポットの同じ項目を同時に編集すると競合が発生します</span>
              </div>
              <div className="help-item">
                <i className="fas fa-lightbulb"></i>
                <span>AI提案では、過去の編集履歴や好みを考慮して最適な解決策を提案します</span>
              </div>
              <div className="help-item">
                <i className="fas fa-code-branch"></i>
                <span>マージ機能では、両方の変更を組み合わせることができます</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
