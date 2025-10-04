'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC007004Page() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [showDetailedChart, setShowDetailedChart] = useState(false)

  const analyticsData = {
    overview: {
      totalRevenue: 2456000,
      monthlyRecurringRevenue: 98000,
      averageRevenuePerUser: 980,
      churnRate: 2.5,
      customerLifetimeValue: 11760,
      conversionRate: 12.3
    },
    revenue: {
      monthly: [
        { month: '2024-07', revenue: 45000, users: 45 },
        { month: '2024-08', revenue: 52000, users: 52 },
        { month: '2024-09', revenue: 61000, users: 61 },
        { month: '2024-10', revenue: 73000, users: 73 },
        { month: '2024-11', revenue: 85000, users: 85 },
        { month: '2024-12', revenue: 92000, users: 92 },
        { month: '2025-01', revenue: 98000, users: 98 }
      ],
      yearly: [
        { year: '2022', revenue: 120000, users: 120 },
        { year: '2023', revenue: 450000, users: 450 },
        { year: '2024', revenue: 1200000, users: 1200 },
        { year: '2025', revenue: 2456000, users: 2456 }
      ]
    },
    userMetrics: {
      totalUsers: 2456,
      activeUsers: 2156,
      newUsers: 156,
      churnedUsers: 45,
      freeUsers: 1800,
      premiumUsers: 656,
      conversionRate: 12.3
    },
    planDistribution: [
      { plan: '無料プラン', users: 1800, percentage: 73.3, revenue: 0 },
      { plan: 'プレミアムプラン', users: 656, percentage: 26.7, revenue: 642880 }
    ],
    churnAnalysis: {
      monthlyChurn: 2.5,
      reasons: [
        { reason: '価格が高い', percentage: 35, count: 16 },
        { reason: '機能が不要', percentage: 28, count: 13 },
        { reason: '使いにくい', percentage: 20, count: 9 },
        { reason: 'サポートが悪い', percentage: 12, count: 5 },
        { reason: 'その他', percentage: 5, count: 2 }
      ]
    },
    featureUsage: [
      { feature: 'AIデートプラン生成', usage: 85, satisfaction: 4.2 },
      { feature: '共同編集', usage: 72, satisfaction: 4.0 },
      { feature: 'Date Canvas', usage: 45, satisfaction: 4.5 },
      { feature: '関係修復サポート', usage: 23, satisfaction: 4.1 },
      { feature: '詳細分析', usage: 38, satisfaction: 3.8 }
    ],
    paymentMethods: [
      { method: 'クレジットカード', percentage: 78, count: 512 },
      { method: 'PayPal', percentage: 15, count: 98 },
      { method: '銀行振込', percentage: 5, count: 33 },
      { method: 'その他', percentage: 2, count: 13 }
    ]
  }

  const periods = [
    { id: 'week', name: '過去1週間' },
    { id: 'month', name: '過去1ヶ月' },
    { id: 'quarter', name: '過去3ヶ月' },
    { id: 'year', name: '過去1年' },
    { id: 'all', name: 'すべて' }
  ]

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  const getRevenueChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100
    return {
      value: Math.abs(change),
      direction: change >= 0 ? 'up' : 'down',
      color: change >= 0 ? 'text-green-500' : 'text-red-500'
    }
  }

  const getChangeIcon = (direction: string) => {
    return direction === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'
  }

  const getSatisfactionColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500'
    if (rating >= 4.0) return 'text-yellow-500'
    if (rating >= 3.5) return 'text-orange-500'
    return 'text-red-500'
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
              <h1 className="page-title">課金指標分析</h1>
              <p className="page-subtitle">収益とユーザー指標を詳細に分析します</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary" onClick={() => window.history.back()}>
                <i className="fas fa-arrow-left"></i>
                戻る
              </button>
            </div>
          </div>

          {/* 期間選択 */}
          <div className="period-selector">
            <h3>分析期間</h3>
            <div className="period-buttons">
              {periods.map(period => (
                <button
                  key={period.id}
                  className={`period-btn ${selectedPeriod === period.id ? 'active' : ''}`}
                  onClick={() => setSelectedPeriod(period.id)}
                >
                  {period.name}
                </button>
              ))}
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
                  className={`tab-link ${activeTab === 'revenue' ? 'active' : ''}`}
                  onClick={() => setActiveTab('revenue')}
                >
                  <i className="fas fa-yen-sign"></i>
                  収益
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'users' ? 'active' : ''}`}
                  onClick={() => setActiveTab('users')}
                >
                  <i className="fas fa-users"></i>
                  ユーザー
                </button>
              </li>
              <li className="tab-item">
                <button 
                  className={`tab-link ${activeTab === 'features' ? 'active' : ''}`}
                  onClick={() => setActiveTab('features')}
                >
                  <i className="fas fa-star"></i>
                  機能
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
                  <h2>主要指標</h2>
                  
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <h3>総収益</h3>
                      <div className="metric-value">{formatCurrency(analyticsData.overview.totalRevenue)}</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+15.2%</span>
                        <span className="metric-period">前月比</span>
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>月次経常収益</h3>
                      <div className="metric-value">{formatCurrency(analyticsData.overview.monthlyRecurringRevenue)}</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+6.5%</span>
                        <span className="metric-period">前月比</span>
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>ユーザー単価</h3>
                      <div className="metric-value">{formatCurrency(analyticsData.overview.averageRevenuePerUser)}</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+2.1%</span>
                        <span className="metric-period">前月比</span>
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>解約率</h3>
                      <div className="metric-value">{formatPercentage(analyticsData.overview.churnRate)}</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-down text-green-500"></i>
                        <span className="text-green-500">-0.8%</span>
                        <span className="metric-period">前月比</span>
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>顧客生涯価値</h3>
                      <div className="metric-value">{formatCurrency(analyticsData.overview.customerLifetimeValue)}</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+8.3%</span>
                        <span className="metric-period">前月比</span>
                      </div>
                    </div>
                    
                    <div className="metric-card">
                      <h3>コンバージョン率</h3>
                      <div className="metric-value">{formatPercentage(analyticsData.overview.conversionRate)}</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+1.2%</span>
                        <span className="metric-period">前月比</span>
                      </div>
                    </div>
                  </div>

                  {/* 収益推移チャート */}
                  <div className="chart-section">
                    <h3>収益推移</h3>
                    <div className="chart-container">
                      <div className="chart-placeholder">
                        <i className="fas fa-chart-line"></i>
                        <p>収益推移のグラフがここに表示されます</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 収益タブ */}
            {activeTab === 'revenue' && (
              <div className="tab-content active">
                <div className="revenue-section">
                  <h2>収益分析</h2>
                  
                  <div className="revenue-overview">
                    <div className="revenue-card">
                      <h3>月次収益</h3>
                      <div className="revenue-value">{formatCurrency(analyticsData.overview.monthlyRecurringRevenue)}</div>
                      <div className="revenue-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+6.5%</span>
                        <span>前月比</span>
                      </div>
                    </div>
                    
                    <div className="revenue-card">
                      <h3>年間収益</h3>
                      <div className="revenue-value">{formatCurrency(analyticsData.overview.totalRevenue)}</div>
                      <div className="revenue-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+45.2%</span>
                        <span>前年比</span>
                      </div>
                    </div>
                  </div>

                  {/* 収益推移テーブル */}
                  <div className="revenue-table">
                    <h3>収益推移詳細</h3>
                    <div className="table-container">
                      <table className="data-table">
                        <thead>
                          <tr>
                            <th>期間</th>
                            <th>収益</th>
                            <th>ユーザー数</th>
                            <th>変化率</th>
                          </tr>
                        </thead>
                        <tbody>
                          {analyticsData.revenue.monthly.map((data, index) => {
                            const previousData = index > 0 ? analyticsData.revenue.monthly[index - 1] : null
                            const change = previousData ? getRevenueChange(data.revenue, previousData.revenue) : null
                            
                            return (
                              <tr key={data.month}>
                                <td>{data.month}</td>
                                <td>{formatCurrency(data.revenue)}</td>
                                <td>{data.users}人</td>
                                <td>
                                  {change && (
                                    <span className={`change ${change.color}`}>
                                      <i className={getChangeIcon(change.direction)}></i>
                                      {formatPercentage(change.value)}
                                    </span>
                                  )}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* プラン別収益 */}
                  <div className="plan-revenue">
                    <h3>プラン別収益</h3>
                    <div className="plan-revenue-grid">
                      {analyticsData.planDistribution.map((plan, index) => (
                        <div key={index} className="plan-revenue-card">
                          <h4>{plan.plan}</h4>
                          <div className="plan-metrics">
                            <div className="plan-metric">
                              <span className="metric-label">ユーザー数</span>
                              <span className="metric-value">{plan.users}人</span>
                            </div>
                            <div className="plan-metric">
                              <span className="metric-label">割合</span>
                              <span className="metric-value">{formatPercentage(plan.percentage)}</span>
                            </div>
                            <div className="plan-metric">
                              <span className="metric-label">収益</span>
                              <span className="metric-value">{formatCurrency(plan.revenue)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ユーザータブ */}
            {activeTab === 'users' && (
              <div className="tab-content active">
                <div className="users-section">
                  <h2>ユーザー分析</h2>
                  
                  <div className="user-metrics">
                    <div className="user-metric-card">
                      <h3>総ユーザー数</h3>
                      <div className="metric-value">{analyticsData.userMetrics.totalUsers.toLocaleString()}人</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+156人</span>
                        <span>今月の新規</span>
                      </div>
                    </div>
                    
                    <div className="user-metric-card">
                      <h3>アクティブユーザー</h3>
                      <div className="metric-value">{analyticsData.userMetrics.activeUsers.toLocaleString()}人</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+89.2%</span>
                        <span>アクティブ率</span>
                      </div>
                    </div>
                    
                    <div className="user-metric-card">
                      <h3>プレミアムユーザー</h3>
                      <div className="metric-value">{analyticsData.userMetrics.premiumUsers.toLocaleString()}人</div>
                      <div className="metric-change">
                        <i className="fas fa-arrow-up text-green-500"></i>
                        <span className="text-green-500">+12.3%</span>
                        <span>コンバージョン率</span>
                      </div>
                    </div>
                  </div>

                  {/* 解約分析 */}
                  <div className="churn-analysis">
                    <h3>解約分析</h3>
                    <div className="churn-overview">
                      <div className="churn-metric">
                        <h4>月次解約率</h4>
                        <div className="churn-value">{formatPercentage(analyticsData.churnAnalysis.monthlyChurn)}</div>
                      </div>
                      
                      <div className="churn-reasons">
                        <h4>解約理由</h4>
                        <div className="reasons-list">
                          {analyticsData.churnAnalysis.reasons.map((reason, index) => (
                            <div key={index} className="reason-item">
                              <div className="reason-info">
                                <span className="reason-name">{reason.reason}</span>
                                <span className="reason-count">{reason.count}人</span>
                              </div>
                              <div className="reason-bar">
                                <div 
                                  className="reason-fill"
                                  style={{ width: `${reason.percentage}%` }}
                                ></div>
                              </div>
                              <span className="reason-percentage">{formatPercentage(reason.percentage)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 支払い方法分析 */}
                  <div className="payment-methods">
                    <h3>支払い方法分析</h3>
                    <div className="payment-methods-grid">
                      {analyticsData.paymentMethods.map((method, index) => (
                        <div key={index} className="payment-method-card">
                          <h4>{method.method}</h4>
                          <div className="method-metrics">
                            <div className="method-metric">
                              <span className="metric-label">利用者数</span>
                              <span className="metric-value">{method.count}人</span>
                            </div>
                            <div className="method-metric">
                              <span className="metric-label">割合</span>
                              <span className="metric-value">{formatPercentage(method.percentage)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 機能タブ */}
            {activeTab === 'features' && (
              <div className="tab-content active">
                <div className="features-section">
                  <h2>機能利用分析</h2>
                  
                  <div className="feature-usage-grid">
                    {analyticsData.featureUsage.map((feature, index) => (
                      <div key={index} className="feature-usage-card">
                        <h3>{feature.feature}</h3>
                        <div className="feature-metrics">
                          <div className="feature-metric">
                            <span className="metric-label">利用率</span>
                            <div className="usage-bar">
                              <div 
                                className="usage-fill"
                                style={{ width: `${feature.usage}%` }}
                              ></div>
                            </div>
                            <span className="usage-value">{formatPercentage(feature.usage)}</span>
                          </div>
                          
                          <div className="feature-metric">
                            <span className="metric-label">満足度</span>
                            <div className="satisfaction-rating">
                              <div className="stars">
                                {[...Array(5)].map((_, i) => (
                                  <i 
                                    key={i} 
                                    className={`fas fa-star ${i < Math.floor(feature.satisfaction) ? 'filled' : ''}`}
                                  ></i>
                                ))}
                              </div>
                              <span className={`rating-value ${getSatisfactionColor(feature.satisfaction)}`}>
                                {feature.satisfaction}/5
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* エクスポート機能 */}
          <div className="export-section">
            <h3>データエクスポート</h3>
            <div className="export-actions">
              <button className="btn btn-outline">
                <i className="fas fa-download"></i>
                CSVでダウンロード
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-file-pdf"></i>
                PDFレポート
              </button>
              <button className="btn btn-outline">
                <i className="fas fa-envelope"></i>
                メールで送信
              </button>
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
    </div>
  )
}
