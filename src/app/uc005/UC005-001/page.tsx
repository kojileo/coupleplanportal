'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function UC005001Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState('pen')
  const [currentColor, setCurrentColor] = useState('#ff6b6b')
  const [brushSize, setBrushSize] = useState(5)
  const [isConnected, setIsConnected] = useState(true)
  const [partnerInfo, setPartnerInfo] = useState({
    name: '田中太郎',
    isOnline: true,
    lastSeen: '2分前'
  })

  const [memories, setMemories] = useState([
    {
      id: 1,
      title: '初デートの思い出',
      date: '2024-12-25',
      location: '表参道',
      image: '/images/memory1.jpg',
      x: 100,
      y: 150,
      width: 200,
      height: 150
    },
    {
      id: 2,
      title: 'クリスマスデート',
      date: '2024-12-24',
      location: '六本木',
      image: '/images/memory2.jpg',
      x: 400,
      y: 200,
      width: 180,
      height: 120
    }
  ])

  const [selectedMemory, setSelectedMemory] = useState<number | null>(null)
  const [isAddingMemory, setIsAddingMemory] = useState(false)
  const [newMemory, setNewMemory] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  })

  const tools = [
    { id: 'pen', name: 'ペン', icon: 'fas fa-pen' },
    { id: 'eraser', name: '消しゴム', icon: 'fas fa-eraser' },
    { id: 'text', name: 'テキスト', icon: 'fas fa-font' },
    { id: 'sticker', name: 'ステッカー', icon: 'fas fa-star' },
    { id: 'arrow', name: '矢印', icon: 'fas fa-arrow-right' }
  ]

  const colors = [
    '#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3',
    '#f38ba8', '#a8e6cf', '#ffd3a5', '#fd79a8',
    '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // キャンバスの初期設定
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = currentColor
    ctx.lineWidth = brushSize

    // 既存のメモリを描画
    memories.forEach(memory => {
      drawMemory(ctx, memory)
    })
  }, [memories, currentColor, brushSize])

  const drawMemory = (ctx: CanvasRenderingContext2D, memory: any) => {
    // メモリカードを描画
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(memory.x, memory.y, memory.width, memory.height)
    
    // ボーダー
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 2
    ctx.strokeRect(memory.x, memory.y, memory.width, memory.height)
    
    // タイトル
    ctx.fillStyle = '#333333'
    ctx.font = '14px Noto Sans JP'
    ctx.fillText(memory.title, memory.x + 10, memory.y + 25)
    
    // 日付
    ctx.fillStyle = '#666666'
    ctx.font = '12px Noto Sans JP'
    ctx.fillText(memory.date, memory.x + 10, memory.y + 45)
    
    // 場所
    ctx.fillText(memory.location, memory.x + 10, memory.y + 65)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (currentTool === 'pen' || currentTool === 'eraser') {
      setIsDrawing(true)
      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.beginPath()
      ctx.moveTo(x, y)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (currentTool === 'pen') {
      ctx.strokeStyle = currentColor
      ctx.lineWidth = brushSize
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = brushSize * 2
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  const handleToolChange = (tool: string) => {
    setCurrentTool(tool)
  }

  const handleColorChange = (color: string) => {
    setCurrentColor(color)
  }

  const handleBrushSizeChange = (size: number) => {
    setBrushSize(size)
  }

  const handleMemoryAdd = () => {
    if (newMemory.title && newMemory.date && newMemory.location) {
      const memory = {
        id: Date.now(),
        ...newMemory,
        image: '/images/memory-placeholder.jpg',
        x: Math.random() * 400 + 50,
        y: Math.random() * 300 + 50,
        width: 200,
        height: 150
      }
      setMemories(prev => [...prev, memory])
      setNewMemory({
        title: '',
        date: '',
        location: '',
        description: ''
      })
      setIsAddingMemory(false)
    }
  }

  const handleMemorySelect = (memoryId: number) => {
    setSelectedMemory(selectedMemory === memoryId ? null : memoryId)
  }

  const handleSave = () => {
    // キャンバスを保存
    const canvas = canvasRef.current
    if (!canvas) return

    const dataURL = canvas.toDataURL('image/png')
    console.log('Canvas saved:', dataURL)
    alert('Date Canvasが保存されました')
  }

  const handleClear = () => {
    if (confirm('キャンバスをクリアしますか？')) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
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
                <i className="fas fa-paint-brush"></i>
              </div>
              <h1>パートナーとの連携が必要です</h1>
              <p>Date Canvasを使用するには、パートナーとの連携が必要です。</p>
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
              <h1 className="page-title">Date Canvas</h1>
              <p className="page-subtitle">思い出をビジュアルで共有・保存しましょう</p>
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

          {/* ツールバー */}
          <div className="toolbar">
            <div className="toolbar-section">
              <h3>ツール</h3>
              <div className="tool-buttons">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    className={`tool-btn ${currentTool === tool.id ? 'active' : ''}`}
                    onClick={() => handleToolChange(tool.id)}
                  >
                    <i className={tool.icon}></i>
                    <span>{tool.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="toolbar-section">
              <h3>色</h3>
              <div className="color-palette">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-btn ${currentColor === color ? 'active' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </div>

            <div className="toolbar-section">
              <h3>ブラシサイズ</h3>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => handleBrushSizeChange(Number(e.target.value))}
                className="brush-slider"
              />
              <span className="brush-size">{brushSize}px</span>
            </div>

            <div className="toolbar-section">
              <h3>アクション</h3>
              <div className="action-buttons">
                <button className="btn btn-outline" onClick={handleClear}>
                  <i className="fas fa-trash"></i>
                  クリア
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  <i className="fas fa-save"></i>
                  保存
                </button>
              </div>
            </div>
          </div>

          {/* キャンバスエリア */}
          <div className="canvas-container">
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="date-canvas"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              />
            </div>
          </div>

          {/* メモリパネル */}
          <div className="memories-panel">
            <div className="panel-header">
              <h3>思い出</h3>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setIsAddingMemory(true)}
              >
                <i className="fas fa-plus"></i>
                追加
              </button>
            </div>

            <div className="memories-list">
              {memories.map(memory => (
                <div 
                  key={memory.id} 
                  className={`memory-item ${selectedMemory === memory.id ? 'selected' : ''}`}
                  onClick={() => handleMemorySelect(memory.id)}
                >
                  <div className="memory-image">
                    <div className="image-placeholder">
                      <i className="fas fa-image"></i>
                    </div>
                  </div>
                  <div className="memory-content">
                    <h4 className="memory-title">{memory.title}</h4>
                    <div className="memory-meta">
                      <span className="memory-date">{memory.date}</span>
                      <span className="memory-location">{memory.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* メモリ追加フォーム */}
          {isAddingMemory && (
            <div className="memory-form-modal">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>思い出を追加</h3>
                  <button 
                    className="modal-close"
                    onClick={() => setIsAddingMemory(false)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">タイトル</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newMemory.title}
                      onChange={(e) => setNewMemory(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="思い出のタイトル"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">日付</label>
                    <input
                      type="date"
                      className="form-input"
                      value={newMemory.date}
                      onChange={(e) => setNewMemory(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">場所</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newMemory.location}
                      onChange={(e) => setNewMemory(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="場所を入力"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">説明</label>
                    <textarea
                      className="form-input form-textarea"
                      value={newMemory.description}
                      onChange={(e) => setNewMemory(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="思い出の説明"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-outline" onClick={() => setIsAddingMemory(false)}>
                    キャンセル
                  </button>
                  <button className="btn btn-primary" onClick={handleMemoryAdd}>
                    <i className="fas fa-plus"></i>
                    追加
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
