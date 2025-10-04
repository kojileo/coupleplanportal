'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC007005Page() {
  const [activeTab, setActiveTab] = useState('subscriptions')
  const [showCancelModal, setShowCancelModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const subscriptionData = {
    current: {
      id: 'sub_001',
      planName: 'プレミアムプラン',
      status: 'active',
      startDate: '2024-12-15',
      nextBillingDate: '2025-02-15',
      billingCycle: 'monthly',
      amount: 980,
      currency: 'JPY',
      paymentMethod: {
        type: 'credit_card',
        last4: '4242',
        brand: 'visa',
        expiryMonth: 12,
        expiryYear: 2025
      },
      features: [
        '無制限のデートプラン生成',
        '高度なAI機能',
        'Date Canvas機能',
        '関係修復サポート',
        '優先サポート'
      ]
    },
    history: [
      {
        id: 'sub_002',
        planName: '無料プラン',
        status: 'cancelled',
        startDate: '2024-11-01',
        endDate: '2024-12-14',
        billingCycle: 'monthly',
        amount: 0,
        cancellationReason: 'アップグレード'
      },
      {
        id: 'sub_003',
        planName: 'プレミアムプラン（試用）',
        status: 'cancelled',
        startDate: '2024-11-15',
        endDate: '2024-12-14',
        billingCycle: 'monthly',
        amount: 0,
        cancellationReason: '試用期間終了'
      }
    ]
  }

  const availablePlans = [
    {
      id: 'free',
      name: '無料プラン',
      price: 0,
      billingCycle: 'monthly',
      features: [
        '月5回までデートプラン生成',
        '基本的な共同編集',
        'コミュニティサポート'
      ],
      limitations: [
        '高度なAI機能は利用不可',
        'Date Canvas機能は利用不可',
        '関係修復サポートは利用不可'
      ]
    },
    {
      id: 'premium',
      name: 'プレミアムプラン',
      price: 980,
      billingCycle: 'monthly',
      features: [
        '無制限のデートプラン生成',
        '高度なAI機能',
        'Date Canvas機能',
        '関係修復サポート',
        '優先サポート'
      ],
      current: true
    },
    {
      id: 'premium-yearly',
      name: 'プレミアムプラン（年額）',
      price: 9800,
      billingCycle: 'yearly',
      features: [
        '無制限のデートプラン生成',
        '高度なAI機能',
        'Date Canvas機能',
        '関係修復サポート',
        '優先サポート',
        '2ヶ月分お得'
      ],
      discount: '2ヶ月分お得'
    }
  ]

  const cancellationReasons = [
    '価格が高い',
    '機能が不要',
    '使いにくい',
    'サポートが悪い',
    '一時的な利用停止',
    '他のサービスに移行',
    'その他'
  ]

  const handleCancelSubscription = () => {
    setShowCancelModal(true)
  }

  const handleUpgradeSubscription = () => {
    setShowUpgradeModal(true)
  }

  const handleConfirmCancel = (reason: string) => {
    console.log('Subscription cancelled:', reason)
    setShowCancelModal(false)
  }

  const handleConfirmUpgrade = (planId: string) => {
    console.log('Subscription upgraded:', planId)
    setShowUpgradeModal(false)
  }

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500'
      case 'cancelled': return 'text-red-500'
      case 'paused': return 'text-yellow-500'
      case 'expired': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'アクティブ'
      case 'cancelled': return 'キャンセル済み'
      case 'paused': return '一時停止'
      case 'expired': return '期限切れ'
      default: return '不明'
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
              <h1 className="page-title">サブスクリプション管理</h1>
              <p className="page-subtitle">サブスクリプションの詳細と履歴を管理します</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* タブナビゲーション */}
          <div className="tabs">
            <ul className="tab-list">
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'subscriptions' ? 'active' : ''}`}
                  onClick={() => setActiveTab('subscriptions')}
                >
                  <i className="fas fa-crown"></i>
                  現在のプラン
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'history' ? 'active' : ''}`}
                  onClick={() => setActiveTab('history')}
                >
                  <i className="fas fa-history"></i>
                  履歴
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'billing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('billing')}
                >
                  <i className="fas fa-credit-card"></i>
                  請求情報
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* 現在のプランタブ */}
            {activeTab === 'subscriptions' && (
              <div className="tab-content active">
                <div className="subscription-section">
                  {/* 現在のサブスクリプション */}
                  <div className="current-subscription">
                    <h2>現在のサブスクリプション</h2>
                    
                    <div className="subscription-card">
                      <div className="subscription-header">
                        <div className="subscription-info">
                          <h3 className="plan-name">{subscriptionData.current.planName}</h3>
                          <span className={`status ${getStatusColor(subscriptionData.current.status)}`}>
                            {getStatusText(subscriptionData.current.status)}
                          </span>
                        </div>
                        <div className="subscription-actions">
                          <button 
                            className="btn btn-outline"
                            onClick={handleUpgradeSubscription}
                          >
                            プランを変更
                          </button>
                          <button 
                            className="btn btn-outline btn-danger"
                            onClick={handleCancelSubscription}
                          >
                            キャンセル
                          </button>
                        </div>
                      </div>
                      
                      <div className="subscription-details">
                        <div className="detail-row">
                          <span className="detail-label">料金</span>
                          <span className="detail-value">
                            {formatCurrency(subscriptionData.current.amount)}/{subscriptionData.current.billingCycle === 'monthly' ? '月' : '年'}
                          </span>
                        </div>
                        
                        <div className="detail-row">
                          <span className="detail-label">開始日</span>
                          <span className="detail-value">{formatDate(subscriptionData.current.startDate)}</span>
                        </div>
                        
                        <div className="detail-row">
                          <span className="detail-label">次回請求日</span>
                          <span className="detail-value">{formatDate(subscriptionData.current.nextBillingDate)}</span>
                        </div>
                        
                        <div className="detail-row">
                          <span className="detail-label">支払い方法</span>
                          <span className="detail-value">
                            {subscriptionData.current.paymentMethod.brand.toUpperCase()} ****{subscriptionData.current.paymentMethod.last4}
                          </span>
                        </div>
                      </div>
                      
                      <div className="subscription-features">
                        <h4>含まれる機能</h4>
                        <ul className="features-list">
                          {subscriptionData.current.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <i className="fas fa-check"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 利用可能なプラン */}
                  <div className="available-plans">
                    <h2>利用可能なプラン</h2>
                    <p>プランを変更して、より多くの機能を利用しましょう</p>
                    
                    <div className="plans-grid">
                      {availablePlans.map(plan => (
                        <div key={plan.id} className={`plan-card ${plan.current ? 'current' : ''}`}>
                          {plan.current && (
                            <div className="current-badge">現在のプラン</div>
                          )}
                          
                          <div className="plan-header">
                            <h3 className="plan-name">{plan.name}</h3>
                            {plan.discount && (
                              <span className="discount-badge">{plan.discount}</span>
                            )}
                          </div>
                          
                          <div className="plan-price">
                            <span className="price">{formatCurrency(plan.price)}</span>
                            <span className="billing-cycle">/{plan.billingCycle === 'monthly' ? '月' : '年'}</span>
                          </div>
                          
                          <div className="plan-features">
                            <h4>含まれる機能</h4>
                            <ul className="features-list">
                              {plan.features.map((feature, index) => (
                                <li key={index} className="feature-item">
                                  <i className="fas fa-check"></i>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {plan.limitations && (
                            <div className="plan-limitations">
                              <h4>制限事項</h4>
                              <ul className="limitations-list">
                                {plan.limitations.map((limitation, index) => (
                                  <li key={index} className="limitation-item">
                                    <i className="fas fa-times"></i>
                                    {limitation}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          <div className="plan-actions">
                            {plan.current ? (
                              <button className="btn btn-primary" disabled>
                                現在のプラン
                              </button>
                            ) : (
                              <button 
                                className="btn btn-primary"
                                onClick={() => handleConfirmUpgrade(plan.id)}
                              >
                                プランを変更
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 履歴タブ */}
            {activeTab === 'history' && (
              <div className="tab-content active">
                <div className="history-section">
                  <h2>サブスクリプション履歴</h2>
                  <p>過去のサブスクリプション変更履歴を確認できます</p>
                  
                  <div className="history-timeline">
                    {subscriptionData.history.map((subscription, index) => (
                      <div key={subscription.id} className="history-item">
                        <div className="history-icon">
                          <i className="fas fa-history"></i>
                        </div>
                        
                        <div className="history-content">
                          <div className="history-header">
                            <h3 className="history-title">{subscription.planName}</h3>
                            <span className={`history-status ${getStatusColor(subscription.status)}`}>
                              {getStatusText(subscription.status)}
                            </span>
                          </div>
                          
                          <div className="history-details">
                            <div className="detail-row">
                              <span className="detail-label">期間</span>
                              <span className="detail-value">
                                {formatDate(subscription.startDate)} - {formatDate(subscription.endDate)}
                              </span>
                            </div>
                            
                            <div className="detail-row">
                              <span className="detail-label">料金</span>
                              <span className="detail-value">
                                {formatCurrency(subscription.amount)}/{subscription.billingCycle === 'monthly' ? '月' : '年'}
                              </span>
                            </div>
                            
                            <div className="detail-row">
                              <span className="detail-label">終了理由</span>
                              <span className="detail-value">{subscription.cancellationReason}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 請求情報タブ */}
            {activeTab === 'billing' && (
              <div className="tab-content active">
                <div className="billing-section">
                  <h2>請求情報</h2>
                  
                  <div className="billing-overview">
                    <div className="billing-card">
                      <h3>次回請求情報</h3>
                      <div className="billing-details">
                        <div className="billing-item">
                          <span className="billing-label">請求日</span>
                          <span className="billing-value">{formatDate(subscriptionData.current.nextBillingDate)}</span>
                        </div>
                        <div className="billing-item">
                          <span className="billing-label">金額</span>
                          <span className="billing-value">{formatCurrency(subscriptionData.current.amount)}</span>
                        </div>
                        <div className="billing-item">
                          <span className="billing-label">支払い方法</span>
                          <span className="billing-value">
                            {subscriptionData.current.paymentMethod.brand.toUpperCase()} ****{subscriptionData.current.paymentMethod.last4}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="billing-card">
                      <h3>支払い方法</h3>
                      <div className="payment-method-info">
                        <div className="payment-method">
                          <i className="fas fa-credit-card"></i>
                          <div className="method-details">
                            <div className="method-type">
                              {subscriptionData.current.paymentMethod.brand.toUpperCase()} ****{subscriptionData.current.paymentMethod.last4}
                            </div>
                            <div className="method-expiry">
                              有効期限: {subscriptionData.current.paymentMethod.expiryMonth}/{subscriptionData.current.paymentMethod.expiryYear}
                            </div>
                          </div>
                        </div>
                        <button className="btn btn-outline btn-sm">
                          変更
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="billing-actions">
                    <button className="btn btn-outline">
                      <i className="fas fa-download"></i>
                      請求書をダウンロード
                    </button>
                    <button className="btn btn-outline">
                      <i className="fas fa-envelope"></i>
                      請求書をメールで送信
                    </button>
                    <button className="btn btn-outline">
                      <i className="fas fa-edit"></i>
                      支払い方法を変更
                    </button>
                  </div>
                </div>
              </div>
            )}
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

      {/* キャンセルモーダル */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>サブスクリプションのキャンセル</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCancelModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <p>
                サブスクリプションをキャンセルしますか？現在のプランは次回の請求日まで利用できます。
              </p>
              
              <div className="cancellation-reasons">
                <h4>キャンセル理由を教えてください</h4>
                <div className="reasons-list">
                  {cancellationReasons.map((reason, index) => (
                    <label key={index} className="reason-option">
                      <input type="radio" name="cancellation-reason" value={reason} />
                      <span className="reason-text">{reason}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowCancelModal(false)}
              >
                キャンセル
              </button>
              <button 
                className="btn btn-danger"
                onClick={() => handleConfirmCancel('価格が高い')}
              >
                キャンセルを確定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* アップグレードモーダル */}
      {showUpgradeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>プランの変更</h3>
              <button 
                className="modal-close"
                onClick={() => setShowUpgradeModal(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="modal-body">
              <p>どのプランに変更しますか？</p>
              
              <div className="upgrade-options">
                {availablePlans.filter(plan => !plan.current).map(plan => (
                  <div key={plan.id} className="upgrade-option">
                    <div className="option-header">
                      <h4>{plan.name}</h4>
                      <div className="option-price">
                        {formatCurrency(plan.price)}/{plan.billingCycle === 'monthly' ? '月' : '年'}
                      </div>
                    </div>
                    <ul className="option-features">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="option-feature">
                          <i className="fas fa-check"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => handleConfirmUpgrade(plan.id)}
                    >
                      このプランに変更
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-outline"
                onClick={() => setShowUpgradeModal(false)}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
