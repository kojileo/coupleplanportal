'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function COMMON005Page() {
  const [isOnline, setIsOnline] = useState(true)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    window.location.reload()
  }

  const handleGoOffline = () => {
    // オフラインモードに移行
    console.log('Switching to offline mode')
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
          <div className="offline-container">
            <div className="offline-content">
              <div className="offline-icon">
                <i className="fas fa-wifi"></i>
              </div>
              <h1 className="offline-title">オフラインモード</h1>
              <p className="offline-description">
                インターネット接続が不安定です。<br />
                オフラインモードで一部機能をご利用いただけます。
              </p>
              
              <div className="connection-status">
                <div className={`status-indicator ${isOnline ? 'online' : 'offline'}`}>
                  <i className={`fas fa-circle ${isOnline ? 'online' : 'offline'}`}></i>
                  {isOnline ? 'オンライン' : 'オフライン'}
                </div>
              </div>
              
              <div className="offline-features">
                <h2>利用可能な機能</h2>
                <div className="features-list">
                  <div className="feature-item available">
                    <i className="fas fa-check-circle"></i>
                    <span>保存済みデートプランの閲覧</span>
                  </div>
                  <div className="feature-item available">
                    <i className="fas fa-check-circle"></i>
                    <span>Date Canvasの編集</span>
                  </div>
                  <div className="feature-item available">
                    <i className="fas fa-check-circle"></i>
                    <span>設定の変更</span>
                  </div>
                  <div className="feature-item unavailable">
                    <i className="fas fa-times-circle"></i>
                    <span>AIデートプラン生成</span>
                  </div>
                  <div className="feature-item unavailable">
                    <i className="fas fa-times-circle"></i>
                    <span>スポット検索</span>
                  </div>
                  <div className="feature-item unavailable">
                    <i className="fas fa-times-circle"></i>
                    <span>パートナーとの同期</span>
                  </div>
                </div>
              </div>
              
              <div className="offline-actions">
                <button className="btn btn-primary" onClick={handleRetry}>
                  <i className="fas fa-redo"></i>
                  再接続を試す
                </button>
                <button className="btn btn-outline" onClick={handleGoOffline}>
                  <i className="fas fa-wifi"></i>
                  オフラインモードで続行
                </button>
              </div>
              
              {retryCount > 0 && (
                <div className="retry-info">
                  <p>再接続試行回数: {retryCount}回</p>
                </div>
              )}
              
              <div className="offline-tips">
                <h3>接続を改善するには</h3>
                <ul>
                  <li>Wi-Fi接続を確認してください</li>
                  <li>モバイルデータ通信を確認してください</li>
                  <li>ルーターを再起動してみてください</li>
                  <li>アプリを再起動してみてください</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
