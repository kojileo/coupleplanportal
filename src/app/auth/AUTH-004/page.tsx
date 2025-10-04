'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Auth004Page() {
  const [selectedMethod, setSelectedMethod] = useState('')
  const [connectionCode, setConnectionCode] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [partnerInfo, setPartnerInfo] = useState({
    name: '',
    email: '',
    avatar: ''
  })

  const handleMethodSelect = (method: string) => {
    setSelectedMethod(method)
  }

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 連携コードの検証処理
    console.log('Connection code:', connectionCode)
    // 仮の成功処理
    setIsConnected(true)
    setPartnerInfo({
      name: '田中太郎',
      email: 'tanaka@example.com',
      avatar: '/images/avatar.jpg'
    })
  }

  const handleComplete = () => {
    // 設定完了、ダッシュボードに遷移
    window.location.href = '/common/COMMON-001'
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
              <h1 className="page-title">パートナー連携設定</h1>
              <p className="page-subtitle">パートナーと連携して、より楽しいデート体験を</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 連携状況 */}
          {!isConnected ? (
            <div className="connection-status">
              <div className="status-card">
                <div className="status-icon">
                  <i className="fas fa-user-plus"></i>
                </div>
                <div className="status-content">
                  <h3>パートナー未連携</h3>
                  <p>パートナーと連携すると、共同編集やDate Canvasなどの特別な機能が利用できます。</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="connection-status">
              <div className="status-card success">
                <div className="status-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <div className="status-content">
                  <h3>パートナー連携完了</h3>
                  <p>{partnerInfo.name}さんと連携が完了しました！</p>
                </div>
              </div>
            </div>
          )}

          {/* 連携方法選択 */}
          {!isConnected && (
            <div className="connection-methods">
              <h2 className="section-title">連携方法を選択</h2>
              <div className="methods-grid">
                <div 
                  className={`method-card ${selectedMethod === 'qr' ? 'selected' : ''}`}
                  onClick={() => handleMethodSelect('qr')}
                >
                  <div className="method-icon">
                    <i className="fas fa-qrcode"></i>
                  </div>
                  <h3>QRコード</h3>
                  <p>パートナーにQRコードを送信して連携</p>
                  <div className="method-badge">
                    <span className="badge badge-primary">おすすめ</span>
                  </div>
                </div>
                
                <div 
                  className={`method-card ${selectedMethod === 'link' ? 'selected' : ''}`}
                  onClick={() => handleMethodSelect('link')}
                >
                  <div className="method-icon">
                    <i className="fas fa-link"></i>
                  </div>
                  <h3>招待リンク</h3>
                  <p>招待リンクを送信して連携</p>
                </div>
                
                <div 
                  className={`method-card ${selectedMethod === 'code' ? 'selected' : ''}`}
                  onClick={() => handleMethodSelect('code')}
                >
                  <div className="method-icon">
                    <i className="fas fa-key"></i>
                  </div>
                  <h3>連携コード</h3>
                  <p>6桁の連携コードで連携</p>
                </div>
              </div>
            </div>
          )}

          {/* QRコード連携 */}
          {selectedMethod === 'qr' && !isConnected && (
            <div className="connection-section">
              <div className="section-header">
                <h2 className="section-title">QRコード連携</h2>
                <p className="section-description">パートナーにQRコードを送信して連携してください</p>
              </div>
              
              <div className="qr-container">
                <div className="qr-code">
                  <div className="qr-placeholder">
                    <i className="fas fa-qrcode"></i>
                    <span>QRコード</span>
                  </div>
                </div>
                <div className="qr-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-share"></i>
                    パートナーに送信
                  </button>
                  <button className="btn btn-outline">
                    <i className="fas fa-download"></i>
                    QRコードを保存
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 招待リンク連携 */}
          {selectedMethod === 'link' && !isConnected && (
            <div className="connection-section">
              <div className="section-header">
                <h2 className="section-title">招待リンク連携</h2>
                <p className="section-description">パートナーに招待リンクを送信して連携してください</p>
              </div>
              
              <div className="link-container">
                <div className="link-display">
                  <input 
                    type="text" 
                    value="https://coupleplan.app/invite/abc123" 
                    readOnly 
                    className="form-input"
                  />
                  <button className="btn btn-outline">
                    <i className="fas fa-copy"></i>
                    コピー
                  </button>
                </div>
                <div className="link-actions">
                  <button className="btn btn-primary">
                    <i className="fas fa-envelope"></i>
                    メールで送信
                  </button>
                  <button className="btn btn-outline">
                    <i className="fas fa-share"></i>
                    その他で共有
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 連携コード連携 */}
          {selectedMethod === 'code' && !isConnected && (
            <div className="connection-section">
              <div className="section-header">
                <h2 className="section-title">連携コード連携</h2>
                <p className="section-description">パートナーから受け取った6桁の連携コードを入力してください</p>
              </div>
              
              <form className="code-form" onSubmit={handleCodeSubmit}>
                <div className="form-group">
                  <label htmlFor="connectionCode" className="form-label">連携コード</label>
                  <input
                    type="text"
                    id="connectionCode"
                    name="connectionCode"
                    className="form-input code-input"
                    placeholder="123456"
                    value={connectionCode}
                    onChange={(e) => setConnectionCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <small className="form-help">パートナーから受け取った6桁のコードを入力してください</small>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-link"></i>
                    連携する
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 連携完了 */}
          {isConnected && (
            <div className="connection-complete">
              <div className="complete-content">
                <div className="complete-icon">
                  <i className="fas fa-heart"></i>
                </div>
                <h2 className="complete-title">連携完了！</h2>
                <p className="complete-description">
                  {partnerInfo.name}さんとの連携が完了しました。<br />
                  これで共同編集やDate Canvasなどの特別な機能が利用できます。
                </p>
                
                <div className="partner-info">
                  <div className="partner-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="partner-details">
                    <h3>{partnerInfo.name}</h3>
                    <p>{partnerInfo.email}</p>
                  </div>
                </div>
                
                <div className="complete-actions">
                  <button className="btn btn-primary btn-large" onClick={handleComplete}>
                    <i className="fas fa-arrow-right"></i>
                    ダッシュボードに進む
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* スキップオプション */}
          {!isConnected && (
            <div className="skip-section">
              <p className="skip-text">
                後で連携することもできます
              </p>
              <button className="btn btn-outline" onClick={handleComplete}>
                スキップして続行
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
