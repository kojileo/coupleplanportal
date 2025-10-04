'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC007001Page() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showPaymentHistory, setShowPaymentHistory] = useState(false)

  const subscriptionData = {
    currentPlan: {
      name: 'プレミアムプラン',
      price: 980,
      billingCycle: 'monthly',
      status: 'active',
      nextBillingDate: '2025-02-15',
      features: [
        '無制限のデートプラン生成',
        '高度なAI機能',
        'Date Canvas機能',
        '関係修復サポート',
        '優先サポート'
      ]
    },
    usage: {
      datePlansGenerated: 12,
      datePlansLimit: -1, // -1 means unlimited
      aiFeaturesUsed: 8,
      dateCanvasSessions: 3,
      supportRequests: 1
    },
    billingHistory: [
      {
        id: 1,
        date: '2025-01-15',
        amount: 980,
        status: 'paid',
        description: 'プレミアムプラン - 月額料金'
      },
      {
        id: 2,
        date: '2024-12-15',
        amount: 980,
        status: 'paid',
        description: 'プレミアムプラン - 月額料金'
      },
      {
        id: 3,
        date: '2024-11-15',
        amount: 980,
        status: 'paid',
        description: 'プレミアムプラン - 月額料金'
      }
    ],
    paymentMethod: {
      type: 'credit_card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2025
    }
  }

  const availablePlans = [
    {
      id: 'free',
      name: '無料プラン',
      price: 0,
      billingCycle: 'monthly',
      features: [
        '月5回までデートプラン生成',
        '基本的なAI機能',
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

  const handlePlanChange = (planId: string) => {
    console.log('Plan change requested:', planId)
    // プラン変更の処理
  }

  const handleCancelSubscription = () => {
    if (confirm('サブスクリプションをキャンセルしますか？現在のプランは次回の請求日まで利用できます。')) {
      console.log('Subscription cancellation requested')
    }
  }

  const handleUpdatePaymentMethod = () => {
    console.log('Payment method update requested')
  }

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP')
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
              <h1 className="page-title">課金管理</h1>
              <p className="page-subtitle">サブスクリプションと支払い情報を管理します</p>
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
                  className={`tab-link ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  <i className="fas fa-chart-pie"></i>
                  概要
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'plans' ? 'active' : ''}`}
                  onClick={() => setActiveTab('plans')}
                >
                  <i className="fas fa-crown"></i>
                  プラン
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'billing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('billing')}
                >
                  <i className="fas fa-credit-card"></i>
                  請求・支払い
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'usage' ? 'active' : ''}`}
                  onClick={() => setActiveTab('usage')}
                >
                  <i className="fas fa-chart-bar"></i>
                  利用状況
                </button>
              </li>
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* 概要タブ */}
            {activeTab === 'overview' && (
              <div className="tab-content active">
                <div className="overview-section">
                  {/* 現在のプラン */}
                  <div className="current-plan-card">
                    <h2>現在のプラン</h2>
                    <div className="plan-info">
                      <div className="plan-header">
                        <h3 className="plan-name">{subscriptionData.currentPlan.name}</h3>
                        <span className="plan-status active">{subscriptionData.currentPlan.status}</span>
                      </div>
                      <div className="plan-price">
                        <span className="price">{formatCurrency(subscriptionData.currentPlan.price)}</span>
                        <span className="billing-cycle">/{subscriptionData.currentPlan.billingCycle === 'monthly' ? '月' : '年'}</span>
                      </div>
                      <div className="plan-features">
                        <h4>含まれる機能</h4>
                        <ul className="features-list">
                          {subscriptionData.currentPlan.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <i className="fas fa-check"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="plan-actions">
                        <button 
                          className="btn btn-outline"
                          onClick={() => setActiveTab('plans')}
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
                  </div>

                  {/* 次の請求日 */}
                  <div className="billing-info-card">
                    <h3>次の請求日</h3>
                    <div className="billing-details">
                      <div className="billing-date">
                        <i className="fas fa-calendar"></i>
                        <span>{formatDate(subscriptionData.currentPlan.nextBillingDate)}</span>
                      </div>
                      <div className="billing-amount">
                        <span className="amount">{formatCurrency(subscriptionData.currentPlan.price)}</span>
                        <span className="cycle">/{subscriptionData.currentPlan.billingCycle === 'monthly' ? '月' : '年'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 支払い方法 */}
                  <div className="payment-method-card">
                    <h3>支払い方法</h3>
                    <div className="payment-details">
                      <div className="payment-method">
                        <i className="fas fa-credit-card"></i>
                        <span>**** **** **** {subscriptionData.paymentMethod.last4}</span>
                        <span className="card-brand">{subscriptionData.paymentMethod.brand.toUpperCase()}</span>
                      </div>
                      <div className="payment-expiry">
                        有効期限: {subscriptionData.paymentMethod.expiryMonth}/{subscriptionData.paymentMethod.expiryYear}
                      </div>
                    </div>
                    <button 
                      className="btn btn-outline btn-sm"
                      onClick={handleUpdatePaymentMethod}
                    >
                      支払い方法を変更
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* プランタブ */}
            {activeTab === 'plans' && (
              <div className="tab-content active">
                <div className="plans-section">
                  <h2>利用可能なプラン</h2>
                  <p>あなたに最適なプランを選択してください</p>
                  
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
                              onClick={() => handlePlanChange(plan.id)}
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
            )}

            {/* 請求・支払いタブ */}
            {activeTab === 'billing' && (
              <div className="tab-content active">
                <div className="billing-section">
                  <h2>請求・支払い履歴</h2>
                  
                  <div className="billing-history">
                    <div className="history-header">
                      <h3>支払い履歴</h3>
                      <button 
                        className="btn btn-outline btn-sm"
                        onClick={() => setShowPaymentHistory(!showPaymentHistory)}
                      >
                        {showPaymentHistory ? '詳細を閉じる' : '詳細を見る'}
                      </button>
                    </div>
                    
                    <div className="history-list">
                      {subscriptionData.billingHistory.map(payment => (
                        <div key={payment.id} className="history-item">
                          <div className="payment-info">
                            <div className="payment-description">{payment.description}</div>
                            <div className="payment-date">{formatDate(payment.date)}</div>
                          </div>
                          <div className="payment-amount">
                            <span className="amount">{formatCurrency(payment.amount)}</span>
                            <span className={`status ${payment.status}`}>
                              {payment.status === 'paid' ? '支払い済み' : '未払い'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="payment-method-section">
                    <h3>支払い方法</h3>
                    <div className="payment-method-card">
                      <div className="method-info">
                        <i className="fas fa-credit-card"></i>
                        <div className="method-details">
                          <div className="method-type">
                            {subscriptionData.paymentMethod.brand.toUpperCase()} ****{subscriptionData.paymentMethod.last4}
                          </div>
                          <div className="method-expiry">
                            有効期限: {subscriptionData.paymentMethod.expiryMonth}/{subscriptionData.paymentMethod.expiryYear}
                          </div>
                        </div>
                      </div>
                      <button 
                        className="btn btn-outline"
                        onClick={handleUpdatePaymentMethod}
                      >
                        変更
                      </button>
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
                  </div>
                </div>
              </div>
            )}

            {/* 利用状況タブ */}
            {activeTab === 'usage' && (
              <div className="tab-content active">
                <div className="usage-section">
                  <h2>利用状況</h2>
                  
                  <div className="usage-stats">
                    <div className="stat-card">
                      <h3>デートプラン生成</h3>
                      <div className="stat-value">
                        {subscriptionData.usage.datePlansGenerated}
                        {subscriptionData.usage.datePlansLimit === -1 ? '回' : `/${subscriptionData.usage.datePlansLimit}回`}
                      </div>
                      <div className="stat-progress">
                        {subscriptionData.usage.datePlansLimit !== -1 && (
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ 
                                width: `${(subscriptionData.usage.datePlansGenerated / subscriptionData.usage.datePlansLimit) * 100}%` 
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="stat-card">
                      <h3>AI機能利用</h3>
                      <div className="stat-value">{subscriptionData.usage.aiFeaturesUsed}回</div>
                      <div className="stat-description">今月の利用回数</div>
                    </div>
                    
                    <div className="stat-card">
                      <h3>Date Canvas</h3>
                      <div className="stat-value">{subscriptionData.usage.dateCanvasSessions}セッション</div>
                      <div className="stat-description">今月の利用回数</div>
                    </div>
                    
                    <div className="stat-card">
                      <h3>サポート依頼</h3>
                      <div className="stat-value">{subscriptionData.usage.supportRequests}件</div>
                      <div className="stat-description">今月の依頼数</div>
                    </div>
                  </div>

                  <div className="usage-chart">
                    <h3>利用状況の推移</h3>
                    <div className="chart-placeholder">
                      <i className="fas fa-chart-line"></i>
                      <p>利用状況のグラフがここに表示されます</p>
                    </div>
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
              <Link href="/common/COMMON-003" className="support-link">
                <i className="fas fa-file-alt"></i>
                利用規約
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
