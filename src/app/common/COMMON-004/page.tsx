'use client'

import Link from 'next/link'

export default function COMMON004Page() {
  const handleRetry = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/'
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
          <div className="error-container">
            <div className="error-content">
              <div className="error-icon">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h1 className="error-title">エラーが発生しました</h1>
              <p className="error-description">
                申し訳ございません。予期しないエラーが発生しました。<br />
                しばらく時間をおいてから再度お試しください。
              </p>
              
              <div className="error-actions">
                <button className="btn btn-primary" onClick={handleRetry}>
                  <i className="fas fa-redo"></i>
                  再試行
                </button>
                <button className="btn btn-outline" onClick={handleGoHome}>
                  <i className="fas fa-home"></i>
                  ホームに戻る
                </button>
              </div>
              
              <div className="error-details">
                <details>
                  <summary>エラー詳細</summary>
                  <div className="error-code">
                    <p><strong>エラーコード:</strong> ERR_500_INTERNAL_SERVER_ERROR</p>
                    <p><strong>発生時刻:</strong> {new Date().toLocaleString('ja-JP')}</p>
                    <p><strong>ユーザーID:</strong> user_12345</p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
