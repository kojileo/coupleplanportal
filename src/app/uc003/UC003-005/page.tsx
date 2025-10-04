'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function UC003005Page() {
  const [activeTab, setActiveTab] = useState('getting-started')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const tabs = [
    { id: 'getting-started', name: 'はじめに', icon: 'fas fa-play' },
    { id: 'features', name: '機能ガイド', icon: 'fas fa-star' },
    { id: 'tips', name: 'コツ・ヒント', icon: 'fas fa-lightbulb' },
    { id: 'faq', name: 'よくある質問', icon: 'fas fa-question-circle' }
  ]

  const gettingStartedSections = [
    {
      id: 'account-setup',
      title: 'アカウント作成・設定',
      content: 'CouplePlanを始めるための基本的な設定手順を説明します。',
      steps: [
        'メールアドレスでアカウントを作成',
        'プロフィール情報を入力',
        'プライバシー設定を確認',
        'パートナーとの連携設定'
      ]
    },
    {
      id: 'first-plan',
      title: '初回デートプラン作成',
      content: 'AIデートプラン生成機能を使って、最初のデートプランを作成する方法です。',
      steps: [
        'デートの基本情報を入力（日時、予算、地域）',
        '好みや興味を設定',
        'AIがプランを生成するまで待機',
        '提案されたプランを確認・選択'
      ]
    },
    {
      id: 'partner-collaboration',
      title: 'パートナーとの共同編集',
      content: 'パートナーと一緒にデートプランを作成・編集する方法です。',
      steps: [
        'パートナーとの連携を完了',
        '共同編集モードでプランを開く',
        'リアルタイムで編集・コメント',
        '編集競合が発生した場合は解決'
      ]
    }
  ]

  const featureGuides = [
    {
      id: 'ai-plan-generation',
      title: 'AIデートプラン生成',
      description: 'AIがあなたの好みに合わせて最適なデートプランを提案します。',
      features: [
        '個人の好みを学習',
        '予算と時間に応じた提案',
        '天候や季節を考慮',
        '過去の履歴を参考にした提案'
      ]
    },
    {
      id: 'collaborative-editing',
      title: '共同編集機能',
      description: 'パートナーと一緒にリアルタイムでデートプランを作成・編集できます。',
      features: [
        'リアルタイム同期',
        '編集競合の自動解決',
        '編集履歴の管理',
        '承認ワークフロー'
      ]
    },
    {
      id: 'date-canvas',
      title: 'Date Canvas',
      description: '思い出をビジュアルで保存・共有できる特別な機能です。',
      features: [
        '描画ツール（ペン、テキスト、ステッカー）',
        '思い出カードの追加',
        '共同編集',
        'エクスポート機能'
      ]
    },
    {
      id: 'relationship-support',
      title: '関係修復サポート',
      description: 'AIが喧嘩や対立の仲裁をサポートし、より良い関係を築きます。',
      features: [
        '中立的な視点での提案',
        'コミュニケーション改善',
        '関係性の分析',
        '段階的な修復プラン'
      ]
    }
  ]

  const tips = [
    {
      category: 'デートプラン作成',
      items: [
        '具体的な好みを設定すると、より精度の高いプランが生成されます',
        '予算は少し余裕を持って設定することをお勧めします',
        '天候を考慮したプランも作成できます',
        '過去のデート履歴を参考に、新しい体験を提案します'
      ]
    },
    {
      category: '共同編集',
      items: [
        '編集前にパートナーと方針を話し合うとスムーズです',
        'コメント機能を活用してコミュニケーションを取りましょう',
        '編集競合が発生した場合は、AI提案を参考に解決できます',
        '定期的に保存することをお勧めします'
      ]
    },
    {
      category: 'Date Canvas',
      items: [
        '思い出カードは後から移動・編集できます',
        '色分けして整理すると見やすくなります',
        'パートナーと一緒に編集すると楽しいです',
        '定期的にエクスポートしてバックアップを取りましょう'
      ]
    }
  ]

  const faqs = [
    {
      question: 'CouplePlanは無料で使えますか？',
      answer: 'はい、基本的な機能は無料でご利用いただけます。無料プランでは月5回までデートプランを生成できます。より多くの機能をご利用いただく場合は、プレミアムプラン（月額980円）をご検討ください。'
    },
    {
      question: 'パートナーとの連携は必須ですか？',
      answer: 'いいえ、必須ではありません。一人でもデートプランを作成・管理できます。ただし、共同編集やDate Canvasなどの機能を最大限活用するには、パートナーとの連携をお勧めします。'
    },
    {
      question: 'AIが提案するプランは信頼できますか？',
      answer: 'はい、AIは過去のデート履歴や好みを学習し、最適なプランを提案します。ただし、提案は参考程度に留め、最終的にはご自身の判断で決定してください。'
    },
    {
      question: 'データのプライバシーは大丈夫ですか？',
      answer: 'はい、お客様のデータは厳重に管理され、第三者と共有されることはありません。詳細はプライバシーポリシーをご確認ください。'
    },
    {
      question: 'スマートフォンでも使えますか？',
      answer: 'はい、CouplePlanはスマートフォン、タブレット、PCのすべてのデバイスでご利用いただけます。レスポンシブデザインで最適化されています。'
    }
  ]

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId)
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
              <h1 className="page-title">利用ガイド</h1>
              <p className="page-subtitle">CouplePlanの使い方やコツを詳しくご紹介します</p>
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
              {tabs.map(tab => (
                <li key={tab.id} className="tab-item">
                  <button 
                    className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <i className={tab.icon}></i>
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* タブコンテンツ */}
          <div className="tab-content">
            {/* はじめにタブ */}
            {activeTab === 'getting-started' && (
              <div className="tab-content active">
                <div className="guide-section">
                  <h2>はじめに</h2>
                  <p>CouplePlanを効果的に活用するための基本的な手順をご紹介します。</p>
                  
                  <div className="guide-sections">
                    {gettingStartedSections.map(section => (
                      <div key={section.id} className="guide-item">
                        <button 
                          className="guide-header"
                          onClick={() => toggleSection(section.id)}
                        >
                          <h3>{section.title}</h3>
                          <i className={`fas fa-chevron-down ${expandedSection === section.id ? 'rotated' : ''}`}></i>
                        </button>
                        
                        {expandedSection === section.id && (
                          <div className="guide-content">
                            <p className="guide-description">{section.content}</p>
                            <ol className="guide-steps">
                              {section.steps.map((step, index) => (
                                <li key={index} className="guide-step">
                                  <span className="step-number">{index + 1}</span>
                                  <span className="step-text">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 機能ガイドタブ */}
            {activeTab === 'features' && (
              <div className="tab-content active">
                <div className="guide-section">
                  <h2>機能ガイド</h2>
                  <p>CouplePlanの各機能の詳細な使い方をご説明します。</p>
                  
                  <div className="feature-guides">
                    {featureGuides.map(feature => (
                      <div key={feature.id} className="feature-guide-card">
                        <div className="feature-header">
                          <h3>{feature.title}</h3>
                          <p>{feature.description}</p>
                        </div>
                        <div className="feature-list">
                          <h4>主な機能</h4>
                          <ul>
                            {feature.features.map((item, index) => (
                              <li key={index}>
                                <i className="fas fa-check"></i>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* コツ・ヒントタブ */}
            {activeTab === 'tips' && (
              <div className="tab-content active">
                <div className="guide-section">
                  <h2>コツ・ヒント</h2>
                  <p>CouplePlanをより効果的に活用するためのコツやヒントをご紹介します。</p>
                  
                  <div className="tips-sections">
                    {tips.map((tip, index) => (
                      <div key={index} className="tip-section">
                        <h3>{tip.category}</h3>
                        <ul className="tip-list">
                          {tip.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="tip-item">
                              <i className="fas fa-lightbulb"></i>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* よくある質問タブ */}
            {activeTab === 'faq' && (
              <div className="tab-content active">
                <div className="guide-section">
                  <h2>よくある質問</h2>
                  <p>CouplePlanに関するよくある質問と回答をご紹介します。</p>
                  
                  <div className="faq-list">
                    {faqs.map((faq, index) => (
                      <div key={index} className="faq-item">
                        <button 
                          className="faq-question"
                          onClick={() => toggleSection(`faq-${index}`)}
                        >
                          <h3>{faq.question}</h3>
                          <i className={`fas fa-chevron-down ${expandedSection === `faq-${index}` ? 'rotated' : ''}`}></i>
                        </button>
                        
                        {expandedSection === `faq-${index}` && (
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* クイックリンク */}
          <div className="quick-links">
            <h3>クイックリンク</h3>
            <div className="links-grid">
              <Link href="/uc001/UC001-001" className="quick-link-card">
                <div className="link-icon">
                  <i className="fas fa-magic"></i>
                </div>
                <h4>デートプラン作成</h4>
                <p>AIが提案するデートプランを作成</p>
              </Link>
              
              <Link href="/uc002/UC002-001" className="quick-link-card">
                <div className="link-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>共同編集</h4>
                <p>パートナーと一緒にプランを作成</p>
              </Link>
              
              <Link href="/uc005/UC005-001" className="quick-link-card">
                <div className="link-icon">
                  <i className="fas fa-paint-brush"></i>
                </div>
                <h4>Date Canvas</h4>
                <p>思い出をビジュアルで保存</p>
              </Link>
              
              <Link href="/common/COMMON-003" className="quick-link-card">
                <div className="link-icon">
                  <i className="fas fa-question-circle"></i>
                </div>
                <h4>ヘルプセンター</h4>
                <p>サポートとお問い合わせ</p>
              </Link>
            </div>
          </div>

          {/* お問い合わせ */}
          <div className="contact-section">
            <div className="contact-card">
              <h3>まだ質問がありますか？</h3>
              <p>お気軽にお問い合わせください。24時間以内に回答いたします。</p>
              <div className="contact-actions">
                <Link href="/common/COMMON-003" className="btn btn-primary">
                  <i className="fas fa-envelope"></i>
                  お問い合わせ
                </Link>
                <Link href="/common/COMMON-003" className="btn btn-outline">
                  <i className="fas fa-comments"></i>
                  チャットサポート
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
