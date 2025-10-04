'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC007002Page() {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const features = [
    {
      id: 'ai-plan-generation',
      name: 'AIデートプラン生成',
      description: 'AIがあなたの好みに合わせて最適なデートプランを自動生成します。',
      icon: 'fas fa-magic',
      status: 'locked',
      requiredPlan: 'premium',
      currentUsage: 5,
      limit: 5,
      benefits: [
        '無制限のデートプラン生成',
        '高度なAI分析',
        'パーソナライズされた提案',
        '季節や天候を考慮した提案'
      ],
      preview: '基本的なデートプラン生成は利用できますが、高度なAI機能は制限されています。'
    },
    {
      id: 'date-canvas',
      name: 'Date Canvas',
      description: '思い出をビジュアルで保存・共有できる特別な機能です。',
      icon: 'fas fa-paint-brush',
      status: 'locked',
      requiredPlan: 'premium',
      currentUsage: 0,
      limit: 0,
      benefits: [
        '思い出のビジュアル保存',
        '共同編集機能',
        'カスタムステッカー',
        'エクスポート機能'
      ],
      preview: 'Date Canvas機能はプレミアムプランでのみ利用できます。'
    },
    {
      id: 'relationship-support',
      name: '関係修復サポート',
      description: 'AIが喧嘩や対立の仲裁をサポートし、より良い関係を築きます。',
      icon: 'fas fa-heart',
      status: 'locked',
      requiredPlan: 'premium',
      currentUsage: 0,
      limit: 0,
      benefits: [
        'AI仲裁機能',
        '関係性分析',
        '段階的改善プラン',
        '専門的なサポート'
      ],
      preview: '関係修復サポートはプレミアムプランでのみ利用できます。'
    },
    {
      id: 'advanced-collaboration',
      name: '高度な共同編集',
      description: 'パートナーと一緒にリアルタイムでデートプランを作成・編集できます。',
      icon: 'fas fa-users',
      status: 'locked',
      requiredPlan: 'premium',
      currentUsage: 2,
      limit: 3,
      benefits: [
        'リアルタイム同期',
        '編集競合の自動解決',
        '編集履歴の管理',
        '承認ワークフロー'
      ],
      preview: '基本的な共同編集は利用できますが、高度な機能は制限されています。'
    },
    {
      id: 'priority-support',
      name: '優先サポート',
      description: '24時間以内の回答保証と優先的なサポートを受けられます。',
      icon: 'fas fa-headset',
      status: 'locked',
      requiredPlan: 'premium',
      currentUsage: 0,
      limit: 0,
      benefits: [
        '24時間以内の回答保証',
        '優先的なサポート',
        '専門的なアドバイス',
        '電話サポート'
      ],
      preview: '優先サポートはプレミアムプランでのみ利用できます。'
    },
    {
      id: 'analytics',
      name: '詳細分析',
      description: 'デートの履歴や関係性の変化を詳細に分析できます。',
      icon: 'fas fa-chart-line',
      status: 'locked',
      requiredPlan: 'premium',
      currentUsage: 0,
      limit: 0,
      benefits: [
        'デート履歴の分析',
        '関係性の変化追跡',
        'カスタムレポート',
        'データエクスポート'
      ],
      preview: '詳細分析機能はプレミアムプランでのみ利用できます。'
    }
  ]

  const currentPlan = {
    name: '無料プラン',
    price: 0,
    features: [
      '月5回までデートプラン生成',
      '基本的な共同編集',
      'コミュニティサポート'
    ]
  }

  const premiumPlan = {
    name: 'プレミアムプラン',
    price: 980,
    billingCycle: 'monthly',
    features: [
      '無制限のデートプラン生成',
      '高度なAI機能',
      'Date Canvas機能',
      '関係修復サポート',
      '優先サポート',
      '詳細分析'
    ]
  }

  const handleFeatureClick = (featureId: string) => {
    const feature = features.find(f => f.id === featureId)
    if (feature && feature.status === 'locked') {
      setSelectedFeature(featureId)
      setShowUpgradeModal(true)
    }
  }

  const handleUpgrade = () => {
    console.log('Upgrade to premium plan')
    // アップグレード処理
    window.location.href = '/uc007/UC007-001'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unlocked': return 'text-green-500'
      case 'locked': return 'text-red-500'
      case 'limited': return 'text-yellow-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unlocked': return 'fas fa-check-circle'
      case 'locked': return 'fas fa-lock'
      case 'limited': return 'fas fa-exclamation-triangle'
      default: return 'fas fa-question-circle'
    }
  }

  const getUsageColor = (current: number, limit: number) => {
    if (limit === 0) return 'text-gray-500'
    const percentage = (current / limit) * 100
    if (percentage >= 90) return 'text-red-500'
    if (percentage >= 70) return 'text-yellow-500'
    return 'text-green-500'
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
              <h1 className="page-title">機能解放</h1>
              <p className="page-subtitle">プレミアム機能を解放して、より充実したデート体験を</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 現在のプラン */}
          <div className="current-plan-section">
            <div className="plan-card current">
              <h2>現在のプラン</h2>
              <div className="plan-info">
                <h3 className="plan-name">{currentPlan.name}</h3>
                <div className="plan-price">
                  <span className="price">¥{currentPlan.price}</span>
                  <span className="billing-cycle">/月</span>
                </div>
                <div className="plan-features">
                  <h4>含まれる機能</h4>
                  <ul className="features-list">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <i className="fas fa-check"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* 機能一覧 */}
          <div className="features-section">
            <h2>利用可能な機能</h2>
            <p>プレミアムプランにアップグレードすると、すべての機能が利用可能になります</p>
            
            <div className="features-grid">
              {features.map(feature => (
                <div 
                  key={feature.id} 
                  className={`feature-card ${feature.status === 'locked' ? 'locked' : ''}`}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <div className="feature-header">
                    <div className="feature-icon">
                      <i className={feature.icon}></i>
                    </div>
                    <div className="feature-status">
                      <i className={`${getStatusIcon(feature.status)} ${getStatusColor(feature.status)}`}></i>
                    </div>
                  </div>
                  
                  <div className="feature-content">
                    <h3 className="feature-name">{feature.name}</h3>
                    <p className="feature-description">{feature.description}</p>
                    
                    {feature.status === 'locked' ? (
                      <div className="feature-locked">
                        <p className="locked-text">プレミアムプランで利用可能</p>
                        <button className="btn btn-primary btn-sm">
                          アップグレード
                        </button>
                      </div>
                    ) : (
                      <div className="feature-usage">
                        <div className="usage-info">
                          <span className="usage-text">
                            利用回数: {feature.currentUsage}
                            {feature.limit > 0 ? `/${feature.limit}` : ''}
                          </span>
                          <span className={`usage-status ${getUsageColor(feature.currentUsage, feature.limit)}`}>
                            {feature.limit === 0 ? '無制限' : 
                             feature.currentUsage >= feature.limit ? '制限に達しました' : '利用可能'}
                          </span>
                        </div>
                        {feature.limit > 0 && (
                          <div className="usage-bar">
                            <div 
                              className="usage-fill"
                              style={{ 
                                width: `${Math.min((feature.currentUsage / feature.limit) * 100, 100)}%` 
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* プレミアムプラン紹介 */}
          <div className="premium-plan-section">
            <div className="premium-card">
              <h2>プレミアムプランにアップグレード</h2>
              <p>すべての機能を利用して、より充実したデート体験を楽しみましょう</p>
              
              <div className="premium-features">
                <h3>プレミアムプランの特典</h3>
                <ul className="premium-features-list">
                  {premiumPlan.features.map((feature, index) => (
                    <li key={index} className="premium-feature-item">
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="premium-pricing">
                <div className="price-info">
                  <span className="price">¥{premiumPlan.price}</span>
                  <span className="billing-cycle">/{premiumPlan.billingCycle === 'monthly' ? '月' : '年'}</span>
                </div>
                <p className="price-description">いつでもキャンセル可能</p>
              </div>
              
              <div className="premium-actions">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleUpgrade}
                >
                  <i className="fas fa-crown"></i>
                  プレミアムプランにアップグレード
                </button>
                <p className="upgrade-note">
                  アップグレードすると、即座にすべての機能が利用可能になります
                </p>
              </div>
            </div>
          </div>

          {/* よくある質問 */}
          <div className="faq-section">
            <h2>よくある質問</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3>プレミアムプランはいつでもキャンセルできますか？</h3>
                <p>はい、いつでもキャンセル可能です。キャンセル後も現在の請求期間中は利用できます。</p>
              </div>
              <div className="faq-item">
                <h3>アップグレード後、すぐに機能が使えますか？</h3>
                <p>はい、アップグレード後即座にすべての機能が利用可能になります。</p>
              </div>
              <div className="faq-item">
                <h3>年額プランはありますか？</h3>
                <p>はい、年額プランもご利用いただけます。2ヶ月分お得になります。</p>
              </div>
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
                お問い合わせ
              </Link>
              <Link href="/uc007/UC007-001" className="support-link">
                <i className="fas fa-credit-card"></i>
                課金管理
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* アップグレードモーダル */}
      {showUpgradeModal && selectedFeature && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>プレミアムプランにアップグレード</h3>
              <button 
                className="modal-close"
                onClick={() => setShowUpgradeModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <p>
                {features.find(f => f.id === selectedFeature)?.name} を利用するには、
                プレミアムプランにアップグレードが必要です。
              </p>
              
              <div className="upgrade-benefits">
                <h4>プレミアムプランの特典</h4>
                <ul className="benefits-list">
                  {premiumPlan.features.map((feature, index) => (
                    <li key={index} className="benefit-item">
                      <i className="fas fa-check"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowUpgradeModal(false)}
              >
                キャンセル
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleUpgrade}
              >
                アップグレード
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
