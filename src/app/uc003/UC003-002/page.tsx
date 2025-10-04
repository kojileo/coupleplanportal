'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC003002Page() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedPrice, setSelectedPrice] = useState('all')
  const [sortBy, setSortBy] = useState('popularity')
  const [viewMode, setViewMode] = useState('grid')

  const categories = [
    { id: 'all', name: 'すべて', icon: 'fas fa-th' },
    { id: 'restaurant', name: 'レストラン', icon: 'fas fa-utensils' },
    { id: 'cafe', name: 'カフェ', icon: 'fas fa-coffee' },
    { id: 'entertainment', name: 'エンターテイメント', icon: 'fas fa-film' },
    { id: 'shopping', name: 'ショッピング', icon: 'fas fa-shopping-bag' },
    { id: 'nature', name: '自然・公園', icon: 'fas fa-tree' },
    { id: 'culture', name: '文化・アート', icon: 'fas fa-palette' },
    { id: 'sports', name: 'スポーツ', icon: 'fas fa-dumbbell' }
  ]

  const areas = [
    { id: 'all', name: 'すべてのエリア' },
    { id: 'shibuya', name: '渋谷' },
    { id: 'shinjuku', name: '新宿' },
    { id: 'harajuku', name: '原宿' },
    { id: 'omotesando', name: '表参道' },
    { id: 'ginza', name: '銀座' },
    { id: 'roppongi', name: '六本木' },
    { id: 'asakusa', name: '浅草' }
  ]

  const priceRanges = [
    { id: 'all', name: 'すべて' },
    { id: 'free', name: '無料' },
    { id: 'low', name: '〜¥1,000' },
    { id: 'medium', name: '¥1,000-3,000' },
    { id: 'high', name: '¥3,000-10,000' },
    { id: 'premium', name: '¥10,000〜' }
  ]

  const sortOptions = [
    { id: 'popularity', name: '人気順' },
    { id: 'rating', name: '評価順' },
    { id: 'price_low', name: '価格安い順' },
    { id: 'price_high', name: '価格高い順' },
    { id: 'distance', name: '距離順' },
    { id: 'newest', name: '新着順' }
  ]

  const spots = [
    {
      id: 1,
      name: 'Blue Bottle Coffee',
      category: 'cafe',
      area: 'shibuya',
      rating: 4.5,
      price: '¥1,000-2,000',
      distance: '0.5km',
      image: '/images/blue-bottle.jpg',
      description: 'おしゃれなカフェでゆっくりとコーヒーを楽しめます',
      tags: ['コーヒー', 'おしゃれ', 'インスタ映え'],
      isBookmarked: false
    },
    {
      id: 2,
      name: '代々木公園',
      category: 'nature',
      area: 'harajuku',
      rating: 4.3,
      price: '無料',
      distance: '1.2km',
      image: '/images/yoyogi-park.jpg',
      description: '都心のオアシスで自然を満喫できます',
      tags: ['自然', '散歩', 'ピクニック'],
      isBookmarked: true
    },
    {
      id: 3,
      name: '国立新美術館',
      category: 'culture',
      area: 'omotesando',
      rating: 4.7,
      price: '¥1,000-2,000',
      distance: '2.1km',
      image: '/images/national-art-center.jpg',
      description: '現代アートを楽しめる美術館',
      tags: ['アート', '文化', '展示'],
      isBookmarked: false
    },
    {
      id: 4,
      name: '渋谷スカイ',
      category: 'entertainment',
      area: 'shibuya',
      rating: 4.9,
      price: '¥2,000',
      distance: '0.8km',
      image: '/images/shibuya-sky.jpg',
      description: '渋谷の街並みを一望できる展望台',
      tags: ['展望台', '夜景', '写真映え'],
      isBookmarked: true
    },
    {
      id: 5,
      name: '表参道ヒルズ',
      category: 'shopping',
      area: 'omotesando',
      rating: 4.2,
      price: '¥5,000-15,000',
      distance: '1.5km',
      image: '/images/omotesando-hills.jpg',
      description: 'おしゃれなショッピングモール',
      tags: ['ショッピング', 'ファッション', 'おしゃれ'],
      isBookmarked: false
    },
    {
      id: 6,
      name: '六本木ヒルズ',
      category: 'entertainment',
      area: 'roppongi',
      rating: 4.4,
      price: '¥1,500-3,000',
      distance: '3.2km',
      image: '/images/roppongi-hills.jpg',
      description: 'エンターテイメントとショッピングの複合施設',
      tags: ['エンターテイメント', 'ショッピング', '展望台'],
      isBookmarked: false
    }
  ]

  const [bookmarkedSpots, setBookmarkedSpots] = useState<number[]>([2, 4])

  const filteredSpots = spots.filter(spot => {
    const matchesQuery = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        spot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        spot.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || spot.category === selectedCategory
    const matchesArea = selectedArea === 'all' || spot.area === selectedArea
    const matchesPrice = selectedPrice === 'all' || 
                        (selectedPrice === 'free' && spot.price === '無料') ||
                        (selectedPrice === 'low' && spot.price.includes('¥1,000')) ||
                        (selectedPrice === 'medium' && spot.price.includes('¥1,000-3,000')) ||
                        (selectedPrice === 'high' && spot.price.includes('¥3,000-10,000')) ||
                        (selectedPrice === 'premium' && spot.price.includes('¥10,000'))

    return matchesQuery && matchesCategory && matchesArea && matchesPrice
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search:', searchQuery)
  }

  const handleBookmark = (spotId: number) => {
    setBookmarkedSpots(prev => 
      prev.includes(spotId) 
        ? prev.filter(id => id !== spotId)
        : [...prev, spotId]
    )
  }

  const handleSpotSelect = (spotId: number) => {
    // スポット詳細画面に遷移
    window.location.href = `/uc003/UC003-003?id=${spotId}`
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
              <h1 className="page-title">デート情報検索</h1>
              <p className="page-subtitle">最適なデートスポットを見つけましょう</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 検索フォーム */}
          <div className="search-section">
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-input-group">
                <input
                  type="text"
                  placeholder="スポット名、キーワードで検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>

          {/* フィルター */}
          <div className="filters-section">
            <div className="filter-group">
              <label className="filter-label">カテゴリ</label>
              <div className="filter-options">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <i className={category.icon}></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <label className="filter-label">エリア</label>
              <select 
                className="filter-select"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                {areas.map(area => (
                  <option key={area.id} value={area.id}>{area.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">価格帯</label>
              <select 
                className="filter-select"
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                {priceRanges.map(price => (
                  <option key={price.id} value={price.id}>{price.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">並び順</label>
              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ビューモード切り替え */}
          <div className="view-controls">
            <div className="view-mode">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th"></i>
                グリッド
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
                リスト
              </button>
            </div>
            <div className="results-count">
              {filteredSpots.length}件のスポットが見つかりました
            </div>
          </div>

          {/* スポット一覧 */}
          <div className="spots-section">
            {viewMode === 'grid' ? (
              <div className="spots-grid">
                {filteredSpots.map(spot => (
                  <div key={spot.id} className="spot-card">
                    <div className="spot-image">
                      <div className="image-placeholder">
                        <i className="fas fa-image"></i>
                      </div>
                      <button 
                        className={`bookmark-btn ${bookmarkedSpots.includes(spot.id) ? 'bookmarked' : ''}`}
                        onClick={() => handleBookmark(spot.id)}
                      >
                        <i className="fas fa-bookmark"></i>
                      </button>
                    </div>
                    <div className="spot-content">
                      <h3 className="spot-name">{spot.name}</h3>
                      <div className="spot-meta">
                        <div className="spot-rating">
                          <i className="fas fa-star"></i>
                          <span>{spot.rating}</span>
                        </div>
                        <div className="spot-price">{spot.price}</div>
                        <div className="spot-distance">{spot.distance}</div>
                      </div>
                      <p className="spot-description">{spot.description}</p>
                      <div className="spot-tags">
                        {spot.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="spot-actions">
                        <button 
                          className="btn btn-outline btn-sm"
                          onClick={() => handleSpotSelect(spot.id)}
                        >
                          詳細を見る
                        </button>
                        <button className="btn btn-primary btn-sm">
                          プランに追加
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="spots-list">
                {filteredSpots.map(spot => (
                  <div key={spot.id} className="spot-list-item">
                    <div className="spot-image">
                      <div className="image-placeholder">
                        <i className="fas fa-image"></i>
                      </div>
                    </div>
                    <div className="spot-content">
                      <div className="spot-header">
                        <h3 className="spot-name">{spot.name}</h3>
                        <button 
                          className={`bookmark-btn ${bookmarkedSpots.includes(spot.id) ? 'bookmarked' : ''}`}
                          onClick={() => handleBookmark(spot.id)}
                        >
                          <i className="fas fa-bookmark"></i>
                        </button>
                      </div>
                      <div className="spot-meta">
                        <div className="spot-rating">
                          <i className="fas fa-star"></i>
                          <span>{spot.rating}</span>
                        </div>
                        <div className="spot-price">{spot.price}</div>
                        <div className="spot-distance">{spot.distance}</div>
                      </div>
                      <p className="spot-description">{spot.description}</p>
                      <div className="spot-tags">
                        {spot.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="spot-actions">
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => handleSpotSelect(spot.id)}
                      >
                        詳細を見る
                      </button>
                      <button className="btn btn-primary btn-sm">
                        プランに追加
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ページネーション */}
          <div className="pagination">
            <button className="btn btn-outline" disabled>
              <i className="fas fa-chevron-left"></i>
              前へ
            </button>
            <div className="page-numbers">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
            </div>
            <button className="btn btn-outline">
              次へ
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
