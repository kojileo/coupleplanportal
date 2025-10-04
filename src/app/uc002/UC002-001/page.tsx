'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function UC002001Page() {
  const [isConnected, setIsConnected] = useState(true)
  const [partnerInfo, setPartnerInfo] = useState({
    name: '田中太郎',
    avatar: '/images/partner-avatar.jpg',
    isOnline: true,
    lastSeen: '2分前'
  })
  
  const [plan, setPlan] = useState({
    id: 1,
    title: '渋谷デートプラン',
    description: 'カフェ巡りとショッピングを楽しむ、カジュアルなデートプラン',
    spots: [
      {
        id: 1,
        name: 'Blue Bottle Coffee',
        type: 'カフェ',
        time: '14:00-15:30',
        address: '東京都渋谷区恵比寿1-4-18',
        description: 'おしゃれなカフェでゆっくりとコーヒーを楽しみましょう',
        editedBy: 'あなた',
        lastEdit: '5分前'
      },
      {
        id: 2,
        name: '渋谷スクランブル交差点',
        type: '観光',
        time: '15:30-16:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '世界で最も忙しい交差点の一つを体験',
        editedBy: '田中太郎',
        lastEdit: '3分前'
      },
      {
        id: 3,
        name: '渋谷PARCO',
        type: 'ショッピング',
        time: '16:00-18:00',
        address: '東京都渋谷区宇田川町15-1',
        description: '最新のファッションとカルチャーを楽しめる複合施設',
        editedBy: '田中太郎',
        lastEdit: '1分前'
      }
    ]
  })

  const [editingSpot, setEditingSpot] = useState<number | null>(null)
  const [newSpot, setNewSpot] = useState({
    name: '',
    type: '',
    time: '',
    address: '',
    description: ''
  })

  const [comments, setComments] = useState([
    {
      id: 1,
      author: '田中太郎',
      content: 'Blue Bottle Coffeeは混雑する可能性があるので、予約した方が良いかもしれません',
      timestamp: '5分前',
      spotId: 1
    },
    {
      id: 2,
      author: 'あなた',
      content: '良いアイデアですね！予約してみます',
      timestamp: '3分前',
      spotId: 1
    }
  ])

  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    // リアルタイム同期のシミュレーション
    const interval = setInterval(() => {
      // パートナーのオンライン状態を更新
      setPartnerInfo(prev => ({
        ...prev,
        lastSeen: '今'
      }))
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const handleSpotEdit = (spotId: number) => {
    setEditingSpot(spotId)
  }

  const handleSpotUpdate = (spotId: number, updatedSpot: any) => {
    setPlan(prev => ({
      ...prev,
      spots: prev.spots.map(spot => 
        spot.id === spotId 
          ? { ...spot, ...updatedSpot, editedBy: 'あなた', lastEdit: '今' }
          : spot
      )
    }))
    setEditingSpot(null)
  }

  const handleSpotAdd = () => {
    if (newSpot.name && newSpot.type && newSpot.time) {
      const spot = {
        id: Date.now(),
        ...newSpot,
        editedBy: 'あなた',
        lastEdit: '今'
      }
      setPlan(prev => ({
        ...prev,
        spots: [...prev.spots, spot]
      }))
      setNewSpot({
        name: '',
        type: '',
        time: '',
        address: '',
        description: ''
      })
    }
  }

  const handleCommentAdd = (spotId: number) => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: 'あなた',
        content: newComment,
        timestamp: '今',
        spotId
      }
      setComments(prev => [...prev, comment])
      setNewComment('')
    }
  }

  const handleSave = () => {
    // プランを保存
    console.log('Plan saved:', plan)
    alert('プランが保存されました')
  }

  const handleInvitePartner = () => {
    // パートナー招待処理
    alert('パートナーに招待を送信しました')
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="navbar">
          <div className="nav-container">
            <div className="nav-logo">
              <i className="fas fa-heart"></i>
              <span>CouplePlan</span>
            </div>
          </div>
        </nav>
        <main className="main-content">
          <div className="container">
            <div className="disconnected-state">
              <div className="disconnected-icon">
                <i className="fas fa-users"></i>
              </div>
              <h1>パートナーとの連携が必要です</h1>
              <p>共同編集機能を使用するには、パートナーとの連携が必要です。</p>
              <div className="disconnected-actions">
                <Link href="/auth/AUTH-004" className="btn btn-primary">
                  <i className="fas fa-link"></i>
                  パートナーと連携
                </Link>
                <button className="btn btn-outline" onClick={() => window.history.back()}>
                  戻る
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
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
              <h1 className="page-title">共同編集</h1>
              <p className="page-subtitle">パートナーと一緒にデートプランを編集しましょう</p>
            </div>
            <div className="header-actions">
              <div className="partner-status">
                <div className="partner-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="partner-info">
                  <span className="partner-name">{partnerInfo.name}</span>
                  <span className={`partner-online ${partnerInfo.isOnline ? 'online' : 'offline'}`}>
                    {partnerInfo.isOnline ? 'オンライン' : `最後の活動: ${partnerInfo.lastSeen}`}
                  </span>
                </div>
              </div>
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
                <i className="fas fa-users"></i>
                <span>共同編集中</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock"></i>
                <span>最後の更新: 1分前</span>
              </div>
            </div>
          </div>

          {/* スポット一覧 */}
          <div className="spots-section">
            <div className="section-header">
              <h2>スポット一覧</h2>
              <button className="btn btn-primary" onClick={() => setEditingSpot(-1)}>
                <i className="fas fa-plus"></i>
                スポットを追加
              </button>
            </div>

            <div className="spots-list">
              {plan.spots.map((spot, index) => (
                <div key={spot.id} className="spot-item">
                  <div className="spot-content">
                    <div className="spot-header">
                      <div className="spot-info">
                        <h3 className="spot-name">{spot.name}</h3>
                        <span className="spot-type">{spot.type}</span>
                      </div>
                      <div className="spot-meta">
                        <div className="spot-editor">
                          <i className="fas fa-user"></i>
                          <span>{spot.editedBy}</span>
                        </div>
                        <div className="spot-time">
                          <i className="fas fa-clock"></i>
                          <span>{spot.lastEdit}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="spot-details">
                      <div className="spot-time">
                        <i className="fas fa-clock"></i>
                        <span>{spot.time}</span>
                      </div>
                      <div className="spot-address">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{spot.address}</span>
                      </div>
                    </div>
                    
                    <p className="spot-description">{spot.description}</p>
                    
                    {/* コメントセクション */}
                    <div className="spot-comments">
                      <div className="comments-list">
                        {comments.filter(c => c.spotId === spot.id).map(comment => (
                          <div key={comment.id} className="comment-item">
                            <div className="comment-author">{comment.author}</div>
                            <div className="comment-content">{comment.content}</div>
                            <div className="comment-time">{comment.timestamp}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="comment-form">
                        <input
                          type="text"
                          className="comment-input"
                          placeholder="コメントを追加..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleCommentAdd(spot.id)}
                        />
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => handleCommentAdd(spot.id)}
                        >
                          送信
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="spot-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => handleSpotEdit(spot.id)}>
                      <i className="fas fa-edit"></i>
                      編集
                    </button>
                    <button className="btn btn-outline btn-sm">
                      <i className="fas fa-share"></i>
                      共有
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 新しいスポット追加フォーム */}
          {editingSpot === -1 && (
            <div className="new-spot-form">
              <h3>新しいスポットを追加</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">スポット名</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newSpot.name}
                    onChange={(e) => setNewSpot(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="スポット名を入力"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">種類</label>
                  <select
                    className="form-select"
                    value={newSpot.type}
                    onChange={(e) => setNewSpot(prev => ({ ...prev, type: e.target.value }))}
                  >
                    <option value="">選択してください</option>
                    <option value="カフェ">カフェ</option>
                    <option value="レストラン">レストラン</option>
                    <option value="ショッピング">ショッピング</option>
                    <option value="観光">観光</option>
                    <option value="エンターテイメント">エンターテイメント</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">時間</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newSpot.time}
                    onChange={(e) => setNewSpot(prev => ({ ...prev, time: e.target.value }))}
                    placeholder="例: 14:00-15:30"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">住所</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newSpot.address}
                    onChange={(e) => setNewSpot(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="住所を入力"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">説明</label>
                  <textarea
                    className="form-input form-textarea"
                    value={newSpot.description}
                    onChange={(e) => setNewSpot(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="説明を入力"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSpotAdd}>
                  <i className="fas fa-plus"></i>
                  スポットを追加
                </button>
                <button className="btn btn-outline" onClick={() => setEditingSpot(null)}>
                  キャンセル
                </button>
              </div>
            </div>
          )}

          {/* アクションボタン */}
          <div className="collaboration-actions">
            <div className="action-buttons">
              <button className="btn btn-outline" onClick={handleInvitePartner}>
                <i className="fas fa-user-plus"></i>
                パートナーを招待
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-history"></i>
                編集履歴
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                <i className="fas fa-save"></i>
                保存
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
