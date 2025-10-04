'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC001005Page() {
  const [editingSpot, setEditingSpot] = useState<number | null>(null)
  const [plan, setPlan] = useState({
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
        rating: 4.5,
        price: '¥1,000-2,000',
        isCustomized: false
      },
      {
        id: 2,
        name: '渋谷スクランブル交差点',
        type: '観光',
        time: '15:30-16:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '世界で最も忙しい交差点の一つを体験',
        rating: 4.7,
        price: '無料',
        isCustomized: false
      },
      {
        id: 3,
        name: '渋谷PARCO',
        type: 'ショッピング',
        time: '16:00-18:00',
        address: '東京都渋谷区宇田川町15-1',
        description: '最新のファッションとカルチャーを楽しめる複合施設',
        rating: 4.3,
        price: '¥5,000-15,000',
        isCustomized: false
      },
      {
        id: 4,
        name: '渋谷スカイ',
        type: '展望台',
        time: '18:00-19:00',
        address: '東京都渋谷区渋谷2-1-1',
        description: '渋谷の街並みを一望できる展望台',
        rating: 4.9,
        price: '¥2,000',
        isCustomized: false
      }
    ]
  })

  const [newSpot, setNewSpot] = useState({
    name: '',
    type: '',
    time: '',
    address: '',
    description: '',
    price: ''
  })

  const handleSpotEdit = (spotId: number) => {
    setEditingSpot(spotId)
  }

  const handleSpotUpdate = (spotId: number, updatedSpot: any) => {
    setPlan(prev => ({
      ...prev,
      spots: prev.spots.map(spot => 
        spot.id === spotId 
          ? { ...spot, ...updatedSpot, isCustomized: true }
          : spot
      )
    }))
    setEditingSpot(null)
  }

  const handleSpotRemove = (spotId: number) => {
    setPlan(prev => ({
      ...prev,
      spots: prev.spots.filter(spot => spot.id !== spotId)
    }))
  }

  const handleSpotAdd = () => {
    if (newSpot.name && newSpot.type && newSpot.time) {
      const spot = {
        id: Date.now(),
        ...newSpot,
        rating: 0,
        isCustomized: true
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
        description: '',
        price: ''
      })
    }
  }

  const handleSave = () => {
    // カスタマイズされたプランを保存
    console.log('Customized plan saved:', plan)
    window.location.href = '/uc001/UC001-004'
  }

  const handleReset = () => {
    if (confirm('変更をリセットしますか？')) {
      window.location.reload()
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
              <h1 className="page-title">プランカスタマイズ</h1>
              <p className="page-subtitle">デートプランを自由に編集・カスタマイズできます</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-outline" onClick={handleReset}>
                <i className="fas fa-undo"></i>
                リセット
              </button>
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* プラン情報編集 */}
          <div className="plan-edit-section">
            <div className="form-group">
              <label htmlFor="planTitle" className="form-label">プランタイトル</label>
              <input
                type="text"
                id="planTitle"
                className="form-input"
                value={plan.title}
                onChange={(e) => setPlan(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label htmlFor="planDescription" className="form-label">説明</label>
              <textarea
                id="planDescription"
                className="form-input form-textarea"
                value={plan.description}
                onChange={(e) => setPlan(prev => ({ ...prev, description: e.target.value }))}
              />
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
                <div key={spot.id} className={`spot-item ${spot.isCustomized ? 'customized' : ''}`}>
                  {editingSpot === spot.id ? (
                    <div className="spot-edit-form">
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">スポット名</label>
                          <input
                            type="text"
                            className="form-input"
                            value={spot.name}
                            onChange={(e) => handleSpotUpdate(spot.id, { name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">種類</label>
                          <select
                            className="form-select"
                            value={spot.type}
                            onChange={(e) => handleSpotUpdate(spot.id, { type: e.target.value })}
                          >
                            <option value="カフェ">カフェ</option>
                            <option value="レストラン">レストラン</option>
                            <option value="ショッピング">ショッピング</option>
                            <option value="観光">観光</option>
                            <option value="エンターテイメント">エンターテイメント</option>
                            <option value="その他">その他</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">時間</label>
                          <input
                            type="text"
                            className="form-input"
                            value={spot.time}
                            onChange={(e) => handleSpotUpdate(spot.id, { time: e.target.value })}
                            placeholder="例: 14:00-15:30"
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">住所</label>
                          <input
                            type="text"
                            className="form-input"
                            value={spot.address}
                            onChange={(e) => handleSpotUpdate(spot.id, { address: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">説明</label>
                          <textarea
                            className="form-input form-textarea"
                            value={spot.description}
                            onChange={(e) => handleSpotUpdate(spot.id, { description: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">価格</label>
                          <input
                            type="text"
                            className="form-input"
                            value={spot.price}
                            onChange={(e) => handleSpotUpdate(spot.id, { price: e.target.value })}
                            placeholder="例: ¥1,000-2,000"
                          />
                        </div>
                      </div>
                      <div className="form-actions">
                        <button className="btn btn-primary" onClick={() => setEditingSpot(null)}>
                          保存
                        </button>
                        <button className="btn btn-outline" onClick={() => setEditingSpot(null)}>
                          キャンセル
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="spot-content">
                      <div className="spot-header">
                        <div className="spot-info">
                          <h3 className="spot-name">{spot.name}</h3>
                          <span className="spot-type">{spot.type}</span>
                          {spot.isCustomized && (
                            <span className="customized-badge">カスタマイズ済み</span>
                          )}
                        </div>
                        <div className="spot-actions">
                          <button className="btn btn-outline btn-sm" onClick={() => handleSpotEdit(spot.id)}>
                            <i className="fas fa-edit"></i>
                            編集
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleSpotRemove(spot.id)}>
                            <i className="fas fa-trash"></i>
                            削除
                          </button>
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
                        <div className="spot-price">
                          <i className="fas fa-yen-sign"></i>
                          <span>{spot.price}</span>
                        </div>
                      </div>
                      <p className="spot-description">{spot.description}</p>
                    </div>
                  )}
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
                    <option value="その他">その他</option>
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
                <div className="form-group">
                  <label className="form-label">価格</label>
                  <input
                    type="text"
                    className="form-input"
                    value={newSpot.price}
                    onChange={(e) => setNewSpot(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="例: ¥1,000-2,000"
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
          <div className="customize-actions">
            <div className="action-buttons">
              <button className="btn btn-outline" onClick={handleReset}>
                <i className="fas fa-undo"></i>
                リセット
              </button>
              <button className="btn btn-primary btn-large" onClick={handleSave}>
                <i className="fas fa-save"></i>
                変更を保存
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
